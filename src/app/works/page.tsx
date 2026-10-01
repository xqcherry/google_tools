import Link from "next/link";

export default function WorksPage() {
  return <main className="wrap secondary-page"><div className="simple-head"><h1>作品</h1><p>以后可以在这里回看已保存的工具输入、结果及相关说明。当前尚未接入保存功能。</p></div><section className="quiet-panel works-empty"><div className="archive-art" aria-hidden="true"><span /><span /><span /></div><div><h2>还没有保存的作品</h2><p>第一阶段只提供本地预览与输入校验。即使检查通过，内容也不会保存到作品页。</p><Link href="/" className="secondary-link">返回工具目录 <span aria-hidden="true">↗</span></Link></div></section><div className="future-row"><span>预留的作品操作</span><span>查看详情 · 下载结果 · 删除作品</span><span>服务与存储接入后启用</span></div></main>;
}
