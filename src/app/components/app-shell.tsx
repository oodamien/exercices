"use client";

import { useState } from "react";
import { Nav } from "@/app/components/nav";
import { LanguageProvider, LanguageSelector } from "@/app/components/language-context";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <LanguageProvider>
      <div className="min-h-full">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="shrink-0 text-2xl">🎮</div>
                <div className="hidden md:block">
                  <Nav />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <LanguageSelector />
                <div className="flex md:hidden">
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
                    aria-controls="mobile-menu"
                    aria-expanded={mobileMenuOpen}
                    aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                  >
                    <span className="absolute -inset-0.5"></span>
                    {!mobileMenuOpen ? (
                      <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>
                    ) : (
                      <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {mobileMenuOpen && (
            <div className="md:hidden" id="mobile-menu">
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3" onClick={() => setMobileMenuOpen(false)}>
                <Nav mobile />
              </div>
            </div>
          )}
        </nav>
        {children}
      </div>
    </LanguageProvider>
  );
}
