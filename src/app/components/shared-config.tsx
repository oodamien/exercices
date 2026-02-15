import { ConfigProps } from "@/app/types";

export function Config({ config, categories, onChange }: ConfigProps) {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <form>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Configuration
            </h2>

            <div className="mt-4">
              <label
                htmlFor="difficulty"
                className="block text-sm font-medium text-gray-900"
              >
                Niveau
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="difficulty"
                  name="difficulty"
                  defaultValue={config?.difficulty}
                  onChange={(e) => {
                    onChange({ ...config, difficulty: e.target.value });
                  }}
                  aria-label="Sélectionner le niveau de difficulté"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                  {categories.map((cat) => (
                    <option key={cat.level} value={cat.level}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
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
                className="block text-sm font-medium text-gray-900"
              >
                Intervalle (ms)
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
                  aria-label="Intervalle en millisecondes"
                  className="block w-28 rounded-md bg-white px-3 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
