/** 분류가 안 되는 것들. 인생의 대부분은 여기에 속한다. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const MISC: GameEvent[] = [
  { id: "x_luck", age: [10, 90], repeat: true, cooldown: 7, rare: true,
    text: "운이 좋은 날이다. 사소한 게 전부 맞아떨어졌다.",
    choices: [
      { label: "복권을 산다", outcomes: [
        { w: 15, text: "소액이 당첨됐다. 그날 밤 전부 썼다.", eff: { w: 10, f: 10, t: 6 }, tone: "rare" },
        { w: 85, text: "꽝이었다. 그래도 기분은 좋았다.", eff: { w: -3, m: 6 } },
      ] },
      { label: "그냥 넘긴다", text: "운을 아껴 뒀다고 했다.", eff: { m: 8 } },
    ] },
  { id: "x_badluck", age: [10, 90], repeat: true, cooldown: 6,
    text: "되는 게 하나도 없는 날이다.",
    choices: [
      { label: "웃어넘긴다", needs: { wit: 50 }, text: "하도 안 되니까 웃겼다. 그 얘기로 단톡방을 20분 돌렸다.", eff: { t: 10, f: 8, m: 6 }, tone: "good" },
      { label: "일찍 들어간다", text: "일찍 들어가서 그냥 잤다. 그게 제일 나은 선택이었다.", eff: { h: 6, m: 4 } },
    ],
    ignore: { text: "하루가 그냥 지나갔다.", eff: { m: -4 } } },
  { id: "x_help_stranger", age: [14, 85], repeat: true, cooldown: 6,
    text: "누가 곤란해 보인다. 아무도 안 도와주고 있다.",
    choices: [
      { label: "도와준다", text: "도와주고 이름도 안 말하고 갔다. 준영은 가끔 이런다.", eff: { m: 14, r: 8, h: -2 }, tone: "rare", flagsAdd: ["속은착함"] },
      { label: "지나간다", text: "지나가면서 세 번 돌아봤다.", eff: { m: -8 } },
    ],
    ignore: { text: "망설이는 사이에 다른 사람이 도왔다.", eff: { m: -5 } } },
  { id: "x_old_photo", age: [20, 95], repeat: true, cooldown: 7, photo: "face_grin",
    text: "옛날 사진이 하나 떴다. 몇 년 전 오늘이라고 한다.",
    choices: [
      { label: "다시 올린다", text: "그대로 다시 올렸다. 그때 그 친구들이 똑같이 반응했다.", eff: { f: 12, m: 12, t: 6 }, tone: "good" },
      { label: "혼자 본다", text: "혼자 한참 봤다. 그때가 멀지 않은 것 같았다.", eff: { m: 10 } },
    ] },
  { id: "x_promise", age: [16, 85], repeat: true, cooldown: 6,
    text: "지키기 어려운 약속을 해 버렸다. 그 자리의 분위기 때문이었다.",
    choices: [
      { label: "지킨다", text: "무리해서 지켰다. 아무도 기억 못 했지만 준영은 알았다.", eff: { m: 12, h: -5, w: -6, r: 8 }, tone: "rare" },
      { label: "못 지킨다고 말한다", text: "미리 말했다. 미리 말하는 게 제일 어려웠다.", eff: { r: 4, m: -4 } },
    ],
    ignore: { text: "그냥 흐지부지됐다.", eff: { r: -6, m: -4 } } },
  { id: "x_stage_small", age: [16, 80], repeat: true, cooldown: 5,
    text: "작은 무대가 생겼다. 사람은 열 명 남짓이다.",
    choices: [
      { label: "전력으로 한다", text: "열 명한테 100명짜리를 했다. 열 명이 오래 기억했다.", eff: { t: 12, f: 12, h: -4 }, tone: "rare", photo: "kara_point" },
      { label: "적당히 한다", text: "적당히 했는데도 충분히 웃겼다.", eff: { t: 6, f: 6 } },
    ] },
  { id: "x_rumor", age: [16, 80], repeat: true, cooldown: 8,
    text: "준영에 대한 이상한 소문이 돌았다. 절반은 사실이었다.",
    choices: [
      { label: "더 부풀린다", text: "본인이 더 부풀렸다. 소문은 전설이 됐다.", eff: { t: 14, r: -6, f: 10 }, tone: "rare", flagsAdd: ["소문의주인공"] },
      { label: "해명한다", text: "해명했다. 아무도 안 들었다.", eff: { r: 4, m: -6 } },
    ],
    ignore: { text: "가만히 뒀더니 저절로 사라졌다.", eff: { m: 3 } } },
  { id: "x_kindness", age: [18, 90], repeat: true, cooldown: 9, rare: true,
    text: "누가 준영에게 고맙다고 했다. 뭘 했는지 준영은 기억을 못 한다.",
    choices: [
      { label: "기억나는 척한다", text: "아는 척하다가 들켰다. 그래서 더 웃겼다.", eff: { t: 8, f: 10, m: 8 }, tone: "good" },
      { label: "솔직히 모른다고 한다", text: "모른다고 하자 상대가 처음부터 다 말해 줬다. 듣고 나서 준영이 먼저 울컥했다.", eff: { m: 16, f: 12 }, tone: "rare" },
    ] },
  flavor("x_f1", [12, 90], 4, "별 일 없는 하루였다. 사진은 한 장 찍었다.", "day_face1", { m: 4 }),
  flavor("x_f2", [12, 90], 4, "아무 이유 없이 기분이 좋았다.", "day_thumbs", { m: 7 }),
  flavor("x_f3", [12, 90], 4, "아무 이유 없이 기분이 가라앉았다.", "eat_dark", { m: -4 }),
  flavor("x_f4", [14, 90], 5, "하루 종일 같은 노래를 들었다.", "kara_eyes", { m: 5 }),
  flavor("x_f5", [14, 90], 5, "지갑에서 안 쓰는 영수증이 열 장 나왔다.", "day_phone", { t: 4 }),
  flavor("x_f6", [14, 90], 5, "폰 배터리가 3%였는데 끝까지 버텼다.", "day_call2", { t: 5 }),
  flavor("x_f7", [14, 90], 6, "누가 찍어 준 사진이 전부 흔들려 있었다.", "blur_2", { t: 5 }),
  flavor("x_f8", [14, 90], 6, "세 번째도 실패했다. 결국 포기했다.", "blur_4", { t: 5, m: -2 }),
  flavor("x_f9", [14, 90], 6, "찍는 걸 눈치채고 손으로 가렸다. 늦었다.", "blur_6", { t: 5 }),
  flavor("x_f10", [14, 90], 7, "발만 찍힌 사진이 한 장 있었다.", "blur_7", { t: 4 }),
  flavor("x_f11", [14, 90], 7, "사진을 찍으려는 순간 손이 먼저 왔다.", "blur_5", { t: 5 }),
  flavor("x_f12", [16, 90], 7, "오래 안 본 사람이 생각났다. 연락은 안 했다.", "day_look", { m: -3 }),
  flavor("x_f13", [16, 90], 8, "길에서 아는 사람을 봤는데 모른 척했다. 상대도 그랬다.", "day_turn", { t: 5, m: -2 }),
  flavor("x_f14", [16, 90], 8, "누가 준영 흉내를 냈다. 꽤 비슷했다.", "face_wide", { t: 7, f: 6 }),
  flavor("x_f15", [18, 90], 9, "자기가 한 농담을 까먹고 또 했다.", "face_blur", { t: 5, f: 4 }),
  flavor("x_f16", [18, 90], 9, "오래된 옷에서 그때 쓰던 물건이 나왔다.", "home_pose", { m: 9 }),
];
