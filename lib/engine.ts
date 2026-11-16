/**
 * 게임 엔진.
 *
 * 콘텐츠를 전혀 모른다. 이벤트 테이블이 50개든 5,000개든 이 파일은 안 바뀐다.
 *
 * 상태 갱신은 의도적으로 "뮤테이션"이다. 32배속에서 매 틱 전체 복제를 하면
 * 로그가 수천 줄 쌓였을 때 버벅인다. React 쪽에서 ref + 버전 카운터로 받는다.
 */

import { Rng } from "./rng";
import { REGIONS } from "./content/regions";
import {
  STAT_KEYS,
  SHORT_TO_STAT,
  type Choice,
  type Effects,
  type GameEvent,
  type GameState,
  type LogLine,
  type Outcome,
  type Region,
  type ShortEffects,
  type StatKey,
  type Tone,
} from "./types";

// ─────────────────────────────────────────────────────────────
// 상수 — 이 게임의 "감각"을 결정하는 숫자들
// ─────────────────────────────────────────────────────────────

/** 한 해에 걸리는 실시간. 1배속에서 1년 = 15초. */
export const YEAR_MS = 15_000;

/** 배속 단계. */
export const SPEEDS = [1, 2, 4, 8, 16] as const;

/** minor 선택지 제한시간. 무응답 시 흘려보낸다. */
export const MINOR_TIMER_MS = 10_000;

/** 이 나이에 도달하면 노화로 사망. */
export const MAX_AGE = 100;

/** 한 해에 이벤트가 하나라도 뜰 기본 확률. */
const EVENT_CHANCE = 0.72;

/** 스탯 바닥. 0이 되면 바로 죽는 게 아니라 1에서 버틴다 (위험 판정으로 넘김). */
const STAT_FLOOR = 1;
const STAT_CEIL = 100;

let logSeq = 0;

// ─────────────────────────────────────────────────────────────
// 유틸
// ─────────────────────────────────────────────────────────────

const clamp = (n: number, lo = STAT_FLOOR, hi = STAT_CEIL) => Math.max(lo, Math.min(hi, Math.round(n)));

/** 축약 effects(h/m/w/f/r)를 정식 키로 펼친다. */
function expand(effects?: Effects, eff?: ShortEffects): Effects {
  const out: Effects = { ...(effects ?? {}) };
  if (eff) {
    for (const [k, v] of Object.entries(eff)) {
      const key = SHORT_TO_STAT[k as keyof ShortEffects];
      if (key && typeof v === "number") out[key] = (out[key] ?? 0) + v;
    }
  }
  return out;
}

/** 스탯에 적용하고 "실제로 변한 양"을 돌려준다. clamp 때문에 요청치와 다를 수 있다. */
function applyEffects(state: GameState, effects: Effects): Effects {
  const delta: Effects = {};
  for (const key of STAT_KEYS) {
    const want = effects[key];
    if (!want) continue;
    const before = state.stats[key];
    state.stats[key] = clamp(before + want);
    const moved = state.stats[key] - before;
    if (moved) delta[key] = moved;
  }
  return delta;
}

function addFlags(state: GameState, add?: string[], remove?: string[]) {
  for (const f of add ?? []) if (!state.flags.includes(f)) state.flags.push(f);
  for (const f of remove ?? []) {
    const i = state.flags.indexOf(f);
    if (i >= 0) state.flags.splice(i, 1);
  }
}

/** 사진첩에 꽂는다. 같은 사진은 한 생에 한 번만. */
function collect(state: GameState, photo?: string): string | undefined {
  if (!photo) return undefined;
  if (!state.photos.includes(photo)) state.photos.push(photo);
  return photo;
}

function push(state: GameState, line: Omit<LogLine, "id">) {
  state.log.push({ ...line, id: ++logSeq });
  // 로그가 무한정 쌓이면 메모리를 먹는다. 최근 400줄만 유지.
  if (state.log.length > 400) state.log.splice(0, state.log.length - 400);
}

const rngOf = (state: GameState) => new Rng(state.seed, state.cursor);
const saveRng = (state: GameState, rng: Rng) => {
  state.cursor = rng.cursor;
};

/** 조건 체크: 플래그와 스탯 하한. */
function meets(
  state: GameState,
  requires?: string[],
  forbids?: string[],
  needs?: Partial<Record<StatKey, number>>,
): boolean {
  if (requires?.some((f) => !state.flags.includes(f))) return false;
  if (forbids?.some((f) => state.flags.includes(f))) return false;
  if (needs) {
    for (const [k, min] of Object.entries(needs)) {
      if (state.stats[k as StatKey] < (min as number)) return false;
    }
  }
  return true;
}

