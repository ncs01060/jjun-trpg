/** 진로 19~25세. forceGroup으로 하나의 길만 열린다. */
import type { GameEvent } from "../../types";

export const CAREER: GameEvent[] = [
  {
    id: "j_career", age: [19, 23], force: true, forceGroup: "career", major: true,
    text: "스물. 뭘로 먹고살지 정해야 한다. 준영에게 사람들이 공통적으로 한 말이 있었다. \"너는 말로 먹고살아라.\" 칭찬인지 아닌지는 끝까지 안 알려줬다.",
    choices: [
      { label: "진짜로 말로 먹고사는 길을 간다", text: "아무도 안 말렸다. 그게 제일 무서웠다.", eff: { t: 20, w: -14, f: 10 }, flagsAdd: ["말로먹고삼"], tone: "rare", photo: "prop_mic" },
      { label: "조용히 취업한다", text: "면접에서 농담을 한 번 했다. 그게 붙은 이유인지 떨어질 뻔한 이유인지는 아직도 모른다.", eff: { w: 16, r: 8, t: -4 }, flagsAdd: ["직장인"], photo: "day_suit" },
      { label: "일단 더 배운다", text: "도서관에서도 준영은 웃긴 사람이었다. 조용히 웃기는 기술이 그때 늘었다.", eff: { r: 12, t: 6, w: -12, m: -4 }, flagsAdd: ["진학"] },
      { label: "아무것도 안 정한다", text: "정하지 않는 것도 정한 것이라고 했다. 아무도 동의하지 않았다.", eff: { m: 8, w: -8, r: -8 }, flagsAdd: ["백수"] },
    ],
  },
  { id: "j_suit_first", age: [20, 26], requires: ["직장인"], photo: "day_suit",
    text: "처음으로 정장을 샀다. 입고 거울 앞에 20분 서 있었다.",
    choices: [
      { label: "사진을 찍어 보낸다", text: "단톡방이 난리가 났다. 전부 놀렸지만 전부 저장했다.", eff: { f: 10, m: 8, t: 6 }, tone: "good", photo: "day_bed" },
      { label: "혼자 본다", text: "혼자 보고 혼자 만족했다.", eff: { m: 10, r: 4 } },
    ] },
  { id: "j_interview", age: [20, 28], repeat: true, cooldown: 3,
    text: "면접장이다. 분위기가 딱딱하고, 준영의 머릿속에 또 그 말이 떠올랐다.",
    choices: [
      { label: "농담을 한다", needs: { wit: 60 }, outcomes: [
        { w: 45, text: "면접관이 웃었다. 그 자리에서 붙었다.", eff: { w: 14, r: 12, t: 8 }, tone: "rare", flagsAdd: ["면접전설"] },
        { w: 55, text: "아무도 안 웃었다. 그 침묵이 면접보다 길었다.", eff: { r: -10, m: -10 }, tone: "bad" },
      ] },
      { label: "준비한 대로 말한다", text: "무난했다. 무난한 준영은 기억에 안 남는다.", eff: { r: 6, w: 4 } },
    ],
    ignore: { text: "질문을 못 알아들은 척했다.", eff: { r: -6 } } },
  { id: "j_first_pay", age: [20, 30], requires: ["직장인"], force: true, rare: true,
    text: "첫 월급이 들어왔다. 준영은 통장을 열어 보고 한참 들여다봤다.",
    choices: [
      { label: "부모님 선물을 산다", text: "돈이 거의 안 남았다. 그래도 그날이 제일 기분 좋았다고 한다.", eff: { w: -12, m: 18, r: 8 }, tone: "rare", flagsAdd: ["효도한번"] },
      { label: "친구들한테 쏜다", text: "그날 밤 전설이 하나 생겼다.", eff: { w: -14, f: 18, t: 6 }, tone: "good", photo: "eat_night" },
      { label: "전부 모은다", text: "모았다. 일주일 뒤에 절반을 썼다.", eff: { w: 10, m: 3 } },
    ] },
  { id: "j_quit_think", age: [23, 45], requires: ["직장인"], repeat: true, cooldown: 5, major: true,
    text: "그만두고 싶다는 생각이 들었다. 이번이 처음은 아니다.",
    choices: [
      { label: "진짜 그만둔다", text: "나오는 날 아무도 안 말렸다. 그게 제일 서운했다고 한다.", eff: { w: -16, m: 12, r: -6 }, flagsRemove: ["직장인"], flagsAdd: ["백수"], tone: "rare" },
      { label: "일단 버틴다", text: "버텼다. 버틴 날들이 쌓여서 경력이 됐다.", eff: { w: 8, m: -8, r: 6 } },
      { label: "농담으로 넘긴다", needs: { wit: 55 }, text: "\"그만둘 거면 오늘 점심은 비싼 거 먹어야지\"라고 했다. 그 말에 본인이 먼저 웃었고, 그래서 하루 더 다녔다.", eff: { t: 8, m: 6, w: -3 } },
    ] },
  { id: "j_jobless", age: [21, 40], requires: ["백수"], repeat: true, cooldown: 3,
    text: "오늘도 특별한 일정이 없다. 준영은 그걸 자유라고 부르기로 했다.",
    choices: [
      { label: "뭐라도 한다", outcomes: [
        { w: 45, text: "의외의 일이 들어왔다. 말로 먹고사는 쪽이었다.", eff: { w: 12, t: 8, f: 6 }, tone: "good", flagsAdd: ["말로먹고삼"], flagsRemove: ["백수"] },
        { w: 55, text: "하루 종일 뭔가 하긴 했는데 돈은 안 됐다.", eff: { m: 5, w: -4 } },
      ] },
      { label: "오늘은 쉰다", text: "쉬는 것도 잘하는 사람이 있다.", eff: { h: 6, m: 6, w: -3 } },
    ],
    ignore: { text: "눈 떠 보니 저녁이었다.", eff: { h: 3, r: -4 } } },
  { id: "j_study_room", age: [20, 26], requires: ["진학"], repeat: true, cooldown: 3, flavor: true,
    text: "도서관 자리를 하나 정해 두고 매일 같은 자리에 앉았다. 옆자리 사람과 눈인사만 1년을 했다.", eff: { r: 6, m: -2 } },
  { id: "j_gig_first", age: [20, 30], requires: ["말로먹고삼"], force: true, rare: true, photo: "kara_mic",
    text: "처음으로 사람들 앞에 섰다. 교실도 단톡방도 아닌, 진짜 무대였다.",
    choices: [
      { label: "준비한 걸 한다", outcomes: [
        { w: 50, text: "터졌다. 끝나고 모르는 사람이 악수를 청했다.", eff: { t: 14, w: 12, r: 14 }, tone: "rare" },
        { w: 50, text: "미지근했다. 집에 오는 길에 전부 복기했다.", eff: { m: -12, t: 6 } },
      ] },
      { label: "즉흥으로 한다", needs: { wit: 70 }, outcomes: [
        { w: 40, text: "준비한 것보다 훨씬 좋았다. 본인도 뭘 한 건지 모른다.", eff: { t: 18, w: 14, r: 16 }, tone: "rare", flagsAdd: ["천재소리들음"] },
        { w: 60, text: "즉흥은 즉흥이었다. 무대에서 내려오는 길이 아주 길었다.", eff: { m: -16, r: -10 }, tone: "bad" },
      ] },
    ] },
  { id: "j_uniform_work", age: [20, 35], repeat: true, cooldown: 6, flavor: true, photo: "day_uni3",
    text: "작업복이든 유니폼이든, 입으면 일단 사진부터 찍는다.", eff: { t: 4, f: 3 } },
  { id: "j_commute", age: [21, 55], requires: ["직장인"], repeat: true, cooldown: 2, flavor: true, photo: "day_face6",
    text: "출근길 버스 창에 비친 얼굴을 한참 봤다. 그러다 표정을 만들어 봤다.", eff: { m: 3, t: 3 } },
  { id: "j_boss", age: [22, 50], requires: ["직장인"], repeat: true, cooldown: 4,
    text: "상사가 커피를 사 주겠다고 했다. 좋은 신호일 수도, 아주 나쁜 신호일 수도 있다.",
    choices: [
      { label: "따라간다", outcomes: [
        { w: 50, text: "맡아 줄 사람이 필요하다고 했다. 준영은 알겠다고 했다.", eff: { w: 12, r: 8, h: -6 }, tone: "good" },
        { w: 50, text: "그 얘기였다. 커피는 맛있었다.", eff: { m: -10, w: -4 }, tone: "bad" },
      ] },
      { label: "바쁘다고 한다", text: "그 뒤로 한동안 아무 얘기도 없었다.", eff: { r: -5, m: 3 } },
    ],
    ignore: { text: "대답을 안 했더니 혼자 다녀왔다.", eff: { r: -4 } } },
  { id: "j_overtime", age: [22, 50], requires: ["직장인"], repeat: true, cooldown: 2, flavor: true,
    text: "야근이다. 사무실에 혼자 남아 혼잣말을 했다. 그 혼잣말이 꽤 재밌었다.", eff: { w: 5, h: -5, m: -3, t: 2 } },
  { id: "j_side", age: [24, 45], repeat: true, cooldown: 6,
    text: "부업 얘기가 들어왔다. 말을 많이 해야 하는 일이라고 했다.",
    choices: [
      { label: "한다", needs: { wit: 55 }, outcomes: [
        { w: 55, text: "적성에 맞았다. 본업보다 재밌었다.", eff: { w: 14, t: 10, h: -5 }, tone: "good" },
        { w: 45, text: "말은 많이 했는데 돈은 적었다.", eff: { w: 4, h: -8, m: -5 } },
      ] },
      { label: "안 한다", text: "거절하고 나서 일주일 동안 생각했다.", eff: { m: -4, h: 4 } },
    ] },
  { id: "j_meeting_joke", age: [23, 55], requires: ["직장인"], repeat: true, cooldown: 4,
    text: "회의가 20분째 아무 결론이 없다. 공기가 죽었다. 준영은 이 공기를 살릴 말을 정확히 알고 있다.",
    choices: [
      { label: "던진다", needs: { wit: 60 }, outcomes: [
        { w: 60, text: "회의실이 살아났다. 그날 이후로 준영 없는 회의는 아무도 잡지 않았다.", eff: { t: 10, r: 12, f: 10 }, tone: "good", flagsAdd: ["회의실의보물"] },
        { w: 40, text: "부장만 안 웃었다. 하필 그 사람만.", eff: { r: -12, m: -6, t: 4 }, tone: "bad" },
      ] },
      { label: "삼킨다", text: "삼켰다. 회의는 40분 더 갔다. 준영은 그 40분을 자기 탓이라고 생각했다.", eff: { m: -8, r: 4 } },
    ],
    ignore: { text: "참는 표정이 너무 티가 나서 옆자리가 먼저 웃었다.", eff: { f: 4, r: -3 } } },
  { id: "j_promo", age: [26, 50], requires: ["직장인"], repeat: true, cooldown: 8, rare: true,
    text: "승진 얘기가 나왔다. 준영 이름이 거기 있었다.",
    choices: [
      { label: "받는다", text: "명함이 바뀌었다. 책임도 같이 바뀌었다.", eff: { w: 18, r: 14, h: -8, m: -4 }, flagsAdd: ["직책"] },
      { label: "사양한다", text: "지금이 좋다고 했다. 사람들은 이해를 못 했고 준영은 설명을 안 했다.", eff: { m: 12, w: -4, r: -6 } },
    ] },
  { id: "j_teach", age: [30, 60], requires: ["말로먹고삼"], repeat: true, cooldown: 6,
    text: "가르쳐 달라는 사람이 생겼다. 준영은 가르칠 게 있다고 생각해 본 적이 없었다.",
    choices: [
      { label: "가르친다", text: "가르치면서 본인이 더 배웠다.", eff: { t: 10, r: 10, f: 8, m: 8 }, tone: "rare", flagsAdd: ["제자"] },
      { label: "그냥 같이 논다", text: "가르치진 않았는데 그 사람이 제일 많이 늘었다.", eff: { f: 12, t: 6 } },
    ] },
  { id: "j_award", age: [25, 60], requires: ["말로먹고삼"], repeat: true, cooldown: 10, rare: true,
    text: "상 비슷한 걸 받게 됐다. 소감을 말해 달라고 했다.",
    choices: [
      { label: "웃긴다", text: "시상식이 공연이 됐다. 그 영상이 제일 많이 돌았다.", eff: { t: 16, r: 14, f: 10 }, tone: "rare", photo: "face_yell" },
      { label: "고맙다고만 한다", text: "딱 한 줄이었다. 그게 오히려 오래 기억됐다.", eff: { r: 12, m: 12 } },
    ] },
  { id: "j_broke", age: [21, 45], repeat: true, cooldown: 5, needs: { money: 1 },
    text: "통장을 봤다. 생각보다 적었다. 생각보다 많이 적었다.",
    choices: [
      { label: "아끼기로 한다", text: "그날 저녁은 집에서 라면이었다.", eff: { w: 6, h: -3, m: -3 }, photo: "eat_ramen" },
      { label: "일단 먹고 생각한다", text: "먹고 나니 더 생각이 안 났다.", eff: { w: -8, h: 4, m: 6 } },
    ],
    ignore: { text: "앱을 껐다.", eff: { m: -4 } } },
  { id: "j_debt", age: [22, 55], requires: ["빚"], repeat: true, cooldown: 3,
    text: "모르는 번호로 전화가 왔다. 준영은 화면을 한참 보다가 뒤집어 놨다.",
    choices: [
      { label: "받는다", text: "생각보다 정중했다. 그게 더 무서웠다.", eff: { m: -8, w: -6 } },
      { label: "안 받는다", text: "진동이 서른 번쯤 울리고 멈췄다.", eff: { m: -12, r: -4 } },
    ],
    ignore: { text: "진동이 멈출 때까지 가만히 있었다.", eff: { m: -6 } } },
  { id: "j_scam", age: [23, 55], needs: { money: 35 }, repeat: true, cooldown: 8, rare: true,
    text: "친구가 확실한 게 있다고 했다. 준영은 그 '확실한'이라는 단어를 전에도 들은 적이 있다.",
    choices: [
      { label: "넣는다", needs: { money: 40 }, outcomes: [
        { w: 30, text: "진짜였다. 그날 준영은 처음으로 택시를 타고 집에 갔다.", eff: { w: 32, f: 6 }, tone: "rare", flagsAdd: ["한몫"] },
        { w: 70, text: "연락이 끊겼다. 화를 내지도 않았다. 그게 더 안 좋아 보였다.", eff: { w: -26, m: -12, f: -8 }, tone: "bad", flagsAdd: ["빚"] },
      ] },
      { label: "안 넣는다", text: "몇 달 뒤 그 친구 소식을 들었다. 안 넣은 게 맞았다.", eff: { m: 6, f: -4 } },
    ],
    ignore: { text: "대답을 미루는 동안 기회가 지나갔다.", eff: {} } },
];
