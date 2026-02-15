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
    { href: "/", label: t("nav.home") },
    { href: "/counting", label: t("nav.counting") },
    { href: "/cards", label: t("nav.cards") },
  ];

  const baseClass = mobile
    ? "block rounded-md px-3 py-2 text-base font-medium"
    : "rounded-md px-3 py-2 text-sm font-medium";

  const activeClass = "bg-gray-900 text-white";
  const inactiveClass = "text-gray-300 hover:bg-gray-700 hover:text-white";

  return (
    <div className={mobile ? "" : "ml-10 flex items-baseline space-x-4"}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`${baseClass} ${pathname === link.href ? activeClass : inactiveClass}`}
          aria-current={pathname === link.href ? "page" : undefined}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
