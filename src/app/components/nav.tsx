"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/app/components/language-context";
import { HomeIcon, PlanetIcon } from "@/app/components/icons/nav-icons";

interface Props {
  mobile?: boolean;
}

export function Nav({ mobile }: Props) {
  const pathname = usePathname();
  const t = useTranslation();

  const links = [
    { href: "/", label: t("nav.home"), Icon: HomeIcon },
    { href: "/cards", label: t("nav.cards"), Icon: PlanetIcon },
  ];

  const baseClass = mobile
    ? "flex items-center gap-2 rounded-lg px-3 py-2.5 text-base font-medium transition-all"
    : "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all";

  const activeClass = "bg-sc-bg-tertiary text-sc-gold glow-gold";
  const inactiveClass = "text-sc-text-dim hover:text-sc-text hover:bg-sc-bg-tertiary/50";

  return (
    <div className={mobile ? "" : "ml-8 flex items-baseline space-x-2"}>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}
            aria-current={isActive ? "page" : undefined}
          >
            <link.Icon className="w-4 h-4" />
            {link.label}
            {isActive && !mobile && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-sc-gold animate-led-blink" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
