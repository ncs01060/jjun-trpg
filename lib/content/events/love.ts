/** 연애. 준영이 제일 서툰 분야. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const LOVE: GameEvent[] = [
  { id: "v_meet", age: [18, 45], repeat: true, cooldown: 6, forbids: ["가정"],
    text: "소개를 받았다. 준영은 첫 5분 안에 웃기지 못하면 불안해진다.",
    choices: [
      { label: "웃긴다", needs: { wit: 55 }, outcomes: [
        { w: 55, text: "웃어 줬다. 두 번째 만남이 잡혔다.", eff: { t: 8, m: 14, f: 6 }, tone: "good", flagsAdd: ["연애중"] },
        { w: 45, text: "혼자 신나서 떠들었다. 두 번째는 없었다.", eff: { m: -10, t: 4 } },
      ] },
      { label: "들어 준다", outcomes: [
        { w: 60, text: "듣기만 했는데 상대가 더 좋아했다. 준영은 그게 신기했다.", eff: { m: 14, f: 8 }, tone: "good", flagsAdd: ["연애중"] },
        { w: 40, text: "너무 안 떠들어서 재미없는 사람이 됐다.", eff: { m: -8 } },
      ] },
    ],
    ignore: { text: "할 말을 고르다가 자리가 끝났다.", eff: { m: -8 } } },
  { id: "v_date", age: [18, 60], requires: ["연애중"], repeat: true, cooldown: 3,
    text: "데이트다. 준영은 어디로 갈지 세 시간 고민했다.",
    choices: [
      { label: "준비한 데로 간다", text: "준비한 티가 났다. 상대가 그걸 알아줬다.", eff: { m: 14, w: -8, f: 4 }, tone: "good" },
      { label: "즉흥으로 간다", outcomes: [
        { w: 50, text: "길에서 본 가게가 인생 가게가 됐다.", eff: { m: 14, w: -6 }, tone: "rare", photo: "cafe_1" },
        { w: 50, text: "세 군데가 전부 쉬는 날이었다.", eff: { m: -6, h: -3, t: 6 } },
      ] },
    ],
    ignore: { text: "결정을 못 해서 상대가 정했다.", eff: { m: -4, f: 4 } } },
  { id: "v_fight", age: [18, 60], requires: ["연애중"], repeat: true, cooldown: 5,
    text: "싸웠다. 준영은 이럴 때 농담을 하면 안 된다는 걸 알지만 입이 먼저 움직인다.",
    choices: [
      { label: "농담을 한다", outcomes: [
        { w: 35, text: "둘 다 웃어 버렸다. 싸움이 사라졌다.", eff: { t: 8, m: 12, f: 6 }, tone: "rare" },
        { w: 65, text: "더 커졌다. 준영도 알고 있었는데 못 참았다.", eff: { m: -14, f: -6 }, tone: "bad" },
      ] },
      { label: "먼저 사과한다", text: "먼저 사과했다. 지는 게 아니라는 걸 그때 배웠다.", eff: { m: 10, f: 10 }, tone: "good" },
      { label: "시간을 둔다", text: "하루를 뒀다. 하루 뒤에는 둘 다 이유를 잊었다.", eff: { m: 6 } },
    ] },
  { id: "v_meet_family", age: [22, 50], requires: ["연애중"], repeat: true, cooldown: 10, major: true,
    text: "상대의 가족을 만나는 자리다. 준영에게 이건 공연보다 어렵다.",
    choices: [
      { label: "평소처럼 한다", outcomes: [
        { w: 55, text: "어머니가 제일 크게 웃었다. 그걸로 끝났다.", eff: { t: 12, f: 14, m: 16 }, tone: "rare", flagsAdd: ["인정받음"] },
        { w: 45, text: "한 번 선을 넘었다. 집에 오는 길이 조용했다.", eff: { m: -12, r: -8 } },
      ] },
      { label: "최대한 조용히 있는다", text: "하루 종일 조용했다. 상대가 \"너 아닌 것 같았다\"고 했다.", eff: { r: 8, m: -4 } },
    ] },
  { id: "v_break", age: [18, 55], requires: ["연애중"], repeat: true, cooldown: 8, major: true,
    text: "헤어지자는 말이 나왔다. 준영은 아무 농담도 떠오르지 않았다.",
    choices: [
      { label: "붙잡는다", outcomes: [
        { w: 40, text: "붙잡혔다. 그 뒤로 둘 다 조금 달라졌다.", eff: { m: 10, f: 6 } },
        { w: 60, text: "붙잡지 못했다. 그날 준영은 아무 말도 안 했다.", eff: { m: -20 }, tone: "bad", flagsRemove: ["연애중"] },
      ] },
      { label: "보내 준다", text: "웃으면서 보냈다. 돌아서서는 웃지 않았다.", eff: { m: -14, t: 4 }, flagsRemove: ["연애중"], tone: "bad" },
    ] },
  { id: "v_long", age: [25, 60], requires: ["연애중"], repeat: true, cooldown: 9, rare: true,
    text: "오래 만났다. 이제는 농담을 안 해도 되는 사이가 됐다.",
    choices: [
      { label: "그래도 한다", text: "매번 웃어 줬다. 재미없는 농담에도.", eff: { m: 16, f: 10, t: 6 }, tone: "rare" },
      { label: "같이 조용히 있는다", text: "둘이 한 시간 동안 말없이 있었다. 어색하지 않았다.", eff: { m: 18 }, tone: "rare" },
    ] },
  flavor("v_f1", [18, 55], 5, "답장을 쓰고 지우기를 여섯 번 했다.", "day_phone", { m: -3, t: 4 }),
  flavor("v_f2", [18, 55], 5, "읽씹을 당하고 폰을 뒤집어 놨다.", "day_call3", { m: -6 }),
  flavor("v_f3", [18, 55], 6, "약속 장소에 30분 일찍 도착했다.", "cafe_1", { m: 5 }),
  flavor("v_f4", [18, 55], 6, "거울을 세 번 봤다. 머리는 그대로였다.", "prop_hair", { m: 4, t: 3 }),
  flavor("v_f5", [20, 60], 7, "둘이 찍은 사진 중에 멀쩡한 게 한 장도 없었다.", "face_blur", { m: 8, t: 5 }),
  flavor("v_f6", [20, 60], 7, "선물을 고르는 데 두 시간이 걸렸다.", "eat_menu", { w: -6, m: 7 }),
  flavor("v_f7", [20, 60], 8, "새벽에 통화를 켜 놓고 둘 다 잠들었다.", "day_call1", { m: 9, f: 6, h: -2 }),
  flavor("v_f8", [20, 60], 8, "같이 노래방에 갔다. 준영이 마이크를 안 놨다.", "kara_hold", { t: 6, m: 6 }),
];
