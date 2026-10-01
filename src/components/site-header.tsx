"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "工具" },
  { href: "/works", label: "作品" },
  { href: "/settings", label: "设置" },
  { href: "/login", label: "登录" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return <header className="site-header"><div className="wrap header-inner"><Link href="/" className="brand" aria-label="工具箱，返回首页"><span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span><span>工具箱</span></Link><nav aria-label="主导航" className="nav">{links.map((link) => <Link key={link.href} href={link.href} aria-current={(link.href === "/" ? pathname === "/" || pathname.startsWith("/tools/") : pathname === link.href) ? "page" : undefined}>{link.label}</Link>)}</nav></div></header>;
}
