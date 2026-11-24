/** 돈. 준영은 돈을 모으는 쪽보다 쓰는 쪽에 재능이 있다. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const MONEY: GameEvent[] = [
  { id: "q_treat", age: [18, 85], repeat: true, cooldown: 4, needs: { money: 15 },
    text: "계산대 앞이다. 준영의 손이 먼저 나갔다.",
    choices: [
      { label: "전부 낸다", text: "전부 냈다. 통장은 가벼워지고 분위기는 무거워지지 않았다.", eff: { w: -12, f: 14, r: 6 }, tone: "good" },
      { label: "나눠 낸다", text: "나눠 내자고 했다. 계산이 복잡해져서 결국 준영이 더 냈다.", eff: { w: -6, f: 6, t: 4 } },
    ],
    ignore: { text: "망설이는 사이에 다른 사람이 냈다. 다음은 자기 차례라고 세 번 말했다.", eff: { f: 4, m: -3 } } },
  { id: "q_save", age: [20, 70], repeat: true, cooldown: 7,
    text: "이번 달은 진짜 아끼기로 했다. 달력에 표시까지 했다.",
    choices: [
      { label: "끝까지 지킨다", outcomes: [
        { w: 40, text: "진짜 지켰다. 달력에 동그라미가 서른 개였다.", eff: { w: 16, m: -4 }, tone: "good", flagsAdd: ["의외로성실"] },
        { w: 60, text: "둘째 주에 무너졌다. 무너진 날 제일 많이 썼다.", eff: { w: -8, m: 8, t: 5 } },
      ] },
      { label: "오늘만 예외로 한다", text: "오늘만 예외가 매일 있었다.", eff: { w: -6, m: 6 } },
    ] },
  { id: "q_big_buy", age: [20, 75], repeat: true, cooldown: 8, needs: { money: 45 },
    text: "큰 걸 하나 사고 싶어졌다. 필요한 건 아니다.",
    choices: [
      { label: "산다", outcomes: [
        { w: 50, text: "사고 나서 후회가 없었다. 드문 일이다.", eff: { w: -22, m: 16 }, tone: "good" },
        { w: 50, text: "사고 나서 일주일 동안 안 썼다.", eff: { w: -22, m: 4, t: 5 } },
      ] },
      { label: "장바구니에만 둔다", text: "장바구니에 넣어 두고 매일 봤다. 그것도 나름 즐거웠다.", eff: { m: 6, w: 3 } },
    ] },
  { id: "q_bill", age: [20, 80], repeat: true, cooldown: 5,
    text: "고지서가 왔다. 숫자가 예상보다 컸다.",
    choices: [
      { label: "바로 낸다", text: "바로 냈다. 내고 나니 홀가분했다.", eff: { w: -10, m: 6 } },
      { label: "미룬다", outcomes: [
        { w: 55, text: "미뤘다가 겨우 기한 안에 냈다.", eff: { w: -10, m: -4 } },
        { w: 45, text: "연체됐다. 돈이 더 나갔다.", eff: { w: -14, m: -8 }, tone: "bad" },
      ] },
    ],
    ignore: { text: "봉투를 책상 위에 두고 일주일을 보냈다.", eff: { w: -12, m: -5 } } },
  { id: "q_gift", age: [16, 85], repeat: true, cooldown: 6, needs: { money: 20 },
    text: "누군가의 기념일이다. 준영은 선물 고르는 걸 제일 어려워한다.",
    choices: [
      { label: "웃긴 걸 산다", outcomes: [
        { w: 60, text: "받은 사람이 뒤집어졌다. 그게 목적이었다.", eff: { w: -8, f: 12, t: 8 }, tone: "good" },
        { w: 40, text: "너무 웃긴 걸 샀다. 쓸모는 하나도 없었다.", eff: { w: -8, f: 5, t: 6 } },
      ] },
      { label: "제대로 된 걸 산다", text: "한참 고르다 평범한 걸 샀다. 오래 썼다는 소식을 나중에 들었다.", eff: { w: -12, f: 10, m: 8 }, tone: "good" },
    ] },
  flavor("q_f1", [18, 85], 4, "통장을 열어 보고 바로 닫았다.", "day_phone", { m: -4 }),
  flavor("q_f2", [18, 85], 4, "편의점에서 하나만 사려다 양손 가득 들고 나왔다.", "eat_can2", { w: -5, m: 5 }),
  flavor("q_f3", [18, 85], 5, "배달앱을 켜고 30분 보다가 라면을 끓였다.", "eat_ramen", { w: 3, t: 5 }),
  flavor("q_f4", [18, 85], 5, "할인한다는 말에 안 필요한 걸 샀다.", "day_jacket", { w: -6, m: 4 }),
  flavor("q_f5", [20, 85], 6, "월급날인데 통장이 하루 만에 원래대로 돌아왔다.", "day_suit", { w: -4, t: 5 }),
  flavor("q_f6", [20, 85], 6, "영수증을 보고 한참 계산했다. 결국 포기했다.", "eat_menu", { t: 4 }),
  flavor("q_f7", [20, 85], 7, "친구가 빌려 간 돈 얘기를 꺼내려다 말았다.", "day_call3", { m: -5, f: 3 }),
  flavor("q_f8", [22, 85], 7, "적금을 들었다. 3개월 뒤에 깼다.", "day_calm", { w: -3, m: 4 }),
];
