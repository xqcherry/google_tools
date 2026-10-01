import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "工具箱",
  description: "可逐步扩展的工具目录。当前提供三项图片工具的本地预览与输入校验。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body><SiteHeader />{children}<footer className="site-footer"><div className="wrap footer-inner"><span>工具箱</span><span>第一阶段 · 本地预览与输入校验</span></div></footer></body></html>;
}