// ─────────────────────────────────────────────────────────────
// 탄생
// ─────────────────────────────────────────────────────────────

export interface BirthOptions {
  name: string;
  seed: string;
}

/**
 * 출생지는 고르는 게 아니라 "걸리는" 것이다.
 * 시드에서 뽑으므로 같은 시드는 항상 같은 곳에서 태어난다 —
 * 이게 성립해야 "이 시드로 다시 살기"가 진짜로 같은 인생이 된다.
 */
export function pickBirthRegion(seed: string): Region {
  // 커서를 0에서 시작하는 별도 스트림. 본 게임 난수와 섞이지 않게 시드를 비튼다.
  const rng = new Rng(`${seed}::birth`);
  return rng.weighted(REGIONS, (r) => r.birthWeight) ?? REGIONS[0];
}

export function createGame({ name, seed }: BirthOptions): GameState {
  const region = pickBirthRegion(seed);
  const state: GameState = {
    seed,
    cursor: 0,
    name,
    regionId: region.id,
    age: 0,
    yearProgress: 0,
    stats: { health: 50, mind: 50, wit: 55, money: 50, friend: 50, rep: 50 },
    flags: [...(region.startFlags ?? [])],
    photos: [],
    job: null,
    seen: {},
    usedGroups: [],
    log: [],
    prompt: null,
    queue: [],
    dead: false,
    deathAge: null,
    deathCause: null,
    epitaph: null,
  };

  for (const [k, v] of Object.entries(region.startStats)) {
    state.stats[k as StatKey] = clamp(state.stats[k as StatKey] + (v as number));
  }

  // 방에 들어오는 연출. 나중의 "나갔습니다"와 짝을 이룬다.
  push(state, { kind: "system", text: `${name}님이 들어왔습니다`, tone: "system", age: 0 });
  push(state, { kind: "system", text: region.birthText, tone: "system", age: 0 });
  return state;
}

// ─────────────────────────────────────────────────────────────
// 사망 판정
// ─────────────────────────────────────────────────────────────

/** 올해 죽을 확률. 나이와 체력/멘탈이 같이 민다. */
function mortality(state: GameState, region: Region): number {
  const base = state.age < 15 ? region.childRisk : region.adultRisk;

  // 기대수명을 넘기면 위험이 급격히 올라간다 (곰페르츠 곡선 흉내).
  const over = Math.max(0, state.age - region.lifeExp * 0.6);
  const aging = base * Math.pow(1.09, over);

  // 체력이 바닥이면 치명적. 멘탈은 그보다 약하게 기여한다.
  const frail = state.stats.health < 25 ? (25 - state.stats.health) * 0.004 : 0;
  const broken = state.stats.mind < 15 ? (15 - state.stats.mind) * 0.002 : 0;

  return Math.min(0.9, aging + frail + broken);
}

/**
 * 한 해가 지나며 몸과 마음이 원래대로 돌아가려는 힘.
 *
 * 이게 없으면 체력을 깎는 이벤트가 그대로 죽음의 나선이 된다 (술자리 -12가
 * 3년마다 누적되면 회복 수단이 없어 전원 쇠약사했다).
 * 젊을수록 잘 돌아오고, 나이가 들면 돌아올 수 있는 상한 자체가 내려간다.
 */
function drift(state: GameState) {
  // 나이가 들수록 체력의 천장이 내려간다. 30세부터 매년 0.8씩.
  const ceiling = clamp(100 - Math.max(0, state.age - 30) * 0.8);
  if (state.stats.health < ceiling) {
    state.stats.health = clamp(Math.min(ceiling, state.stats.health + 2.0));
  } else if (state.stats.health > ceiling) {
    state.stats.health = clamp(state.stats.health - 1);
  }

  // 멘탈은 좋든 나쁘든 평상심(50)으로 천천히 돌아온다.
  const gap = 50 - state.stats.mind;
  if (Math.abs(gap) > 1) state.stats.mind = clamp(state.stats.mind + Math.sign(gap) * 1.5);
}

export function kill(state: GameState, cause: string, text?: string) {
  if (state.dead) return;
  state.dead = true;
  state.deathAge = state.age;
  state.deathCause = cause;
  state.prompt = null;
  state.queue = [];
  if (text) push(state, { kind: "death", text, tone: "bad", age: state.age });
}

// ─────────────────────────────────────────────────────────────
// 이벤트 선택
// ─────────────────────────────────────────────────────────────

