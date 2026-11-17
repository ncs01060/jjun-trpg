/** 계절과 시간. 특별한 일이 없는 해에도 뭔가는 지나간다. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const SEASONS: GameEvent[] = [
  { id: "e_newyear", age: [10, 95], repeat: true, cooldown: 6,
    text: "새해다. 준영은 매년 같은 결심을 한다.",
    choices: [
      { label: "올해는 진짜 한다고 한다", text: "작년에도 똑같이 말했다. 그래도 말하는 게 기분은 좋았다.", eff: { m: 8, t: 4 } },
      { label: "결심을 안 한다", text: "안 하는 게 제일 안전하다고 했다.", eff: { m: 5, r: -2 } },
    ],
    ignore: { text: "새해인 줄도 모르고 자고 있었다.", eff: { h: 4, m: 3 } } },
  { id: "e_birthday", age: [8, 95], repeat: true, cooldown: 5,
    text: "생일이다. 단톡방에 축하가 올라왔다.",
    choices: [
      { label: "전부 답장한다", text: "한 명씩 다 다르게 답했다. 두 시간이 걸렸다.", eff: { f: 14, m: 12, t: 6 }, tone: "good" },
      { label: "한 번에 인사한다", text: "\"다들 고마워\" 한 줄로 끝냈다. 그것도 준영다웠다.", eff: { f: 6, m: 8 } },
    ],
    ignore: { text: "알림을 늦게 봤다. 그래도 전부 읽었다.", eff: { m: 6, f: 4 } } },
  { id: "e_hot", age: [8, 95], repeat: true, cooldown: 4, photo: "home_belly",
    text: "너무 덥다. 준영의 대처법은 하나뿐이다.",
    choices: [
      { label: "걷는다", text: "걷었다. 더위가 조금 나아졌다고 주장했다.", eff: { m: 8, h: 2, r: -4 }, tone: "good" },
      { label: "에어컨 앞에 눕는다", text: "두 시간을 안 움직였다.", eff: { h: 4, m: 6, w: -4 }, photo: "home_lie" },
    ] },
  { id: "e_cold", age: [8, 95], repeat: true, cooldown: 4, photo: "prop_hood1",
    text: "너무 춥다. 준영은 후드를 끝까지 조였다.",
    choices: [
      { label: "그대로 걷는다", text: "앞이 안 보이는 채로 걸어갔다. 한 번 부딪혔다.", eff: { t: 8, h: -2, f: 4 }, photo: "prop_hood2" },
      { label: "실내로 들어간다", text: "들어가자마자 녹았다.", eff: { h: 4, w: -3 } },
    ] },
  { id: "e_first_snow", age: [8, 95], repeat: true, cooldown: 7, rare: true,
    text: "첫눈이 왔다. 준영은 창밖을 보고 소리를 질렀다.",
    choices: [
      { label: "나간다", text: "나가서 10분 있다가 들어왔다. 사진은 서른 장 찍었다.", eff: { m: 14, h: -3, t: 6 }, tone: "rare", photo: "face_wide" },
      { label: "창가에서 본다", text: "창가에서 한참 봤다. 아무 말도 안 했다.", eff: { m: 12 }, photo: "day_calm" },
    ] },
  { id: "e_long_day", age: [12, 95], repeat: true, cooldown: 3, weight: 1.2,
    text: "아무 일도 없는 하루다. 준영은 이런 날을 잘 못 견딘다.",
    choices: [
      { label: "누구든 부른다", text: "두 명이 나왔다. 셋이서 별 얘기 없이 네 시간을 보냈다.", eff: { f: 10, m: 10, h: -2 }, tone: "good" },
      { label: "혼자 뭔가 한다", text: "혼자 뭔가 하다가 사진 서른 장을 찍었다.", eff: { m: 8, t: 6 }, photo: "face_tilt" },
      { label: "그냥 잔다", text: "하루 종일 잤다. 일어나니 또 밤이었다.", eff: { h: 8, m: -4 } },
    ],
    ignore: { text: "눈 떠 보니 하루가 끝나 있었다.", eff: { h: 4, m: -3 } } },
  flavor("e_f1", [10, 95], 4, "봄이다. 준영은 괜히 밖에 오래 있었다.", "out_cross", { m: 6, h: 2 }),
  flavor("e_f2", [10, 95], 4, "장마다. 신발이 또 젖었다.", "face_blur", { h: -2, m: 3 }),
  flavor("e_f3", [10, 95], 4, "가을이다. 사진이 유난히 잘 나오는 계절이다.", "day_calm", { m: 6, t: 3 }),
  flavor("e_f4", [10, 95], 5, "해가 짧아졌다. 퇴근길이 벌써 어둡다.", "out_look", { m: 4 }),
  flavor("e_f5", [10, 95], 5, "주말인데 할 게 없어서 세 번 누웠다 일어났다.", "home_lie", { h: 3, m: 3 }),
  flavor("e_f6", [10, 95], 6, "아침에 일어나자마자 거울을 보고 놀랐다.", "face_squash", { t: 5, m: -2 }),
  flavor("e_f7", [10, 95], 6, "하루 종일 비가 왔다. 아무 데도 안 나갔다.", "home_sit", { m: 5, h: 2 }),
  flavor("e_f8", [10, 95], 7, "밤에 괜히 멀리까지 걸었다.", "out_cross2", { m: 7, h: 1 }),
  flavor("e_f9", [12, 95], 7, "달력을 보고 시간이 많이 지났다는 걸 알았다.", "day_face1", { m: 5 }),
  flavor("e_f10", [12, 95], 8, "작년 오늘 찍은 사진이 떴다. 똑같은 표정이었다.", "face_grin", { m: 8, t: 5 }),
];
