import Link from "next/link";
import type { Tool } from "@/lib/types";

export function ToolCard({ tool }: { tool: Tool }) {
  return <Link href={tool.href} className={`tool-card tool-card-${tool.id}`}><div className="card-art" aria-hidden="true"><span className="art-frame art-frame-back" /><span className="art-frame art-frame-front"><span className="art-orb" /><span className="art-horizon" /></span><span className="art-crosshair">{tool.mark}</span></div><div className="card-copy"><div className="card-labels"><span className="card-category">{tool.category}</span><span className="card-task">{tool.task}</span></div><div className="card-heading"><h3>{tool.name}</h3><span className="arrow" aria-hidden="true">↗</span></div><p>{tool.description}</p><div className="card-meta"><span>输入：{tool.input}</span><span>输出：{tool.output}</span></div></div></Link>;
}
