"use client";

import Link from "next/link";

const games = [
  {
    href: "/counting",
    title: "Flash Counting",
    description: "Compte les nombres le plus vite possible !",
    emoji: "🔢",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    href: "/cards",
    title: "Boulier",
    description: "Lis les nombres sur le boulier !",
    emoji: "🧮",
    gradient: "from-orange-400 to-amber-500",
  },
];

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-center text-4xl md:text-5xl font-bold text-indigo-900 mb-2">
          Mes Jeux de Calcul
        </h1>
        <p className="text-center text-lg text-indigo-600 mb-12">
          Choisis un jeu pour commencer !
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {games.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className={`group block rounded-2xl bg-gradient-to-br ${game.gradient} p-8 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200`}
            >
              <div className="text-6xl mb-4">{game.emoji}</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                {game.title}
              </h2>
              <p className="text-white/90 text-lg">{game.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
