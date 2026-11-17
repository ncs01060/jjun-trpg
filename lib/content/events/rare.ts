/** 드물게 일어나는 일들. 한 생에 한두 번 볼까 말까. */
import type { GameEvent } from "../../types";

export const RARE: GameEvent[] = [
  { id: "u_viral", age: [18, 60], weight: 0.3, repeat: true, cooldown: 20, rare: true, major: true, photo: "meme_wanted",
    text: "준영 사진 하나가 어디론가 퍼졌다. 모르는 사람들이 그걸 쓰고 있다.",
    choices: [
      { label: "본인이라고 밝힌다", text: "밝히자 더 퍼졌다. 준영은 그걸 즐겼다.", eff: { t: 18, r: 10, f: 14 }, tone: "rare", flagsAdd: ["짤의주인"] },
      { label: "끝까지 모른 척한다", text: "아무한테도 말 안 했다. 혼자 그 짤을 저장해 뒀다.", eff: { m: 14, t: 8 }, tone: "rare", flagsAdd: ["짤의주인"] },
    ] },
  { id: "u_tv", age: [20, 65], weight: 0.2, repeat: true, cooldown: 25, rare: true, requires: ["말로먹고삼"],
    text: "어딘가에서 섭외가 왔다. 사람이 아주 많이 보는 곳이라고 했다.",
    choices: [
      { label: "나간다", outcomes: [
        { w: 45, text: "제대로 터졌다. 한동안 길에서 알아보는 사람이 있었다.", eff: { t: 16, r: 20, w: 20, f: 10 }, tone: "rare", flagsAdd: ["얼굴알려짐"] },
        { w: 55, text: "편집에서 잘렸다. 그 얘기로 술자리 세 번을 돌렸다.", eff: { m: -8, t: 10, f: 8 } },
      ] },
      { label: "거절한다", text: "거절하고 나서 한 달 동안 생각했다.", eff: { m: -6, w: -4 } },
    ] },
  { id: "u_letter", age: [25, 90], weight: 0.25, repeat: true, cooldown: 20, rare: true, major: true,
    text: "모르는 사람에게서 연락이 왔다. 예전에 준영 덕분에 버텼다고 했다.",
    choices: [
      { label: "오래 답장한다", text: "밤새 답장을 썼다. 평생 웃기기만 한 사람이 그날은 진지했다.", eff: { m: 26, f: 12, r: 10 }, tone: "rare", flagsAdd: ["누군가를살림"] },
      { label: "짧게 고맙다고 한다", text: "짧게 답했다. 그 메시지는 지우지 않고 뒀다.", eff: { m: 18 }, tone: "rare", flagsAdd: ["누군가를살림"] },
    ] },
  { id: "u_lostfriend", age: [30, 90], weight: 0.25, repeat: true, cooldown: 20, rare: true, requires: ["오랜친구"],
    text: "제일 오래된 친구가 멀리 가게 됐다고 했다. 당분간은 못 본다.",
    choices: [
      { label: "끝까지 웃긴다", text: "공항에서까지 웃겼다. 둘 다 웃다가 울었다.", eff: { t: 12, f: 18, m: 12 }, tone: "rare", flagsAdd: ["멀리간친구"] },
      { label: "진심을 말한다", text: "평생 한 번 할까 말까 한 말을 했다. 친구가 그 말을 가져갔다.", eff: { m: 22, f: 16 }, tone: "rare", flagsAdd: ["멀리간친구"] },
    ] },
  { id: "u_second", age: [35, 75], weight: 0.2, repeat: true, cooldown: 25, rare: true, major: true,
    text: "다시 시작할 기회가 왔다. 지금까지 한 걸 전부 버려야 한다.",
    choices: [
      { label: "간다", outcomes: [
        { w: 45, text: "잘 됐다. 늦게 시작한 게 오히려 나았다.", eff: { w: 18, m: 20, t: 8 }, tone: "rare", flagsAdd: ["두번째인생"] },
        { w: 55, text: "잘 안 됐다. 그래도 해 봤다는 건 남았다.", eff: { w: -18, m: 10, h: -5 } },
      ] },
      { label: "지금을 지킨다", text: "지금을 지켰다. 틀린 선택은 아니었다.", eff: { m: 6, w: 8, r: 5 } },
    ] },
  { id: "u_award_life", age: [55, 95], weight: 0.15, repeat: false, rare: true, major: true, needs: { rep: 60 },
    text: "오래 해 온 걸 두고 누가 상을 주겠다고 했다. 준영은 받을 자격이 있는지 모르겠다고 했다.",
    choices: [
      { label: "받는다", text: "받으러 가서 또 웃겼다. 그게 준영다운 마무리였다.", eff: { r: 18, m: 20, t: 10 }, tone: "rare", flagsAdd: ["평생의상"] },
      { label: "사양한다", text: "사양했다. 사양한 이유는 끝내 말하지 않았다.", eff: { m: 14, r: 6 } },
    ] },
];
