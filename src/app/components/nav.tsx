"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/components/language-context";

interface Props {
  mobile?: boolean;
}

export function Nav({ mobile }: Props) {
  const pathname = usePathname();
  const t = useTranslation();

  const links = [
    { href: "/", label: t("nav.home"), icon: "🏠" },
    { href: "/counting", label: t("nav.counting"), icon: "⚡" },
    { href: "/cards", label: t("nav.cards"), icon: "🪐" },
  ];

  const baseClass = mobile
    ? "flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium transition-all"
    : "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all";

  const activeClass = "bg-sc-bg-tertiary text-sc-gold glow-gold";
  const inactiveClass = "text-sc-text-dim hover:text-sc-text hover:bg-sc-bg-tertiary/50";

  return (
    <div className={mobile ? "" : "ml-8 flex items-baseline space-x-2"}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${baseClass} ${pathname === link.href ? activeClass : inactiveClass}`}
          aria-current={pathname === link.href ? "page" : undefined}
        >
          <span className="text-base">{link.icon}</span>
          {link.label}
        </Link>
      ))}
    </div>
  );
}
