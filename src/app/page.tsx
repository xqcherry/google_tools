import { ToolSearch } from "@/components/tool-search";

export default function HomePage() {
  return <main className="wrap home"><section className="hero"><div className="hero-copy"><h1>需要什么工具，<br />从这里找。</h1><p>工具箱会逐步扩展。当前先提供三项图片工具的本地预览与输入校验：图片理解、生图、改图。模型服务尚未接入。</p><a className="primary-link" href="#catalog-title">浏览工具 <span aria-hidden="true">↗</span></a></div><div className="hero-art" role="img" aria-label="由不同形状的抽象模块组成的工具箱图形"><div className="kit-board"><span className="kit-spine" /><span className="kit-module kit-module-large"><i /><i /><i /></span><span className="kit-module kit-module-top"><i /><i /></span><span className="kit-module kit-module-bottom"><i /><i /><i /></span><span className="kit-handle" /></div></div></section><ToolSearch /></main>;
}
