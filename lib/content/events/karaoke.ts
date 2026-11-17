/** 노래방. 준영이 제일 오래 머무는 무대. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const KARAOKE: GameEvent[] = [
  { id: "k_main", age: [16, 70], repeat: true, cooldown: 2, weight: 1.5, photo: "kara_mic",
    text: "노래방이다. 마이크가 두 개인데 준영이 둘 다 들고 있다.",
    choices: [
      { label: "끝까지 안 놓는다", outcomes: [
        { w: 50, text: "두 시간을 혼자 불렀다. 친구들은 그걸 평생 얘기한다.", eff: { t: 12, f: 10, h: -5 }, tone: "good", photo: "kara_hold" },
        { w: 50, text: "목이 나갔다. 다음 곡부터 목소리가 안 나왔다.", eff: { h: -10, t: 8, f: 6 }, photo: "kara_close" },
      ] },
      { label: "한 개는 넘긴다", text: "넘기고 나서도 옆에서 같이 불렀다. 결국 둘 다 준영 거였다.", eff: { f: 10, t: 6 } },
      { label: "탬버린만 친다", text: "탬버린으로도 분위기를 다 잡았다. 이게 진짜 실력이다.", eff: { t: 10, f: 8, h: -2 }, tone: "good" },
    ],
    ignore: { text: "고민하는 사이에 다음 곡이 예약됐다. 준영 노래였다.", eff: { t: 4, f: 4 } } },
  { id: "k_wrong", age: [16, 70], repeat: true, cooldown: 3, photo: "kara_floor",
    text: "첫 소절부터 틀렸다. 준영은 멈추지 않았다.",
    choices: [
      { label: "끝까지 간다", text: "틀린 채로 끝까지 갔다. 점수는 바닥이었고 반응은 최고였다.", eff: { t: 10, f: 8, r: -4 }, tone: "good" },
      { label: "다시 튼다", text: "두 번째도 똑같이 틀렸다.", eff: { t: 6, h: -2 } },
    ],
    ignore: { text: "틀린 줄도 모르고 계속 불렀다.", eff: { t: 5, f: 4 } } },
  { id: "k_duet", age: [16, 70], repeat: true, cooldown: 4, photo: "kara_point",
    text: "듀엣 곡이 나왔다. 준영이 상대 파트까지 전부 불렀다.",
    choices: [
      { label: "상대 파트도 부른다", text: "같이 부르려던 사람이 마이크를 든 채로 서 있었다.", eff: { t: 10, f: -3, r: -3 }, tone: "good" },
      { label: "넘겨준다", text: "넘겨주고 뒤에서 춤을 췄다. 그게 더 웃겼다.", eff: { t: 8, f: 10 }, tone: "good" },
    ] },
  { id: "k_score", age: [16, 70], repeat: true, cooldown: 3,
    text: "점수가 떴다. 준영은 숫자를 보기도 전에 반응할 준비를 하고 있었다.",
    choices: [
      { label: "100점인 척 세리머니를 한다", text: "실제로는 58점이었다. 세리머니가 더 길었다.", eff: { t: 12, f: 8 }, tone: "good", photo: "kara_eyes" },
      { label: "조용히 다음 곡을 넣는다", text: "조용한 준영은 더 무섭다.", eff: { t: 4, m: 3 } },
    ],
    ignore: { text: "점수가 뜨기 전에 다음 곡을 예약했다.", eff: { t: 4 } } },
  { id: "k_last", age: [16, 70], repeat: true, cooldown: 5, photo: "kara_last",
    text: "\"이게 마지막 곡\"이라고 했다. 세 번째 마지막 곡이었다.",
    choices: [
      { label: "진짜 마지막으로 한다", text: "끝나고 서비스 시간이 들어왔다. 마지막은 또 미뤄졌다.", eff: { t: 8, f: 6, h: -4 } },
      { label: "진짜로 나간다", text: "나가면서도 복도에서 흥얼거렸다.", eff: { m: 6, h: 3 } },
    ] },
  { id: "k_alone", age: [18, 80], repeat: true, cooldown: 8, rare: true, photo: "kara_wall",
    text: "혼자 노래방에 갔다. 아무도 없는데 준영은 똑같이 했다.",
    choices: [
      { label: "똑같이 한다", text: "아무도 안 보는데 세리머니까지 했다. 이게 진짜 준영이다.", eff: { m: 14, t: 8 }, tone: "rare" },
      { label: "조용히 부른다", text: "혼자일 때 부르는 노래는 좀 달랐다.", eff: { m: 12 }, photo: "kara_eyes" },
    ] },
  { id: "k_request", age: [20, 80], repeat: true, cooldown: 6,
    text: "누가 준영에게 그 노래를 불러 달라고 했다. 준영의 노래가 있다는 뜻이다.",
    choices: [
      { label: "부른다", text: "부르자 다들 따라 불렀다. 그게 준영의 노래가 된 순간이었다.", eff: { t: 10, f: 14, m: 10 }, tone: "rare", flagsAdd: ["준영의노래"] },
      { label: "빼다가 부른다", text: "세 번 빼고 불렀다. 뺀 시간이 노래보다 길었다.", eff: { t: 8, f: 8 } },
    ] },
  flavor("k_f1", [16, 75], 4, "노래방 조명이 돌아가기 시작하면 준영의 표정도 같이 돌아간다.", "kara_light"),
  flavor("k_f2", [16, 75], 5, "문을 열어 두고 불렀다. 복도까지 들렸다.", "kara_door"),
  flavor("k_f3", [16, 75], 5, "감정이 들어갔다. 가사는 틀린 채였다.", "kara_eyes"),
  flavor("k_f4", [16, 75], 6, "앉아서 부르는 자세를 개발했다. 본인만 편하다고 했다.", "kara_sit"),
  flavor("k_f5", [16, 75], 6, "아무도 안 보는데 혼자 진심이었다.", "kara_far"),
  flavor("k_f6", [16, 75], 7, "예약 목록에 준영 이름으로 아홉 곡이 들어가 있었다.", "kara_mic", { t: 5, f: 2 }),
  flavor("k_f7", [16, 75], 7, "탬버린이 부서졌다. 아무도 놀라지 않았다.", "kara_point", { t: 6, w: -2 }),
  flavor("k_f8", [16, 75], 8, "노래방에서 나왔는데 목소리가 반만 남아 있었다.", "kara_close", { h: -4, t: 4 }),
  flavor("k_f9", [20, 80], 9, "오랜만에 그 노래가 나왔다. 준영은 첫 음에 바로 알아들었다.", "kara_hold", { m: 8, t: 4 }),
  flavor("k_f10", [16, 75], 6, "간주 중에 혼자 멘트를 했다. 멘트가 간주보다 길었다.", "kara_point"),
];
