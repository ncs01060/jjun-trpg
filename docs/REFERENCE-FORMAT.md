# 레퍼런스 포맷 — "도시의 한 사람으로 태어나"

출처: https://project-moon-life.cityborn.workers.dev/
분석일: 2026-11-16 (배포된 번들 직접 역분석)

이 문서는 우리가 만들 TRPG가 따라갈 **형식(format)** 정리다. 세계관 내용이 아니라
"어떤 구조의 게임인가"에 집중한다.

---

## 1. 한 줄 정의

> 무작위로 태어나 한 해 한 해를 **실시간으로** 살아가는 인생 시뮬레이션.
> Project Moon(로보토미 코퍼레이션 · 폐허도서관 · 림버스 컴퍼니) 세계관 팬게임.

- GM 없음. **LLM 호출 없음.** 100% 수작업으로 쓴 텍스트 + 가중치 난수.
- 플레이어는 "조작"하지 않는다. 흘러가는 인생을 보다가, 가끔 **선택지에 개입**한다.
- 죽으면 끝. 기록이 남고 다시 태어난다.

## 2. 기술 스택

| 항목 | 내용 |
|---|---|
| 프레임워크 | React + Vite (단일 SPA, `#root` 하나) |
| 배포 | Cloudflare Workers, 정적 PWA (`manifest.webmanifest`, standalone, 아이콘 192/512/maskable) |
| 번들 | `assets/index-*.js` **10.7MB** / `index-*.css` 241KB — 대부분이 텍스트 콘텐츠 |
| 백엔드 | **없음.** API 호출 0건. 전부 클라이언트 |
| 저장 | `localStorage` (언어 설정, 세이브 슬롯 3개) |
| 다국어 | ko / en / ja / zh — 한국어 원본 기준 4개 국어 전체 번역 |
| 폰트 | Google Fonts: Song Myung, Yuji Syuku, Cinzel, Nanum Brush Script |

## 3. 화면 흐름

```
타이틀 (.title)
  ├─ 이름 (비워 두면 무작위)
  ├─ 성별 (남성/여성/무작위)
  ├─ 태어날 곳 (구역 선택/무작위)
  ├─ 시드 지정 (선택) ← 같은 시드 + 같은 선택 = 같은 인생 (완전 결정론)
  ├─ [태어나기] [이어서 살기] [추가 모드]
  ├─ 지난 삶들 / 모아보기(코덱스)
  └─ ⚠ 스포일러 · 15세 이상 권장 고지
      ↓
플레이 화면
  ├─ .topbar   : 나이 | .yearbar(한 해 진행 게이지) | 속도/일시정지 컨트롤
  ├─ .stat-strip : 5스탯 가로 5칸 게이지
  ├─ .log      : 내러티브 피드 (한 줄씩 아래로 쌓임, 중앙 비네팅)
  └─ .choice-modal : 선택지 모달 (+ 타이머)
      ↓
죽음 (.death / .deathcard)
  ├─ 사망 나이 · 사인 · 마지막 소속 · 마지막 상태 · 남겨 둔 말
  ├─ 태어난 집 / 소중한 것 / 남긴 기록
  └─ [다시 태어나기] [이 시드로 다시 살기] [삶의 기록 보기] [이미지 저장] [공유하기]
      ↓
코덱스 (.codex) : 수집 도감 — 등급별 필터, 그리드, import/export
```

## 4. 핵심 루프 — 실시간 나이 진행

- 나이가 **실시간으로** 오른다. 기본 한 해 ≈ **60초** (`6e4`).
- 속도 배속: **×1 / ×2 / ×4 / ×8 / ×16 / ×32** (`.speeds` UI).
- 최대 나이 **110세** → 도달 시 사인 `노화`로 사망.
- 한 해가 지날 때마다 `{kind:"year"}` 로그 한 줄 + 그 해의 이벤트 판정.

### 선택지 타이머 (이 게임의 핵심 감각)

| 종류 | 타이머 | 무응답 시 |
|---|---|---|
| **minor** | **10초** (`remainingMs: 1e4`) | `흘려보낸다` 로 자동 처리 |
| **major** | **없음** (`remainingMs: null`) | 게임이 멈추고 기다림 |

→ 사소한 일은 가만히 있으면 지나가고, 인생을 가르는 일에서만 시간이 멈춘다.

## 5. 스탯

5개 코어 스탯, **1~100** 범위로 매 판정 후 clamp:

