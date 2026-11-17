/** 몸. 먹고 마신 만큼 돌아오는 것들. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const BODY: GameEvent[] = [
  { id: "z_mirror", age: [16, 85], repeat: true, cooldown: 5, photo: "face_squash",
    text: "거울을 봤다. 생각보다 괜찮기도 하고 아니기도 하다.",
    choices: [
      { label: "표정을 만들어 본다", text: "10분 동안 표정만 만들었다. 결국 제일 이상한 걸 골랐다.", eff: { t: 8, m: 8 }, tone: "good", photo: "face_tilt" },
      { label: "그냥 돌아선다", text: "돌아서고 나서 다시 한 번 봤다.", eff: { m: 3 } },
    ] },
  { id: "z_weight", age: [18, 80], repeat: true, cooldown: 6,
    text: "체중계에 올라갔다. 숫자를 보고 3초 가만히 있었다.",
    choices: [
      { label: "농담으로 넘긴다", text: "체중계가 고장 났다고 했다. 세 번째 고장이었다.", eff: { t: 8, h: -3, f: 4 }, tone: "good" },
      { label: "오늘부터 한다", outcomes: [
        { w: 40, text: "이번엔 좀 갔다. 2주를 버텼다.", eff: { h: 10, m: -4 }, tone: "good" },
        { w: 60, text: "저녁에 치킨을 시켰다.", eff: { h: -3, m: 8, t: 5 }, photo: "eat_chicken" },
      ] },
    ],
    ignore: { text: "체중계를 다시 넣어 뒀다.", eff: { m: -3 } } },
  { id: "z_tired", age: [20, 85], repeat: true, cooldown: 3,
    text: "요즘 계속 피곤하다. 준영은 그걸 나이 탓으로 돌렸다.",
    choices: [
      { label: "일찍 잔다", text: "일찍 잤다. 다음 날이 확실히 달랐다.", eff: { h: 10, m: 5 }, tone: "good" },
      { label: "커피로 버틴다", text: "버텼다. 밤에 잠이 안 왔다.", eff: { h: -6, m: 3, w: -3 } },
      { label: "그냥 눕는다", text: "누워서 폰을 봤다. 한 시간이 세 시간이 됐다.", eff: { h: 2, m: 4 }, photo: "home_lie" },
    ],
    ignore: { text: "앉은 채로 졸았다.", eff: { h: 3 } } },
  { id: "z_voice", age: [18, 85], repeat: true, cooldown: 6, photo: "kara_close",
    text: "목이 쉬었다. 어제 너무 많이 떠들었다.",
    choices: [
      { label: "쉰다", text: "하루 조용히 있었다. 다들 무슨 일 있냐고 물었다.", eff: { h: 8, f: 4, t: -2 } },
      { label: "그래도 떠든다", text: "쉰 목소리가 더 웃기다는 걸 발견했다.", eff: { t: 10, h: -6, f: 6 }, tone: "good" },
    ] },
  { id: "z_checkup", age: [30, 85], repeat: true, cooldown: 7,
    text: "검진을 받으러 갔다. 대기실에서도 준영은 조용하지 않았다.",
    choices: [
      { label: "끝까지 받는다", text: "전부 받았다. 결과는 나쁘지 않았다.", eff: { h: 10, w: -10, m: 6 }, tone: "good" },
      { label: "도중에 나온다", text: "하나 남기고 나왔다. 그 하나가 계속 마음에 걸렸다.", eff: { h: -5, m: -6, w: -4 } },
    ],
    ignore: { text: "예약을 미루다가 1년이 지났다.", eff: { h: -8 } } },
  { id: "z_injury", age: [14, 80], repeat: true, cooldown: 7,
    text: "다쳤다. 크게는 아니고 애매하게 아프다.",
    choices: [
      { label: "병원에 간다", text: "별거 아니라고 했다. 그 말을 들으러 간 거였다.", eff: { h: 6, w: -5, m: 5 } },
      { label: "참는다", outcomes: [
        { w: 60, text: "며칠 지나니 나았다.", eff: { h: -2 } },
        { w: 40, text: "더 심해졌다. 결국 병원에 갔다.", eff: { h: -10, w: -8, m: -4 } },
      ] },
    ] },
  flavor("z_f1", [18, 85], 4, "앉았다 일어나는데 소리가 났다. 못 들은 척했다.", "home_sit", { h: -2, t: 4 }),
  flavor("z_f2", [18, 85], 4, "계단을 올라가고 숨을 골랐다. 2층이었다.", "out_stair", { h: -2, t: 5 }),
  flavor("z_f3", [18, 85], 5, "잠을 설쳤는데 이유를 모르겠다.", "home_lie", { h: -3, m: -2 }),
  flavor("z_f4", [16, 85], 5, "아침에 일어나서 얼굴이 부었다.", "face_squash", { t: 5, h: -1 }),
  flavor("z_f5", [20, 85], 6, "술 마신 다음 날이 예전 같지 않다.", "home_drink", { h: -4, m: -2 }),
  flavor("z_f6", [20, 85], 6, "운동하겠다고 산 옷만 늘어났다.", "day_uni3", { w: -5, t: 4 }),
  flavor("z_f7", [25, 85], 7, "흰머리를 하나 발견하고 한참 봤다.", "prop_hair", { m: -3, t: 4 }),
  flavor("z_f8", [25, 85], 7, "무릎이 날씨를 안다고 주장하기 시작했다.", "day_face1", { t: 5, h: -1 }),
  flavor("z_f9", [20, 85], 8, "건강식을 사 놓고 라면을 끓였다.", "eat_ramen", { h: -2, t: 5 }),
  flavor("z_f10", [18, 85], 8, "낮잠을 자고 일어나니 저녁이었다.", "home_lie", { h: 5, m: -2 }),
];
