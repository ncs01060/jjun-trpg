"use client";

/**
 * 게임 루프를 React에 붙이는 훅.
 *
 * GameState는 엔진이 "제자리에서" 고친다(뮤테이션). 32배속에서 로그가 수백 줄일 때
 * 매 틱 깊은 복제를 하면 버벅이기 때문이다.
 * 대신 매 틱 루트 객체만 얕게 복제해서 React에 새 identity를 넘긴다 —
 * 필드 14개 복사라 비용이 사실상 없고, 렌더 중 ref를 읽지 않아도 된다.
 */

import { useCallback, useEffect, useState } from "react";
import { MINOR_TIMER_MS, SPEEDS, createGame, resolvePrompt, tick, type BirthOptions } from "@/lib/engine";
import { EVENTS } from "@/lib/content/events";
import { getRegion } from "@/lib/content/regions";
import type { GameState } from "@/lib/types";

export function useGame() {
  const [state, setState] = useState<GameState | null>(null);
  const [speed, setSpeed] = useState<number>(SPEEDS[0]);
  const [paused, setPaused] = useState(false);

  const birth = useCallback((opts: BirthOptions) => {
    setState(createGame(opts));
    setSpeed(SPEEDS[0]);
    setPaused(false);
  }, []);

  const reset = useCallback(() => setState(null), []);

  const choose = useCallback((index: number | null) => {
    setState((prev) => {
      if (!prev) return prev;
      resolvePrompt(prev, EVENTS, index);
      return { ...prev };
    });
  }, []);

  // 실시간 루프. rAF라 탭이 숨으면 자동으로 멈춘다.
  // state 객체는 매 틱 새 identity가 되므로 deps에 넣으면 안 된다.
  // 루프 재설치가 필요한 조건은 "살아 있는지 / 멈췄는지 / 배속" 세 개뿐이다.
  const alive = state !== null && !state.dead;

  useEffect(() => {
    if (!alive || paused) return;

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      // 탭 복귀 시 수십 초가 한 번에 흐르는 걸 막는다.
      const dt = Math.min(now - last, 250);
      last = now;
      setState((prev) => {
        if (!prev || prev.dead) return prev;
        return tick(prev, EVENTS, getRegion(prev.regionId), dt, speed) ? { ...prev } : prev;
      });
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [speed, paused, alive]);

  return { state, speed, setSpeed, paused, setPaused, birth, reset, choose, timerMax: MINOR_TIMER_MS };
}
