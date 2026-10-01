"use client";

import { useState, type FormEvent } from "react";
import { ImagePicker } from "./image-picker";
import { PromptField } from "./prompt-field";
import { ModelSelect } from "./model-select";
import { ResultPanel } from "./result-panel";
import { preferredModel } from "@/lib/models";
import type { PreviewState, ToolId } from "@/lib/types";

const copy = {
  understand: { image: "需要理解的图片", prompt: "你想问什么？", placeholder: "例如：请描述画面中的主要物体和它们的位置。", hint: "写下你希望从图片中了解的问题。" },
  generate: { image: "", prompt: "画面描述", placeholder: "例如：傍晚的海边书店，暖色灯光，宽幅构图，细腻摄影质感。", hint: "描述主体、场景、光线或风格，让未来的生成任务更明确。" },
  edit: { image: "需要修改的原图", prompt: "修改说明", placeholder: "例如：保留人物与构图，将背景改成雨后的城市街道。", hint: "说明要改动的部分，也可以写出需要保留的内容。" },
} as const;

export function ToolForm({ kind }: { kind: ToolId }) {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(preferredModel[kind]);
  const [state, setState] = useState<PreviewState>("idle");
  const [errors, setErrors] = useState({ image: "", prompt: "" });
  const labels = copy[kind];
  const needsImage = kind !== "generate";

  function check(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = { image: needsImage && !file ? "请先选择一张图片。" : errors.image, prompt: !prompt.trim() ? kind === "understand" ? "请输入想了解的问题。" : kind === "edit" ? "请输入修改说明。" : "请输入画面描述。" : "" };
    setErrors(next);
    setState(next.image || next.prompt ? "invalid" : "ready_for_integration");
  }

  return <div className="workspace-grid"><form className="input-panel" onSubmit={check} noValidate><div className="panel-top"><h2>准备输入</h2><span className="step-number">本地检查</span></div><div className="form-fields">{needsImage && <ImagePicker id={`${kind}-image`} label={labels.image} file={file} onFileChange={(next) => { setFile(next); setState("idle"); setErrors((old) => ({ ...old, image: "" })); }} error={errors.image} onError={(image) => { setErrors((old) => ({ ...old, image })); if (image) setState("invalid"); }} />}<PromptField id={`${kind}-prompt`} label={labels.prompt} placeholder={labels.placeholder} value={prompt} onChange={(next) => { setPrompt(next); setState("idle"); setErrors((old) => ({ ...old, prompt: "" })); }} error={errors.prompt} hint={labels.hint} /><ModelSelect id={`${kind}-model`} value={model} onChange={(next) => { setModel(next); setState("idle"); }} /></div><div className="form-action"><button type="submit" className="primary-button">检查输入 <span aria-hidden="true">↗</span></button><p>仅检查当前页面的输入，不会发送模型请求。</p></div><div className={`form-status form-status-${state}`} role="status" aria-live="polite">{state === "invalid" && "请修正标出的字段后再次检查。"}{state === "ready_for_integration" && "输入已就绪，当前仅支持预览。模型能力和服务连接仍待验证。"}</div></form><ResultPanel kind={kind} /></div>;
}
