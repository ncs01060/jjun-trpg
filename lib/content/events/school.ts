/** 학창 시절 13~19세. 교실이 준영의 첫 무대였다. */
import type { GameEvent } from "../../types";

export const SCHOOL: GameEvent[] = [
  {
    id: "s_class_mic", age: [13, 18], force: true, major: true, photo: "prop_mic",
    text: "수업 중에 선생님이 자리를 비웠다. 교실이 조용해지자 준영이 일어섰다. 손에는 풀이 들려 있었다.",
    choices: [
      { label: "풀을 마이크처럼 잡는다", outcomes: [
        { w: 70, text: "교실이 뒤집혔다. 준영은 끝까지 그게 마이크인 척했다. 선생님이 돌아왔을 때도 안 내려놨다.", eff: { t: 16, f: 12, r: -8 }, tone: "rare", flagsAdd: ["교실스타"] },
        { w: 30, text: "하필 그때 선생님이 들어왔다. 풀을 든 채로 복도에 서 있었다.", eff: { t: 10, r: -14, m: -5 }, photo: "face_squint" },
      ] },
      { label: "그냥 앉는다", text: "앉고 나서 3초 뒤에 후회했다. 그 3초가 평생 갔다.", eff: { m: -6, t: -4, r: 4 } },
    ],
  },
  {
    id: "s_scolded", age: [13, 19], repeat: true, cooldown: 3,
    text: "혼나는 중이다. 분위기가 아주 무겁고, 준영의 머릿속에는 지금 하면 안 되는 말이 하나 떠올랐다.",
    choices: [
      { label: "그 말을 한다", needs: { wit: 55 }, outcomes: [
        { w: 55, text: "혼내던 사람이 먼저 웃었다. 웃고 나서 더 화를 냈지만, 이미 진 뒤였다.", eff: { t: 10, r: 5, m: 8 }, tone: "good", photo: "face_tilt" },
        { w: 45, text: "아무도 안 웃었다. 정적이 길었다. 준영은 그 정적도 농담으로 만들려다 실패했다.", eff: { t: 4, r: -10, m: -8 }, tone: "bad" },
      ] },
      { label: "참는다", text: "참았다. 집에 가는 길에 혼자 그 말을 소리 내어 해 봤다. 역시 웃겼다.", eff: { m: -4, t: 3 } },
    ],
    ignore: { text: "참으려다 표정으로 다 티가 났다.", eff: { r: -5, t: 2 } },
  },
  {
    id: "s_exam_night", age: [17, 19], force: true, major: true,
    text: "시험 전날 새벽 두 시. 책은 절반도 못 봤다. 준영은 갑자기 아주 웃긴 생각이 떠올라서 단톡방을 켰다.",
    choices: [
      { label: "단톡방에 푼다", text: "다섯 명이 같이 안 잤다. 전부 같이 망했다. 준영은 그걸 인맥이라고 불렀다.", eff: { t: 12, f: 14, r: -10, h: -6 }, tone: "good", flagsAdd: ["같이망한친구들"] },
      { label: "혼자 참고 공부한다", text: "새벽 네 시에 그 생각이 더 이상 안 웃기다는 걸 깨달았다. 그래서 더 슬펐다.", eff: { r: 10, m: -8, h: -6, t: -3 }, flagsAdd: ["벼락치기"] },
      { label: "그냥 잔다", text: "푹 잤다. 시험장에서 제일 컨디션이 좋았고, 제일 모르는 상태였다.", eff: { h: 6, m: 4, r: -6 } },
    ],
  },
  { id: "s_band", age: [13, 19], repeat: true, cooldown: 4, photo: "prop_band1",
    text: "체육대회 머리띠를 눈까지 내려 썼다. 앞이 안 보이는데도 벗지 않았다.",
    choices: [
      { label: "그 상태로 경기에 나간다", text: "완전히 엉뚱한 방향으로 달렸다. 관중석이 제일 즐거웠다.", eff: { t: 12, f: 8, r: -6, h: -3 }, tone: "good", photo: "day_band2" },
      { label: "올려 쓴다", text: "올리고 나니 평범해져서 아무도 안 쳐다봤다.", eff: { r: 3, t: -3 } },
    ],
    ignore: { text: "그대로 벽에 부딪혔다.", eff: { h: -4, t: 8, f: 5 } } },
  { id: "s_lunch", age: [13, 19], repeat: true, cooldown: 2, flavor: true, photo: "eat_school",
    text: "급식 줄에서 준영은 늘 앞쪽이었다. 그것만큼은 아무도 이기지 못했다.", eff: { h: 3, f: 3 } },
  { id: "s_uniform", age: [13, 19], repeat: true, cooldown: 6, flavor: true, photo: "eat_school",
    text: "교복을 입는 방식에 본인만의 규칙이 있었다. 설명은 끝까지 안 해 줬다.", eff: { t: 4, r: -2 } },
  { id: "s_sleep", age: [14, 19], repeat: true, cooldown: 3,
    text: "수업 중에 졸았다. 고개가 떨어지는 각도가 점점 과감해졌다.",
    choices: [
      { label: "끝까지 잔다", text: "종이 치고도 안 일어났다. 친구가 깨우는 사진이 남았다.", eff: { h: 5, r: -6, f: 5 }, photo: "fr_poke" },
      { label: "버틴다", text: "버티다가 눈만 감고 앉아 있었다. 효과는 없었다.", eff: { h: -3, r: 2 } },
    ],
    ignore: { text: "침이 흘렀다. 그 사진도 남았다.", eff: { r: -8, f: 8, t: 5 } } },
  { id: "s_sports", age: [13, 19], repeat: true, cooldown: 3, photo: "day_uni1",
    text: "체육 시간. 준영은 유니폼만큼은 제대로 갖춰 입었다. 실력은 별개였다.",
    choices: [
      { label: "진심으로 뛴다", outcomes: [
        { w: 40, text: "한 골 넣었다. 그날 하루 종일 그 얘기만 했다.", eff: { h: 6, r: 10, f: 8 }, tone: "good", photo: "day_uni2" },
        { w: 60, text: "넘어졌다. 넘어지는 자세가 너무 웃겨서 아무도 걱정을 안 했다.", eff: { h: -6, t: 8, f: 6 } },
      ] },
      { label: "벤치에서 응원한다", text: "응원이 제일 시끄러웠다. 목이 쉬었다.", eff: { f: 8, h: -2, t: 5 } },
    ] },
  { id: "s_photo_club", age: [14, 19], repeat: true, cooldown: 4, photo: "face_shout",
    text: "친구가 카메라를 들었다. 준영의 얼굴이 이미 준비돼 있었다.",
    choices: [
      { label: "제일 이상한 걸 한다", text: "그 사진은 졸업앨범에 들어갈 뻔했다.", eff: { t: 10, f: 8, r: -5 }, tone: "good", photo: "face_open" },
      { label: "멀쩡하게 찍힌다", text: "멀쩡한 사진은 아무도 저장을 안 했다.", eff: { r: 4, f: -3 }, photo: "day_calm" },
    ],
    ignore: { text: "눈을 감은 채로 찍혔다.", eff: { t: 4 } } },
  { id: "s_crush", age: [15, 19], major: true, rare: true,
    text: "좋아하는 사람이 생겼다. 준영은 이 상황에서도 웃기려고 했다. 그게 유일하게 아는 방법이었다.",
    choices: [
      { label: "웃긴다", needs: { wit: 60 }, outcomes: [
        { w: 50, text: "웃어 줬다. 그날 준영은 집에 걸어가면서 세 번 멈췄다.", eff: { m: 18, t: 8, f: 6 }, tone: "rare", flagsAdd: ["첫사랑"] },
        { w: 50, text: "웃긴 했는데 그게 다였다. 준영은 그 차이를 그날 처음 배웠다.", eff: { m: -10, t: 6 }, tone: "bad" },
      ] },
      { label: "진지하게 말한다", outcomes: [
        { w: 35, text: "진지한 준영은 낯설었다. 그래서 더 전해졌다.", eff: { m: 20, r: 8 }, tone: "rare", flagsAdd: ["첫사랑"] },
        { w: 65, text: "말이 꼬였다. 평생 농담만 하다 보니 진담하는 법을 안 배웠다.", eff: { m: -12, t: -4 }, tone: "bad" },
      ] },
      { label: "아무 말도 안 한다", text: "졸업할 때까지 안 했다. 가끔 그 생각이 났다.", eff: { m: -6 } },
    ] },
  { id: "s_karaoke_first", age: [14, 19], force: true, photo: "kara_mic", rare: true,
    text: "처음으로 노래방에 갔다. 마이크를 잡은 순간 준영은 자기 자리를 찾았다.",
    choices: [
      { label: "끝까지 부른다", text: "두 시간 동안 마이크를 안 놨다. 친구들은 그걸 평생 얘기한다.", eff: { t: 14, f: 12, h: -4 }, tone: "rare", flagsAdd: ["노래방붙박이"], photo: "kara_hold" },
      { label: "한 곡만 한다", text: "한 곡이 세 곡이 됐다.", eff: { t: 8, f: 8 }, flagsAdd: ["노래방붙박이"] },
    ] },
  { id: "s_group", age: [14, 19], repeat: true, cooldown: 3,
    text: "조별 과제다. 준영은 발표를 맡겠다고 했다. 자료는 아무도 안 만들었다.",
    choices: [
      { label: "그래도 발표한다", needs: { wit: 50 }, outcomes: [
        { w: 55, text: "내용은 없는데 재밌었다. 점수는 중간이었고 인기는 최고였다.", eff: { t: 12, r: 2, f: 10 }, tone: "good" },
        { w: 45, text: "3분을 못 채웠다. 남은 시간은 전부 침묵이었다.", eff: { r: -10, m: -6, t: 4 } },
      ] },
      { label: "밤새 자료를 만든다", text: "처음으로 혼자 뭔가를 끝까지 했다. 아무도 몰랐지만 본인은 알았다.", eff: { r: 12, h: -6, m: 5 }, flagsAdd: ["의외로성실"] },
    ],
    ignore: { text: "발표날 아침에 목이 아프다고 했다.", eff: { r: -8, f: -4 } } },
  { id: "s_detention", age: [14, 19], repeat: true, cooldown: 4, photo: "face_street",
    text: "복도에 서 있게 됐다. 지나가는 사람마다 준영을 보고 웃었다.",
    choices: [
      { label: "포즈를 취한다", text: "복도가 공연장이 됐다. 벌이 두 배가 됐다.", eff: { t: 10, f: 8, r: -10 }, tone: "good" },
      { label: "반성하는 척한다", text: "표정이 너무 과장돼서 오히려 더 혼났다.", eff: { r: -5, t: 5 } },
    ],
    ignore: { text: "벽을 보고 혼자 노래를 불렀다.", eff: { m: 5, r: -4 } } },
  { id: "s_snack", age: [13, 19], repeat: true, cooldown: 2, flavor: true, photo: "eat_ice1",
    text: "매점에서 산 아이스크림을 두 입에 끝냈다. 두 입이 거의 같은 크기였다.", eff: { h: 2, t: 4 } },
  { id: "s_rain_school", age: [13, 19], repeat: true, cooldown: 5, flavor: true,
    text: "우산을 안 가져왔다. 뛰어가면서도 웃고 있었다.", eff: { h: -4, m: 5, t: 3 } },
  { id: "s_phone", age: [14, 19], repeat: true, cooldown: 3, photo: "fr_show",
    text: "준영이 폰을 들이밀었다. 보여주고 싶은 게 있다고 했다.",
    choices: [
      { label: "본다", text: "별 거 아니었는데 준영의 설명이 더 웃겼다.", eff: { f: 8, t: 6 }, tone: "good" },
      { label: "안 본다", text: "안 본다고 해도 끝까지 들이밀었다.", eff: { f: 4, r: -3 } },
    ],
    ignore: { text: "들이민 채로 5분이 지났다.", eff: { t: 4 } } },
  { id: "s_fight", age: [14, 19],
    text: "싸움이 붙을 뻔했다. 공기가 아주 안 좋아졌다.",
    choices: [
      { label: "농담으로 푼다", needs: { wit: 65 }, outcomes: [
        { w: 65, text: "둘 다 웃어 버려서 싸움이 사라졌다. 준영의 진짜 능력이 이거다.", eff: { t: 14, r: 10, f: 10 }, tone: "rare", flagsAdd: ["중재자"] },
        { w: 35, text: "타이밍이 틀렸다. 둘 다 준영한테 화를 냈다.", eff: { r: -10, f: -8, m: -6 }, tone: "bad" },
      ] },
      { label: "말린다", text: "몸으로 막았다. 어깨를 맞았지만 싸움은 끝났다.", eff: { h: -8, r: 8, f: 6 } },
      { label: "빠진다", text: "뒤로 물러섰다. 그 선택을 꽤 오래 생각했다.", eff: { m: -6, r: -3 } },
    ] },
  { id: "s_trip", age: [15, 19], force: true, rare: true, photo: "out_sea1",
    text: "수학여행이다. 버스에서부터 준영은 이미 마이크를 잡고 있었다.",
    choices: [
      { label: "끝까지 분위기를 맡는다", text: "선생님까지 웃었다. 돌아오는 버스에서는 목소리가 안 나왔다.", eff: { t: 14, f: 16, h: -6 }, tone: "rare", flagsAdd: ["수학여행전설"], photo: "out_sea3" },
      { label: "창밖을 본다", text: "드물게 조용한 준영이었다. 친구들이 오히려 걱정했다.", eff: { m: 10, f: 4 }, photo: "day_calm" },
    ] },
  { id: "s_grad", age: [19, 19], force: true, major: true, rare: true,
    text: "졸업식이다. 다들 사진을 찍는데 준영 앞에만 줄이 길었다.",
    choices: [
      { label: "전부 다 찍어 준다", text: "마지막 사람까지 다른 표정을 지었다. 한 장도 겹치지 않았다.", eff: { t: 16, f: 18, m: 10 }, tone: "rare", flagsAdd: ["졸업앨범장악"], photo: "face_wide" },
      { label: "한 장만 제대로 찍는다", text: "그 한 장이 가족 거실에 걸렸다.", eff: { m: 14, r: 10 }, photo: "day_calm" },
    ] },
  { id: "s_study_fail", age: [16, 19], repeat: true, cooldown: 3, flavor: true,
    text: "공부하겠다고 책을 폈다. 10분 뒤에 폰을 보고 있었다.", eff: { r: -4, m: 3 } },
  { id: "s_night_walk", age: [16, 19], repeat: true, cooldown: 4, flavor: true, photo: "out_cross",
    text: "야자 끝나고 혼자 걸었다. 그 시간만큼은 아무 말도 안 했다.", eff: { m: 6, h: -1 } },
];
