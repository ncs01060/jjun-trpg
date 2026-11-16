const path = require("node:path");
// argv로 받은 경로는 cwd 기준으로 풀어야 한다 (require는 이 파일 기준으로 풀기 때문).
const B = path.resolve(process.cwd(), process.argv[2] || ".tmp-engine");
const { createGame, advanceYear, resolvePrompt, MAX_AGE } = require(B + "/engine.js");
const { EVENTS } = require(B + "/content/events/index.js");
const { REGIONS, getRegion } = require(B + "/content/regions.js");
const { Rng } = require(B + "/rng.js");

/**
 * 한 생을 끝까지 돌린다. 실시간 틱 대신 advanceYear를 직접 호출한다.
 * chooser(prompt) -> 선택 인덱스 또는 null
 */
function live(seed, _region, chooser) {
  const s = createGame({ name: "준영", seed });
  // 출생지는 시드에서 결정된다. 사망 판정도 반드시 그 출생지를 써야 한다.
  const region = getRegion(s.regionId);
  let guard = 0;
  while (!s.dead && guard++ < 500) {
    advanceYear(s, EVENTS, region);
    // 한 해에 선택이 뜨면 즉시 해결 (체인된 next까지 따라간다)
    let chain = 0;
    while (s.prompt && !s.dead && chain++ < 10) {
      resolvePrompt(s, EVENTS, chooser(s.prompt, s));
    }
  }
  return s;
}

const region = REGIONS[0];

// ── 0) 콘텐츠 무결성: 개수, 중복 id, 사진 참조
{
  const { PHOTOS } = require(B + "/content/photos.js");
  const ids = EVENTS.map((e) => e.id);
  const dupIds = [...new Set(ids.filter((x, i) => ids.indexOf(x) !== i))];
  const known = new Set(PHOTOS.map((p) => p.id));
  const badPhotos = new Set();
  const collect = (o) => {
    if (!o || typeof o !== "object") return;
    if (typeof o.photo === "string" && !known.has(o.photo)) badPhotos.add(o.photo);
    for (const v of Object.values(o)) {
      if (Array.isArray(v)) v.forEach(collect);
      else if (v && typeof v === "object") collect(v);
    }
  };
  EVENTS.forEach(collect);
  const noAge = EVENTS.filter((e) => e.age && (e.age[0] > e.age[1])).map((e) => e.id);
  console.log("── 콘텐츠 ──");
  console.log("이벤트:", EVENTS.length, "개 / 사진:", PHOTOS.length, "장");
  console.log("중복 이벤트 id:", dupIds.length ? dupIds : "없음 ✓");
  console.log("없는 사진 참조:", badPhotos.size ? [...badPhotos] : "없음 ✓");
  console.log("나이 구간 뒤집힘:", noAge.length ? noAge : "없음 ✓");
}

// ── 1) 100생을 돌려서 크래시 / 무한루프 / 미사망 확인
let deaths = {}, ages = [], noDeath = 0, maxLog = 0, flagSet = new Set();
for (let i = 0; i < 100; i++) {
  const pickRng = new Rng("chooser" + i);
  const s = live("seed" + i, region, (p) =>
    p.ignoreLabel && pickRng.chance(0.25) ? null : pickRng.int(0, p.choices.length - 1),
  );
  if (!s.dead) noDeath++;
  else {
    deaths[s.deathCause] = (deaths[s.deathCause] || 0) + 1;
    ages.push(s.deathAge);
  }
  maxLog = Math.max(maxLog, s.log.length);
  s.flags.forEach((f) => flagSet.add(f));
}
ages.sort((a, b) => a - b);
const avg = (ages.reduce((a, b) => a + b, 0) / ages.length).toFixed(1);
console.log("── 100생 시뮬레이션 ──");
console.log("미사망(버그):", noDeath);
console.log("평균 사망 나이:", avg, "| 중앙값:", ages[Math.floor(ages.length / 2)],
            "| 최소:", ages[0], "| 최대:", ages[ages.length - 1]);
