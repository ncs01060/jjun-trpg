/**
 * 결정론적 난수.
 *
 * 같은 시드 + 같은 선택 = 같은 인생. 이게 성립해야 "이 시드로 다시 살기"와
 * 시드 공유가 가능하다. 그래서 Math.random()은 이 프로젝트에서 금지다.
 *
 * 난수 상태는 단일 카운터(cursor)뿐이라 세이브/로드가 그냥 숫자 하나로 끝난다.
 */

/** 문자열 시드 → 32bit 정수. cyrb53 변형. */
export function hashSeed(seed: string): number {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < seed.length; i++) {
    const ch = seed.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0) ^ (h1 >>> 0);
}

/** 사람이 입력할 만한 랜덤 시드 문자열. 시드를 비워 뒀을 때 쓴다. */
export function randomSeed(): string {
  const a = ["조용한", "눈먼", "낡은", "끝없는", "젖은", "마른", "느린", "붉은", "먼", "작은"];
  const b = ["복도", "계단", "창문", "주머니", "버스", "교실", "새벽", "우산", "라면", "약속"];
  const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];
  return `${pick(a)}${pick(b)}${Math.floor(Math.random() * 900 + 100)}`;
}

/**
 * 커서를 들고 다니는 RNG.
 *
 * 상태는 cursor 하나. 호출마다 1씩 오른다. 같은 (seed, cursor)는 항상 같은 값.
 * 게임 상태에 cursor만 저장하면 난수 스트림이 완전히 복원된다.
 */
export class Rng {
  readonly base: number;
  cursor: number;

  constructor(seed: string | number, cursor = 0) {
    this.base = typeof seed === "number" ? seed >>> 0 : hashSeed(seed);
    this.cursor = cursor;
  }

  /** [0, 1) */
  next(): number {
    // splitmix32: 카운터 기반이라 되감기/점프가 공짜다.
    this.cursor = (this.cursor + 1) >>> 0;
    let z = (this.base + Math.imul(this.cursor, 0x9e3779b9)) >>> 0;
    z = Math.imul(z ^ (z >>> 16), 0x21f0aaad) >>> 0;
    z = Math.imul(z ^ (z >>> 15), 0x735a2d97) >>> 0;
    z = (z ^ (z >>> 15)) >>> 0;
    return z / 4294967296;
  }

  /** min 이상 max 이하 정수. */
  int(min: number, max: number): number {
    if (max <= min) return min;
    return min + Math.floor(this.next() * (max - min + 1));
  }

  /** 확률 p로 true. */
  chance(p: number): boolean {
    return this.next() < p;
  }

  /** 균등 추출. 빈 배열이면 undefined. */
  pick<T>(arr: readonly T[]): T | undefined {
    if (!arr.length) return undefined;
    return arr[Math.floor(this.next() * arr.length)];
  }

  /**
   * 가중치 추출. weight(item)이 0 이하면 후보에서 빠진다.
   * 이벤트 선택과 outcomes[w] 양쪽에서 쓰는 핵심 함수.
   */
  weighted<T>(arr: readonly T[], weight: (item: T) => number): T | undefined {
    let total = 0;
    for (const item of arr) {
      const w = weight(item);
      if (w > 0) total += w;
    }
    if (total <= 0) return undefined;
    let roll = this.next() * total;
    for (const item of arr) {
      const w = weight(item);
      if (w <= 0) continue;
      roll -= w;
      if (roll < 0) return item;
    }
    return arr[arr.length - 1];
  }

  /** 제자리 셔플(Fisher-Yates)된 새 배열. */
  shuffled<T>(arr: readonly T[]): T[] {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }
}
