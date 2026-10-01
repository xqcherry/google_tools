"use client";

import { modelCandidates } from "@/lib/models";

export function ModelSelect({ id, value, onChange }: { id: string; value: string; onChange: (value: string) => void }) {
  return <div className="field"><label htmlFor={id} className="field-label">候选模型</label><select id={id} value={value} onChange={(event) => onChange(event.target.value)} aria-describedby={`${id}-hint`}>{modelCandidates.map((model) => <option value={model.id} key={model.id}>{model.label} · 待验证</option>)}</select><p id={`${id}-hint`} className="field-hint">默认项只是计划优先验证的入口，尚未确认该模型支持此功能。</p></div>;
}
