/** 취미와 딴짓. 돈도 안 되고 쓸모도 없는 것들. */
import type { GameEvent } from "../../types";
import { flavor } from "./helpers";

export const HOBBY: GameEvent[] = [
  { id: "b_newthing", age: [12, 80], repeat: true, cooldown: 4,
    text: "갑자기 뭔가에 꽂혔다. 이번 건 오래갈 것 같다고 했다.",
    choices: [
      { label: "장비부터 산다", outcomes: [
        { w: 35, text: "진짜 오래갔다. 3년을 했다.", eff: { w: -14, m: 16, t: 5 }, tone: "rare", flagsAdd: ["취미하나"] },
        { w: 65, text: "2주 만에 구석에 처박혔다. 장비는 아직 새것이다.", eff: { w: -14, m: 5, t: 6 } },
      ] },
      { label: "일단 빌려서 해 본다", text: "빌려서 해 보고 안 샀다. 드물게 현명했다.", eff: { m: 8, w: 3 } },
    ],
    ignore: { text: "검색만 세 시간 했다.", eff: { m: 4, t: 3 } } },
  { id: "b_collect", age: [10, 80], repeat: true, cooldown: 6,
    text: "뭔가를 모으기 시작했다. 기준은 본인만 안다.",
    choices: [
      { label: "계속 모은다", text: "서랍 하나가 그걸로 찼다. 버리라는 말은 안 들었다.", eff: { w: -8, m: 10 }, flagsAdd: ["수집벽"] },
      { label: "정리한다", text: "정리하다가 오히려 더 늘었다.", eff: { w: -5, m: 6, t: 4 } },
    ] },
  { id: "b_video", age: [14, 70], repeat: true, cooldown: 5, photo: "face_wide",
    text: "영상을 찍어 보기로 했다. 카메라를 켜자 준영의 얼굴이 자동으로 움직였다.",
    choices: [
      { label: "올린다", outcomes: [
        { w: 40, text: "생각보다 반응이 좋았다. 모르는 사람이 댓글을 달았다.", eff: { t: 12, r: 10, f: 8 }, tone: "rare", flagsAdd: ["영상올림"] },
        { w: 60, text: "조회수가 열두 번이었다. 그중 아홉 번이 본인이었다.", eff: { t: 8, m: -4, f: 4 } },
      ] },
      { label: "저장만 한다", text: "저장만 하고 아무한테도 안 보여줬다.", eff: { m: 6, t: 4 } },
    ] },
  { id: "b_sport", age: [14, 70], repeat: true, cooldown: 5,
    text: "운동을 시작했다. 이번엔 진짜라고 했다.",
    choices: [
      { label: "일주일 간다", outcomes: [
        { w: 45, text: "일주일이 한 달이 됐다. 본인도 놀랐다.", eff: { h: 14, m: 8 }, tone: "good", flagsAdd: ["의외로성실"] },
        { w: 55, text: "사흘 만에 끝났다. 사흘도 길었다고 했다.", eff: { h: 4, t: 6 } },
      ] },
      { label: "장비만 산다", text: "장비는 좋았다. 장비만 좋았다.", eff: { w: -10, h: 2, t: 5 } },
    ],
    ignore: { text: "내일부터 하기로 했다.", eff: { m: 3 } } },
  { id: "b_music", age: [14, 80], repeat: true, cooldown: 6, photo: "kara_mic",
    text: "노래를 제대로 배워 보겠다고 했다.",
    choices: [
      { label: "배운다", text: "배우고 나서 노래방 점수가 12점 올랐다. 본인은 50점이 올랐다고 주장한다.", eff: { t: 10, m: 10, w: -8 }, tone: "good" },
      { label: "그냥 부른다", text: "배우지 않고도 충분히 시끄러웠다.", eff: { t: 8, f: 6, h: -2 } },
    ] },
  flavor("b_f1", [12, 80], 4, "게임 한 판만 한다고 하고 네 시간을 했다.", "day_game1", { m: 6, h: -3 }),
  flavor("b_f2", [12, 80], 4, "지고 나서 표정이 더 웃겼다.", "day_game2", { t: 5, m: -2 }),
  flavor("b_f3", [14, 80], 5, "영상을 찍다가 혼자 웃어서 전부 다시 찍었다.", "dc_laugh", { t: 6, m: 4 }),
  flavor("b_f4", [14, 80], 5, "새 프로필 사진을 고르는 데 한 시간이 걸렸다.", "face_tilt", { t: 5, m: 4 }),
  flavor("b_f5", [14, 80], 6, "제일 이상한 사진을 프로필로 했다. 2년을 썼다.", "meme_card7", { t: 8, f: 5 }),
  flavor("b_f6", [14, 80], 6, "카드 만드는 걸 배워서 친구들 걸 전부 만들었다.", "meme_card4", { t: 7, f: 8 }),
  flavor("b_f7", [16, 80], 7, "사진 폴더가 꽉 찼다. 정리는 안 했다.", "meme_kakao", { m: 4, t: 4 }),
  flavor("b_f8", [16, 80], 7, "악기를 하나 샀다. 세 번 쳤다.", "prop_mic", { w: -8, m: 5 }),
  flavor("b_f9", [16, 80], 8, "밤새 뭔가를 만들었다. 아침에 보니 별로였다.", "home_sit", { m: 5, h: -4 }),
  flavor("b_f10", [16, 80], 8, "혼자 가는 영화관이 제일 편하다고 했다.", "day_calm", { m: 7, w: -4 }),
  flavor("b_f11", [18, 80], 9, "오래된 취미를 다시 꺼냈다. 손이 기억하고 있었다.", "home_pose", { m: 10 }),
  flavor("b_f12", [14, 80], 6, "비눗방울을 불었다. 나이와 상관없이.", "day_bubble", { m: 6, t: 4 }),
];
