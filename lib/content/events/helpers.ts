/**
 * 이벤트를 짧게 쓰기 위한 헬퍼.
 *
 * 500개를 손으로 다 펼쳐 쓰면 읽지도 고치지도 못하는 파일이 된다.
 * 자주 나오는 두 모양만 함수로 빼고, 특이한 이벤트는 그냥 객체로 쓴다.
 */
import type { Effects, GameEvent, ShortEffects, Tone } from "../../types";

/** 선택지 없는 한 줄짜리 서술. 사진 한 장 올라오는 느낌. */
export function flavor(
  id: string,
  age: [number, number],
  cooldown: number,
  text: string,
  photo?: string,
  eff: ShortEffects = { t: 4, f: 2 },
): GameEvent {
  return { id, age, repeat: true, cooldown, flavor: true, text, eff, ...(photo ? { photo } : {}) };
}

/** 두 갈래 선택. 제일 흔한 모양. */
export function pick2(
  id: string,
  age: [number, number],
  cooldown: number,
  text: string,
  a: { label: string; text: string; eff?: ShortEffects; photo?: string; tone?: Tone; flagsAdd?: string[] },
  b: { label: string; text: string; eff?: ShortEffects; photo?: string; tone?: Tone; flagsAdd?: string[] },
  extra: Partial<GameEvent> = {},
): GameEvent {
  return { id, age, repeat: true, cooldown, text, choices: [a, b], ...extra };
}

/** 가중치 결과 하나를 짧게. */
export const out = (w: number, text: string, eff?: ShortEffects, more: Record<string, unknown> = {}) =>
  ({ w, text, eff, ...more });

export type { Effects };
