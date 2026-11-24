/**
 * 이벤트 테이블 전체.
 *
 * 500개를 한 파일에 두면 아무도 못 고친다. 테마별로 쪼개고 여기서만 합친다.
 * 새 테마를 추가할 때는 파일을 만들고 아래 배열에 끼워 넣으면 끝이다.
 */
import type { GameEvent } from "../../types";

import { CHILDHOOD } from "./childhood";
import { SCHOOL } from "./school";
import { CAREER } from "./career";
import { ADULT } from "./adult";
import { OLD } from "./old";
import { KARAOKE } from "./karaoke";
import { FOOD } from "./food";
import { DRINK } from "./drink";
import { HOME } from "./home";
import { FRIENDS } from "./friends";
import { WIT } from "./wit";
import { LOOKS } from "./looks";
import { ONLINE } from "./online";
import { STREET } from "./street";
import { WORK } from "./work";
import { YOUTH } from "./youth";
import { FAMILY } from "./family";
import { SEASONS } from "./seasons";
import { LOVE } from "./love";
import { HOBBY } from "./hobby";
import { BODY } from "./body";
import { MISC } from "./misc";
import { MONEY } from "./money";
import { RARE } from "./rare";
import { ALBUM } from "./album";

export const EVENTS: GameEvent[] = [
  ...CHILDHOOD,
  ...SCHOOL,
  ...CAREER,
  ...ADULT,
  ...OLD,
  ...KARAOKE,
  ...FOOD,
  ...DRINK,
  ...HOME,
  ...FRIENDS,
  ...WIT,
  ...LOOKS,
  ...ONLINE,
  ...STREET,
  ...WORK,
  ...YOUTH,
  ...FAMILY,
  ...SEASONS,
  ...LOVE,
  ...HOBBY,
  ...BODY,
  ...MISC,
  ...MONEY,
  ...RARE,
  ...ALBUM,
];

export const EVENT_BY_ID = new Map(EVENTS.map((e) => [e.id, e]));
