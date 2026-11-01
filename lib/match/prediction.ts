/** 予想スタメン表示用の選手。rowsは上段＝FW、下段＝GK、各行は画面左→右の並び。 */
export type PredictionPlayer = {
  name: string;
  role: string;
  /** スタメン対抗候補（先発・ベンチ入りの確定情報ではない）。 */
  alternative?: string;
  /** 長い名前の折り返し位置。この文字列の直後で改行を許可する（表示上の改行のみ）。 */
  nameBreak?: string;
};
