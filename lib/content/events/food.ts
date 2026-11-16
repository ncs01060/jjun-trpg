/** 먹는 이야기. 준영의 두 번째 주특기. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const FOOD: GameEvent[] = [
  { id: "f_ramen", age: [14, 90], repeat: true, cooldown: 2, weight: 1.4, photo: "eat_ramen",
    text: "라면을 끓였다. 준영은 냄비째로 먹는 쪽을 택했다.",
    choices: [
      { label: "국물까지 간다", text: "국물까지 갔다. 다음 날 얼굴이 부었다.", eff: { h: -3, m: 10, t: 4 }, tone: "good" },
      { label: "면만 먹는다", text: "면만 먹겠다고 했는데 결국 국물도 먹었다.", eff: { h: 1, m: 6 } },
    ],
    ignore: { text: "끓이다 말고 폰을 보다가 다 불었다.", eff: { h: -2, m: 3 } } },
  { id: "f_chicken", age: [10, 90], repeat: true, cooldown: 3, photo: "eat_chicken",
    text: "치킨이 왔다. 준영은 박스가 열리기 전부터 자세를 잡고 있었다.",
    choices: [
      { label: "제일 큰 조각부터", text: "제일 큰 걸 집고 나서 미안하다고 했다. 미안해하면서 다 먹었다.", eff: { h: -2, m: 12, f: 4 }, tone: "good" },
      { label: "다 나눠 준다", text: "나눠 주고 자기는 날개만 먹었다. 그런 날도 있다.", eff: { f: 12, m: 8, h: -1 } },
    ],
    ignore: { text: "고민하는 사이에 남은 게 두 조각이었다.", eff: { h: -1, f: 3 } } },
  { id: "f_race", age: [12, 60], repeat: true, cooldown: 4,
    text: "누가 더 많이 먹나 얘기가 나왔다. 준영은 이미 시작했다.",
    choices: [
      { label: "끝까지 간다", outcomes: [
        { w: 55, text: "이겼다. 상품은 없고 전설만 남았다.", eff: { h: -6, f: 10, r: 6, t: 6 }, tone: "good", photo: "eat_ice2" },
        { w: 45, text: "이기긴 했는데 세 시간을 누워 있었다.", eff: { h: -12, f: 8 } },
      ] },
      { label: "안 한다", text: "안 한다고 해 놓고 제일 많이 먹었다.", eff: { h: -4, t: 6, f: 5 } },
    ] },
  { id: "f_menu", age: [14, 90], repeat: true, cooldown: 3, photo: "eat_menu",
    text: "메뉴판을 처음부터 끝까지 읽었다. 결국 늘 먹던 걸 시켰다.",
    choices: [
      { label: "늘 먹던 걸 시킨다", text: "역시 이게 제일 낫다고 했다. 매번 같은 말을 한다.", eff: { m: 6, h: 2 } },
      { label: "처음 보는 걸 시킨다", outcomes: [
        { w: 40, text: "인생 메뉴를 찾았다. 그 뒤로 거기만 간다.", eff: { m: 12, h: 3, f: 4 }, tone: "good" },
        { w: 60, text: "실패했다. 남긴 적은 없었다.", eff: { m: -4, h: 1, t: 4 } },
      ] },
    ],
    ignore: { text: "고민이 길어져서 직원이 두 번 왔다.", eff: { r: -3, t: 3 } } },
  { id: "f_share", age: [14, 90], repeat: true, cooldown: 4,
    text: "마지막 한 점이 남았다. 전부 그걸 쳐다보고 있다.",
    choices: [
      { label: "먹는다", text: "먹었다. 아무도 뭐라 안 했지만 다들 봤다.", eff: { h: 2, m: 6, r: -4, t: 4 } },
      { label: "양보한다", text: "양보하고 나서 30분 동안 그 얘기를 했다.", eff: { f: 8, m: -2, t: 6 } },
      { label: "반으로 자른다", text: "반으로 자르려다 가루가 됐다.", eff: { t: 8, f: 6 } },
    ],
    ignore: { text: "고민하는 사이에 다른 사람이 먹었다.", eff: { m: -5, t: 3 } } },
  { id: "f_cook", age: [20, 80], repeat: true, cooldown: 5, photo: "home_stand",
    text: "요리를 하겠다고 했다. 복장은 티셔츠를 걷은 상태였다.",
    choices: [
      { label: "끝까지 만든다", outcomes: [
        { w: 45, text: "의외로 맛있었다. 본인이 제일 놀랐다.", eff: { h: 4, m: 12, f: 6 }, tone: "good", photo: "home_sit" },
        { w: 55, text: "먹을 수는 있었다. 그게 최선의 평가였다.", eff: { h: -2, m: 5, t: 6 } },
      ] },
      { label: "시켜 먹는다", text: "10분 만에 포기했다. 포기도 빠르다.", eff: { w: -6, h: 2, m: 5 } },
    ] },
  { id: "f_midnight", age: [16, 80], repeat: true, cooldown: 3,
    text: "새벽 두 시. 배가 고프다. 준영에게 이건 질문이 아니다.",
    choices: [
      { label: "먹는다", text: "먹었다. 후회는 아침에 하기로 했다.", eff: { h: -4, m: 10, t: 3 }, tone: "good" },
      { label: "참는다", text: "참고 누웠는데 천장만 봤다. 결국 먹었다.", eff: { h: -2, m: 3 } },
    ],
    ignore: { text: "고민하다가 그냥 잠들었다. 드문 일이다.", eff: { h: 4 } } },
  { id: "f_diet", age: [20, 70], repeat: true, cooldown: 6,
    text: "다이어트를 하겠다고 선언했다. 선언은 이번이 몇 번째인지 모른다.",
    choices: [
      { label: "이번엔 진짜 한다", outcomes: [
        { w: 35, text: "진짜 했다. 3주를 버텼다.", eff: { h: 12, m: -6, r: 6 }, tone: "good", flagsAdd: ["의외로성실"] },
        { w: 65, text: "선언 당일 저녁에 치킨을 시켰다.", eff: { h: -3, t: 8, f: 5 }, photo: "eat_chicken" },
      ] },
      { label: "선언만 한다", text: "선언이 목적이었다. 선언은 성공했다.", eff: { t: 8, f: 4 } },
    ] },
  { id: "f_kfc", age: [12, 70], repeat: true, cooldown: 5, photo: "eat_kfc",
    text: "포장을 뜯기도 전에 이미 신나 있었다.",
    choices: [
      { label: "사진부터 찍는다", text: "식기 전에 찍어야 한다며 열 장을 찍었다. 그 사이에 식었다.", eff: { t: 8, h: -1, f: 4 } },
      { label: "바로 먹는다", text: "뜨거운데도 그냥 먹었다. 입천장이 까졌다.", eff: { h: -3, m: 10 } },
    ] },
  flavor("f_f1", [12, 90], 3, "아이스크림을 두 입에 끝냈다. 두 입이 거의 같은 크기였다.", "eat_ice1"),
  flavor("f_f2", [12, 90], 4, "나머지 반도 한 입이었다.", "eat_ice2"),
  flavor("f_f3", [14, 90], 3, "들고만 있어도 웃긴 음식이 있다.", "eat_hold"),
  flavor("f_f4", [14, 90], 2, "젓가락이 제일 빨랐다.", "eat_first"),
  flavor("f_f5", [14, 90], 4, "먹으면서도 카메라를 봤다.", "face_eat"),
  flavor("f_f6", [14, 90], 4, "먹다가 웃다가를 반복했다. 결국 둘 다 했다.", "eat_laugh"),
  flavor("f_f7", [16, 90], 5, "음식이 나오기를 기다리는 자세가 정해져 있다.", "eat_wait"),
  flavor("f_f8", [20, 90], 5, "튀김을 집게째로 먹었다. 그런 건 처음 봤다.", "home_tong", { h: 2, t: 5 }),
  flavor("f_f9", [14, 90], 6, "한 조각도 안 남겼다. 뼈까지 정리했다.", "eat_chicken"),
  flavor("f_f10", [14, 90], 6, "배부르다고 하고 10분 뒤에 또 먹었다.", "face_chew"),
  flavor("f_f11", [16, 90], 7, "맛없다고 하면서 다 먹었다.", "eat_dark", { h: 1, t: 4 }),
  flavor("f_f12", [14, 90], 5, "입에 넣고 말을 했다. 아무도 못 알아들었다.", "face_bite2"),
];
