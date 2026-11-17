/** 유년기 0~12세. 준영이 "웃기는 애"가 되어 가는 과정. */
import type { GameEvent } from "../../types";

export const CHILDHOOD: GameEvent[] = [
  {
    id: "c_first_joke", age: [4, 6], force: true, rare: true, photo: "face_grin",
    text: "준영이 처음으로 사람을 웃겼다. 본인은 뭘 해서 웃긴 건지 전혀 몰랐고, 그래서 같은 걸 열두 번 더 했다.",
    choices: [
      { label: "열세 번째를 한다", text: "열세 번째에 드디어 아무도 안 웃었다. 준영은 그 침묵을 아주 오래 기억했다.", eff: { t: 12, r: -4 }, tone: "rare", flagsAdd: ["웃기는애"] },
      { label: "거기서 멈춘다", text: "멈출 줄 아는 사람이 됐다. 다만 그건 그날 하루뿐이었다.", eff: { t: 7, m: 4 }, flagsAdd: ["웃기는애"] },
    ],
  },
  {
    id: "c_camera", age: [5, 11], repeat: true, cooldown: 3, photo: "face_wide",
    text: "카메라가 켜졌다. 준영의 몸이 먼저 반응했다.",
    choices: [
      { label: "렌즈에 얼굴을 밀어 넣는다", text: "코가 화면의 절반을 차지했다. 그 사진은 20년 뒤에도 돌아다닌다.", eff: { t: 8, r: -3, f: 4 }, photo: "face_nose1", tone: "good" },
      { label: "평범하게 찍힌다", text: "찍고 보니 준영이 아닌 것 같았다. 다시 찍었다.", eff: { r: 3, t: -2 } },
    ],
    ignore: { text: "셔터가 눌리는 순간 혀를 내밀었다. 반사신경이었다.", eff: { t: 4 }, flagsAdd: ["사진부심"] },
  },
  {
    id: "c_eat_race", age: [8, 13], repeat: true, cooldown: 4,
    text: "누가 더 빨리 먹나 내기가 붙었다. 준영은 내기인 줄도 모르고 이미 절반을 먹었다.",
    choices: [
      { label: "끝까지 간다", outcomes: [
        { w: 60, text: "이겼다. 상품은 없었고 명예만 있었다. 준영에겐 그거면 충분했다.", eff: { h: -4, r: 8, f: 6 }, photo: "face_bite2", tone: "good" },
        { w: 40, text: "이기긴 했는데 그날 저녁을 못 먹었다.", eff: { h: -9, r: 5 } },
      ] },
      { label: "속도를 늦춘다", text: "천천히 먹는 준영은 어딘가 어색했다. 본인도 그걸 느꼈다.", eff: { h: 3, r: -2 } },
    ],
    ignore: { text: "내기가 끝난 줄도 모르고 계속 먹고 있었다.", eff: { h: -2, f: 3 } },
  },
  { id: "c_sword", age: [6, 10], repeat: true, cooldown: 4, photo: "day_sword1",
    text: "집에 있는 긴 물건은 전부 무기가 된다. 오늘의 무기는 효자손이었다.",
    choices: [
      { label: "끝까지 휘두른다", text: "뭔가 깨졌다. 준영은 그게 자기가 아니어서 다행이라고 생각했다.", eff: { t: 6, r: -6, h: 2 }, photo: "day_sword2" },
      { label: "제자리에 둔다", text: "두고 나서 세 번 돌아봤다.", eff: { m: 3 } },
    ],
    ignore: { text: "휘두르다가 어른이 왔다.", eff: { r: -4, t: 3 } } },
  { id: "c_thumb", age: [5, 12], repeat: true, cooldown: 5, flavor: true, photo: "day_thumb2",
    text: "뭘 물어봐도 엄지를 들었다. 괜찮냐고 물으면 엄지, 맛있냐고 물어도 엄지.", eff: { t: 4, f: 3 } },
  { id: "c_mirror", age: [4, 9], repeat: true, cooldown: 4, flavor: true, photo: "fr_mirror",
    text: "거울 앞에서 표정을 만들었다. 제일 이상한 걸 고르는 데 20분이 걸렸다.", eff: { t: 5 } },
  { id: "c_photo_wall", age: [6, 12], repeat: true, cooldown: 5, flavor: true, photo: "home_pose2",
    text: "책장 앞이 준영의 전용 촬영장이었다. 각도까지 정해져 있었다.", eff: { t: 4, m: 3 } },
  {
    id: "c_scold_first", age: [7, 12], repeat: true, cooldown: 3,
    text: "혼나는 중이다. 준영의 머릿속에 지금 하면 절대 안 되는 말이 하나 떠올랐다.",
    choices: [
      { label: "참는다", text: "참았다. 집에 가는 길에 혼자 소리 내어 말해 봤다. 역시 웃겼다.", eff: { m: -3, t: 4 } },
      { label: "말한다", needs: { wit: 40 }, outcomes: [
        { w: 45, text: "혼내던 어른이 먼저 웃었다. 웃고 나서 더 화를 냈지만 이미 진 뒤였다.", eff: { t: 10, r: 4 }, tone: "good" },
        { w: 55, text: "정적이 아주 길었다.", eff: { r: -10, m: -6 }, tone: "bad" },
      ] },
    ],
    ignore: { text: "참으려다 표정으로 다 티가 났다.", eff: { r: -4 } },
  },
  { id: "c_friend_first", age: [6, 10], force: true, photo: "fr_choke1",
    text: "처음으로 친구라고 부를 사람이 생겼다. 첫날부터 목을 졸랐다. 둘 다 웃고 있었다.",
    choices: [
      { label: "같이 구른다", text: "그날 이후로 늘 붙어 다녔다.", eff: { f: 14, h: -2, t: 5 }, flagsAdd: ["오랜친구"], tone: "rare" },
      { label: "먼저 사과한다", text: "사과하자 친구가 더 당황했다. 그래도 그날부터 친구였다.", eff: { f: 10, r: 5 }, flagsAdd: ["오랜친구"] },
    ] },
  { id: "c_bath", age: [5, 11], repeat: true, cooldown: 4, flavor: true, photo: "day_bath",
    text: "욕실에서 노래가 들렸다. 가족들은 이미 익숙해져서 아무도 안 쳐다봤다.", eff: { m: 5, t: 3 } },
  { id: "c_sick", age: [3, 10], repeat: true, cooldown: 5,
    text: "열이 났다. 누워 있는데도 준영은 뭔가 웃긴 말을 하려고 했다.",
    choices: [
      { label: "그냥 잔다", text: "푹 자고 일어나니 나아 있었다.", eff: { h: 6, m: 3 } },
      { label: "아픈 척 과장한다", text: "과장이 너무 심해서 아무도 안 믿었다. 진짜 아픈 거였는데.", eff: { h: -4, t: 6, f: 3 } },
    ],
    ignore: { text: "자다 깨다 하면서 하루가 갔다.", eff: { h: 2 } } },
  { id: "c_draw", age: [6, 11], repeat: true, cooldown: 4,
    text: "미술 시간. 준영이 그린 건 사람이라고 했는데 아무도 동의하지 않았다.",
    choices: [
      { label: "제목을 붙인다", text: "제목 덕분에 갑자기 작품이 됐다. 선생님이 교실 뒤에 붙였다.", eff: { t: 9, r: 6 }, tone: "good" },
      { label: "다시 그린다", text: "두 번째는 더 이상했다.", eff: { t: 4, r: -2 } },
    ],
    ignore: { text: "그리다 말고 다른 애 그림에 낙서했다.", eff: { f: 4, r: -5 } } },
  { id: "c_hide", age: [5, 9], repeat: true, cooldown: 3, flavor: true,
    text: "숨바꼭질에서 준영은 늘 제일 먼저 잡혔다. 숨어서도 웃음소리가 났기 때문이다.", eff: { f: 5, t: 4 } },
  { id: "c_cold", age: [4, 12], repeat: true, cooldown: 6, flavor: true, photo: "prop_hood1",
    text: "추운 날에는 후드를 끝까지 조였다. 앞이 안 보여도 그대로 걸어갔다.", eff: { m: 4, h: -1 } },
  { id: "c_money", age: [8, 12], repeat: true, cooldown: 4,
    text: "용돈을 받았다. 쓰는 데 걸린 시간은 이틀이었다.",
    choices: [
      { label: "친구들 간식을 산다", text: "그날 준영은 아주 인기가 많았다. 다음 날부터는 돈이 없었다.", eff: { w: -8, f: 12, r: 5 }, tone: "good" },
      { label: "모은다", text: "모으기로 한 날 저녁에 절반을 썼다.", eff: { w: 4, m: 2 } },
    ],
    ignore: { text: "어디에 썼는지 본인도 기억을 못 했다.", eff: { w: -6, t: 3 } } },
  { id: "c_pet", age: [7, 12], photo: "out_sea1",
    text: "길에서 작은 동물을 만났다. 준영은 그 앞에 쪼그려 앉아 한참 말을 걸었다.",
    choices: [
      { label: "끝까지 말을 건다", text: "결국 대답은 못 들었지만 준영은 만족했다.", eff: { m: 10, t: 4 }, tone: "good" },
      { label: "먹을 걸 나눠 준다", text: "자기 간식을 통째로 줬다. 그날 준영은 배가 고팠다.", eff: { m: 12, h: -3 }, flagsAdd: ["마음약함"] },
    ] },
  { id: "c_show", age: [6, 11], repeat: true, cooldown: 4,
    text: "가족 앞에서 뭔가를 보여주겠다고 했다. 준비한 건 아무것도 없었다.",
    choices: [
      { label: "즉흥으로 한다", needs: { wit: 45 }, outcomes: [
        { w: 55, text: "진짜로 웃겼다. 그날 이후 명절마다 호출당했다.", eff: { t: 12, f: 8, r: 6 }, tone: "rare", flagsAdd: ["명절담당"] },
        { w: 45, text: "중간에 할 말이 떨어졌다. 그 침묵도 웃기긴 했다.", eff: { t: 5, r: -5 } },
      ] },
      { label: "없던 일로 한다", text: "앉고 나서 3초 뒤에 후회했다.", eff: { m: -4, t: -2 } },
    ],
    ignore: { text: "일어서긴 했는데 그냥 다시 앉았다.", eff: { m: -3 } } },
  { id: "c_rain", age: [5, 12], repeat: true, cooldown: 5, flavor: true,
    text: "비가 왔다. 우산을 들고도 다 젖어서 왔다. 어떻게 그랬는지는 설명하지 못했다.", eff: { h: -3, t: 5 } },
  { id: "c_lost", age: [5, 9],
    text: "길을 잃었다. 준영은 울지 않고 지나가는 사람한테 말을 걸기 시작했다.",
    choices: [
      { label: "계속 말을 건다", text: "다섯 명째에 집을 찾았다. 그 다섯 명 전부 준영을 기억했다.", eff: { f: 10, t: 8 }, tone: "good" },
      { label: "한자리에서 기다린다", text: "두 시간 뒤에 찾았다. 그동안 준영은 혼자 노래를 불렀다.", eff: { m: 6, h: -3 } },
    ] },
  { id: "c_nickname", age: [8, 12], force: true, rare: true,
    text: "별명이 생겼다. 전혀 멋있지 않은 별명이었다.",
    choices: [
      { label: "본인이 먼저 쓴다", text: "선수를 치니까 아무도 놀릴 수 없게 됐다. 준영은 이걸 일찍 배웠다.", eff: { t: 14, r: 6, m: 6 }, tone: "rare", flagsAdd: ["선수치기"] },
      { label: "싫다고 한다", text: "싫다고 할수록 더 불렀다.", eff: { m: -8, f: 4 } },
    ] },
];
