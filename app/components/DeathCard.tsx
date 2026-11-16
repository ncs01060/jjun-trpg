"use client";

import { getRegion } from "@/lib/content/regions";
import { PHOTOS, getPhoto } from "@/lib/content/photos";
import { STAT_KEYS, STAT_LABEL, type GameState } from "@/lib/types";

interface Props {
  state: GameState;
  onRestart: () => void;
  onSameSeed: () => void;
}

export function DeathCard({ state, onRestart, onSameSeed }: Props) {
  const region = getRegion(state.regionId);
  const lastWords = state.log.filter((l) => l.kind === "death").at(-1)?.text;

  // 제일 높은 스탯 = 결국 어떤 사람이었나
  const top = STAT_KEYS.reduce((a, b) => (state.stats[b] > state.stats[a] ? b : a));

  return (
    <div className="death-screen">
      <div className="leave-card">
        <p className="leave-main">
          <b>{state.name}</b>님이 나갔습니다
        </p>
        <p className="leave-sub">
          {state.deathAge}살 · {state.deathCause}
        </p>

        <div className="rows">
          <div className="row">
            <span>태어난 곳</span>
            <b>{region.name}</b>
          </div>
          <div className="row">
            <span>제일 잘했던 것</span>
            <b>
              {STAT_LABEL[top]} {state.stats[top]}
            </b>
          </div>
          <div className="row">
            <span>남긴 것</span>
            <b>{state.flags.length ? state.flags.join(" · ") : "아무것도"}</b>
          </div>
          <div className="row">
            <span>올린 사진</span>
            <b>
              {state.photos.length} / {PHOTOS.length}장
            </b>
          </div>
        </div>

        {lastWords && <p className="epitaph">{lastWords}</p>}
      </div>

      {state.photos.length > 0 && (
        <div className="death-album">
          {state.photos.map((id) => {
            const p = getPhoto(id);
            if (!p) return null;
            return (
              <div key={id} className={`cell${p.rarity === "legend" ? " legend" : ""}`}>
                {p.video ? (
                  <video src={p.video} poster={p.src} autoPlay loop muted playsInline />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element -- 썸네일 그리드
                  <img src={p.src} alt={p.caption} loading="lazy" />
                )}
                <div className="cap">{p.caption}</div>
              </div>
            );
          })}
        </div>
      )}

      <div className="death-actions">
        <button type="button" className="primary" onClick={onRestart}>
          새 방 만들기
        </button>
        <button type="button" className="ghost" onClick={onSameSeed}>
          이 코드로 다시 살기
        </button>
      </div>

      <p className="seed-note">초대 코드: {state.seed}</p>
    </div>
  );
}
