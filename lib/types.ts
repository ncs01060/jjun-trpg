/**
 * 게임 데이터 스키마.
 *
 * 설계 원칙: 이벤트는 "코드"가 아니라 "데이터"다.
 * 이벤트 하나 추가하는 데 로직을 건드릴 필요가 없어야 한다. 그래야 50개 → 1,000개로
 * 늘릴 때 엔진이 안 무너진다.
 */

// ─────────────────────────────────────────────────────────────
// 스탯
// ─────────────────────────────────────────────────────────────

/** 코어 스탯 6종. 전부 1~100으로 clamp. */
export const STAT_KEYS = ["health", "mind", "wit", "money", "friend", "rep"] as const;
export type StatKey = (typeof STAT_KEYS)[number];

export const STAT_LABEL: Record<StatKey, string> = {
  health: "체력",
  mind: "멘탈",
  /** 준영의 주특기. 높으면 "농담으로 넘긴다" 류의 선택지가 열린다. */
  wit: "입담",
  money: "자금",
  friend: "인맥",
  rep: "평판",
};

/** 스탯 변화량. 생략된 스탯은 변화 없음. */
export type Effects = Partial<Record<StatKey, number>>;

/** 이벤트 작성 시 쓰는 축약 키. h체력 m멘탈 t입담 w자금 f인맥 r평판 */
export type ShortEffects = Partial<Record<"h" | "m" | "t" | "w" | "f" | "r", number>>;

export const SHORT_TO_STAT: Record<keyof ShortEffects, StatKey> = {
  h: "health",
  m: "mind",
  t: "wit",
  w: "money",
  f: "friend",
  r: "rep",
};

// ─────────────────────────────────────────────────────────────
// 이벤트
// ─────────────────────────────────────────────────────────────

/** 로그 한 줄의 분위기. 색이 달라진다. */
export type Tone = "normal" | "good" | "bad" | "rare" | "system";

/**
 * 가중치 결과. 같은 선택을 해도 결과가 갈리게 만드는 장치.
 * w는 확률이 아니라 가중치 — 합이 100일 필요 없다.
 */
export interface Outcome {
  w: number;
  text: string;
  effects?: Effects;
  eff?: ShortEffects;
  tone?: Tone;
  /** 영구 플래그 추가. 한글 키를 쓴다 (가독성) */
  flagsAdd?: string[];
  flagsRemove?: string[];
  /** 이 결과가 곧 죽음이면 사인 */
  death?: string;
  /** 이 결과 직후 이어서 터질 이벤트 id */
  next?: string;
  /** 이 결과와 함께 사진첩에 꽂히는 사진 id */
  photo?: string;
}

export interface Choice {
  label: string;
  /** 결과 확정형: text + effects */
  text?: string;
  effects?: Effects;
  eff?: ShortEffects;
  tone?: Tone;
  flagsAdd?: string[];
  flagsRemove?: string[];
  death?: string;
  next?: string;
  /** 가중치 난수형: 여러 결과 중 하나. text와 함께 쓰면 outcomes가 이긴다. */
  outcomes?: Outcome[];
  /** 이 선택지가 보이기 위한 조건 */
  requires?: string[];
  forbids?: string[];
  /** 스탯 하한 조건. 예: { money: 30 } = 자금 30 이상일 때만 선택 가능 */
  needs?: Partial<Record<StatKey, number>>;
  /** 이 선택과 함께 사진첩에 꽂히는 사진 id */
  photo?: string;
}

export interface GameEvent {
  id: string;
  /** 발동 나이 구간 [min, max]. 생략하면 전 연령 */
  age?: [number, number];
  /** 선택 가중치. 기본 1. 높으면 자주 뜬다 */
  weight?: number;
  /**
   * true면 타이머 없이 무한 대기 (인생을 가르는 선택).
   * false/생략이면 10초 타이머 + 무응답 시 ignore 처리.
   */
  major?: boolean;
  /** 해당 나이 구간에 반드시 한 번은 발동 */
  force?: boolean;
  /** 같은 그룹의 force 이벤트는 하나만 발동 (진로 선택 등 배타 분기) */
  forceGroup?: string;
  /** 재발동 허용. 기본은 일생 1회 */
  repeat?: boolean;
  /** repeat 이벤트의 재발동 최소 간격(년) */
  cooldown?: number;
  /** 발동 조건 플래그 (전부 보유해야 함) */
  requires?: string[];
  /** 이 플래그가 하나라도 있으면 발동 안 함 */
  forbids?: string[];
  /** 스탯 하한 조건 */
  needs?: Partial<Record<StatKey, number>>;
  /** 희귀 이벤트 표시 (로그에 금색 강조) */
  rare?: boolean;
  /** 본문 */
  text: string;
  choices?: Choice[];
  /** 타이머를 흘려보냈을 때의 결과 */
  ignore?: { text: string; effects?: Effects; eff?: ShortEffects; tone?: Tone; flagsAdd?: string[]; photo?: string };
  /** 흘려보내기 버튼 문구 (기본: "흘려보낸다") */
  ignoreLabel?: string;
  /** 선택지가 없는 순수 서술 이벤트 */
  flavor?: boolean;
  /** 자동 적용 효과 (선택과 무관하게 발동 시 적용) */
  effects?: Effects;
  eff?: ShortEffects;
  /** 직접 호출만 가능 (next로만 도달. 자동 선택 풀에서 제외) */
  manual?: boolean;
  /** 이벤트 발동과 동시에 사진첩에 꽂히는 사진 id */
  photo?: string;
}

