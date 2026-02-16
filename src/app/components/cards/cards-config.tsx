"use client";

import { CardsConfigState, BeadColorScheme } from "@/app/types";
import { useTranslation } from "@/app/components/language-context";

interface CardsConfigProps {
  config: CardsConfigState;
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
      <span className="min-w-[160px] text-center font-mono text-sm text-sc-text">
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

const COLOR_OPTIONS: BeadColorScheme[] = ["default", "standard"];

export function CardsConfig({ config, onChange }: CardsConfigProps) {
  const t = useTranslation();

  const colorLabelKey: Record<BeadColorScheme, string> = {
    default: "cards.config.color.default",
    standard: "cards.config.color.standard",
  };

  return (
    <div className="bg-sc-bg-secondary rounded-2xl p-5 border border-sc-orange/10">
      <form>
        <div className="space-y-4">
          <h2 className="text-lg font-[family-name:var(--font-fredoka)] text-sc-text flex items-center gap-2">
            📡 {t("config.title")}
          </h2>

          {/* Level stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">
              {t("cards.config.difficulty")}
            </label>
            <div className="mt-2">
              <Stepper
                value={config.level}
                min={1}
                max={9}
                step={1}
                format={(v) => t(`cards.config.level.${v}`)}
                onChange={(level) => onChange({ ...config, level })}
                ariaLabel={t("cards.config.difficulty")}
              />
            </div>
          </div>

          {/* Impulses stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("cards.config.impulses")}</label>
            <div className="mt-2">
              <Stepper value={config.impulses} min={1} max={6} step={1} format={(v) => String(v)} onChange={(impulses) => onChange({ ...config, impulses })} ariaLabel={t("cards.config.impulses")} />
            </div>
          </div>

          {/* Interval stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("cards.config.interval")}</label>
            <div className="mt-2">
              <Stepper value={config.interval} min={100} max={15000} step={250} format={(v) => t("cards.config.intervalSec").replace("{val}", (v / 1000).toFixed(v % 1000 === 0 ? 0 : 1))} onChange={(interval) => onChange({ ...config, interval })} ariaLabel={t("cards.config.interval")} />
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
