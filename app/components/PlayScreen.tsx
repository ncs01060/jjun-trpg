"use client";

import { useEffect, useRef, useState } from "react";
import { SPEEDS } from "@/lib/engine";
import { STAT_KEYS, STAT_LABEL, type Effects, type GameState, type LogLine } from "@/lib/types";
import { Album } from "./Album";
import { ChatPhoto } from "./ChatPhoto";

interface Props {
  state: GameState;
  speed: number;
  setSpeed: (n: number) => void;
  paused: boolean;
  setPaused: (b: boolean) => void;
  choose: (index: number | null) => void;
  timerMax: number;
}

/** 나이를 한국어 나이 표기로. 날짜 구분선에 쓴다. */
const AGE_WORDS = [
  "", "한", "두", "세", "네", "다섯", "여섯", "일곱", "여덟", "아홉",
  "열", "열한", "열두", "열세", "열네", "열다섯", "열여섯", "열일곱", "열여덟", "열아홉",
];
const TENS = ["", "", "스물", "서른", "마흔", "쉰", "예순", "일흔", "여든", "아흔"];

function ageLabel(age: number): string {
  if (age === 0) return "태어난 날";
  if (age < 20) return `${AGE_WORDS[age]} 살`;
  if (age >= 100) return `${age}살`;
  const t = Math.floor(age / 10);
  const o = age % 10;
  return `${TENS[t]}${o ? ` ${AGE_WORDS[o]}` : ""} 살`;
}

export function PlayScreen({ state, speed, setSpeed, paused, setPaused, choose, timerMax }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const [albumOpen, setAlbumOpen] = useState(false);
  const lastId = state.log.at(-1)?.id ?? 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lastId]);

  const prompt = state.prompt;

  return (
    <>
      <div className="topbar">
        <div className="room-name">
          {state.name} 인생
          <small>{ageLabel(state.age)}</small>
        </div>
        <div className="spacer" />
        <div className="speeds">
          <button type="button" onClick={() => setAlbumOpen(true)} title="사진 모아보기">
            🖼 {state.photos.length}
          </button>
          <button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>
            {paused ? "▶" : "❙❙"}
          </button>
          {SPEEDS.map((s) => (
            <button key={s} type="button" aria-pressed={speed === s} onClick={() => setSpeed(s)}>
              ×{s}
            </button>
          ))}
        </div>
      </div>

      <div className="yearbar" aria-hidden>
        <i style={{ width: `${Math.min(100, state.yearProgress * 100)}%` }} />
      </div>

      <div className="pinned">
        <div className="pinned-head">📌 공지</div>
        <div className="stat-strip">
          {STAT_KEYS.map((k) => (
            <div className="stat" key={k}>
              <div className="stat-head">
                <span>{STAT_LABEL[k]}</span>
                <b>{state.stats[k]}</b>
              </div>
              <div className="gauge">
                <i style={{ width: `${state.stats[k]}%`, background: `var(--${k})` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="chat">
        {state.log.map((line) => (
          <Message key={line.id} line={line} />
        ))}
        <div ref={endRef} />
      </div>

      {prompt && (
        <div className={`replybar${prompt.major ? " major" : ""}`}>
          <div className="reply-head">
            {prompt.major ? (
              <span className="major-tag">이건 그냥 못 넘어간다</span>
            ) : (
              <>
                <span>뭐라고 답할까</span>
                {prompt.remainingMs != null && (
                  <div className="timer" aria-hidden>
                    <i style={{ width: `${Math.max(0, (prompt.remainingMs / timerMax) * 100)}%` }} />
                  </div>
                )}
              </>
            )}
          </div>

          <div className="replies">
            {prompt.choices.map((c) => (
              <button key={c.i} type="button" onClick={() => choose(c.i)}>
                {c.label}
              </button>
            ))}
            {prompt.ignoreLabel && (
              <button type="button" className="pass" onClick={() => choose(null)}>
                {prompt.ignoreLabel}
              </button>
            )}
          </div>
        </div>
      )}

      {albumOpen && <Album taken={state.photos} onClose={() => setAlbumOpen(false)} />}
    </>
  );
}

function Message({ line }: { line: LogLine }) {
  // 나이가 바뀌는 지점 = 날짜 구분선
  if (line.kind === "year") {
    return <div className="daypill">{ageLabel(line.age ?? 0)}</div>;
  }

  // 방을 나가는 순간
  if (line.kind === "death") {
    return <div className="sysline leave">{line.text}</div>;
  }

  if (line.kind === "system") {
    return <div className="sysline">{line.text}</div>;
  }

  return (
    <>
      {/* 준영이 한 말이 먼저 나간다 */}
      {line.choice && (
        <div className="msg out">
          <div className="bubble">{line.choice}</div>
        </div>
      )}

      {line.text && (
        <div className={`msg in tone-${line.tone}`}>
          <div className="bubble">
            {line.text}
            <DeltaBadges delta={line.delta} />
          </div>
        </div>
      )}

      {line.photo && (
        <div className="msg in">
          <ChatPhoto id={line.photo} />
        </div>
      )}
    </>
  );
}

function DeltaBadges({ delta }: { delta?: Effects }) {
  if (!delta) return null;
  const entries = STAT_KEYS.filter((k) => delta[k]).map((k) => [k, delta[k]!] as const);
  if (!entries.length) return null;
  return (
    <div className="delta">
      {entries.map(([k, v]) => (
        <span key={k} className={v > 0 ? "up" : "down"}>
          {STAT_LABEL[k]} {v > 0 ? "+" : ""}
          {v}
        </span>
      ))}
    </div>
  );
}
