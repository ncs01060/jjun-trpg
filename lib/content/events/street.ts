/** 바깥. 길에서, 가게에서, 지나가면서 생기는 일들. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const STREET: GameEvent[] = [
  { id: "t_stranger", age: [14, 80], repeat: true, cooldown: 4,
    text: "모르는 사람이 길을 물었다. 준영은 그 방향을 잘 모른다.",
    choices: [
      { label: "같이 찾아 준다", text: "결국 같이 걸어서 데려다줬다. 10분 거리를 25분에 갔다.", eff: { f: 8, m: 10, h: -2 }, tone: "good" },
      { label: "아는 척한다", outcomes: [
        { w: 45, text: "운 좋게 맞았다. 준영도 놀랐다.", eff: { t: 6, m: 6 } },
        { w: 55, text: "완전히 틀렸다. 그 사람은 아직도 모른다.", eff: { t: 6, r: -4 } },
      ] },
    ],
    ignore: { text: "못 들은 척 지나갔다. 세 걸음 걷고 돌아봤다.", eff: { m: -4 } } },
  { id: "t_bus", age: [13, 80], repeat: true, cooldown: 3, photo: "day_face6",
    text: "버스를 놓칠 뻔했다. 준영이 뛰기 시작했다.",
    choices: [
      { label: "끝까지 뛴다", outcomes: [
        { w: 60, text: "탔다. 숨이 차서 5분 동안 말을 못 했다. 말 못 하는 준영은 처음이었다.", eff: { h: -4, t: 6, f: 4 }, photo: "out_run" },
        { w: 40, text: "눈앞에서 떠났다. 준영은 손을 흔들어 줬다.", eff: { h: -5, m: -3, t: 5 } },
      ] },
      { label: "포기한다", text: "포기하고 다음 걸 기다렸다. 그 시간에 사진을 열 장 찍었다.", eff: { m: 5, t: 4 } },
    ] },
  { id: "t_store", age: [14, 80], repeat: true, cooldown: 3,
    text: "편의점에 들어갔다. 하나만 사려고 했다.",
    choices: [
      { label: "하나만 산다", text: "진짜 하나만 샀다. 나오면서 뿌듯해했다.", eff: { w: 2, m: 4 } },
      { label: "결국 한 봉지를 산다", text: "양손에 들고 나왔다. 돈은 생각보다 많이 나갔다.", eff: { w: -7, h: -1, m: 8 }, photo: "eat_can2" },
    ],
    ignore: { text: "뭘 사러 왔는지 잊고 나왔다.", eff: { t: 4 } } },
  { id: "t_rain", age: [12, 85], repeat: true, cooldown: 4,
    text: "갑자기 비가 왔다. 우산은 당연히 없다.",
    choices: [
      { label: "그냥 걷는다", text: "다 젖어서 집에 왔다. 그 와중에 사진을 찍었다.", eff: { h: -5, m: 8, t: 5 }, photo: "face_blur" },
      { label: "어딘가로 들어간다", text: "처마 밑에서 20분을 기다렸다. 옆 사람과 친해졌다.", eff: { f: 6, h: 1 } },
    ] },
  { id: "t_photo_ask", age: [16, 80], repeat: true, cooldown: 5,
    text: "누가 사진을 찍어 달라고 부탁했다. 준영은 이런 걸 잘한다.",
    choices: [
      { label: "제대로 찍어 준다", text: "각도를 세 번 바꿔서 찍어 줬다. 상대가 아주 좋아했다.", eff: { f: 10, r: 8, m: 6 }, tone: "good" },
      { label: "한 장은 장난으로 찍는다", text: "마지막 한 장이 이상하게 나왔다. 그게 제일 마음에 든다고 했다.", eff: { t: 10, f: 8 }, tone: "good" },
    ] },
  { id: "t_fall", age: [12, 85], repeat: true, cooldown: 6,
    text: "길에서 넘어졌다. 사람이 꽤 많다.",
    choices: [
      { label: "일부러 더 과장한다", text: "넘어진 김에 한 바퀴 굴렀다. 박수가 나왔다.", eff: { t: 14, f: 8, h: -4, r: -4 }, tone: "good" },
      { label: "빠르게 일어난다", text: "아무 일 없었던 척했다. 무릎은 아팠다.", eff: { h: -4, r: 3, m: -3 } },
    ],
    ignore: { text: "일어나는 데 시간이 좀 걸렸다.", eff: { h: -5, r: -3 } } },
  { id: "t_market", age: [16, 85], repeat: true, cooldown: 6,
    text: "시장에 갔다. 상인이 준영을 보고 먼저 말을 걸었다.",
    choices: [
      { label: "흥정한다", needs: { wit: 50 }, outcomes: [
        { w: 60, text: "깎았다. 덤까지 받았다. 준영의 말이 돈이 된 드문 순간이었다.", eff: { w: 8, t: 8, f: 5 }, tone: "good" },
        { w: 40, text: "깎으려다 더 샀다.", eff: { w: -8, f: 6, t: 5 } },
      ] },
      { label: "그냥 산다", text: "부르는 대로 샀다. 대신 많이 받았다.", eff: { w: -4, f: 6 } },
    ] },
  { id: "t_lost_thing", age: [14, 85], repeat: true, cooldown: 5,
    text: "뭔가를 잃어버렸다. 어디서 잃어버렸는지도 모른다.",
    choices: [
      { label: "끝까지 찾는다", outcomes: [
        { w: 50, text: "찾았다. 엉뚱한 데 있었다.", eff: { m: 8, h: -3 } },
        { w: 50, text: "못 찾았다. 일주일 뒤에 주머니에서 나왔다.", eff: { m: -5, t: 6, w: -5 } },
      ] },
      { label: "포기한다", text: "빨리 포기했다. 포기도 재능이다.", eff: { m: 4, w: -6 } },
    ] },
  flavor("t_f1", [14, 80], 4, "신호를 기다리는 중이다. 가만히 못 있는다.", "out_cross", { t: 4 }),
  flavor("t_f2", [14, 80], 4, "신호가 바뀌었는데 혼자 늦게 출발했다.", "out_cross2", { t: 4 }),
  flavor("t_f3", [14, 80], 5, "길에서도 저런다. 장소를 가리지 않는다.", "out_street1", { t: 5, r: -2 }),
  flavor("t_f4", [14, 80], 5, "손에 뭔가 들고 있었다. 뭔지는 안 알려줬다.", "out_street2", { t: 4 }),
  flavor("t_f5", [14, 80], 5, "걸어가면서도 폰을 봤다. 두 번 부딪혔다.", "day_walk1", { h: -1, t: 4 }),
  flavor("t_f6", [14, 80], 6, "거의 다 왔다고 했다. 20분 더 걸렸다.", "day_walk2", { t: 5 }),
  flavor("t_f7", [14, 80], 6, "부르면 저렇게 돌아본다. 매번 같은 각도다.", "day_turn", { t: 4, f: 3 }),
  flavor("t_f8", [14, 80], 6, "벽 앞에서 찍혔다. 벽이 더 잘 나왔다.", "day_wall", { t: 4 }),
  flavor("t_f9", [14, 80], 7, "옆모습은 멀쩡하다. 본인도 그걸 안다.", "day_side", { r: 4 }),
  flavor("t_f10", [14, 80], 7, "저녁 먹으러 가는 길이 제일 기분 좋다.", "day_face8", { m: 6 }),
  flavor("t_f11", [14, 80], 7, "가방을 메고 어디론가 가는 중이었다.", "day_face9", { m: 3 }),
  flavor("t_f12", [14, 80], 8, "실내에서도 저 표정이다.", "day_face10", { t: 4 }),
  flavor("t_f13", [14, 80], 8, "앉자마자 폰을 켰다.", "day_face11", { m: 3 }),
  flavor("t_f14", [14, 80], 8, "모자를 쓰면 저렇게 된다.", "day_face5", { t: 4 }),
  flavor("t_f15", [14, 80], 9, "버스에서 찍혔다. 모르는 척했다.", "day_face6", { t: 4 }),
  flavor("t_f16", [14, 80], 9, "생각하는 중이라고 했다. 아무 생각도 없어 보였다.", "day_face3", { t: 5 }),
  flavor("t_f17", [14, 80], 9, "부르는 소리에 돌아봤는데 아무도 안 불렀다.", "day_face4", { t: 5 }),
  flavor("t_f18", [14, 80], 9, "기분이 좋아 보이는 날이었다.", "day_face7", { m: 6 }),
  flavor("t_f19", [16, 80], 9, "마스크를 썼는데도 누군지 다 알아봤다.", "day_mask", { t: 5, r: -2 }),
  flavor("t_f20", [14, 80], 9, "내려다보는 중이었다. 아래에는 아무것도 없었다.", "day_look", { t: 4 }),
];
