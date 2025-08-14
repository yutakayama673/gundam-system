import { useEffect, useState } from "react";

export function usePartsEditorModal({ parts, functions, descriptions, materials }) {
  const [initialPartsCount, setInitialPartsCount] = useState(0);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  // 初期部品数を記録
  useEffect(() => {
    setInitialPartsCount(parts.length);
  }, [parts.length]);

  // 入力チェック（新規追加部品のみ）
  useEffect(() => {
    const hasInvalidNewPart = parts
      .slice(initialPartsCount)
      .some((name) => {
        const n = name?.trim();
        const f = functions?.[n]?.trim();
        const d = descriptions?.[n]?.trim();
        const m = materials?.[n];
        return !n || !f || !d || !Array.isArray(m) || m.length === 0;
      });

    setIsSaveDisabled(hasInvalidNewPart);
  }, [parts, functions, descriptions, materials, initialPartsCount]);

  return {
    initialPartsCount,
    isSaveDisabled,
  };
}
