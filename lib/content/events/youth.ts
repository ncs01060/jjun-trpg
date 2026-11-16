/** 스무 살 언저리. 뭐든 처음이고 뭐든 과했던 시기. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const YOUTH: GameEvent[] = [
  { id: "y_first_drink", age: [19, 24], force: true, rare: true, photo: "eat_can",
    text: "처음으로 제대로 마셨다. 준영은 자기가 술이 센 줄 알았다.",
    choices: [
      { label: "끝까지 간다", outcomes: [
        { w: 55, text: "안 셌다. 그날 기억은 세 시간이 비어 있다.", eff: { h: -12, f: 12, t: 8 }, tone: "rare", flagsAdd: ["첫술사건"], photo: "fr_lap" },
        { w: 45, text: "의외로 멀쩡했다. 다음 날부터 자신감이 붙었다. 그게 문제였다.", eff: { h: -5, f: 10, m: 8 } },
      ] },
      { label: "적당히 한다", text: "적당히 하고 친구들을 챙겼다. 그날의 어른은 준영이었다.", eff: { f: 14, r: 8, h: -3 }, tone: "good" },
    ] },
  { id: "y_license", age: [19, 28], repeat: true, cooldown: 10, photo: "prop_helmet1",
    text: "면허를 땄다. 첫 주행이다.",
    choices: [
      { label: "바로 멀리 나간다", outcomes: [
        { w: 55, text: "바다까지 갔다. 가서는 아무것도 안 했다.", eff: { m: 16, w: -8, h: -2 }, tone: "rare", photo: "out_sea1" },
        { w: 45, text: "20분 만에 돌아왔다. 손에 땀이 났다.", eff: { m: 6, h: -3 } },
      ] },
      { label: "동네만 돈다", text: "같은 블록을 네 바퀴 돌았다.", eff: { m: 8 } },
    ] },
  { id: "y_broke_young", age: [19, 28], repeat: true, cooldown: 4,
    text: "통장에 남은 게 거의 없다. 월말까지는 아직 멀었다.",
    choices: [
      { label: "라면으로 버틴다", text: "일주일을 라면으로 버텼다. 그 와중에 맛을 다섯 가지로 늘렸다.", eff: { w: 6, h: -6, t: 6 }, photo: "eat_ramen" },
      { label: "친구한테 빌린다", text: "빌렸다. 갚을 때 이자 대신 밥을 샀다.", eff: { w: 4, f: 4, m: -4 } },
      { label: "일을 구한다", text: "급하게 구한 일이 생각보다 괜찮았다.", eff: { w: 12, h: -6, f: 6 } },
    ],
    ignore: { text: "굶다가 결국 뭔가를 먹었다.", eff: { h: -5, w: -3 } } },
  { id: "y_alba", age: [18, 28], repeat: true, cooldown: 4,
    text: "알바 중이다. 손님이 까다롭게 군다.",
    choices: [
      { label: "웃으면서 받아넘긴다", needs: { wit: 50 }, text: "손님이 먼저 멋쩍어했다. 사장이 그 장면을 봤다.", eff: { t: 8, w: 6, r: 8 }, tone: "good" },
      { label: "속으로만 삭인다", text: "삭였다. 퇴근길에 친구한테 세 번 말했다.", eff: { m: -8, w: 5, f: 4 } },
    ],
    ignore: { text: "표정으로 다 티가 났다.", eff: { r: -6, w: 4 } } },
  { id: "y_all_night", age: [18, 30], repeat: true, cooldown: 4, photo: "eat_night",
    text: "밤을 샜다. 할 일이 있어서는 아니었다.",
    choices: [
      { label: "해 뜨는 걸 본다", text: "넷이서 해 뜨는 걸 봤다. 아무도 사진을 안 찍었다. 그게 좋았다.", eff: { m: 16, f: 12, h: -8 }, tone: "rare" },
      { label: "중간에 잔다", text: "혼자 먼저 잤다. 아침에 놀림을 받았다.", eff: { h: 4, f: -3, t: 4 } },
    ] },
  { id: "y_dream", age: [19, 30], repeat: true, cooldown: 8, major: true,
    text: "뭐 하고 싶냐는 질문을 받았다. 준영은 늘 농담으로 넘겨 왔다.",
    choices: [
      { label: "이번엔 진짜로 말한다", text: "말하고 나니 민망했다. 듣던 사람이 진지하게 고개를 끄덕였다.", eff: { m: 16, r: 8, t: -3 }, tone: "rare", flagsAdd: ["진심한번"] },
      { label: "또 농담으로 넘긴다", text: "또 넘겼다. 넘기고 나서 혼자 조용해졌다.", eff: { t: 8, m: -6 } },
    ] },
  { id: "y_travel", age: [19, 32], repeat: true, cooldown: 9, rare: true, photo: "out_sea1",
    text: "갑자기 어딘가로 떠나기로 했다. 계획은 없다.",
    choices: [
      { label: "그냥 간다", text: "표를 끊고 세 시간 뒤에 출발했다. 돌아올 때 사진이 200장이었다.", eff: { m: 18, w: -14, f: 10 }, tone: "rare", flagsAdd: ["무계획여행"], photo: "out_sea3" },
      { label: "다음에 가기로 한다", text: "다음은 꽤 오래 걸렸다.", eff: { w: 6, m: -6 } },
    ] },
  flavor("y_f1", [18, 30], 4, "새벽에 아무 이유 없이 친구를 불러냈다. 나왔다.", "out_cross", { f: 7, h: -3 }),
  flavor("y_f2", [18, 30], 4, "편의점 앞에서 한 시간을 떠들었다.", "eat_can2", { f: 6, t: 4 }),
  flavor("y_f3", [18, 30], 5, "첫 월급으로 산 게 생각보다 쓸모가 없었다.", "day_jacket", { w: -6, m: 6 }),
  flavor("y_f4", [18, 30], 5, "자취방이 처음 생겼다. 첫날 밤은 잠이 안 왔다.", "home_lie", { m: 8 }),
  flavor("y_f5", [18, 30], 6, "혼자 영화를 봤다. 혼자 웃었다.", "dc_laugh", { m: 7, t: 4 }),
  flavor("y_f6", [18, 30], 6, "머리를 잘랐는데 아무도 못 알아봤다.", "prop_hair", { m: -3, t: 4 }),
  flavor("y_f7", [18, 30], 7, "계단을 두 칸씩 올라갔다. 그럴 나이였다.", "out_stair", { h: 3, m: 4 }),
  flavor("y_f8", [18, 30], 7, "뛰는 걸 처음 봤다는 말을 들었다.", "out_run", { h: 4, t: 5 }),
  flavor("y_f9", [18, 30], 8, "축구 유니폼 뒤에 자기 이름을 새겼다.", "day_uni1", { m: 8, w: -5 }),
  flavor("y_f10", [18, 30], 8, "그 유니폼을 1년 내내 입었다.", "day_uni2", { m: 5 }),
];
