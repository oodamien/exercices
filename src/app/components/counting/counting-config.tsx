"use client";

import { CountingConfigState, CountingOperation } from "@/app/types";
import { useTranslation } from "@/app/components/language-context";

interface CountingConfigProps {
  config: CountingConfigState;
  categories: { level: number; name: string }[];
  onChange: (state: CountingConfigState) => void;
}

function Stepper({
  value, min, max, step, format, onChange, ariaLabel,
}: {
  value: number; min: number; max: number; step: number;
  format: (v: number) => string; onChange: (v: number) => void; ariaLabel: string;
}) {
  const decrement = () => onChange(Math.max(min, +(value - step).toFixed(4)));
  const increment = () => onChange(Math.min(max, +(value + step).toFixed(4)));

  return (
    <div className="flex items-center gap-2" role="group" aria-label={ariaLabel}>
      <button
        type="button"
        onClick={decrement}
        className="w-8 h-8 rounded-full bg-sc-bg-tertiary text-sc-cyan hover:bg-sc-cyan/20 border border-sc-cyan/20 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
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
        className="w-8 h-8 rounded-full bg-sc-bg-tertiary text-sc-cyan hover:bg-sc-cyan/20 border border-sc-cyan/20 flex items-center justify-center text-sm font-bold cursor-pointer transition-colors"
        aria-label={`${ariaLabel} increase`}
      >
        ▶
      </button>
    </div>
  );
}

const OPERATION_OPTIONS: CountingOperation[] = ["+", "-", "+-"];

export function CountingConfig({ config, categories, onChange }: CountingConfigProps) {
  const t = useTranslation();

  const operationLabelKey: Record<CountingOperation, string> = {
    "+": "counting.config.opPlus",
    "-": "counting.config.opMinus",
    "+-": "counting.config.opMixed",
  };

  return (
    <div className="bg-sc-bg-secondary rounded-2xl p-5 border border-sc-cyan/10">
      <form>
        <div className="space-y-4">
          <h2 className="text-lg font-[family-name:var(--font-fredoka)] text-sc-text flex items-center gap-2">
            📡 {t("config.title")}
          </h2>

          {/* Difficulty dropdown */}
          <div>
            <label htmlFor="counting-difficulty" className="block text-sm font-medium text-sc-text-dim">
              {t("counting.config.difficulty")}
            </label>
            <div className="mt-2 grid grid-cols-1">
              <select
                id="counting-difficulty"
                name="difficulty"
                defaultValue={config.difficulty}
                onChange={(e) => onChange({ ...config, difficulty: e.target.value })}
                aria-label={t("counting.config.difficulty")}
                className="col-start-1 row-start-1 w-full appearance-none rounded-lg bg-sc-bg-tertiary py-2 pr-8 pl-3 text-base text-sc-text border border-sc-cyan/20 focus:outline-2 focus:outline-sc-cyan"
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

          {/* Operations toggle */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("counting.config.operation")}</label>
            <div className="mt-2 flex gap-2">
              {OPERATION_OPTIONS.map((op) => (
                <button
                  key={op}
                  type="button"
                  onClick={() => onChange({ ...config, operation: op })}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                    config.operation === op
                      ? "bg-sc-gold text-sc-bg-primary"
                      : "bg-sc-bg-tertiary text-sc-text-dim hover:text-sc-text border border-sc-cyan/10"
                  }`}
                >
                  {t(operationLabelKey[op])}
                </button>
              ))}
            </div>
          </div>

          {/* Terms stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("counting.config.terms")}</label>
            <div className="mt-2">
              <Stepper value={config.terms} min={2} max={8} step={1} format={(v) => String(v)} onChange={(terms) => onChange({ ...config, terms })} ariaLabel={t("counting.config.terms")} />
            </div>
          </div>

          {/* Interval stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("counting.config.interval")}</label>
            <div className="mt-2">
              <Stepper value={config.interval} min={500} max={5000} step={500} format={(v) => t("counting.config.intervalSec").replace("{val}", String(v / 1000))} onChange={(interval) => onChange({ ...config, interval })} ariaLabel={t("counting.config.interval")} />
            </div>
          </div>

          {/* Pause time stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("counting.config.pauseTime")}</label>
            <div className="mt-2">
              <Stepper value={config.pauseTime} min={100} max={1000} step={100} format={(v) => t("counting.config.pauseTimeSec").replace("{val}", String(v / 1000))} onChange={(pauseTime) => onChange({ ...config, pauseTime })} ariaLabel={t("counting.config.pauseTime")} />
            </div>
          </div>

          {/* Font size stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("counting.config.fontSize")}</label>
            <div className="mt-2">
              <Stepper value={config.fontSize} min={40} max={200} step={20} format={(v) => t("counting.config.fontSizePx").replace("{val}", String(v))} onChange={(fontSize) => onChange({ ...config, fontSize })} ariaLabel={t("counting.config.fontSize")} />
            </div>
          </div>

          {/* Line height stepper */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("counting.config.lineHeight")}</label>
            <div className="mt-2">
              <Stepper value={config.lineHeight} min={100} max={300} step={20} format={(v) => t("counting.config.lineHeightPx").replace("{val}", String(v))} onChange={(lineHeight) => onChange({ ...config, lineHeight })} ariaLabel={t("counting.config.lineHeight")} />
            </div>
          </div>

          {/* Separator toggle */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("counting.config.separator")}</label>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => onChange({ ...config, showSeparator: !config.showSeparator })}
                className={`cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                  config.showSeparator
                    ? "bg-sc-gold text-sc-bg-primary"
                    : "bg-sc-bg-tertiary text-sc-text-dim hover:text-sc-text border border-sc-cyan/10"
                }`}
              >
                |
              </button>
            </div>
          </div>

          {/* Symbols toggle */}
          <div>
            <label className="block text-sm font-medium text-sc-text-dim">{t("counting.config.symbols")}</label>
            <div className="mt-2">
              <button
                type="button"
                onClick={() => onChange({ ...config, showSymbols: !config.showSymbols })}
                className={`cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium transition-colors ${
                  config.showSymbols
                    ? "bg-sc-gold text-sc-bg-primary"
                    : "bg-sc-bg-tertiary text-sc-text-dim hover:text-sc-text border border-sc-cyan/10"
                }`}
              >
                #&
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
