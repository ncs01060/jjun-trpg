"use client";

import { useState } from "react";
import { getPhoto } from "@/lib/content/photos";

/**
 * 단톡방에 올라온 사진 한 장.
 * 파일이 없거나 로드에 실패해도 레이아웃이 안 무너지게 빈 칸으로 버틴다.
 */
export function ChatPhoto({ id }: { id: string }) {
  const photo = getPhoto(id);
  const [failed, setFailed] = useState(false);
  if (!photo) return null;

  return (
    <div className="photo-msg">
      {failed ? (
        <div className="photo-missing">사진을 불러오지 못했어요</div>
      ) : photo.video ? (
        <video src={photo.video} poster={photo.src} autoPlay loop muted playsInline onError={() => setFailed(true)} />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- 사진 비율이 제각각이라 next/image 최적화가 불필요
        <img src={photo.src} alt={photo.caption} loading="lazy" onError={() => setFailed(true)} />
      )}
      <div className="photo-cap">{photo.caption}</div>
    </div>
  );
}
