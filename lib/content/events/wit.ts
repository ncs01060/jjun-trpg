/** 입담. 준영의 주특기이자 이 게임의 중심. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const WIT: GameEvent[] = [
  { id: "w_silence", age: [12, 90], repeat: true, cooldown: 3, weight: 1.3,
    text: "자리에 정적이 흘렀다. 다들 폰만 보고 있다. 준영은 이 공기를 못 견딘다.",
    choices: [
      { label: "아무 말이나 던진다", needs: { wit: 45 }, outcomes: [
        { w: 60, text: "아무 말이었는데 터졌다. 준영 본인도 왜 웃긴지 몰랐다.", eff: { t: 10, f: 10 }, tone: "good" },
        { w: 40, text: "정적이 더 깊어졌다. 준영은 그 정적을 또 농담으로 덮으려 했다.", eff: { t: 4, r: -6, m: -5 } },
      ] },
      { label: "참는다", text: "참았다. 3분 뒤에 결국 말했다.", eff: { m: -5, t: 5 } },
    ],
    ignore: { text: "입이 먼저 움직였다. 뭘 말했는지 본인도 기억 못 한다.", eff: { t: 6, f: 4 } } },
  { id: "w_timing", age: [14, 90], repeat: true, cooldown: 4,
    text: "지금 이 말을 하면 완벽한 타이밍이다. 문제는 자리가 아주 진지하다는 것이다.",
    choices: [
      { label: "타이밍을 잡는다", needs: { wit: 65 }, outcomes: [
        { w: 55, text: "완벽했다. 진지한 자리가 한순간에 뒤집혔다.", eff: { t: 14, f: 12, r: 6 }, tone: "rare" },
        { w: 45, text: "완벽한 타이밍이 완벽한 실수였다.", eff: { r: -14, m: -8, t: 5 }, tone: "bad" },
      ] },
      { label: "삼킨다", text: "삼켰다. 그 말은 평생 안 쓰이고 사라졌다.", eff: { m: -6, r: 5 } },
    ] },
  { id: "w_selfdeprecate", age: [16, 90], repeat: true, cooldown: 5,
    text: "누가 준영을 놀렸다. 준영은 이럴 때 쓰는 기술이 있다.",
    choices: [
      { label: "본인이 더 세게 놀린다", text: "본인이 더 세게 말하자 놀리던 쪽이 당황했다. 이걸 일찍 배웠다.", eff: { t: 12, f: 8, m: 4 }, tone: "good", flagsAdd: ["선수치기"] },
      { label: "받아친다", needs: { wit: 60 }, text: "되돌려 줬다. 더 세게 돌아왔다. 둘 다 즐거웠다.", eff: { t: 10, f: 10, r: -3 }, tone: "good" },
      { label: "조용히 넘어간다", text: "넘어갔다. 그날 밤에 더 좋은 대답이 생각났다.", eff: { m: -6, t: 3 } },
    ] },
  { id: "w_explain", age: [16, 90], repeat: true, cooldown: 5,
    text: "농담을 했는데 아무도 못 알아들었다. 설명해 달라고 한다.",
    choices: [
      { label: "설명한다", text: "설명하니까 하나도 안 웃겼다. 준영도 알고 있었다.", eff: { t: -4, m: -5, f: 3 } },
      { label: "다음 농담으로 덮는다", needs: { wit: 55 }, text: "덮는 게 설명보다 빨랐다. 이것도 기술이다.", eff: { t: 8, f: 6 }, tone: "good" },
    ],
    ignore: { text: "못 들은 척했다.", eff: { t: 3 } } },
  { id: "w_serious", age: [20, 90], repeat: true, cooldown: 8, major: true, rare: true,
    text: "진지하게 말해야 하는 순간이 왔다. 준영에게 이게 제일 어렵다.",
    choices: [
      { label: "농담 없이 말한다", outcomes: [
        { w: 55, text: "농담 하나 없이 말했다. 듣던 사람이 울었다. 준영도 놀랐다.", eff: { m: 20, f: 16, r: 12 }, tone: "rare", flagsAdd: ["진심한번"] },
        { w: 45, text: "중간에 말이 막혔다. 평생 농담만 하다 보니 그랬다.", eff: { m: -12, t: -4 } },
      ] },
      { label: "결국 농담으로 끝낸다", text: "끝까지 웃겼다. 듣던 사람은 알아들었다.", eff: { t: 10, m: 6, f: 8 } },
    ] },
  { id: "w_crowd", age: [18, 80], repeat: true, cooldown: 6,
    text: "사람이 많은 자리다. 준영이 입을 열면 전부 이쪽을 본다.",
    choices: [
      { label: "전부 웃긴다", needs: { wit: 70 }, outcomes: [
        { w: 60, text: "그 자리의 주인이 됐다. 아무도 폰을 안 봤다.", eff: { t: 14, f: 14, r: 10 }, tone: "rare" },
        { w: 40, text: "너무 많이 했다. 뒤로 갈수록 반응이 식었다.", eff: { t: 5, f: 4, m: -6 } },
      ] },
      { label: "한 명만 웃긴다", text: "옆 사람만 웃겼다. 그 한 명이 제일 크게 웃었다.", eff: { t: 8, f: 10, m: 8 }, tone: "good" },
    ] },
  { id: "w_bad_day", age: [18, 90], repeat: true, cooldown: 6,
    text: "오늘은 아무것도 안 웃기다. 준영에게 이런 날이 가끔 있다.",
    choices: [
      { label: "그래도 한다", text: "억지로 했더니 더 안 웃겼다. 본인이 제일 먼저 알았다.", eff: { t: -5, m: -8, f: -3 } },
      { label: "오늘은 쉰다", text: "조용히 있었다. 친구들이 무슨 일 있냐고 물었다.", eff: { m: 8, f: 6, h: 3 }, tone: "good" },
    ],
    ignore: { text: "웃기려다 말고 입을 닫았다.", eff: { m: -4 } } },
  { id: "w_copy", age: [16, 80], repeat: true, cooldown: 7,
    text: "누가 준영의 농담을 자기 것처럼 써먹었다.",
    choices: [
      { label: "더 웃긴 걸 한다", text: "원본이 뭔지 그 자리에서 증명했다.", eff: { t: 12, r: 8, f: 6 }, tone: "good" },
      { label: "그냥 둔다", text: "그냥 뒀다. 웃기면 됐다고 했다.", eff: { m: 8, f: 6 } },
    ] },
  flavor("w_f1", [14, 90], 4, "혼잣말을 했는데 그게 제일 웃겼다. 아무도 못 들었다.", undefined, { t: 5, m: 4 }),
  flavor("w_f2", [14, 90], 5, "웃기려고 한 게 아닌데 터졌다. 준영은 그게 제일 억울하다.", "face_squint", { t: 6, f: 4 }),
  flavor("w_f3", [14, 90], 5, "같은 농담을 세 번째 했다. 세 번째가 제일 웃겼다.", "face_tilt", { t: 5, f: 4 }),
  flavor("w_f4", [16, 90], 6, "말로 설명할 수 없는 소리를 냈다. 그게 전부였다.", "face_open", { t: 6, f: 5 }),
  flavor("w_f5", [16, 90], 6, "표정만으로 웃겼다. 한 마디도 안 했다.", "face_grin", { t: 7, f: 5 }),
  flavor("w_f6", [16, 90], 7, "농담의 절반은 본인이 먼저 웃어서 망한다.", "face_blur", { t: 5 }),
  flavor("w_f7", [18, 90], 7, "단톡방이 조용하면 준영이 뭔가를 올린다. 매번 통한다.", "meme_evidence", { t: 6, f: 6 }),
  flavor("w_f8", [18, 90], 8, "모르는 사람이 준영을 보고 먼저 웃었다. 아무것도 안 했는데.", "face_wide", { t: 6, r: 4 }),
  flavor("w_f9", [20, 90], 9, "웃기는 게 직업이 아닌데도 다들 그렇게 생각했다.", "prop_mic", { t: 6, r: 5 }),
  flavor("w_f10", [25, 90], 9, "진지한 얘기 중에 입꼬리가 올라갔다. 참느라 더 이상해졌다.", "dc_serious", { t: 6, r: -3 }),
];