// ─────────────────────────────────────────────────────────────
// 출생지
// ─────────────────────────────────────────────────────────────

export interface Region {
  id: string;
  name: string;
  /** 한 줄 설명 (타이틀 화면 선택지에 노출) */
  desc: string;
  /** 태어났을 때 로그에 찍히는 문장 */
  birthText: string;
  /** 여기서 태어날 확률 가중치 */
  birthWeight: number;
  /** 시작 스탯 보정 */
  startStats: Partial<Record<StatKey, number>>;
  /** 시작 플래그 */
  startFlags?: string[];
  /** 기대수명. 사망 판정 곡선의 기준점 */
  lifeExp: number;
  /** 연간 사망 위험 기본값 */
  adultRisk: number;
  childRisk: number;
}

// ─────────────────────────────────────────────────────────────
// 사진
// ─────────────────────────────────────────────────────────────

/**
 * 사진첩 한 칸.
 * 레퍼런스의 "수집 코덱스" 자리를 이 게임에서는 사진첩이 대신한다.
 * 한 생에서 찍은 사진만 그 생의 사진첩에 남고, 전체 도감은 누적된다.
 */
export interface Photo {
  id: string;
  /** public/photos 아래 경로 */
  src: string;
  /** 폴라로이드 아래 손글씨로 들어가는 한 줄 */
  caption: string;
  /** 움직이는 사진. src 대신 이 mp4를 재생한다 */
  video?: string;
  /** 희귀도. 사진첩에서 테두리 색이 달라진다 */
  rarity?: "common" | "rare" | "legend";
}

// ─────────────────────────────────────────────────────────────
// 게임 상태
// ─────────────────────────────────────────────────────────────

/** 내러티브 피드의 한 줄 */
export interface LogLine {
  id: number;
  kind: "year" | "event" | "result" | "flavor" | "system" | "death";
  text: string;
  tone: Tone;
  /** 나이 표기용 */
  age?: number;
  /** 스탯 변화 배지 */
  delta?: Effects;
  /** 플레이어가 고른 선택지 라벨 (결과 줄에 같이 보여준다) */
  choice?: string;
  /** 이 줄에 폴라로이드로 붙는 사진 id */
  photo?: string;
}

/** 지금 화면에 떠 있는 선택 */
export interface Prompt {
  eventId: string;
  text: string;
  major: boolean;
  /** 조건을 통과해 실제로 보이는 선택지들. i는 원본 인덱스 */
  choices: { label: string; i: number }[];
  ignoreLabel: string | null;
  /** 남은 ms. major면 null */
  remainingMs: number | null;
  rare: boolean;
}

export interface GameState {
  seed: string;
  /** RNG 커서. 이것만 있으면 난수 스트림이 복원된다 */
  cursor: number;

  name: string;
  regionId: string;

  age: number;
  /** 올해 진행률 0~1 */
  yearProgress: number;

  stats: Record<StatKey, number>;
  /** 영구 상태. 한글 키 */
  flags: string[];
  /** 이번 생에 찍은 사진. 사진첩이 곧 수집 요소다 */
  photos: string[];
  /** 직업. null이면 무직 */
  job: string | null;

  /** 발동 이력: eventId → 마지막 발동 나이 */
  seen: Record<string, number>;
  /** 소비된 forceGroup */
  usedGroups: string[];

  log: LogLine[];
  prompt: Prompt | null;
  /** next 체인으로 예약된 이벤트 id */
  queue: string[];

  dead: boolean;
  deathAge: number | null;
  deathCause: string | null;
  /** 죽음 카드에 새길 마지막 한 줄 */
  epitaph: string | null;
}
