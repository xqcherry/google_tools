"use client";

import { useState } from "react";
import { tools } from "@/lib/tool-catalog";
import { ToolCard } from "./tool-card";

export function ToolSearch() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase();
  const filtered = tools.filter((tool) => [tool.name, tool.description, tool.category, tool.task, tool.input, tool.output].some((value) => value.toLocaleLowerCase().includes(normalized)));
  return <section className="catalog" aria-labelledby="catalog-title"><div className="section-head"><div><h2 id="catalog-title">选择一项工具</h2><p>按任务进入独立工作区，先检查输入，再接入实际服务。</p></div><span className="count">{filtered.length} / {tools.length} 项</span></div><div className="search-row"><label htmlFor="tool-search" className="sr-only">搜索工具</label><span aria-hidden="true" className="search-icon">⌕</span><input id="tool-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索名称、说明或类别" autoComplete="off" /></div>{filtered.length > 0 ? <div className="tool-grid">{filtered.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div> : <div className="empty-search" role="status"><h3>没有找到匹配的工具</h3><p>试试“图片”“创作”或清空搜索词。</p><button type="button" className="text-button" onClick={() => setQuery("")}>清空搜索</button></div>}</section>;
}