| key | 한국어 | 축약 | 색 |
|---|---|---|---|
| `health` | 건강 | `h` | `#6fa37f` |
| `sanity` | 정신력 | `s` | `#8b9bd8` |
| `wealth` | 재산 | `w` | `#c9a24b` |
| `network` | 인맥 | `n` | `#5fb0b0` |
| `rep` | 평판 | `r` | `#c97a96` |

서브 스탯 (상황별로만 등장): `thirst`(갈증) `perf`(실적) `warn`(경고) `fame`(명성)
`heir_ji/yong/in`(지·용·인) `lmF/lmS/lmL`(우호도·강함·충성도)

## 6. 이벤트 데이터 포맷 ★ 가장 중요

콘텐츠는 전부 **선언적 JS 객체 배열**. 로직이 아니라 데이터다.

```js
{
  id: "a_career",
  age: [18, 22],            // 발동 나이 구간
  force: true,              // 반드시 발동
  forceGroup: "career",     // 같은 그룹끼리 중복 방지
  must: true,
  major: true,              // true면 타이머 없음
  noJob: true,              // 직업 없을 때만
  repeat: false, cooldown: 6,
  requires: [...], forbids: [...],   // 플래그 조건
  text: "열여덟. 이제 무엇으로 먹고살지 정해야 한다. 이 도시에서 길은 많지 않고, 어느 길이든 대가가 따른다.",
  choices: [
    // (A) 결과 확정형
    { label: "거절한다",
      text: "웃음 몇 개가 사라졌다. 대신 아침은 맑았다.",
      effects: { network: -1, health: 1 } },

    // (B) 가중치 난수형 — w는 확률 가중치
    { label: "삼킨다",
      outcomes: [
        { w: 65, text: "속이 뒤집혔다. 깨어난 뒤에는 모든 것이 더 거칠어 보였다.",
          effects: { sanity: 3, health: -3 } },
        { w: 35, text: "그날 이후로 같은 약을 찾게 되었다.",
          effects: { health: -5, sanity: -2 }, flagsAdd: ["약물중독"] },
      ] },
  ],
  ignore: { text: "손을 저으며 자리를 피했다.", effects: {} },  // 흘려보냈을 때
  next: "cm_child_name",    // 체인 이벤트
}
```

필드 사전: `text` `label` `effects` `choices` `outcomes` `w`(가중치) `flagsAdd` `flagsRemove`
`requires` `forbids` `age` `repeat` `cooldown` `chance` `mult` `min` `max` `force` `forceGroup`
`major` `manual` `anyone` `rare` `tone` `next` `nextLater` `ignore` `ignoreLabel` `death` `cause`
`tier`/`tiers` `kind` `hold` `delta`

로그 라인 종류: `kind: "year" | "major" | "minor" | "result" | "flavor"`
톤: `tone: "normal" | "good" | "bad" | "rare" | "system"`

### 텍스트 템플릿 문법

```
{배우자:이|가} 먼저 팔을 내밀었다.     // 조사 자동 처리 (이/가, 은/는, 을/를)
{지난물}                              // 런타임 치환 변수
```

## 7. 콘텐츠 규모 (실측)

| 항목 | 수량 |
|---|---|
| 한국어 문자열 | **66,902** 개 |
| 콘텐츠 엔트리 (`id:`) | **1,893** 개 |
| 선택지 세트 (`choices:`) | **1,470** 개 |
| 가중치 결과 테이블 (`outcomes:`) | **816** 개 |
| 효과 객체 (`effects:`) | **4,198** 개 |
| 나이 게이트 이벤트 | **1,289** 개 |
| 스토리라인 아크 (id 접두사) | **40+** 개 |

주요 아크: `ri_`(89) `bf_`(82) `rq_`(74) `rc_`(59) `cl_`(57) `ws_`(56) `wo_`(55) `bl_`(51)
`hgd_`(46) `th_`(46) `mi_`(45) `og_`(42) `aw_`(42) `cm_`(41) `nh_`(41) `kk_`(39) `a_`(38) …

→ **콘텐츠 분량이 곧 게임**이다. 시스템은 단순하고, 글이 압도적으로 많다.

## 8. 출생지 = 구역 (사망률 시뮬레이션)

구역마다 인구통계 파라미터를 들고 있고, 실제 생명표로 기대수명을 적분한다.

