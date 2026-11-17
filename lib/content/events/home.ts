/** 집. 티셔츠를 걷는 순간부터가 집이다. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const HOME: GameEvent[] = [
  { id: "h_belly", age: [20, 70], force: true, repeat: true, cooldown: 4, rare: true, photo: "home_belly",
    text: "현관문이 닫혔다. 준영의 손이 자동으로 티셔츠 밑단으로 갔다. 이건 의지의 영역이 아니다.",
    choices: [
      { label: "걷는다", text: "걷었다. 세상이 한결 편해졌다. 이 상태로 상을 차리고, 이 상태로 손님을 맞을 것이다.", eff: { m: 14, h: 4, r: -8 }, tone: "rare", flagsAdd: ["집에서는자유"], photo: "home_stand" },
      { label: "오늘은 참는다", text: "20분 참았다. 20분이 한계였다.", eff: { m: -6, r: 3 } },
    ],
    ignore: { text: "고민할 것도 없었다. 이미 걷혀 있었다.", eff: { m: 10, r: -5 }, flagsAdd: ["집에서는자유"] } },
  { id: "h_guest", age: [22, 70], repeat: true, cooldown: 5, requires: ["집에서는자유"],
    text: "손님이 왔다. 준영의 복장은 평소와 같았다.",
    choices: [
      { label: "그대로 맞는다", text: "손님이 더 당황했다. 준영은 전혀 당황하지 않았다.", eff: { t: 12, f: 8, r: -8 }, tone: "good", photo: "home_sit" },
      { label: "급히 내린다", text: "내리긴 했는데 이미 봤다.", eff: { r: 4, t: 5 } },
    ],
    ignore: { text: "문을 열고 나서야 알아차렸다.", eff: { r: -6, t: 8, f: 5 } } },
  { id: "h_clean", age: [20, 80], repeat: true, cooldown: 6,
    text: "방이 한계에 도달했다. 준영도 그걸 인정했다.",
    choices: [
      { label: "치운다", outcomes: [
        { w: 50, text: "두 시간 만에 다른 방이 됐다. 사진을 찍어 올렸다.", eff: { m: 12, h: 4, r: 6 }, tone: "good", photo: "home_pose" },
        { w: 50, text: "치우다가 옛날 물건이 나와서 세 시간을 봤다.", eff: { m: 8, h: -2, t: 4 } },
      ] },
      { label: "내일 한다", text: "내일도 같은 말을 했다.", eff: { m: 3, r: -4 } },
    ] },
  { id: "h_alone", age: [22, 90], repeat: true, cooldown: 5,
    text: "집에 혼자다. 준영은 혼자일 때도 소리를 낸다.",
    choices: [
      { label: "혼자 떠든다", text: "혼잣말이 30분 갔다. 본인이 본인 말에 웃었다.", eff: { m: 12, t: 6 }, tone: "good" },
      { label: "조용히 있는다", text: "조용한 준영은 본인도 어색해했다.", eff: { m: 6, h: 3 }, photo: "day_calm" },
    ] },
  { id: "h_pajama", age: [20, 80], repeat: true, cooldown: 7, photo: "home_pajama",
    text: "편한 바지를 입었다. 그 상태로 편의점에 가려 한다.",
    choices: [
      { label: "그대로 나간다", text: "나갔다. 아는 사람을 만났다. 그래도 당당했다.", eff: { t: 10, r: -8, m: 8 }, tone: "good" },
      { label: "갈아입는다", text: "갈아입는 데 5분, 갔다 오는 데 3분이었다.", eff: { r: 4, m: -2 } },
    ] },
  { id: "h_lie", age: [20, 90], repeat: true, cooldown: 4, flavor: true, photo: "home_lie",
    text: "눕는다고 했는데 그대로 잠들었다. 불도 안 끄고.", eff: { h: 3, m: 4 } },
  flavor("h_f1", [20, 80], 5, "상 차리는 중. 복장은 저게 맞다.", "home_stand", { m: 5, f: 3 }),
  flavor("h_f2", [20, 80], 6, "본인은 이게 멋있다고 생각한다.", "home_smoke", { t: 6, r: -3 }),
  flavor("h_f3", [20, 80], 5, "앉아 있는 자세가 저렇다. 지적해도 안 고친다.", "home_sit", { m: 5 }),
  flavor("h_f4", [18, 80], 6, "책장 앞이 준영의 전용 촬영장이다. 각도까지 정해져 있다.", "home_pose", { t: 5 }),
  flavor("h_f5", [18, 80], 7, "같은 자리에서 또 찍었다. 포즈만 바뀌었다.", "home_pose2", { t: 4 }),
  flavor("h_f6", [20, 80], 6, "이 손 모양에도 뜻이 있다고 했다. 뜻은 안 알려줬다.", "home_hand", { t: 5 }),
  flavor("h_f7", [20, 80], 8, "집에 오자마자 누웠다. 그 상태로 저녁을 먹었다.", "home_lie", { h: 2, m: 5 }),
  flavor("h_f8", [22, 80], 9, "혼자 끓인 라면이 제일 맛있다고 했다.", "eat_ramen", { m: 7, h: 1 }),
];
