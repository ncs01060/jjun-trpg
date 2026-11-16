/**
 * 이벤트 테이블. 준영 실물 소재 기반.
 *
 * 작업의 90%가 이 파일이다. 엔진은 안 건드려도 된다.
 *
 * eff 축약키: h체력 m멘탈 t입담 w자금 f인맥 r평판
 * 핵심 장치: needs:{wit:N} 으로 "농담으로 넘긴다" 류 선택지를 잠근다.
 *            입담이 낮으면 그 선택지가 아예 안 보인다.
 */

import type { GameEvent } from "../types";

export const EVENTS: GameEvent[] = [
  // ───────────────────────── 유년기 ─────────────────────────
  {
    id: "c_first_joke",
    age: [4, 6],
    force: true,
    rare: true,
    photo: "face_grin",
    text: "준영이 처음으로 사람을 웃겼다. 본인은 뭘 해서 웃긴 건지 전혀 몰랐고, 그래서 같은 걸 열두 번 더 했다.",
    choices: [
      { label: "열세 번째를 한다", text: "열세 번째에 드디어 아무도 안 웃었다. 준영은 그 침묵을 아주 오래 기억했다.", eff: { t: 12, r: -4 }, tone: "rare", flagsAdd: ["웃기는애"] },
      { label: "거기서 멈춘다", text: "멈출 줄 아는 사람이 됐다. 다만 그건 그날 하루뿐이었다.", eff: { t: 7, m: 4 }, flagsAdd: ["웃기는애"] },
    ],
  },
  {
    id: "c_camera",
    age: [6, 11],
    repeat: true,
    cooldown: 3,
    photo: "face_wide",
    text: "카메라가 켜졌다. 준영의 몸이 먼저 반응했다.",
    choices: [
      { label: "렌즈에 얼굴을 밀어 넣는다", text: "코가 화면의 절반을 차지했다. 그 사진은 20년 뒤에도 돌아다닌다.", eff: { t: 8, r: -3, f: 4 }, photo: "face_nose", tone: "good" },
      { label: "평범하게 찍힌다", text: "찍고 보니 준영이 아닌 것 같았다. 다시 찍었다.", eff: { r: 3, t: -2 } },
    ],
    ignore: { text: "셔터가 눌리는 순간 혀를 내밀었다. 반사신경이었다.", eff: { t: 4 }, flagsAdd: ["사진부심"] },
  },
  {
    id: "c_eat_race",
    age: [8, 13],
    repeat: true,
    cooldown: 4,
    text: "누가 더 빨리 먹나 내기가 붙었다. 준영은 내기인 줄도 모르고 이미 절반을 먹었다.",
    choices: [
      {
        label: "끝까지 간다",
        outcomes: [
          { w: 60, text: "이겼다. 상품은 없었고 명예만 있었다. 준영에겐 그거면 충분했다.", eff: { h: -4, r: 8, f: 6 }, photo: "eat_bite", tone: "good" },
          { w: 40, text: "이기긴 했는데 그날 저녁을 못 먹었다.", eff: { h: -9, r: 5 } },
        ],
      },
      { label: "속도를 늦춘다", text: "천천히 먹는 준영은 어딘가 어색했다. 본인도 그걸 느꼈다.", eff: { h: 3, r: -2 } },
    ],
    ignore: { text: "내기가 끝난 줄도 모르고 계속 먹고 있었다.", eff: { h: -2, f: 3 } },
  },

  // ───────────────────────── 학창 시절 ─────────────────────────
  {
    id: "s_class_mic",
    age: [13, 18],
    force: true,
    major: true,
    photo: "day_mic",
    text: "수업 중에 선생님이 자리를 비웠다. 교실이 조용해지자 준영이 일어섰다. 손에는 풀이 들려 있었다.",
    choices: [
      {
        label: "풀을 마이크처럼 잡는다",
        outcomes: [
          { w: 70, text: "교실이 뒤집혔다. 준영은 끝까지 그게 마이크인 척했다. 선생님이 돌아왔을 때도 안 내려놨다.", eff: { t: 16, f: 12, r: -8 }, tone: "rare", flagsAdd: ["교실스타"] },
          { w: 30, text: "하필 그때 선생님이 들어왔다. 풀을 든 채로 복도에 서 있었다.", eff: { t: 10, r: -14, m: -5 }, photo: "face_squint" },
        ],
      },
      { label: "그냥 앉는다", text: "앉고 나서 3초 뒤에 후회했다. 그 3초가 평생 갔다.", eff: { m: -6, t: -4, r: 4 } },
    ],
  },
  {
    id: "s_scolded",
    age: [13, 19],
    repeat: true,
    cooldown: 3,
    text: "혼나는 중이다. 분위기가 아주 무겁고, 준영의 머릿속에는 지금 하면 안 되는 말이 하나 떠올랐다.",
    choices: [
      {
        label: "그 말을 한다",
        needs: { wit: 55 },
        outcomes: [
          { w: 55, text: "혼내던 사람이 먼저 웃었다. 웃고 나서 더 화를 냈지만, 이미 진 뒤였다.", eff: { t: 10, r: 5, m: 8 }, tone: "good", photo: "face_tilt" },
          { w: 45, text: "아무도 안 웃었다. 정적이 길었다. 준영은 그 정적도 농담으로 만들려다 실패했다.", eff: { t: 4, r: -10, m: -8 }, tone: "bad" },
        ],
      },
      { label: "참는다", text: "참았다. 집에 가는 길에 혼자 그 말을 소리 내어 해 봤다. 역시 웃겼다.", eff: { m: -4, t: 3 } },
    ],
    ignore: { text: "참으려다 표정으로 다 티가 났다.", eff: { r: -5, t: 2 } },
  },
  {
    id: "s_friend_sleep",
    age: [14, 25],
    repeat: true,
    cooldown: 6,
    photo: "friend_poke",
    text: "친구가 잠들었다. 아주 깊게 잠들었다. 준영의 손가락이 자동으로 움직였다.",
    choices: [
      { label: "찌른다", text: "찔렀다. 친구는 안 깼다. 준영은 열한 번 더 찔렀고 그제서야 깼다.", eff: { t: 7, f: 5, r: -3 }, tone: "good", flagsAdd: ["장난꾸러기"] },
      { label: "사진만 찍는다", text: "증거를 남겼다. 그 사진은 나중에 아주 유용하게 쓰였다.", eff: { t: 5, f: 3 }, photo: "friend_bed" },
      { label: "이불을 덮어 준다", text: "아무도 안 보는 데서 그랬다. 그게 준영의 진짜 모습이라고, 본인만 모른다.", eff: { m: 10, f: 8 }, tone: "rare" },
    ],
    ignore: { text: "고민하는 사이에 친구가 알아서 깼다.", eff: {} },
  },
  {
    id: "s_exam_night",
    age: [17, 19],
    force: true,
    major: true,
    text: "시험 전날 새벽 두 시. 책은 절반도 못 봤다. 준영은 갑자기 아주 웃긴 생각이 떠올라서 단톡방을 켰다.",
    choices: [
      { label: "단톡방에 푼다", text: "다섯 명이 같이 안 잤다. 전부 같이 망했다. 준영은 그걸 인맥이라고 불렀다.", eff: { t: 12, f: 14, r: -10, h: -6 }, tone: "good", flagsAdd: ["같이망한친구들"] },
      { label: "혼자 참고 공부한다", text: "새벽 네 시에 그 생각이 더 이상 안 웃기다는 걸 깨달았다. 그래서 더 슬펐다.", eff: { r: 10, m: -8, h: -6, t: -3 }, flagsAdd: ["벼락치기"] },
      { label: "그냥 잔다", text: "푹 잤다. 시험장에서 제일 컨디션이 좋았고, 제일 모르는 상태였다.", eff: { h: 6, m: 4, r: -6 } },
    ],
  },

  // ───────── 진로 분기: forceGroup으로 하나만 발동 ─────────
  {
    id: "j_career",
    age: [19, 23],
    force: true,
    forceGroup: "career",
    major: true,
    text: "스물. 뭘로 먹고살지 정해야 한다. 준영에게 사람들이 공통적으로 한 말이 있었다. \"너는 말로 먹고살아라.\" 칭찬인지 아닌지는 끝까지 안 알려줬다.",
    choices: [
      { label: "진짜로 말로 먹고사는 길을 간다", text: "아무도 안 말렸다. 그게 제일 무서웠다.", eff: { t: 20, w: -14, f: 10 }, flagsAdd: ["말로먹고삼"], tone: "rare", photo: "day_mic" },
      { label: "조용히 취업한다", text: "면접에서 농담을 한 번 했다. 그게 붙은 이유인지 떨어질 뻔한 이유인지는 아직도 모른다.", eff: { w: 16, r: 8, t: -4 }, flagsAdd: ["직장인"] },
      { label: "일단 더 배운다", text: "도서관에서도 준영은 웃긴 사람이었다. 조용히 웃기는 기술이 그때 늘었다.", eff: { r: 12, t: 6, w: -12, m: -4 }, flagsAdd: ["진학"] },
    ],
  },

  // ───────────────────────── 성인 ─────────────────────────
  {
    id: "a_home_belly",
    age: [22, 60],
    force: true,
    repeat: true,
    cooldown: 4,
    photo: "home_belly",
    rare: true,
    text: "현관문이 닫혔다. 준영의 손이 자동으로 티셔츠 밑단으로 갔다. 이건 의지의 영역이 아니다.",
    choices: [
      { label: "걷는다", text: "걷었다. 세상이 한결 편해졌다. 이 상태로 상을 차리고, 이 상태로 손님을 맞을 것이다.", eff: { m: 14, h: 4, r: -8 }, tone: "rare", flagsAdd: ["집에서는자유"], photo: "home_stand" },
      { label: "오늘은 참는다", text: "20분 참았다. 20분이 한계였다.", eff: { m: -6, r: 3 } },
    ],
    ignore: { text: "고민할 것도 없었다. 이미 걷혀 있었다.", eff: { m: 10, r: -5 }, flagsAdd: ["집에서는자유"] },
  },
  {
    id: "a_drink_night",
    age: [20, 65],
    repeat: true,
    cooldown: 3,
    weight: 1.6,
    photo: "drink_night",
    text: "술자리가 깊어졌다. 다들 조용해지는 시간인데, 준영은 이 시간에 제일 말이 많아진다.",
    choices: [
      {
        label: "병째로 간다",
        outcomes: [
          { w: 45, text: "전설이 하나 추가됐다. 준영은 그날의 기억이 없고, 나머지 전원은 또렷하다.", eff: { h: -12, f: 14, t: 8, r: -6 }, photo: "drink_bottle", tone: "rare", flagsAdd: ["전설의그날"] },
          { w: 55, text: "다음 날 아침이 아주 길었다. 그래도 단톡방은 어제 일로 하루 종일 돌아갔다.", eff: { h: -14, f: 8, m: -4 }, photo: "drink_high" },
        ],
      },
      { label: "분위기만 띄우고 안 마신다", text: "안 마시고도 제일 시끄러웠다. 이게 준영의 진짜 능력이다.", eff: { t: 10, f: 8, h: 2 }, tone: "good" },
      { label: "먼저 집에 간다", text: "집에 가서 티셔츠를 걷고 혼자 라면을 끓였다. 그것도 나쁘지 않았다.", eff: { h: 5, m: 6, f: -5 }, photo: "eat_ramen" },
    ],
    ignore: { text: "대답을 안 하는 사이에 잔이 채워져 있었다.", eff: { h: -8, f: 4 } },
  },
  {
    id: "a_meeting_joke",
    age: [24, 55],
    requires: ["직장인"],
    repeat: true,
    cooldown: 4,
    text: "회의가 20분째 아무 결론이 없다. 공기가 죽었다. 준영은 이 공기를 살릴 말을 정확히 알고 있다.",
    choices: [
      {
        label: "던진다",
        needs: { wit: 60 },
        outcomes: [
          { w: 60, text: "회의실이 살아났다. 그날 이후로 준영 없는 회의는 아무도 잡지 않았다.", eff: { t: 10, r: 12, f: 10 }, tone: "good", flagsAdd: ["회의실의보물"] },
          { w: 40, text: "부장만 안 웃었다. 하필 그 사람만.", eff: { r: -12, m: -6, t: 4 }, tone: "bad" },
        ],
      },
      { label: "삼킨다", text: "삼켰다. 회의는 40분 더 갔다. 준영은 그 40분을 자기 탓이라고 생각했다.", eff: { m: -8, r: 4 } },
    ],
    ignore: { text: "참는 표정이 너무 티가 나서 옆자리가 먼저 웃었다.", eff: { f: 4, r: -3 } },
  },
  {
    id: "a_gig",
    age: [22, 50],
    requires: ["말로먹고삼"],
    repeat: true,
    cooldown: 2,
    text: "무대가 있고, 사람이 있고, 준영이 있다. 셋 중 둘은 준비가 됐다.",
    choices: [
      {
        label: "준비한 걸 한다",
        outcomes: [
          { w: 50, text: "제대로 터졌다. 끝나고 모르는 사람이 악수를 청했다.", eff: { t: 12, w: 14, r: 14, f: 8 }, tone: "rare", photo: "face_shout" },
          { w: 50, text: "반응이 미지근했다. 집에 오는 길에 전부 다시 복기했다.", eff: { m: -12, t: 6, w: 3 } },
        ],
      },
      {
        label: "즉흥으로 한다",
        needs: { wit: 70 },
        outcomes: [
          { w: 40, text: "준비한 것보다 훨씬 좋았다. 본인도 뭘 한 건지 모른다.", eff: { t: 18, w: 16, r: 16, f: 12 }, tone: "rare", flagsAdd: ["천재소리들음"] },
          { w: 60, text: "즉흥은 즉흥이었다. 무대에서 내려오는 길이 아주 길었다.", eff: { m: -16, r: -10, w: -4 }, tone: "bad" },
        ],
      },
    ],
    ignore: { text: "무대에 올라가서 2초 침묵했다. 그것도 웃겼다는 게 더 억울했다.", eff: { t: 3, m: -5 } },
  },
  {
    id: "a_selfie_legend",
    age: [20, 70],
    repeat: true,
    cooldown: 5,
    weight: 1.3,
    photo: "face_blur",
    text: "단톡방이 조용하다. 준영은 이럴 때 쓰는 사진이 폴더째로 있다.",
    choices: [
      { label: "제일 심한 걸 보낸다", text: "3초 만에 알림이 스무 개 왔다. 준영은 이 맛에 산다.", eff: { t: 8, f: 10, r: -6 }, photo: "face_ceiling", tone: "good" },
      { label: "멀쩡한 걸 보낸다", text: "아무도 반응을 안 했다. 멀쩡한 건 쓸모가 없다는 걸 다시 배웠다.", eff: { f: -3, r: 4 }, photo: "day_calm" },
    ],
    ignore: { text: "고민하는 사이에 다른 사람이 더 심한 걸 올렸다. 준영은 졌다고 인정했다.", eff: { f: 3, t: -2 } },
  },
  {
    id: "a_shades",
    age: [25, 60],
    repeat: true,
    cooldown: 9,
    photo: "day_shades",
    flavor: true,
    text: "준영이 실내에서 선글라스를 썼다. 아무도 왜냐고 묻지 않았다. 물어봤자 더 긴 얘기가 나올 걸 알기 때문이다.",
    eff: { t: 5, r: -4, m: 6 },
  },
  {
    id: "a_health",
    age: [35, 90],
    repeat: true,
    cooldown: 6,
    text: "건강검진 결과지에 빨간 줄이 하나 있었다. 준영은 그걸로 농담을 하나 만들었고, 그 농담을 아무한테도 안 했다.",
    choices: [
      { label: "병원에 간다", text: "일찍 와서 다행이라고 했다. 준영은 의사 앞에서도 한 번 웃겼다. 의사가 웃었다.", eff: { h: 12, w: -8, t: 4 }, tone: "good" },
      {
        label: "농담으로 덮는다",
        needs: { wit: 65 },
        outcomes: [
          { w: 50, text: "다들 웃었고 아무도 더 안 물었다. 준영이 원한 게 정확히 그거였다.", eff: { t: 8, f: 6, h: -10 }, photo: "face_grin" },
          { w: 50, text: "한 명이 안 웃었다. 그 사람이 다음 날 병원 예약을 대신 잡아 줬다.", eff: { h: 8, f: 12, m: 10 }, tone: "rare", flagsAdd: ["끝까지챙겨준사람"] },
        ],
      },
      { label: "서랍에 넣는다", text: "닫았다. 닫히는 소리가 평소보다 크게 들렸다.", eff: { h: -12, m: -5 }, tone: "bad" },
    ],
    ignore: { text: "결과지가 식탁 위에서 일주일을 보냈다.", eff: { h: -7 } },
  },
  {
    id: "a_reunion",
    age: [35, 65],
    requires: ["같이망한친구들"],
    major: true,
    rare: true,
    photo: "friend_shout",
    text: "그때 같이 망한 다섯 명이 십몇 년 만에 모였다. 자리에 앉자마자 누군가 그날 얘기를 꺼냈다.",
    choices: [
      { label: "그날 얘기를 끝까지 한다", text: "네 시간 동안 그 얘기만 했다. 다섯 명 다 처음 듣는 것처럼 웃었다.", eff: { m: 20, f: 16, t: 10 }, tone: "rare", flagsAdd: ["오래간사람들"] },
      { label: "이번엔 남 얘기를 듣는다", text: "준영이 네 시간 동안 듣기만 했다. 아무도 그걸 지적하지 않았다. 그게 더 고마웠다.", eff: { m: 16, f: 20 }, tone: "rare", flagsAdd: ["오래간사람들"] },
    ],
  },

  // ───────────────────────── 위험 ─────────────────────────
  {
    id: "x_night_road",
    age: [20, 70],
    weight: 0.35,
    repeat: true,
    cooldown: 18,
    text: "새벽에 비가 왔다. 신호가 길고, 차도 사람도 없다. 준영은 이미 한 발을 내밀었다.",
    choices: [
      {
        label: "그냥 건넌다",
        outcomes: [
          { w: 90, text: "아무 일도 없었다. 다 건너고 나서 혼자 웃었다.", eff: { m: 4 } },
          { w: 10, text: "헤드라이트가 아주 늦게 보였다.", death: "사고", tone: "bad" },
        ],
      },
      { label: "기다린다", text: "2분을 서서 비를 다 맞았다. 그 2분 동안 농담을 세 개 만들었다.", eff: { h: -2, t: 4 } },
    ],
    ignore: { text: "결국 다 기다렸다.", eff: { h: -2 } },
  },

  // ───────────────────────── 노년 ─────────────────────────
  {
    id: "o_still_funny",
    age: [65, 99],
    repeat: true,
    cooldown: 4,
    photo: "day_thumbs",
    text: "나이가 들어도 준영은 여전히 웃겼다. 다만 웃어 주는 사람의 수가 달라졌다.",
    choices: [
      { label: "그래도 한다", text: "손주가 뒤집어졌다. 준영은 다시 스무 살이 된 것 같았다.", eff: { m: 16, t: 8, h: -2 }, tone: "rare" },
      { label: "조용히 웃는다", text: "말을 안 해도 표정만으로 웃겼다. 그건 평생 연습한 거였다.", eff: { m: 10, t: 4 } },
    ],
    ignore: { text: "타이밍을 놓쳤다. 준영이 타이밍을 놓치는 건 드문 일이다.", eff: { m: -4 } },
  },
  {
    id: "o_album",
    age: [70, 99],
    major: true,
    rare: true,
    photo: "home_smoke",
    text: "서랍에서 오래된 사진 뭉치가 나왔다. 전부 얼굴이 이상하게 나온 것들뿐이었다. 멀쩡한 사진은 한 장도 없었다.",
    choices: [
      { label: "제일 심한 걸 액자에 넣는다", text: "거실 정중앙에 걸었다. 오는 사람마다 그게 뭐냐고 물었고, 준영은 매번 다르게 대답했다.", eff: { m: 22, t: 10 }, tone: "rare", flagsAdd: ["액자"] },
      { label: "전부 다시 넣는다", text: "원래 자리에 똑같이 넣었다. 준영만 아는 자리였다.", eff: { m: 14 } },
    ],
  },
];

/** id로 빠르게 찾기 위한 색인. next 체인에서 쓴다. */
export const EVENT_BY_ID = new Map(EVENTS.map((e) => [e.id, e]));
