/** 사람들. 준영 주위에는 늘 누가 있었다. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const FRIENDS: GameEvent[] = [
  { id: "p_sleep", age: [14, 70], repeat: true, cooldown: 5, photo: "fr_poke",
    text: "친구가 잠들었다. 아주 깊게 잠들었다. 준영의 손가락이 자동으로 움직였다.",
    choices: [
      { label: "찌른다", text: "찔렀다. 친구는 안 깼다. 준영은 열한 번 더 찔렀고 그제서야 깼다.", eff: { t: 7, f: 5, r: -3 }, tone: "good", flagsAdd: ["장난꾸러기"] },
      { label: "사진만 찍는다", text: "증거를 남겼다. 그 사진은 나중에 아주 유용하게 쓰였다.", eff: { t: 5, f: 3 }, photo: "fr_lap" },
      { label: "이불을 덮어 준다", text: "아무도 안 보는 데서 그랬다. 그게 준영의 진짜 모습이라고, 본인만 모른다.", eff: { m: 10, f: 8 }, tone: "rare" },
    ],
    ignore: { text: "고민하는 사이에 친구가 알아서 깼다.", eff: {} } },
  { id: "p_choke", age: [10, 60], repeat: true, cooldown: 4, photo: "fr_choke1",
    text: "친구를 보자마자 목을 걸었다. 인사였다.",
    choices: [
      { label: "끝까지 간다", text: "둘 다 넘어졌다. 둘 다 웃고 있었다.", eff: { f: 10, h: -3, t: 6 }, tone: "good", photo: "fr_choke2" },
      { label: "풀어 준다", text: "풀어 주자 이번엔 친구가 걸었다.", eff: { f: 8, t: 4 } },
    ] },
  { id: "p_help", age: [16, 80], repeat: true, cooldown: 5,
    text: "친구가 힘들다고 했다. 준영은 이럴 때 어떻게 해야 하는지 잘 모른다.",
    choices: [
      { label: "웃긴다", needs: { wit: 55 }, outcomes: [
        { w: 60, text: "울다가 웃었다. 그게 준영이 아는 유일한 위로다.", eff: { t: 8, f: 14, m: 8 }, tone: "rare" },
        { w: 40, text: "타이밍이 틀렸다. 준영은 바로 알아차리고 입을 닫았다.", eff: { f: 4, m: -6 } },
      ] },
      { label: "그냥 옆에 있는다", text: "아무 말도 안 하고 두 시간을 같이 있었다. 그날 이후로 더 가까워졌다.", eff: { f: 16, m: 10 }, tone: "rare", flagsAdd: ["진짜친구"] },
      { label: "밥을 사 준다", text: "먹으면서 조금 나아졌다. 준영이 아는 또 다른 방법이다.", eff: { w: -8, f: 12, m: 6 } },
    ],
    ignore: { text: "뭐라 해야 할지 몰라서 아무 말도 못 했다.", eff: { m: -8, f: -4 } } },
  { id: "p_reunion", age: [30, 70], requires: ["같이망한친구들"], major: true, rare: true, photo: "fr_shout",
    text: "그때 같이 망한 다섯 명이 십몇 년 만에 모였다. 자리에 앉자마자 누군가 그날 얘기를 꺼냈다.",
    choices: [
      { label: "그날 얘기를 끝까지 한다", text: "네 시간 동안 그 얘기만 했다. 다섯 명 다 처음 듣는 것처럼 웃었다.", eff: { m: 20, f: 16, t: 10 }, tone: "rare", flagsAdd: ["오래간사람들"] },
      { label: "이번엔 남 얘기를 듣는다", text: "준영이 네 시간 동안 듣기만 했다. 아무도 그걸 지적하지 않았다. 그게 더 고마웠다.", eff: { m: 16, f: 20 }, tone: "rare", flagsAdd: ["오래간사람들"] },
    ] },
  { id: "p_wedding", age: [28, 60], repeat: true, cooldown: 6,
    text: "친구가 결혼한다고 했다. 준영한테 사회를 봐 달라고 했다.",
    choices: [
      { label: "본다", outcomes: [
        { w: 60, text: "식장이 뒤집혔다. 신부 쪽 하객까지 웃었다.", eff: { t: 14, f: 14, r: 10 }, tone: "rare", flagsAdd: ["사회전문"] },
        { w: 40, text: "한 번 선을 넘었다. 그 뒤로는 안전하게 갔다.", eff: { t: 8, r: -6, f: 8 } },
      ] },
      { label: "거절한다", text: "거절하고 하객석에서 제일 크게 웃었다.", eff: { f: 8, m: 5 } },
    ] },
  { id: "p_fight", age: [18, 70], repeat: true, cooldown: 7,
    text: "친구와 크게 싸웠다. 준영은 이런 걸 어떻게 푸는지 모른다.",
    choices: [
      { label: "먼저 연락한다", outcomes: [
        { w: 65, text: "먼저 연락했다. 둘 다 사과할 생각이 없었는데 밥은 같이 먹었다.", eff: { f: 14, m: 10 }, tone: "good" },
        { w: 35, text: "읽씹당했다. 준영은 그 화면을 한참 봤다.", eff: { m: -14, f: -8 }, tone: "bad" },
      ] },
      { label: "웃긴 걸 보낸다", needs: { wit: 50 }, text: "아무 설명도 없이 사진 한 장을 보냈다. 답장은 \"ㅋㅋㅋ\" 하나였고 그걸로 끝났다.", eff: { t: 8, f: 12, m: 8 }, tone: "rare", photo: "meme_evidence" },
      { label: "기다린다", text: "기다렸다. 연락은 결국 왔다. 세 달 뒤였다.", eff: { m: -10, f: 4 } },
    ] },
  { id: "p_show_phone", age: [14, 80], repeat: true, cooldown: 3, photo: "fr_show",
    text: "준영이 폰을 들이밀었다. 이거 봐야 한다고 했다.",
    choices: [
      { label: "본다", text: "별 거 아니었는데 준영의 설명이 더 웃겼다.", eff: { f: 8, t: 6 }, tone: "good", photo: "fr_show2" },
      { label: "나중에 본다고 한다", text: "나중은 없었다. 끝까지 들이밀었다.", eff: { f: 4, t: 4 } },
    ],
    ignore: { text: "들이민 채로 5분이 지났다.", eff: { t: 4 } } },
  { id: "p_lend", age: [20, 70], repeat: true, cooldown: 6, needs: { money: 20 },
    text: "친구가 돈을 빌려 달라고 했다. 준영은 거절해 본 적이 없다.",
    choices: [
      { label: "빌려준다", outcomes: [
        { w: 55, text: "제때 갚았다. 갚으면서 밥까지 샀다.", eff: { w: -5, f: 12, r: 5 }, tone: "good" },
        { w: 45, text: "연락이 뜸해졌다. 준영은 돈보다 그게 더 섭섭했다.", eff: { w: -14, f: -8, m: -8 }, tone: "bad" },
      ] },
      { label: "못 빌려준다고 한다", text: "거절하고 나서 사흘을 생각했다.", eff: { w: 3, m: -8, f: -4 } },
    ] },
  { id: "p_group_photo", age: [14, 80], repeat: true, cooldown: 4,
    text: "단체 사진을 찍는다. 준영은 맨 뒤에서 뭔가를 하고 있다.",
    choices: [
      { label: "끝까지 한다", text: "그 사진 한 장 때문에 다시 찍었다. 두 번째도 똑같이 했다.", eff: { t: 10, f: 8, r: -5 }, tone: "good", photo: "face_wide" },
      { label: "한 장은 제대로 찍는다", text: "두 장을 찍었다. 다들 두 번째를 저장했다.", eff: { f: 8, r: 5 }, photo: "day_calm" },
    ],
    ignore: { text: "셔터가 눌리는 순간 눈을 감았다.", eff: { t: 4, f: 3 } } },
  { id: "p_new", age: [18, 60], repeat: true, cooldown: 4,
    text: "처음 보는 사람이 자리에 끼었다. 공기가 약간 어색하다.",
    choices: [
      { label: "말을 건다", needs: { wit: 45 }, outcomes: [
        { w: 65, text: "10분 만에 원래 알던 사이처럼 됐다. 준영의 특기다.", eff: { f: 12, t: 8, r: 5 }, tone: "good" },
        { w: 35, text: "너무 빨리 친한 척해서 상대가 당황했다.", eff: { f: 3, r: -5, t: 4 } },
      ] },
      { label: "기다린다", text: "기다리다 보니 상대가 먼저 말을 걸었다.", eff: { f: 6, m: 3 } },
    ] },
  flavor("p_f1", [14, 80], 5, "자는 사람은 건드리는 게 아니다. 준영은 그 말을 모른다.", "fr_poke", { t: 5, f: 4 }),
  flavor("p_f2", [14, 80], 6, "둘 중 하나는 말리고 있었다. 누군지는 사진으로도 모르겠다.", "fr_shout", { f: 6, t: 4 }),
  flavor("p_f3", [16, 80], 6, "무릎을 빌려줬다. 다리가 저렸지만 안 깨웠다.", "fr_lap", { f: 8, m: 5 }),
  flavor("p_f4", [14, 80], 5, "갑자기 뒤에서 끌어안았다. 인사라고 했다.", "fr_hug", { f: 6, t: 4 }),
  flavor("p_f5", [14, 80], 6, "뒤에서 조용히 따라갔다. 들킬 때까지 3분 걸렸다.", "fr_back", { t: 5, f: 4 }),
  flavor("p_f6", [14, 80], 7, "둘이 같이 서 있으면 왜인지 더 웃기다.", "fr_two", { f: 6, t: 4 }),
  flavor("p_f7", [16, 80], 7, "거울 앞에서 둘이 한참 있었다. 결과물은 한 장이었다.", "fr_mirror", { t: 5, f: 4 }),
  flavor("p_f8", [16, 80], 8, "단톡방에 이게 올라왔다. 누가 올렸는지는 끝내 안 밝혀졌다.", "meme_kakao", { t: 7, f: 5 }),
  flavor("p_f9", [16, 80], 9, "친구들이 준영을 소재로 뭘 만들었다. 본인이 제일 좋아했다.", "meme_wanted", { t: 8, f: 6 }),
  flavor("p_f10", [16, 80], 9, "기술 이름까지 적혀 있었다. 수치는 과장됐다고 주장했다.", "meme_card1", { t: 7, f: 5 }),
];
