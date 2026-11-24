"use client";

import { useState } from "react";
import { randomSeed } from "@/lib/rng";
import type { BirthOptions } from "@/lib/engine";

export function TitleScreen({ onBirth }: { onBirth: (opts: BirthOptions) => void }) {
  const [name, setName] = useState("준영");
  const [seed, setSeed] = useState("");

  // 출생지는 고르지 않는다. 시드에서 걸린다.
  const start = () =>
    onBirth({ name: name.trim() || "준영", seed: seed.trim() || randomSeed() });

  return (
    <div className="title-screen">
      <div className="room-icon">💬</div>

      <div>
        <h1 className="title-main">준영 인생 단톡방</h1>
        <p className="title-sub">한 해 한 해가 실시간으로 올라옵니다</p>
      </div>

      <div className="field">
        <label htmlFor="name">방 이름</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="준영"
          maxLength={12}
        />
        <p className="hint">어디서 태어날지는 고를 수 없습니다. 그건 그냥 걸리는 겁니다.</p>
      </div>

      <div className="field">
        <label htmlFor="seed">초대 코드 (선택)</label>
        <input
          id="seed"
          value={seed}
          onChange={(e) => setSeed(e.target.value)}
          placeholder="예: 우리집고양이"
          maxLength={40}
        />
        <p className="hint">
          같은 코드로 같은 답장을 하면 똑같은 인생이 펼쳐집니다. 비워 두면 아무거나.
        </p>
      </div>

      <button type="button" className="primary" onClick={start}>
        입장하기
      </button>

      <p className="notice">
        실제 인물을 바탕으로 한 애정 담긴 농담입니다.
        <br />
        가끔 사람이 죽습니다.
      </p>
    </div>
  );
}
