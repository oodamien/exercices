"use client";

import { CardsConfigState, BeadColorScheme } from "@/app/types";
import { useTranslation } from "@/app/components/language-context";

interface CardsConfigProps {
  config: CardsConfigState;
  categories: { level: number; name: string }[];
  onChange: (state: CardsConfigState) => void;
}

function Stepper({
  value, min, max, step, format, onChange, ariaLabel, wrap,
}: {
  value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void; ariaLabel: string; wrap?: boolean;
}) {
  const decrement = () => {
    if (wrap && value - step < min) { onChange(max); }
    else { onChange(Math.max(min, value - step)); }
  };
  const increment = () => {
    if (wrap && value + step > max) { onChange(min); }
    else { onChange(Math.min(max, value + step)); }
  };

  return (
    <div className="flex items-center gap-2" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={decrement}
        className="w-8 h-8 rounded-full bg-sc-bg-tertiary text-sc-orange hover:bg-sc-orange/20 border border-sc-orange/20 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
        aria-label={`${ariaLabel} decrease`}
      >
        ◀
      </button>
      <span className="min-w-[70px] text-center font-mono text-sm text-sc-text">
        {format(value)}
      </span>
      <button
        type="button"
        onClick={increment}
        className="w-8 h-8 rounded-full bg-sc-bg-tertiary text-sc-orange hover:bg-sc-orange/20 border border-sc-orange/20 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
        aria-label={`${ariaLabel} increase`}
      >
        ▶
      </button>
    </div>
  );
}

const COLOR_OPTIONS: BeadColorScheme[] = ["default", "black", "white"];

export function CardsConfig({ config, categories, onChange }: CardsConfigProps) {
  const t = useTranslation();

  const colorLabelKey: Record<BeadColorScheme, string> = {
    default: "cards.config.color.default",
    black: "cards.config.color.black",
    white: "cards.config.color.white",
  };

  return (
    <div className="bg-sc-bg-secondary rounded-2xl p-5 border border-sc-orange/10">
      <form>
        <div className="space-y-4">
          <h2 className="text-lg font-[family-name:var(--font-fredoka)] text-sc-text flex items-center gap-2">
            📡 {t("config.title")}
          </h2>

          {/* Difficulty dropdown */}
          <div>
            <label htmlFor="cards-difficulty" className="block text-sm font-medium text-sc-text-dim">
              {t("cards.config.difficulty")}
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="cards-difficulty"
                name="difficulty"
                defaultValue={config.difficulty}
                onChange={(e) => onChange({ ...config, difficulty: e.target.value })}
                aria-label={t("cards.config.difficulty")}
                className="col-start-1 row-start-1 w-full appearance-none rounded-lg bg-sc-bg-tertiary py-2 pr-8 pl-3 text-base text-sc-text border border-sc-orange/20 focus:outline-2 focus:outline-sc-orange"
              >
                {categories.map((cat) => (
                  <option key={cat.level} value={cat.level}>{cat.name}</option>
                ))}
              </select>
              <svg className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-sc-text-dim sm:size-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Impulses stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("cards.config.impulses")}</label>
            <div className="mt-2">
              <Stepper value={config.impulses} min={1} max={10} step={1} format={(v) => String(v)} onChange={(impulses) => onChange({ ...config, impulses })} ariaLabel={t("cards.config.impulses")} />
            </div>
          </div>

          {/* Interval stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("cards.config.interval")}</label>
            <div className="mt-2">
              <Stepper value={config.interval} min={1000} max={5000} step={1000} format={(v) => t("cards.config.intervalSec").replace("{val}", String(v / 1000))} onChange={(interval) => onChange({ ...config, interval })} ariaLabel={t("cards.config.interval")} />
            </div>
          </div>

          {/* Rotation stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("cards.config.rotation")}</label>
            <div className="mt-2">
              <Stepper value={config.rotation} min={0} max={330} step={30} format={(v) => `${v}\u00B0`} onChange={(rotation) => onChange({ ...config, rotation })} ariaLabel={t("cards.config.rotation")} wrap />
            </div>
          </div>

          {/* Color toggle */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("cards.config.color")}</label>
            <div className="mt-2 flex gap-2">
              {COLOR_OPTIONS.map((scheme) => (
                <button
                  key={scheme}
                  type="button"
                  onClick={() => onChange({ ...config, colorScheme: scheme })}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    config.colorScheme === scheme
                      ? "bg-sc-gold text-sc-bg-primary"
                      : "bg-sc-bg-tertiary text-sc-text-dim hover:text-sc-text border border-sc-orange/10"
                  }`}
                >
                  {t(colorLabelKey[scheme])}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
