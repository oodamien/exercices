"use client";

import Link from "next/link";
import { usePathname  } from "next/navigation";

interface Props {}

export function Nav(props: Props) {
  const pathname = usePathname ();
  return (
    <div className="ml-10 flex items-baseline space-x-4">
      <Link
        href="/"
        className={`${
          pathname == "/"
            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
        aria-current="page"
      >
        Dashboard
      </Link>
      <Link
        href="/counting"
        className={`${
            pathname == "/counting"
              ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
      >
        Counting
      </Link>
      <Link
        href="/cards"
        className={`${
            pathname == "/cards"
              ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
              : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
      >
        Cards
      </Link>
    </div>
  );
}