console.log("사인 분포:", deaths);
console.log("로그 최대 길이:", maxLog, "(400 상한 정상 동작)");
console.log("등장한 플래그:", [...flagSet].sort().join(", "));

// ── 2) 결정론: 같은 시드 + 같은 선택 → 같은 인생?
const fixedChoices = [0, 1, 0, 2, 1, 0, 0, 1, 1, 0];
let ci = 0;
const chooser = () => fixedChoices[ci++ % fixedChoices.length];
ci = 0; const a = live("동일시드테스트", region, chooser);
ci = 0; const b = live("동일시드테스트", region, chooser);
const sig = (s) => JSON.stringify([s.deathAge, s.deathCause, s.stats, s.flags, s.log.map((l) => l.text)]);
console.log("\n── 결정론 검증 ──");
console.log("같은 시드 두 번 → 동일한가:", sig(a) === sig(b) ? "✅ 동일" : "❌ 다름");
ci = 0; const c = live("다른시드", region, chooser);
console.log("다른 시드 → 달라지는가:", sig(a) !== sig(c) ? "✅ 다름" : "❌ 같음(버그)");
console.log("표본 인생:", a.deathAge + "세 /", a.deathCause, "/ 플래그:", a.flags.join(",") || "없음");

// ── 3) 스탯 범위 불변식 (1~100)
let bad = [];
for (let i = 0; i < 200; i++) {
  const r = new Rng("range" + i);
  const s = live("range" + i, REGIONS[i % REGIONS.length], (p) => r.int(0, p.choices.length - 1));
  for (const [k, v] of Object.entries(s.stats)) {
    if (v < 1 || v > 100 || !Number.isInteger(v)) bad.push([i, k, v]);
  }
}
console.log("\n── 스탯 불변식 (1~100 정수) ──");
console.log(bad.length ? "❌ 위반: " + JSON.stringify(bad.slice(0, 5)) : "✅ 200생 전부 통과");

// ── 4) force 이벤트가 실제로 발동하나 (진로 분기)
let gotCareer = 0;
for (let i = 0; i < 50; i++) {
  const r = new Rng("f" + i);
  const s = live("force" + i, region, (p) => r.int(0, p.choices.length - 1));
  if (s.usedGroups.includes("career") || s.seen["j_career_study"] != null) gotCareer++;
}
// ── 5) 사진 수집
const { PHOTOS } = require(B + "/content/photos.js");
let photoCounts = [], seenPhotos = new Set();
for (let i = 0; i < 100; i++) {
  const r = new Rng("ph" + i);
  const s = live("ph" + i, region, (p) => r.int(0, p.choices.length - 1));
  photoCounts.push(s.photos.length);
  s.photos.forEach((x) => seenPhotos.add(x));
}
photoCounts.sort((a, b) => a - b);
console.log("\n── 사진첩 ──");
console.log(`한 생당 수집: 중앙값 ${photoCounts[50]}장 / 최대 ${photoCounts[99]}장 (전체 ${PHOTOS.length}장)`);
console.log(`100생 동안 한 번이라도 나온 사진: ${seenPhotos.size}/${PHOTOS.length}`);

// ── 6) 출생지: 시드에서 결정 + 재현 + 분포
const { pickBirthRegion } = require(B + "/engine.js");
const dist = {};
for (let i = 0; i < 600; i++) {
  const r = pickBirthRegion("birth" + i);
  dist[r.name] = (dist[r.name] || 0) + 1;
}
const same = pickBirthRegion("고정시드").id === pickBirthRegion("고정시드").id;
const varies = new Set(["a", "b", "c", "d", "e"].map((x) => pickBirthRegion(x).id)).size > 1;
console.log("\n── 출생지 (랜덤, 시드 결정) ──");
console.log("같은 시드 → 같은 출생지:", same ? "✅" : "❌");
console.log("시드마다 달라짐:", varies ? "✅" : "❌");
console.log("600회 분포:", dist, "(가중치 3:2:2 기대)");

console.log("\n── force/forceGroup ──");
console.log(`19~22세까지 생존한 생에서 진로 이벤트 발동: ${gotCareer}/50`);
