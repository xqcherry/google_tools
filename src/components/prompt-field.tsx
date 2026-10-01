"use client";

export function PromptField({ id, label, placeholder, value, onChange, error, hint }: { id: string; label: string; placeholder: string; value: string; onChange: (value: string) => void; error: string; hint: string }) {
  return <div className="field"><label htmlFor={id} className="field-label">{label} <span className="required">必填</span></label><textarea id={id} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={6} aria-invalid={Boolean(error)} aria-describedby={`${id}-hint ${id}-error`} /><p id={`${id}-hint`} className="field-hint">{hint}</p><p id={`${id}-error`} className="field-error" role="alert">{error}</p></div>;
}
