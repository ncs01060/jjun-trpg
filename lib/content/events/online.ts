/** 화면 너머. 디스코드, 화상수업, 게임, 통화. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const ONLINE: GameEvent[] = [
  { id: "o_disc", age: [16, 60], repeat: true, cooldown: 2, weight: 1.3, photo: "dc_start",
    text: "통화가 연결됐다. 준영의 카메라가 켜져 있다. 오늘도 그 차림이다.",
    choices: [
      { label: "카메라를 켜 둔다", text: "두 시간 동안 아무도 그 복장을 언급하지 않았다. 그게 더 웃겼다.", eff: { t: 10, f: 10 }, tone: "good", photo: "dc_calm" },
      { label: "끈다", text: "껐는데 목소리만으로도 티가 났다.", eff: { t: 6, f: 6 } },
    ],
    ignore: { text: "켜 놓고 자리를 비웠다. 화면에 얼굴만 남아 있었다.", eff: { t: 8, f: 6 }, flagsAdd: ["화면에얼굴"] } },
  { id: "o_class", age: [17, 30], repeat: true, cooldown: 4, photo: "dc_class1",
    text: "화상수업이다. 준영의 화면만 유난히 밝다.",
    choices: [
      { label: "그대로 참여한다", text: "교수님 화면에도 저게 떴다. 준영은 손까지 들었다.", eff: { t: 14, r: -8, f: 10 }, tone: "rare", photo: "dc_class2" },
      { label: "화면을 끈다", text: "끄고 나서 채팅으로만 떠들었다.", eff: { t: 8, r: 3 } },
    ],
    ignore: { text: "켜 둔 채로 뒤로 넘어갔다.", eff: { t: 10, r: -6, f: 6 }, photo: "dc_back" } },
  { id: "o_game", age: [12, 60], repeat: true, cooldown: 3, photo: "day_game1",
    text: "게임이 시작됐다. 준영의 표정이 제일 진지해지는 순간이다.",
    choices: [
      { label: "끝까지 간다", outcomes: [
        { w: 45, text: "이겼다. 그날 밤 내내 그 얘기를 했다.", eff: { m: 12, f: 8, h: -3 }, tone: "good" },
        { w: 55, text: "졌다. 지는 과정이 더 재밌었다.", eff: { m: -4, f: 10, t: 8 }, photo: "day_game2" },
      ] },
      { label: "그만한다", text: "그만한다고 하고 한 판 더 했다.", eff: { h: -4, m: 5 } },
    ],
    ignore: { text: "하다가 그대로 잠들었다.", eff: { h: 2, m: 3 } } },
  { id: "o_call", age: [16, 80], repeat: true, cooldown: 3, photo: "day_call1",
    text: "전화가 왔다. 준영은 통화를 길게 하는 사람이다.",
    choices: [
      { label: "끝까지 받는다", text: "한 시간을 같은 자세로 서 있었다. 끊고 나서도 한참 그대로였다.", eff: { f: 10, m: 8, h: -2 }, photo: "day_call3" },
      { label: "짧게 끊는다", text: "짧게 끊고 나서 다시 걸었다.", eff: { f: 6, t: 4 } },
    ] },
  { id: "o_headset", age: [16, 60], repeat: true, cooldown: 4, photo: "day_head1",
    text: "헤드셋을 쓰면 준영의 목소리가 두 배가 된다. 본인은 모른다.",
    choices: [
      { label: "그대로 둔다", text: "옆방까지 들렸다. 가족이 문을 두드렸다.", eff: { t: 10, f: 8, r: -6 }, tone: "good", photo: "day_head2" },
      { label: "볼륨을 줄인다", text: "볼륨을 줄여도 목소리는 그대로였다.", eff: { t: 5, r: 3 } },
    ] },
  { id: "o_meme", age: [16, 70], repeat: true, cooldown: 5, photo: "meme_card2",
    text: "친구들이 준영으로 뭔가를 만들었다. 카드 형태였다.",
    choices: [
      { label: "프로필 사진으로 쓴다", text: "본인이 제일 좋아했다. 2년 동안 그걸 썼다.", eff: { t: 12, f: 10, m: 8 }, tone: "rare", photo: "meme_card7" },
      { label: "수치를 항의한다", text: "수치가 과장됐다고 주장했다. 아무도 안 고쳐 줬다.", eff: { t: 8, f: 6 }, photo: "meme_card5" },
    ],
    ignore: { text: "말없이 저장했다.", eff: { t: 6, m: 5 } } },
  { id: "o_night_call", age: [18, 70], repeat: true, cooldown: 6,
    text: "새벽 세 시에 통화가 아직 안 끊겼다. 둘 다 할 말은 없다.",
    choices: [
      { label: "계속 켜 둔다", text: "둘 다 자면서 통화를 켜 뒀다. 아침에 보니 아직 연결돼 있었다.", eff: { f: 14, m: 10, h: -4 }, tone: "rare", flagsAdd: ["새벽통화"] },
      { label: "끊는다", text: "끊고 나서 둘 다 못 잤다.", eff: { m: 4, h: 2 } },
    ] },
  flavor("o_f1", [16, 60], 4, "오늘도 이 차림이다. 바뀐 적이 없다.", "dc_start", { t: 5, f: 3 }),
  flavor("o_f2", [16, 60], 4, "말하는 중이다. 10분째 혼자 말하는 중이다.", "dc_talk", { t: 5, f: 4 }),
  flavor("o_f3", [16, 60], 5, "입만 보냈다. 설명은 없었다.", "dc_lip1", { t: 6 }),
  flavor("o_f4", [16, 60], 5, "또 입만 보냈다.", "dc_lip2", { t: 5 }),
  flavor("o_f5", [16, 60], 5, "고개를 기울이면 다른 사람이 된다.", "dc_tilt", { t: 5 }),
  flavor("o_f6", [16, 60], 6, "웃는 건지 아닌지 모르겠는 표정으로 20분을 있었다.", "dc_smile", { t: 6 }),
  flavor("o_f7", [16, 60], 6, "불을 안 켜서 더 무서워졌다.", "dc_dark1", { t: 6, f: 3 }),
  flavor("o_f8", [16, 60], 6, "마이크가 터질 뻔했다.", "dc_yell", { t: 7, f: 5, h: -1 }),
  flavor("o_f9", [16, 60], 7, "혼자 웃다가 끝났다. 아무도 이유를 못 들었다.", "dc_laugh", { t: 6, m: 4 }),
  flavor("o_f10", [16, 60], 7, "화면을 다 가렸다. 다른 사람 얼굴이 안 보였다.", "dc_wide", { t: 6 }),
  flavor("o_f11", [16, 60], 7, "손 모양에 뜻이 있다고 했다. 뜻은 끝내 안 알려줬다.", "dc_hand", { t: 5 }),
  flavor("o_f12", [16, 60], 8, "조용히 하라는 뜻이었다. 본인이 제일 시끄러웠다.", "dc_quiet", { t: 6, f: 4 }),
  flavor("o_f13", [16, 60], 8, "그날 제일 시끄러웠다.", "dc_shout", { t: 6, f: 5 }),
  flavor("o_f14", [16, 60], 8, "끝까지 안 나갔다. 마지막 한 명이었다.", "dc_end", { f: 7, m: 5 }),
  flavor("o_f15", [16, 60], 9, "마지막까지 저 차림이었다.", "dc_last", { t: 7, f: 4 }),
  flavor("o_f16", [14, 60], 5, "게임하다 졌는데 표정이 더 웃겼다.", "day_game2", { t: 5, m: -2 }),
  flavor("o_f17", [16, 70], 6, "같은 자세로 20분 통화했다.", "day_call2", { f: 5 }),
  flavor("o_f18", [16, 70], 7, "방금 뭐라고 했는데 아무도 못 알아들었다.", "day_head2", { t: 5 }),
];
