/** stylelint 設定 */
module.exports = {
  extends: [
    "stylelint-config-standard-scss", // 公式推奨ルール集を継承
    "stylelint-config-recess-order", // プロパティ順（recess順）を自動整列
  ],

  rules: {
    "max-nesting-depth": 5, // ネストは5層まで（web-coding.md と一致）
    "no-descending-specificity": null, // BEMネストで出やすいカスケード警告。実害が薄くノイズになるため無効化
    "selector-class-pattern": null, // BEMの __ や -- が標準ルールでエラー扱いになるので無効化
    "scss/dollar-variable-pattern": null, // $color-text-main のハイフン区切りが標準ルールでエラー扱いになるので無効化
  },
};
