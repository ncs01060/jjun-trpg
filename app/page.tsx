"use client";

import { DeathCard } from "./components/DeathCard";
import { PlayScreen } from "./components/PlayScreen";
import { TitleScreen } from "./components/TitleScreen";
import { useGame } from "./useGame";

export default function Home() {
  const game = useGame();
  const { state } = game;

  return (
    <div className="shell">
      {!state ? (
        <TitleScreen onBirth={game.birth} />
      ) : state.dead ? (
        <DeathCard
          state={state}
          onRestart={game.reset}
          // 같은 시드면 출생지까지 똑같이 재현된다. 선택만 같으면 같은 인생.
          onSameSeed={() => game.birth({ name: state.name, seed: state.seed })}
        />
      ) : (
        <PlayScreen
          state={state}
          speed={game.speed}
          setSpeed={game.setSpeed}
          paused={game.paused}
          setPaused={game.setPaused}
          choose={game.choose}
          timerMax={game.timerMax}
        />
      )}
    </div>
  );
}