```js
{
  id: "A", name: "A사", alias: "머리",
  industry: ["조세","조폐","입법","행정","사법"],
  ward: 1, tags: ["wing","top"],
  desc: "날개들 위에서 도시를 다스리는 머리의 관할. 도시에서 가장 안전하고 풍요롭지만, 그만큼 지켜야 할 금기도 많다.",
  birthText: "A사의 관할, 마른 시트와 조용한 복도. 당신은 도시에서 가장 높은 곳에서 태어났다.",
  birthWeight: 1.2,          // 여기서 태어날 확률 가중치
  lifeExp: 82, avgLife: 65, calib: 22.1,
  infantMort: 0.00195, childMort: 4e-4, adultRisk: 0.00105,
  orphanRate: 0.018,
  safety: 9, wealth: 9, medical: 9, orgPressure: 7, fantasm: 1, pollution: 1,
}
```

- 사망 판정: 0세 → `infantMort`, 15세 미만 → `childMort`, 이후 → `adultRisk`
- 기대수명은 110세까지 생존확률을 누적 적분해서 산출

## 9. 직업 / 플래그 / 등급

**직업** (각각 위험도 수치 보유, `none: 2.4` ~ `가주/군주: 9`):
날개 직원 · 손가락 · 해결사 · 공방 직원 · 흑수 · 시간징수직 · 정리 요원 · 적출직 ·
이단 심문관 · 호위무사 · 선원 · 4무리 · 권속 · 검계 · 떠돌이 검객 · 흑운회 · 도장 사범 ·
이름 없는 뒤틀림 · 가주후보 · 가주 · 군주

**플래그** (영구 상태, 사람이 읽을 수 있는 한글 키):
고아 · 부유한집 · 가난한집 · 연인 · 소꿉친구 · 가정 · 아이 · 빚 · 약물중독 · 조직입문 ·
환상체목격 · 환상체생존 · E.G.O개화 · 진학 · 상층 · 사원증 · 복제 · 프로젝트완수 · 후견 …

**특수 능력 축**: E.G.O개화 · 특색 · 유물 · 혈귀

**수집 등급** (코덱스 색상):
`common #a8a69f` · `uncommon #7fc28f` · `rare #6ea8e8` · `epic #b48cf0` ·
`legend #f0a83c` · `myth #ff5d73` · `miracle #5fe3d0` · `past #a38b6d`

## 10. 비주얼 톤

```css
--bg:      #0b0c10   /* 거의 검정 */
--bg2:     #10121a
--panel:   #14161d
--border:  #252938
--text:    #dcd9d2   /* 따뜻한 회백색 */
--dim:     #8a8982
--accent:  #c9a24b   /* 낡은 금색 */
--good:    #6fa37f
--bad:     #c0584a
--rare:    #a98be0
```

- `body`: 위쪽에서 내려오는 라디얼 그라디언트 (`#171a26` → `--bg`), `line-height: 1.6`
- 본문은 **명조/세리프** (Song Myung, Noto Serif KR) — 활자 조판 느낌
- 타이틀: `letter-spacing: .18em`, 5.2초 페이드인 애니메이션
- 모바일 우선 (`100dvh`, `env(safe-area-inset-*)`, viewport-fit=cover)
- **스토리라인별 전용 FX 클래스가 949개** — `ajfx-*`(재판) `chfx-*` `clfx-*` `arbfx-*` 등
  주요 장면마다 손으로 만든 전용 연출이 붙는다

## 11. 우리가 가져갈 형식 체크리스트

- [ ] 실시간으로 흐르는 나이 + 배속 컨트롤 + 한 해 진행 게이지
- [ ] minor는 10초 타이머/자동 흘려보내기, major는 무한 대기
- [ ] 1~100 clamp 되는 소수의 코어 스탯 (5개면 충분)
- [ ] 이벤트 = 선언적 데이터 (`text` / `choices` / `outcomes[w]` / `effects` / `flagsAdd`)
- [ ] 한글 플래그 키 (가독성)
- [ ] 시드 기반 완전 결정론 → "같은 시드로 다시 살기" / 공유
- [ ] 출생지 테이블 + 실제 사망률 파라미터
- [ ] 죽음 카드 (나이 · 사인 · 소속 · 마지막 상태 · 남긴 말) + 이미지 저장/공유
- [ ] 지난 삶 기록 + 등급별 수집 코덱스
- [ ] 다크 세리프 PWA, 모바일 우선
- [ ] 백엔드/LLM 없이 수작업 텍스트로 승부
