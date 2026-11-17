/** 일하는 시간. 직장이든 무대든, 돈이 걸리면 다르다. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const WORK: GameEvent[] = [
  { id: "r_newbie", age: [21, 35], requires: ["직장인"], repeat: true, cooldown: 6,
    text: "신입이 들어왔다. 준영을 선배라고 불렀다. 준영은 그 호칭이 어색했다.",
    choices: [
      { label: "웃겨 준다", text: "첫날부터 긴장이 풀렸다. 그 신입은 나중에 준영을 제일 따랐다.", eff: { t: 8, f: 12, r: 6 }, tone: "good", flagsAdd: ["따르는후배"] },
      { label: "일을 가르친다", text: "가르치다 보니 본인이 꽤 아는 사람이 돼 있었다.", eff: { r: 10, m: 8 } },
    ] },
  { id: "r_blame", age: [22, 55], requires: ["직장인"], repeat: true, cooldown: 5,
    text: "사고가 났다. 준영 탓은 아닌데, 준영이 제일 가까이 있었다.",
    choices: [
      { label: "일단 뒤집어쓴다", text: "뒤집어썼다. 나중에 진짜 책임자가 조용히 밥을 샀다.", eff: { r: -10, m: -6, f: 12 }, tone: "rare", flagsAdd: ["대신맞음"] },
      { label: "사실대로 말한다", text: "사실대로 말했다. 공기가 안 좋아졌지만 틀린 말은 없었다.", eff: { r: 6, f: -8, m: 4 } },
      { label: "농담으로 분위기를 돌린다", needs: { wit: 60 }, text: "웃음이 나자 다들 숨을 쉬었다. 문제는 그 뒤에 차분히 해결됐다.", eff: { t: 10, r: 8, f: 8 }, tone: "good" },
    ],
    ignore: { text: "아무 말도 안 하는 사이에 준영 이름이 올라갔다.", eff: { r: -8, m: -6 } } },
  { id: "r_praise", age: [22, 60], repeat: true, cooldown: 7,
    text: "잘했다는 말을 들었다. 준영은 칭찬을 받는 법을 모른다.",
    choices: [
      { label: "농담으로 받는다", text: "농담으로 받고 돌아서서 혼자 웃었다.", eff: { t: 6, m: 10 }, tone: "good" },
      { label: "고맙다고 한다", text: "짧게 고맙다고 했다. 그 말이 더 오래 남았다.", eff: { m: 12, r: 6 } },
    ] },
  { id: "r_late", age: [21, 55], requires: ["직장인"], repeat: true, cooldown: 4,
    text: "지각이다. 변명을 생각할 시간은 3분 남았다.",
    choices: [
      { label: "창의적인 변명을 한다", needs: { wit: 55 }, outcomes: [
        { w: 55, text: "변명이 너무 웃겨서 아무도 더 안 물었다.", eff: { t: 10, r: -3, f: 6 }, tone: "good" },
        { w: 45, text: "변명이 너무 창의적이라 오히려 더 혼났다.", eff: { r: -10, t: 6 } },
      ] },
      { label: "그냥 사과한다", text: "그냥 늦었다고 했다. 그게 제일 빨랐다.", eff: { r: 3, m: -3 } },
    ],
    ignore: { text: "조용히 자리에 앉았다. 다 봤다.", eff: { r: -6 } } },
  { id: "r_team", age: [23, 55], requires: ["직장인"], repeat: true, cooldown: 6,
    text: "팀 분위기가 가라앉았다. 다들 서로 말을 안 한다.",
    choices: [
      { label: "점심을 산다", text: "밥 한 끼에 분위기가 풀렸다. 돈이 좀 들었다.", eff: { w: -10, f: 14, r: 8 }, tone: "good" },
      { label: "웃긴 걸 돌린다", needs: { wit: 50 }, text: "단톡방에 사진 한 장을 올렸다. 그걸로 끝났다.", eff: { t: 8, f: 10 }, tone: "good", photo: "meme_evidence" },
      { label: "가만히 둔다", text: "시간이 해결했다. 느리게 해결했다.", eff: { m: -4 } },
    ] },
  { id: "r_night_shift", age: [21, 50], repeat: true, cooldown: 5, flavor: true,
    text: "야근이 길어졌다. 사무실에 혼자 남아 혼잣말을 했다. 그 혼잣말이 꽤 재밌었다.", eff: { w: 5, h: -5, m: -3, t: 3 } },
  { id: "r_client", age: [24, 55], repeat: true, cooldown: 5,
    text: "까다로운 상대를 만났다. 말이 안 통한다.",
    choices: [
      { label: "말로 풀어 본다", needs: { wit: 60 }, outcomes: [
        { w: 60, text: "끝날 때쯤 상대가 먼저 웃었다. 그걸로 일이 풀렸다.", eff: { t: 10, w: 12, r: 10 }, tone: "rare" },
        { w: 40, text: "통하지 않았다. 통하지 않는 사람도 있다.", eff: { m: -8, w: -4 } },
      ] },
      { label: "원칙대로 간다", text: "원칙대로 했다. 느렸지만 탈은 없었다.", eff: { r: 8, w: 6, m: -3 } },
    ] },
  { id: "r_quit_day", age: [25, 55], requires: ["직장인"], repeat: true, cooldown: 12, major: true,
    text: "마지막 출근날이다. 책상을 정리하는데 생각보다 짐이 많았다.",
    choices: [
      { label: "한마디 하고 나간다", text: "마지막까지 웃겼다. 몇 명이 울었다.", eff: { t: 12, f: 16, m: 12 }, tone: "rare", flagsRemove: ["직장인"], flagsAdd: ["백수"] },
      { label: "조용히 나간다", text: "인사도 안 하고 나왔다. 엘리베이터에서 혼자 한참 서 있었다.", eff: { m: -10, f: -6 }, flagsRemove: ["직장인"], flagsAdd: ["백수"] },
    ] },
  flavor("r_f1", [21, 55], 3, "출근길 버스 창에 비친 얼굴로 표정을 만들어 봤다.", "day_face6", { m: 3, t: 3 }),
  flavor("r_f2", [21, 55], 4, "점심 메뉴 정하는 데 30분이 걸렸다. 준영 때문이었다.", "eat_menu", { f: 4, t: 4 }),
  flavor("r_f3", [21, 55], 4, "회의 중에 웃음을 참느라 얼굴이 이상해졌다.", "dc_serious", { t: 5, r: -2 }),
  flavor("r_f4", [21, 55], 5, "작업복이든 유니폼이든, 입으면 일단 사진부터 찍는다.", "day_uni3", { t: 5, f: 3 }),
  flavor("r_f5", [21, 55], 5, "퇴근 시간 5분 전부터 가방을 메고 있었다.", "day_face9", { m: 4, r: -2 }),
  flavor("r_f6", [21, 55], 6, "업무용 메신저에서도 말투가 똑같았다.", "meme_kakao", { t: 5, f: 4 }),
  flavor("r_f7", [21, 55], 6, "명함을 받고 한참 들여다봤다.", "day_calm", { r: 4, m: 4 }),
  flavor("r_f8", [21, 55], 7, "회식 자리에서 제일 먼저 마이크를 잡았다.", "kara_mic", { t: 6, f: 6, h: -3 }),
  flavor("r_f9", [21, 55], 7, "정장 입은 날은 하루 종일 자세가 달랐다.", "day_suit", { r: 6, m: 4 }),
  flavor("r_f10", [22, 55], 8, "야근하고 나와서 혼자 라면을 먹었다.", "eat_ramen", { h: -2, m: 6 }),
];