function eligible(state: GameState, ev: GameEvent): boolean {
  if (ev.manual) return false;
  if (ev.age) {
    const [lo, hi] = ev.age;
    if (state.age < lo || state.age > hi) return false;
  }
  const lastSeen = state.seen[ev.id];
  if (lastSeen != null) {
    if (!ev.repeat) return false;
    if (ev.cooldown && state.age - lastSeen < ev.cooldown) return false;
  }
  if (ev.forceGroup && state.usedGroups.includes(ev.forceGroup)) return false;
  return meets(state, ev.requires, ev.forbids, ev.needs);
}

/** 올해 터질 이벤트를 고른다. 없으면 null. */
function pickEvent(state: GameState, table: GameEvent[], rng: Rng): GameEvent | null {
  // 1순위: next 체인으로 예약된 이벤트. 조건 무시하고 무조건 발동.
  while (state.queue.length) {
    const id = state.queue.shift()!;
    const found = table.find((e) => e.id === id);
    if (found) return found;
  }

  const pool = table.filter((e) => eligible(state, e));
  if (!pool.length) return null;

  // 2순위: force 이벤트. 나이 구간을 놓치면 영구히 못 보므로 우선권을 준다.
  const forced = pool.filter((e) => e.force);
  if (forced.length) {
    const hit = rng.weighted(forced, (e) => e.weight ?? 1);
    if (hit) return hit;
  }

  // 3순위: 일반 풀에서 가중치 추출. 매년 터지지는 않는다.
  if (!rng.chance(EVENT_CHANCE)) return null;
  return rng.weighted(pool, (e) => e.weight ?? 1) ?? null;
}

// ─────────────────────────────────────────────────────────────
// 이벤트 발동 / 해결
// ─────────────────────────────────────────────────────────────

function fire(state: GameState, ev: GameEvent) {
  state.seen[ev.id] = state.age;
  if (ev.forceGroup && !state.usedGroups.includes(ev.forceGroup)) state.usedGroups.push(ev.forceGroup);

  const auto = expand(ev.effects, ev.eff);
  const delta = Object.keys(auto).length ? applyEffects(state, auto) : undefined;
  const photo = collect(state, ev.photo);

  // 선택지 없는 서술 이벤트는 그냥 한 줄 찍고 끝.
  if (ev.flavor || !ev.choices?.length) {
    push(state, {
      kind: "flavor",
      text: ev.text,
      tone: ev.rare ? "rare" : "normal",
      age: state.age,
      delta,
      photo,
    });
    return;
  }

  // 조건을 통과한 선택지만 노출. 원본 인덱스(i)를 보존해야 해결 단계에서 찾을 수 있다.
  const visible = ev.choices
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => meets(state, c.requires, c.forbids, c.needs))
    .map(({ c, i }) => ({ label: c.label, i }));

  if (!visible.length) {
    push(state, { kind: "flavor", text: ev.text, tone: "normal", age: state.age, delta, photo });
    return;
  }

  push(state, {
    kind: "event",
    text: ev.text,
    tone: ev.rare ? "rare" : ev.major ? "system" : "normal",
    age: state.age,
    delta,
    photo,
  });

  state.prompt = {
    eventId: ev.id,
    text: ev.text,
    major: !!ev.major,
    choices: visible,
    ignoreLabel: ev.major ? null : (ev.ignoreLabel ?? "흘려보낸다"),
    remainingMs: ev.major ? null : MINOR_TIMER_MS,
    rare: !!ev.rare,
  };
}

/** 선택 하나를 결과로 환산한다. outcomes가 있으면 가중치 추출. */
function resolveOne(
  state: GameState,
  src: Choice | Outcome,
  rng: Rng,
): { text: string; tone: Tone; delta: Effects; death?: string; next?: string; photo?: string } {
  const outcomes = "outcomes" in src ? src.outcomes : undefined;
  const chosen: Choice | Outcome =
    outcomes?.length ? (rng.weighted(outcomes, (o) => o.w) ?? outcomes[0]) : src;

  const delta = applyEffects(state, expand(chosen.effects, chosen.eff));
  addFlags(state, chosen.flagsAdd, chosen.flagsRemove);

  return {
    text: chosen.text ?? "",
    tone: chosen.tone ?? (chosen.death ? "bad" : "normal"),
    delta,
    death: chosen.death,
    next: chosen.next,
    // outcomes 쪽 사진이 있으면 그걸, 없으면 선택지 자체의 사진을 쓴다
    photo: collect(state, chosen.photo ?? ("photo" in src ? src.photo : undefined)),
  };
}

/**
 * 떠 있는 선택을 해결한다.
 * @param index 고른 선택지의 원본 인덱스. null이면 흘려보낸 것(타임아웃 포함).
 */
