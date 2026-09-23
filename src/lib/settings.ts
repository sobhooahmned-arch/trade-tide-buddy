export type PaySettings = {
  /** اسم طريقة التحويل، مثال: أورنج كاش */
  methodName: string;
  /** أرقام استلام الإيداع */
  depositNumbers: string[];
  /** رقم استلام الضريبة */
  taxNumber: string;
};

const KEY = "em_pay_settings";

export const DEFAULT_PAY_SETTINGS: PaySettings = {
  methodName: "أورنج كاش",
  depositNumbers: ["01201838463", "01208895415"],
  taxNumber: "01208895415",
};

export function getPaySettings(): PaySettings {
  if (typeof window === "undefined") return DEFAULT_PAY_SETTINGS;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_PAY_SETTINGS;
    const parsed = JSON.parse(raw) as Partial<PaySettings>;
    const numbers = Array.isArray(parsed.depositNumbers)
      ? parsed.depositNumbers.filter((n) => typeof n === "string" && n.trim().length > 0)
      : [];
    return {
      methodName: parsed.methodName?.trim() || DEFAULT_PAY_SETTINGS.methodName,
      depositNumbers: numbers.length ? numbers : DEFAULT_PAY_SETTINGS.depositNumbers,
      taxNumber: parsed.taxNumber?.trim() || DEFAULT_PAY_SETTINGS.taxNumber,
    };
  } catch {
    return DEFAULT_PAY_SETTINGS;
  }
}

export function savePaySettings(value: PaySettings) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(
    KEY,
    JSON.stringify({
      methodName: value.methodName.trim() || DEFAULT_PAY_SETTINGS.methodName,
      depositNumbers: value.depositNumbers.map((n) => n.trim()).filter(Boolean),
      taxNumber: value.taxNumber.trim() || DEFAULT_PAY_SETTINGS.taxNumber,
    }),
  );
}
