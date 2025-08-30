"use client";

import { Game } from "@/app/components/cards/game";

export default function Cards() {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Cards
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="min-h-full">
            <main className="flex">
              <Game />
            </main>
          </div>
        </div>
      </main>
    </>
  );
}