export function resolvePrompt(state: GameState, table: GameEvent[], index: number | null) {
  const prompt = state.prompt;
  if (!prompt || state.dead) return;
  const ev = table.find((e) => e.id === prompt.eventId);
  state.prompt = null;
  if (!ev) return;

  const rng = rngOf(state);

  // 흘려보냄
  if (index == null) {
    // major는 타이머가 없으니 여기 오면 안 되지만, 방어적으로 0번 선택지로 처리.
    if (prompt.major && ev.choices?.length) {
      const res = resolveOne(state, ev.choices[0], rng);
      if (res.text) push(state, { kind: "result", text: res.text, tone: res.tone, age: state.age, delta: res.delta, choice: ev.choices[0].label, photo: res.photo });
      if (res.next) state.queue.push(res.next);
      if (res.death) kill(state, res.death);
      saveRng(state, rng);
      return;
    }
    const ig = ev.ignore;
    const delta = ig ? applyEffects(state, expand(ig.effects, ig.eff)) : {};
    if (ig) addFlags(state, ig.flagsAdd);
    push(state, {
      kind: "result",
      text: ig?.text ?? "그냥 지나갔다.",
      tone: ig?.tone ?? "system",
      age: state.age,
      delta,
    });
    saveRng(state, rng);
    return;
  }

  const choice = ev.choices?.[index];
  if (!choice) {
    saveRng(state, rng);
    return;
  }

  const res = resolveOne(state, choice, rng);
  if (res.text) {
    push(state, {
      kind: "result",
      text: res.text,
      tone: res.tone,
      age: state.age,
      delta: res.delta,
      choice: choice.label,
      photo: res.photo,
    });
  }
  if (res.next) state.queue.push(res.next);
  if (res.death) kill(state, res.death, undefined);
  saveRng(state, rng);
}

// ─────────────────────────────────────────────────────────────
// 한 해 넘기기
// ─────────────────────────────────────────────────────────────

/** 나이를 한 살 올리고, 사망 판정 후 올해의 이벤트를 발동한다. */
export function advanceYear(state: GameState, table: GameEvent[], region: Region) {
  if (state.dead) return;

  state.age += 1;
  state.yearProgress = 0;

  if (state.age >= MAX_AGE) {
    push(state, { kind: "year", text: `${state.age}세`, tone: "system", age: state.age });
    kill(state, "노화", "오래 살았다. 더 바랄 것도 없이, 조용히 끝났다.");
    return;
  }

  push(state, { kind: "year", text: `${state.age}세`, tone: "system", age: state.age });

  drift(state);

  const rng = rngOf(state);

  // 사망 판정이 이벤트보다 먼저다. 죽었으면 올해 이벤트는 없다.
  if (rng.chance(mortality(state, region))) {
    // 사인 라벨: 몸이 먼저 무너졌나 / 충분히 살았나 / 그 외
    const cause =
      state.stats.health < 25
        ? "쇠약"
        : state.age >= region.lifeExp * 0.8
          ? "노화"
          : "사고";
    kill(state, cause, deathLine(cause, rng));
    saveRng(state, rng);
    return;
  }

  const ev = pickEvent(state, table, rng);
  if (ev) fire(state, ev);
  saveRng(state, rng);
}

function deathLine(cause: string, rng: Rng): string {
  const lines: Record<string, string[]> = {
    쇠약: ["몸이 먼저 포기했다. 버틸 만큼 버텼다.", "오래 아팠다. 마지막에는 숨이 가벼웠다."],
    노화: ["더 바랄 것도 없이, 조용히 끝났다.", "아침에 일어나지 않았다. 표정은 편했다."],
    사고: ["예고가 없었다. 그날이 그날이었다.", "한순간이었다. 아무도 준비하지 못했다."],
  };
  return rng.pick(lines[cause] ?? lines.사고) ?? "끝났다.";
}

/**
 * 실시간 틱. React 쪽에서 프레임마다 호출한다.
 * @param dt 지난 실시간 ms
 * @param speed 배속
 * @returns 화면을 다시 그려야 하면 true
 */
export function tick(
  state: GameState,
  table: GameEvent[],
  region: Region,
  dt: number,
  speed: number,
): boolean {
  if (state.dead) return false;

  // major 선택이 떠 있으면 시간이 멈춘다. 이게 이 게임의 핵심 감각.
  if (state.prompt?.major) return false;

  // minor 선택은 타이머가 돌지만 나이도 같이 흐른다.
  if (state.prompt && state.prompt.remainingMs != null) {
    state.prompt.remainingMs -= dt * speed;
    if (state.prompt.remainingMs <= 0) {
      resolvePrompt(state, table, null);
    }
  }

  state.yearProgress += (dt * speed) / YEAR_MS;
  if (state.yearProgress >= 1) {
    state.yearProgress -= 1;
    advanceYear(state, table, region);
  }
  return true;
}
