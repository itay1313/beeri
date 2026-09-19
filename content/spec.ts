/**
 * תמ"א 1 / תיקון 24 — single source of truth for every number shown on the site.
 * Values come from the client's website and proposal deck. Do not edit without approval.
 */
export const spec = {
  planName: "תמ״א 1 / תיקון 24",
  updateYear: 2026,
  groundDunamMax: 1,
  agroDunamMax: 10,
  /** net panel coverage: up to 30%, with an option to reach 50% (approved wording, 2026-09-19) */
  coverageMaxPct: 30,
  coverageExceptionPct: 50,
  bufferDunam: 2.5,
  yieldNormPct: 75,
  projectLifeYears: 25,
  tariffCloseLabel: "סוף 2026",
  tariffExampleIls: 1.35,
} as const;

export const specSheet = [
  { value: `עד ${spec.groundDunamMax}`, unit: "דונם", label: "מתקן קרקעי בחלקה א׳, צמוד למגורים או למבנה משק" },
  { value: `עד ${spec.agroDunamMax}`, unit: "דונם", label: "מערכת אגרו־וולטאית בשטח החקלאי של החלקה" },
  { value: `עד ${spec.coverageMaxPct}`, unit: "%", label: `כיסוי פאנלים נטו (אפשרות עד\u00a0${spec.coverageExceptionPct}%)` },
  { value: `${spec.bufferDunam}`, unit: "דונם", label: "אזור חיץ בין המערכת לאזור המגורים" },
  { value: `≥ ${spec.yieldNormPct}`, unit: "%", label: "המשך גידול מהתפוקה הנורמטיבית (״חקלאות מיטבית״)" },
  { value: `${spec.projectLifeYears}`, unit: "שנה", label: "אורך חיי פרויקט, תפעול ותחזוקה" },
] as const;
