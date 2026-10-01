"use client";

import { useEffect, useRef, useState } from "react";

const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"];
const maxBytes = 10 * 1024 * 1024;

export function ImagePicker({ id, label, file, onFileChange, error, onError }: { id: string; label: string; file: File | null; onFileChange: (file: File | null) => void; error: string; onError: (error: string) => void }) {
  const [preview, setPreview] = useState<string | null>(null);
  const [readError, setReadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setReadError("");
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function clear() {
    onFileChange(null);
    onError("");
    setPreview(null);
    setReadError("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function select(next: File | undefined) {
    if (!next) return;
    if (!allowed.includes(next.type)) { clear(); onError("请选择 JPG、PNG、WebP、GIF 或 AVIF 图片。"); return; }
    if (next.size > maxBytes) { clear(); onError("图片超过 10 MB 本地预览限制，请选择较小的文件。"); return; }
    onError("");
    onFileChange(next);
  }

  return <div className="field"><div className="field-heading"><label htmlFor={id}>{label} <span className="required">必填</span></label><span>本地预览限制 10 MB</span></div><div className={`upload-zone ${error || readError ? "has-error" : ""}`}><input ref={inputRef} id={id} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" onChange={(event) => select(event.target.files?.[0])} aria-invalid={Boolean(error || readError)} aria-describedby={`${id}-hint ${id}-error`} /><div className="upload-content">{preview ? <div className="preview-wrap"><img src={preview} alt={`所选图片预览：${file?.name ?? ""}`} onError={() => { onFileChange(null); setReadError("无法读取这张图片，请重新选择。"); setPreview(null); if (inputRef.current) inputRef.current.value = ""; }} /><div className="preview-details"><strong>{file?.name}</strong><span>{file ? (file.size / 1024 / 1024).toFixed(2) : "0"} MB · 仅在浏览器中预览</span></div></div> : <><span className="upload-symbol" aria-hidden="true">＋</span><strong>选择一张图片</strong><span>JPG、PNG、WebP、GIF、AVIF</span></>}</div></div><div className="field-bottom"><p id={`${id}-hint`} className="field-hint">图片只用于当前页面预览，尚不会上传或保存。</p>{file && <button type="button" className="text-button" onClick={clear}>清除图片</button>}</div><p id={`${id}-error`} className="field-error" role="alert">{error || readError}</p></div>;
}
