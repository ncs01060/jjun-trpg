/**
 * 출생지 테이블.
 *
 * ⚠️ 플레이스홀더. 준영 설정을 받으면 전부 교체한다.
 * (레퍼런스는 구역마다 실제 사망률 파라미터를 들고 생명표를 적분했다 —
 *  일단은 lifeExp / childRisk / adultRisk 3개로 단순화)
 */

import type { Region } from "../types";

export const REGIONS: Region[] = [
  {
    id: "home",
    name: "평범한 아파트",
    desc: "아무 일도 안 일어날 것 같은 곳. 그래서 뭐든 일어난다.",
    birthText: "15층의 세 번째 집. 복도에서 누가 자전거를 끌고 가는 소리가 들렸다. 준영은 그 소리를 들으며 태어났다.",
    birthWeight: 3,
    startStats: { money: 5, health: 5 },
    lifeExp: 83,
    childRisk: 0.0008,
    adultRisk: 0.0022,
  },
  {
    id: "market",
    name: "시장 골목 2층",
    desc: "아래층은 가게, 위층은 집. 하루 종일 사람 소리가 난다.",
    birthText: "가게 문 닫는 소리가 하루의 끝을 알리는 집. 준영은 생선 비린내와 튀김 기름 냄새 사이에서 태어났다.",
    birthWeight: 2,
    startStats: { friend: 12, money: -8, rep: 4 },
    startFlags: ["장사집"],
    lifeExp: 80,
    childRisk: 0.0012,
    adultRisk: 0.003,
  },
  {
    id: "suburb",
    name: "읍내 끝 단층집",
    desc: "버스가 한 시간에 한 대. 대신 하늘이 넓다.",
    birthText: "마당에 개가 있고, 담이 낮은 집. 준영은 아주 조용한 새벽에 태어났다.",
    birthWeight: 2,
    startStats: { health: 14, mind: 6, friend: -10 },
    startFlags: ["시골출신"],
    lifeExp: 82,
    childRisk: 0.0014,
    adultRisk: 0.0026,
  },
];

export const DEFAULT_REGION = REGIONS[0];

export const getRegion = (id: string): Region =>
  REGIONS.find((r) => r.id === id) ?? DEFAULT_REGION;
