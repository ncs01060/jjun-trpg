/** 가족. 준영이 제일 안 웃기는 자리이면서 제일 많이 웃는 자리. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const FAMILY: GameEvent[] = [
  { id: "m_holiday", age: [8, 80], repeat: true, cooldown: 3,
    text: "명절이다. 친척들이 전부 준영을 쳐다본다. 뭔가 해 달라는 눈빛이다.",
    choices: [
      { label: "한다", needs: { wit: 45 }, outcomes: [
        { w: 60, text: "거실이 뒤집혔다. 그날 이후로 명절마다 호출당한다.", eff: { t: 12, f: 10, m: 8 }, tone: "good", flagsAdd: ["명절담당"] },
        { w: 40, text: "어른들만 안 웃었다. 사촌들은 뒤집어졌다.", eff: { t: 8, r: -6, f: 8 } },
      ] },
      { label: "도망간다", text: "방으로 들어가 30분을 숨어 있었다. 결국 끌려 나왔다.", eff: { m: -5, t: 4 } },
    ],
    ignore: { text: "눈을 피하다가 결국 눈이 마주쳤다.", eff: { t: 5, m: -3 } } },
  { id: "m_mom_call", age: [18, 80], repeat: true, cooldown: 4, photo: "day_call1",
    text: "엄마한테 전화가 왔다. 용건은 특별히 없었다.",
    choices: [
      { label: "길게 받는다", text: "40분을 떠들었다. 끊고 나서 기분이 이상하게 좋았다.", eff: { m: 14, f: 6 }, tone: "good" },
      { label: "짧게 끊는다", text: "바쁘다고 끊었다. 안 바빴다.", eff: { m: -8 } },
    ],
    ignore: { text: "부재중이 세 통 쌓였다.", eff: { m: -8 } } },
  { id: "m_dad", age: [20, 80], repeat: true, cooldown: 7,
    text: "아버지와 둘이 남았다. 할 말이 딱히 없다.",
    choices: [
      { label: "농담을 한다", text: "아버지가 웃었다. 준영은 그 웃음을 오래 기억했다.", eff: { t: 8, m: 16 }, tone: "rare" },
      { label: "같이 TV를 본다", text: "두 시간 동안 열 마디도 안 했다. 그래도 나쁘지 않았다.", eff: { m: 10 } },
    ] },
  { id: "m_sibling", age: [8, 70], repeat: true, cooldown: 5,
    text: "형제와 싸웠다. 이유는 사소했고 둘 다 안 물러섰다.",
    choices: [
      { label: "먼저 웃긴다", needs: { wit: 50 }, text: "웃기자 둘 다 싸운 이유를 잊었다.", eff: { t: 8, f: 10, m: 8 }, tone: "good" },
      { label: "끝까지 간다", text: "둘 다 이기지 못했다. 저녁은 같이 먹었다.", eff: { m: -6, f: 4 } },
    ] },
  { id: "m_photo_old", age: [25, 90], repeat: true, cooldown: 8, photo: "home_pose2",
    text: "가족 앨범이 나왔다. 어릴 때 준영 사진은 이미 표정이 이상했다.",
    choices: [
      { label: "지금 다시 해 본다", text: "30년 뒤에도 똑같이 됐다. 다들 뒤집어졌다.", eff: { t: 12, m: 14, f: 8 }, tone: "rare", photo: "face_tilt" },
      { label: "한참 들여다본다", text: "말없이 한참 봤다.", eff: { m: 12 } },
    ] },
  { id: "m_support", age: [20, 70], repeat: true, cooldown: 9, needs: { money: 30 },
    text: "집에 돈 들어갈 일이 생겼다. 아무도 준영한테 말을 안 했다.",
    choices: [
      { label: "먼저 꺼낸다", text: "먼저 말을 꺼냈다. 다들 한참 아무 말도 안 했다.", eff: { w: -16, m: 16, f: 10 }, tone: "rare", flagsAdd: ["효도한번"] },
      { label: "모르는 척한다", text: "모르는 척했다. 모르는 척이 제일 어려웠다.", eff: { m: -12, w: 4 } },
    ] },
  flavor("m_f1", [10, 80], 5, "집에 들어가면서 아무 말이나 외쳤다. 대답은 없었다.", "home_belly", { m: 5, t: 4 }),
  flavor("m_f2", [10, 80], 6, "냉장고를 열고 10초 보다가 그냥 닫았다.", "home_sit", { t: 4 }),
  flavor("m_f3", [15, 80], 6, "가족 단톡방에 사진을 올렸다. 아무도 반응을 안 했다.", "meme_kakao", { t: 5, m: -2 }),
  flavor("m_f4", [15, 80], 7, "엄마가 준영 사진을 프로필로 해 놨다. 하필 제일 이상한 걸로.", "face_wide", { m: 10, t: 6 }),
  flavor("m_f5", [20, 80], 7, "본가에 다녀오면 가방이 무거워진다.", "day_face9", { w: 5, m: 8 }),
  flavor("m_f6", [20, 80], 8, "오랜만에 집에서 자는데 천장이 낯설었다.", "home_lie", { m: 7 }),
  flavor("m_f7", [25, 85], 8, "부모님 사진을 한참 봤다. 생각보다 젊었다.", "day_calm", { m: 8 }),
  flavor("m_f8", [30, 85], 9, "어릴 때 쓰던 물건이 아직 그 자리에 있었다.", "home_pose", { m: 10 }),
];
