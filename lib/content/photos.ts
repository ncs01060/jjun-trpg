/**
 * 사진첩.
 *
 * 레퍼런스의 "수집 코덱스" 자리를 이 게임에서는 사진첩이 대신한다.
 * 이벤트가 터질 때 사진이 같이 꽂히고, 한 생이 끝나면 그 생의 사진첩이 남는다.
 *
 * 파일은 public/photos/ 에 있다 (원본 img/ 130MB → 1000px/q70으로 4.8MB).
 * 캡션은 폴라로이드 아래 손글씨로 들어간다.
 */

import type { Photo } from "../types";

const p = (n: string) => `/photos/photo-${n}.jpg`;

export const PHOTOS: Photo[] = [
  // ── 셀카 개그: 이 게임의 기본 화력 ──
  { id: "face_grin",    src: p("04"), caption: "코부터 들이밀었다", rarity: "common" },
  { id: "face_wide",    src: p("07"), caption: "렌즈가 감당을 못 했다", rarity: "common" },
  { id: "face_tilt",    src: p("11"), caption: "각도만 바꿨는데 다른 사람이 됐다", rarity: "common" },
  { id: "face_shout",   src: p("13"), caption: "너. 지금. 찍지 마.", rarity: "common" },
  { id: "face_ceiling", src: p("12"), caption: "천장이 같이 찍혔다", rarity: "common" },
  { id: "face_blur",    src: p("17"), caption: "웃느라 흔들렸다", rarity: "common" },
  { id: "face_squint",  src: p("19"), caption: "눈이 없어졌다", rarity: "common" },
  { id: "face_side",    src: p("05"), caption: "안경이 먼저 도착했다", rarity: "common" },
  { id: "face_nose",    src: p("24"), caption: "초점은 코에 맞았다", rarity: "common" },
  { id: "face_up",      src: p("10"), caption: "뭘 봤는지는 아무도 모른다", rarity: "common" },

  // ── 먹는 사진 ──
  { id: "eat_churro",  src: p("09"), caption: "다 먹을 거라고 했고, 다 먹었다", rarity: "common" },
  { id: "eat_bite",    src: p("03"), caption: "한 입이 크다", rarity: "common" },
  { id: "eat_ramen",   src: p("22"), caption: "국물까지 갔다", rarity: "rare" },
  { id: "eat_tempura", src: p("29"), caption: "집게째로 먹는 건 처음 봤다", rarity: "rare" },
  { id: "eat_table",   src: p("28"), caption: "한 점 남기고 고민하는 중", rarity: "common" },

  // ── 술 ──
  { id: "drink_night",  src: p("14"), caption: "그날은 아무도 집에 안 갔다", rarity: "rare" },
  { id: "drink_bottle", src: p("25"), caption: "잔은 처음부터 없었다", rarity: "rare" },
  { id: "drink_high",   src: p("27"), caption: "움직이는 사진이다", rarity: "legend", video: "/photos/photo-27.mp4" },

  // ── 집: 러닝 개그 ──
  { id: "home_belly",  src: p("26"), caption: "집에 오면 일단 걷는다", rarity: "legend" },
  { id: "home_stand",  src: p("30"), caption: "상 차리는 중. 복장은 저게 맞다", rarity: "legend" },
  { id: "home_smoke",  src: p("31"), caption: "본인은 이게 멋있다고 생각한다", rarity: "legend" },

  // ── 사람들 ──
  { id: "friend_poke",  src: p("33"), caption: "자는 사람은 건드리는 게 아니다", rarity: "rare" },
  { id: "friend_shout", src: p("16"), caption: "둘 중 하나는 말리고 있었다", rarity: "rare" },
  { id: "friend_bed",   src: p("32"), caption: "누가 먼저 뻗었는지는 기록에 없다", rarity: "common" },

  // ── 일상 ──
  { id: "day_thumbs", src: p("15"), caption: "전부 괜찮다는 뜻이다", rarity: "common" },
  { id: "day_calm",   src: p("21"), caption: "드물게 멀쩡한 사진", rarity: "rare" },
  { id: "day_mic",    src: p("23"), caption: "풀이었다. 끝까지 마이크인 척했다", rarity: "legend" },
  { id: "day_shades", src: p("20"), caption: "실내였다", rarity: "rare" },
  { id: "day_bath",   src: p("18"), caption: "노래가 들렸다고 한다", rarity: "common" },
];

export const PHOTO_BY_ID = new Map(PHOTOS.map((x) => [x.id, x]));

export const getPhoto = (id: string): Photo | undefined => PHOTO_BY_ID.get(id);
