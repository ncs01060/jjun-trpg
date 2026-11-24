/** 술자리. 준영이 제일 말이 많아지는 시간. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const DRINK: GameEvent[] = [
  { id: "d_main", age: [20, 75], repeat: true, cooldown: 2, weight: 1.6, photo: "eat_night",
    text: "술자리가 깊어졌다. 다들 조용해지는 시간인데, 준영은 이 시간에 제일 말이 많아진다.",
    choices: [
      { label: "병째로 간다", outcomes: [
        { w: 45, text: "전설이 하나 추가됐다. 준영은 그날의 기억이 없고, 나머지 전원은 또렷하다.", eff: { h: -12, f: 14, t: 8, r: -6 }, photo: "eat_bottle", tone: "rare", flagsAdd: ["전설의그날"] },
        { w: 55, text: "다음 날 아침이 아주 길었다. 그래도 단톡방은 어제 일로 하루 종일 돌아갔다.", eff: { h: -14, f: 8, m: -4 }, photo: "home_drink" },
      ] },
      { label: "분위기만 띄우고 안 마신다", text: "안 마시고도 제일 시끄러웠다. 이게 준영의 진짜 능력이다.", eff: { t: 10, f: 8, h: 2 }, tone: "good" },
      { label: "먼저 집에 간다", text: "집에 가서 티셔츠를 걷고 혼자 라면을 끓였다. 그것도 나쁘지 않았다.", eff: { h: 5, m: 6, f: -5 }, photo: "eat_ramen" },
    ],
    ignore: { text: "대답을 안 하는 사이에 잔이 채워져 있었다.", eff: { h: -8, f: 4 } } },
  { id: "d_speech", age: [20, 75], repeat: true, cooldown: 4,
    text: "누가 준영에게 한마디 하라고 했다. 술자리에서 이건 위험한 요청이다.",
    choices: [
      { label: "진심을 말한다", needs: { wit: 40 }, outcomes: [
        { w: 50, text: "술자리가 조용해졌다. 좋은 쪽으로 조용해졌다.", eff: { m: 14, f: 14, r: 8 }, tone: "rare" },
        { w: 50, text: "말이 길어졌다. 중간부터 아무도 안 들었다.", eff: { m: -6, f: 4, t: 4 } },
      ] },
      { label: "웃긴다", text: "전부 웃었다. 준영은 안전한 쪽을 골랐다.", eff: { t: 10, f: 10 }, tone: "good" },
    ],
    ignore: { text: "잔만 들고 앉았다.", eff: { f: 3 } } },
  { id: "d_next", age: [20, 70], repeat: true, cooldown: 3,
    text: "2차 얘기가 나왔다. 준영은 이미 일어서 있었다.",
    choices: [
      { label: "끝까지 간다", outcomes: [
        { w: 50, text: "4차까지 갔다. 마지막엔 두 명 남았다.", eff: { h: -14, f: 12, w: -10, t: 6 }, photo: "eat_night" },
        { w: 50, text: "3차에서 뻗었다. 사진이 남았다.", eff: { h: -12, f: 8, r: -5 }, photo: "fr_lap" },
      ] },
      { label: "여기서 끊는다", text: "끊는 것도 능력이다. 준영은 그 능력을 그날 처음 썼다.", eff: { h: 6, m: 5, f: -4 } },
    ],
    ignore: { text: "따라가다가 중간에 집으로 꺾었다.", eff: { h: 3, f: -2 } } },
  { id: "d_hangover", age: [20, 75], repeat: true, cooldown: 3,
    text: "아침이다. 어제 기억이 군데군데 비어 있다.",
    choices: [
      { label: "단톡방을 확인한다", outcomes: [
        { w: 55, text: "사진이 열두 장 올라와 있었다. 전부 준영이었다.", eff: { m: -6, f: 10, t: 6 }, photo: "meme_kakao", tone: "good" },
        { w: 45, text: "읽고 바로 껐다. 다시 켜기까지 두 시간이 걸렸다.", eff: { m: -12, f: 6 } },
      ] },
      { label: "안 본다", text: "안 보면 없던 일이 된다고 믿었다. 아니었다.", eff: { m: -4, h: 3 } },
    ],
    ignore: { text: "알림을 끄고 다시 잤다.", eff: { h: 5, m: -3 } } },
  { id: "d_pour", age: [20, 75], repeat: true, cooldown: 5, photo: "eat_can",
    text: "잔이 비었다. 준영이 그걸 제일 먼저 봤다.",
    choices: [
      { label: "채워 준다", text: "모두의 잔을 채우고 자기 잔은 마지막이었다.", eff: { f: 10, r: 6 }, tone: "good" },
      { label: "자기 것부터 채운다", text: "정직했다. 정직한 게 늘 좋은 건 아니다.", eff: { h: -4, t: 5, r: -3 } },
    ] },
  { id: "d_sober", age: [25, 80], repeat: true, cooldown: 8, rare: true,
    text: "오늘은 안 마시겠다고 했다. 다들 믿지 않았다.",
    choices: [
      { label: "진짜 안 마신다", text: "진짜 안 마셨다. 그런데도 제일 시끄러웠다.", eff: { h: 10, t: 8, f: 6 }, tone: "rare", flagsAdd: ["안마셔도시끄러움"] },
      { label: "한 잔만 한다", text: "한 잔이 여섯 잔이 됐다.", eff: { h: -10, f: 8, t: 5 } },
    ] },
  flavor("d_f1", [20, 80], 4, "잔은 처음부터 없었다.", "eat_bottle", { h: -5, t: 5 }),
  flavor("d_f2", [20, 80], 3, "길에서 캔을 땄다. 그 자리에서 다 마셨다.", "eat_can2", { h: -3, t: 4 }),
  flavor("d_f3", [20, 80], 4, "다 마시고 또 사러 갔다.", "eat_can3", { h: -4, w: -3 }),
  flavor("d_f4", [20, 80], 5, "원샷이라고 외치고 본인만 원샷했다.", "eat_can", { h: -4, t: 5 }),
  flavor("d_f5", [22, 80], 5, "집에서 마시는 게 제일 맛있다고 했다.", "home_drink", { m: 7, h: -3 }),
  flavor("d_f6", [20, 80], 6, "안주가 떨어졌는데 아무도 안 일어났다. 준영이 일어났다.", "home_stand", { f: 5, m: 3 }),
  flavor("d_f7", [20, 80], 6, "그날은 아무도 집에 안 갔다.", "eat_night", { f: 7, h: -5 }),
  flavor("d_f8", [20, 80], 7, "조용할 때도 있다. 아주 가끔.", "eat_dark", { m: 6 }),
  flavor("d_f9", [22, 80], 7, "화면을 켜 놓고 마셨다. 상대는 자고 있었다.", "dc_drink", { t: 6, f: 3 }),
  flavor("d_f10", [20, 80], 8, "술자리에서 한 약속은 전부 지켰다. 그게 더 이상했다.", "eat_laugh", { f: 8, r: 5 }),
];
