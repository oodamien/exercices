"use client";

import { ConfigProps } from "@/app/types";
import { useTranslation } from "@/app/components/language-context";

export function Config({ config, categories, onChange }: ConfigProps) {
  const t = useTranslation();
  return (
    <div className="bg-sc-bg-secondary rounded-2xl p-5 border border-sc-cyan/10">
      <form>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-[family-name:var(--font-fredoka)] text-sc-text flex items-center gap-2">
              📡 {t("config.title")}
            </h2>

            <div className="mt-4">
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-sc-text-dim"
              >
                {t("config.difficulty")}
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="difficulty"
                  name="difficulty"
                  defaultValue={config?.difficulty}
                  onChange={(e) => {
                    onChange({ ...config, difficulty: e.target.value });
                  }}
                  aria-label={t("config.difficultyAria")}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-lg bg-sc-bg-tertiary py-2 pr-8 pl-3 text-base text-sc-text border border-sc-cyan/20 focus:outline-2 focus:outline-sc-cyan"
                >
                  {categories.map((cat) => (
                    <option key={cat.level} value={cat.level}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-sc-text-dim sm:size-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="interval"
                className="block text-sm font-medium text-sc-text-dim"
              >
                {t("config.interval")}
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="interval"
                  id="interval"
                  min={100}
                  max={10000}
                  step={100}
                  onChange={(e) => {
                    const val = Math.max(100, +e.target.value);
                    onChange({ ...config, interval: val });
                  }}
                  defaultValue={config?.interval}
                  aria-label={t("config.intervalAria")}
                  className="block w-28 rounded-lg bg-sc-bg-tertiary px-3 py-2 text-base text-sc-text border border-sc-cyan/20 placeholder:text-sc-text-dim/50 focus:outline-2 focus:outline-sc-cyan"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
