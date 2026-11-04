import type { PredictionPlayer } from "./prediction";

export const shimizuOpponentFormation = "4-1-2-3";

/** 東京V戦の独自予想（公式発表の先発ではない）。前線からGK、各ラインは攻撃方向を上にそろえて画面左→右。
 * 京都戦の公式先発から蓮川壮大→パク スンウクの1人変更。左右は直近5試合の公式配置図「前半0分」と、京都戦の交代後の配置から判断。
 */
export const shimizuOpponentRows: PredictionPlayer[][] = [
  [{ name: "カピシャーバ", role: "LWG", alternative: "候補：藤井智也" }, { name: "オ セフン", role: "CF" }, { name: "ジャーメイン 良", role: "RWG", nameBreak: "ジャーメイン " }],
  [{ name: "松崎快", role: "IH", alternative: "候補：嶋本悠大・平戸太貴" }, { name: "小泉慶", role: "IH" }],
  [{ name: "弓場将輝", role: "ANC" }],
  [{ name: "マテウス ブルネッティ", role: "LB", nameBreak: "マテウス " }, { name: "パク スンウク", role: "CB", nameBreak: "パク ", alternative: "候補：蓮川壮大" }, { name: "高橋祐治", role: "CB" }, { name: "須貝英大", role: "RB" }],
  [{ name: "沖悠哉", role: "GK", alternative: "候補：梅田透吾" }],
];

// Jリーグ公式記録の氏名・背番号を2026-11-04に照合（外国籍・韓国籍選手の区切りは公式表記の空白）。
export const shimizuOpponentNumbers: Record<string, number> = {
  "沖悠哉": 1, "マテウス ブルネッティ": 25, "パク スンウク": 14, "高橋祐治": 3, "須貝英大": 24,
  "弓場将輝": 17, "松崎快": 21, "小泉慶": 37,
  "カピシャーバ": 7, "オ セフン": 9, "ジャーメイン 良": 13,
};

export const shimizuOpponentSources = [
  { label: "Jリーグ公式記録：清水の京都戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34645" },
  { label: "Jリーグ公式記録：清水の広島戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34627" },
  { label: "Jリーグ公式記録：清水の町田戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34620" },
  { label: "Jリーグ公式記録：清水のG大阪戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34615" },
  { label: "Jリーグ公式記録：清水の水戸戦", url: "https://data.j-league.or.jp/SFMS02/?match_card_id=34602" },
  { label: "Jリーグ公式サイト：京都戦の配置図（前半0分を選択）", url: "https://www.jleague.jp/match/j1/2026/103112/#lineup" },
  { label: "Jリーグ公式サイト：広島戦の配置図（前半0分を選択）", url: "https://www.jleague.jp/match/j1/2026/102406/#lineup" },
  { label: "Jリーグ公式サイト：町田戦の配置図（前半0分を選択）", url: "https://www.jleague.jp/match/j1/2026/102110/#lineup" },
  { label: "Jリーグ公式サイト：G大阪戦の配置図（前半0分を選択）", url: "https://www.jleague.jp/match/j1/2026/101715/#lineup" },
  { label: "静岡新聞：京都戦（蓮川の負傷交代）", url: "https://news.at-s.com/article/2088988" },
];
