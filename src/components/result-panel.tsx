import type { ToolId } from "@/lib/types";

const descriptions: Record<ToolId, string> = {
  understand: "接入服务后，这里会显示图片的文本回答与实际使用的模型。",
  generate: "接入服务后，这里会显示生成图片、下载入口与作品记录状态。",
  edit: "接入服务后，这里会显示编辑后的图片、下载入口与作品记录状态。",
};

export function ResultPanel({ kind }: { kind: ToolId }) {
  return <section className="result-panel" aria-labelledby="result-title"><div className="panel-top"><h2 id="result-title">结果预览</h2><span className="status-pill">待接入</span></div><div className="result-empty"><div className={`result-glyph result-glyph-${kind}`} aria-hidden="true"><span /><span /></div><h3>结果将在这里出现</h3><p>{descriptions[kind]}</p></div><div className="result-foot"><span>当前没有生成结果</span><span>下载入口将在服务接入后启用</span></div></section>;
}
