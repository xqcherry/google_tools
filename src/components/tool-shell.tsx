import Link from "next/link";
import { getTool } from "@/lib/tool-catalog";
import type { ToolId } from "@/lib/types";

export function ToolShell({ kind, children }: { kind: ToolId; children: React.ReactNode }) {
  const tool = getTool(kind);
  return <main className="wrap tool-page"><div className="breadcrumbs"><Link href="/">全部工具</Link><span aria-hidden="true">/</span><span>{tool.name}</span></div><div className="tool-page-head"><div><span className="page-symbol" aria-hidden="true">{tool.mark}</span><h1>{tool.name}</h1><p>{tool.description}</p></div><div className="flow-caption"><span>输入</span><b aria-hidden="true">→</b><span>检查</span><b aria-hidden="true">→</b><span>待接入服务</span></div></div>{children}</main>;
}
