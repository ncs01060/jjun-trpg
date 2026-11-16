"use client";

import { useEffect, useRef, useState } from "react";
import { SPEEDS } from "@/lib/engine";
import { STAT_KEYS, STAT_LABEL, type Effects, type GameState, type LogLine } from "@/lib/types";
import { Album } from "./Album";
import { ChatPhoto } from "./ChatPhoto";

/** 서술을 보내는 상대. 인생이 자꾸 말을 걸고, 준영이 답한다. */
const NARRATOR = "인생";

interface Props {
  state: GameState;
  speed: number;
  setSpeed: (n: number) => void;
  paused: boolean;
  setPaused: (b: boolean) => void;
  choose: (index: number | null) => void;
  timerMax: number;
}

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
  const [statsOpen, setStatsOpen] = useState(true);
  const lastId = state.log.at(-1)?.id ?? 0;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lastId]);

  const prompt = state.prompt;

  // 배속은 버튼 다섯 개 대신 하나를 눌러 돌린다. 헤더가 버튼으로 뒤덮이지 않게.
  const cycleSpeed = () => setSpeed(SPEEDS[(SPEEDS.indexOf(speed as 1) + 1) % SPEEDS.length]);

  return (
    <>
      <div className="topbar">
        <div className="room-ava" aria-hidden>
          인
        </div>
        <div className="room-meta">
          <div className="room-name">{state.name} 인생</div>
          <div className="room-sub">{ageLabel(state.age)}</div>
        </div>
        <button type="button" className="icon-btn" onClick={() => setAlbumOpen(true)} title="사진 모아보기">
          <span aria-hidden>🖼</span>
          {state.photos.length > 0 && <i className="badge">{state.photos.length}</i>}
        </button>
        <button type="button" className="icon-btn" onClick={() => setPaused(!paused)} title={paused ? "계속" : "일시정지"}>
          <span aria-hidden>{paused ? "▶" : "❙❙"}</span>
        </button>
        <button type="button" className="icon-btn wide" onClick={cycleSpeed} title="배속">
          ×{speed}
        </button>
      </div>

      <div className="yearbar" aria-hidden>
        <i style={{ width: `${Math.min(100, state.yearProgress * 100)}%` }} />
      </div>

      <div className={`pinned${statsOpen ? " open" : ""}`}>
        <button type="button" className="pinned-head" onClick={() => setStatsOpen(!statsOpen)}>
          <span className="pin" aria-hidden>📌</span>
          <span>공지</span>
          {!statsOpen && (
            <span className="pinned-peek">
              입담 {state.stats.wit} · 체력 {state.stats.health} · 멘탈 {state.stats.mind}
            </span>
          )}
          <span className="chev" aria-hidden>{statsOpen ? "⌃" : "⌄"}</span>
        </button>

        {statsOpen && (
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
        )}
      </div>

      <div className="chat">
        {buildItems(state.log).map((item) =>
          item.kind === "years" ? (
            <div className="daypill" key={item.key}>
              {item.from === item.to
                ? ageLabel(item.from)
                : `${ageLabel(item.from)} ~ ${ageLabel(item.to)}`}
            </div>
          ) : (
            <Message key={item.key} line={item.line} showSender={item.showSender} />
          ),
        )}
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
                    <i
                      data-low={prompt.remainingMs / timerMax < 0.35 ? "1" : "0"}
                      style={{ width: `${Math.max(0, (prompt.remainingMs / timerMax) * 100)}%` }}
                    />
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

type Item =
  | { kind: "years"; key: number; from: number; to: number }
  | { kind: "line"; key: number; line: LogLine; showSender: boolean };

/**
 * 로그를 화면에 올릴 단위로 바꾼다.
 *
 * 아무 일도 없는 해가 이어지면 나이 알약이 줄줄이 쌓여 죽은 공간이 된다.
 * 연속된 해는 "한 살 ~ 네 살" 하나로 접는다.
 */
function buildItems(log: LogLine[]): Item[] {
  const out: Item[] = [];
  let i = 0;
  while (i < log.length) {
    const line = log[i];
    if (line.kind === "year") {
      const from = line.age ?? 0;
      let to = from;
      const key = line.id;
      while (i + 1 < log.length && log[i + 1].kind === "year") {
        i++;
        to = log[i].age ?? to;
      }
      out.push({ kind: "years", key, from, to });
      i++;
      continue;
    }
    out.push({ kind: "line", key: line.id, line, showSender: startsRun(log, i) });
    i++;
  }
  return out;
}

/**
 * 이 줄이 "인생"의 새 묶음을 시작하는가.
 * 실제 메신저처럼 연달아 온 말풍선에는 프로필을 한 번만 붙인다.
 */
function startsRun(log: LogLine[], i: number): boolean {
  if (i === 0) return true;
  // 준영이 답장을 보냈으면 그 뒤는 새 묶음이다
  if (log[i].choice) return true;
  const prev = log[i - 1];
  if (prev.kind === "year" || prev.kind === "system" || prev.kind === "death") return true;
  // 앞 줄이 사진으로 끝났으면 묶음이 이어진 것으로 본다
  return false;
}

function Message({ line, showSender }: { line: LogLine; showSender: boolean }) {
  if (line.kind === "death") return <div className="sysline leave">{line.text}</div>;
  if (line.kind === "system") return <div className="sysline">{line.text}</div>;

  return (
    <>
      {/* 준영이 한 말이 먼저 나간다 */}
      {line.choice && (
        <div className="msg out">
          <div className="bubble">{line.choice}</div>
        </div>
      )}

      {line.text && (
        <div className={`msg in tone-${line.tone}${showSender ? " lead" : ""}`}>
          {showSender ? <div className="avatar" aria-hidden>인</div> : <div className="avatar-gap" aria-hidden />}
          <div className="msg-body">
            {showSender && <div className="sender">{NARRATOR}</div>}
            <div className="bubble">
              {line.text}
              <DeltaBadges delta={line.delta} />
            </div>
          </div>
        </div>
      )}

      {line.photo && (
        <div className="msg in">
          <div className="avatar-gap" aria-hidden />
          <div className="msg-body">
            <ChatPhoto id={line.photo} />
          </div>
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
