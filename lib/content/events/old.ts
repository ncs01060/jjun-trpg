/** 노년 60~100세. 웃어 주는 사람의 수가 달라지는 시기. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const OLD: GameEvent[] = [
  { id: "n_still_funny", age: [60, 99], repeat: true, cooldown: 4, photo: "day_thumbs",
    text: "나이가 들어도 준영은 여전히 웃겼다. 다만 웃어 주는 사람의 수가 달라졌다.",
    choices: [
      { label: "그래도 한다", text: "손주가 뒤집어졌다. 준영은 다시 스무 살이 된 것 같았다.", eff: { m: 16, t: 8, h: -2 }, tone: "rare" },
      { label: "조용히 웃는다", text: "말을 안 해도 표정만으로 웃겼다. 그건 평생 연습한 거였다.", eff: { m: 10, t: 4 }, photo: "face_grin" },
    ],
    ignore: { text: "타이밍을 놓쳤다. 준영이 타이밍을 놓치는 건 드문 일이다.", eff: { m: -4 } } },
  { id: "n_album", age: [70, 99], major: true, rare: true, photo: "home_smoke",
    text: "서랍에서 오래된 사진 뭉치가 나왔다. 전부 얼굴이 이상하게 나온 것들뿐이었다. 멀쩡한 사진은 한 장도 없었다.",
    choices: [
      { label: "제일 심한 걸 액자에 넣는다", text: "거실 정중앙에 걸었다. 오는 사람마다 그게 뭐냐고 물었고, 준영은 매번 다르게 대답했다.", eff: { m: 22, t: 10 }, tone: "rare", flagsAdd: ["액자"] },
      { label: "전부 다시 넣는다", text: "원래 자리에 똑같이 넣었다. 준영만 아는 자리였다.", eff: { m: 14 } },
    ] },
  { id: "n_grandkid", age: [60, 95], requires: ["아이"], repeat: true, cooldown: 4,
    text: "손주가 왔다. 준영은 준비해 둔 게 있다.",
    choices: [
      { label: "그 얼굴을 한다", text: "30년 전과 똑같은 표정이었다. 손주가 울다가 웃었다.", eff: { m: 18, t: 8 }, tone: "rare", photo: "face_wide" },
      { label: "업어 준다", text: "허리가 삐끗했다. 그래도 한 바퀴 더 돌았다.", eff: { m: 16, h: -8 }, tone: "good" },
    ] },
  { id: "n_funeral", age: [60, 99], repeat: true, cooldown: 8, major: true,
    text: "오래된 친구의 부고를 받았다. 그 친구는 준영의 농담에 제일 크게 웃던 사람이었다.",
    choices: [
      { label: "그 얘기를 한다", text: "영정 앞에서 그날 얘기를 했다. 다들 울면서 웃었다.", eff: { m: 10, f: 14, t: 6 }, tone: "rare", flagsAdd: ["먼저간친구"] },
      { label: "아무 말도 안 한다", text: "한 마디도 안 했다. 평생 말로 살아온 사람이 그랬다.", eff: { m: -14, f: 8 }, tone: "bad", flagsAdd: ["먼저간친구"] },
    ] },
  { id: "n_body", age: [65, 99], repeat: true, cooldown: 5,
    text: "몸이 예전 같지 않다. 준영은 그걸로도 농담을 만들었다.",
    choices: [
      { label: "농담으로 넘긴다", text: "듣던 사람이 웃다가 조용해졌다.", eff: { t: 8, m: 6, h: -4 } },
      { label: "운동을 시작한다", text: "사흘 했다. 사흘이면 평소보다 길었다.", eff: { h: 8, m: 4 }, photo: "out_run" },
    ],
    ignore: { text: "앉았다 일어나는 데 소리가 났다.", eff: { h: -4, t: 3 } } },
  { id: "n_quiet", age: [70, 99], repeat: true, cooldown: 5, photo: "day_calm",
    text: "조용한 날이 많아졌다. 준영은 그 조용함에 익숙해지는 중이다.",
    choices: [
      { label: "누구한테 전화한다", text: "받는 사람이 반가워했다. 한 시간을 떠들었다.", eff: { f: 12, m: 12 }, tone: "good" },
      { label: "그냥 있는다", text: "창밖을 봤다. 지나가는 사람을 세다가 자꾸 숫자를 잊었다.", eff: { m: 6, h: -1 } },
    ] },
  { id: "n_legacy", age: [75, 99], major: true, rare: true, requires: ["액자"],
    text: "누군가 그 액자 속 사진이 뭐냐고 물었다. 준영은 이번에도 다른 대답을 준비했다.",
    choices: [
      { label: "또 새로운 얘기를 한다", text: "스물일곱 번째 버전이었다. 전부 다른 얘기였고 전부 재밌었다.", eff: { m: 20, t: 12 }, tone: "rare" },
      { label: "진짜 얘기를 한다", text: "처음으로 진짜 얘기를 했다. 별 것 아니었는데 듣던 사람이 울었다.", eff: { m: 24, f: 10 }, tone: "rare" },
    ] },
  { id: "n_last_joke", age: [85, 99], major: true, rare: true,
    text: "준영은 요즘 말수가 줄었다. 그런데 오늘은 뭔가 떠오른 모양이다.",
    choices: [
      { label: "말한다", text: "그 말에 방 안이 전부 웃었다. 준영은 그 소리를 아주 오래 들었다.", eff: { m: 26, f: 14, t: 10 }, tone: "rare", flagsAdd: ["마지막농담"] },
      { label: "그냥 웃는다", text: "말하지 않고 웃기만 했다. 그것도 충분했다.", eff: { m: 20 }, tone: "rare" },
    ] },
  flavor("n_f1", [65, 99], 4, "창가에 앉아 있는 시간이 길어졌다.", "day_calm", { m: 4, h: -1 }),
  flavor("n_f2", [65, 99], 5, "옛날 노래가 나왔다. 가사를 전부 기억하고 있었다.", "kara_eyes", { m: 10, t: 4 }),
  flavor("n_f3", [65, 99], 5, "라면을 끓였다. 혼자 먹는 라면도 여전히 맛있었다.", "eat_ramen", { m: 6, h: 1 }),
  flavor("n_f4", [65, 99], 6, "낮잠을 두 번 잤다. 본인은 한 번이라고 주장했다.", "home_lie", { h: 4, t: 3 }),
  flavor("n_f5", [65, 99], 6, "거울 앞에서 표정을 만들어 봤다. 여전히 됐다.", "face_tilt", { t: 6, m: 6 }),
  flavor("n_f6", [70, 99], 7, "손주가 찍어 준 사진이 하나도 멀쩡하지 않았다. 유전인 모양이다.", "face_blur", { m: 10, t: 5 }),
  flavor("n_f7", [70, 99], 7, "오래된 단톡방이 아직 살아 있었다. 읽는 사람은 세 명이었다.", "meme_kakao", { f: 6, m: 6 }),
  flavor("n_f8", [70, 99], 8, "그 복장이 아직 옷장에 있었다. 꺼내 보기만 했다.", "arab_cloth", { m: 8, t: 4 }),
  flavor("n_f9", [75, 99], 8, "티셔츠를 걷었다. 집에서는 여전히 자유다.", "home_belly", { m: 8, t: 5 }),
  flavor("n_f10", [75, 99], 9, "걷는 속도가 느려졌다. 그래도 매일 같은 길을 걸었다.", "out_cross", { h: 2, m: 5 }),
  flavor("n_f11", [80, 99], 9, "전화가 와도 금방 안 받는다. 받으면 오래 한다.", "day_call1", { f: 5, m: 5 }),
  flavor("n_f12", [80, 99], 9, "이름을 잠깐 잊었다가 다시 떠올렸다.", "meme_card3", { m: -3, t: 4 }),
];
