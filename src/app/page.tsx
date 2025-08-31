"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="w-full">
            <ul
              role="list"
              className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
            >
              <li>
                <Link href={"/counting"} className="col-span-1 flex rounded-md shadow-xs">
                  <div className="bg-green-500 flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                    CO
                  </div>
                  <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800/50">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <span className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
                        Flash Counting
                      </span>
                      <p className="text-gray-500 dark:text-gray-400">Count numbers</p>
                    </div>
                  </div>
                </Link>
              </li>
              <li>
                <Link href={"/cards"} className="col-span-1 flex rounded-md shadow-xs">
                  <div className="bg-orange-500 flex w-16 shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white">
                    CA
                  </div>
                  <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white dark:border-white/10 dark:bg-gray-800/50">
                    <div className="flex-1 truncate px-4 py-2 text-sm">
                      <span className="font-medium text-gray-900 hover:text-gray-600 dark:text-white dark:hover:text-gray-200">
                        Cards
                      </span>
                      <p className="text-gray-500 dark:text-gray-400">Play with abacus</p>
                    </div>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </>
  );
}
