"use client";

import { PHOTOS } from "@/lib/content/photos";

/**
 * 사진 모아보기.
 * 이번 생에 올라온 사진만 보이고 나머지는 잠겨 있다.
 */
export function Album({ taken, onClose }: { taken: string[]; onClose: () => void }) {
  const got = new Set(taken);

  return (
    <div className="album">
      <div className="album-top">
        <b>사진 모아보기</b>
        <span>
          {got.size} / {PHOTOS.length}
        </span>
        <button type="button" className="ghost" onClick={onClose}>
          닫기
        </button>
      </div>

      <div className="album-grid">
        {PHOTOS.map((p) =>
          got.has(p.id) ? (
            <div key={p.id} className={`cell${p.rarity === "legend" ? " legend" : ""}`}>
              {p.video ? (
                <video src={p.video} poster={p.src} autoPlay loop muted playsInline />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element -- 썸네일 그리드
                <img src={p.src} alt={p.caption} loading="lazy" />
              )}
              <div className="cap">{p.caption}</div>
            </div>
          ) : (
            <div key={p.id} className="cell locked">
              ?
            </div>
          ),
        )}
      </div>
    </div>
  );
}
