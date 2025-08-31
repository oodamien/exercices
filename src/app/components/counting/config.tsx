import { FLASH_COUNTING_CATS } from "@/app/Data";
import { useState } from "react";

interface Props {
  config: ConfigState;
  onChange: Function;
}

export interface ConfigState {
  difficulty: string;
  interval: number;
}

export function Config(props: Props) {
  const values = FLASH_COUNTING_CATS;
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <form>
        <div className="space-y-12 min-h-140">
          <div className="border-gray-900/10">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Configuration Game
            </h2>

            <div className="sm:col-span-3 mt-4">
              <label
                htmlFor="difficulty"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Difficulty
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="difficulty"
                  name="difficulty"
                  defaultValue={props.config?.difficulty}
                  onChange={(e) => {
                    props.onChange({
                      ...props.config,
                      difficulty: e.target.value,
                    });
                  }}
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  {values.map((value: any) => (
                    <option key={value.level} value={value.level}>
                      {value.name}
                    </option>
                  ))}
                </select>
                <svg
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div className="sm:col-span-3 mt-4">
              <label
                htmlFor="interval"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Interval
              </label>
              <div className="mt-2 grid grid-cols-1">
                <input
                  type="number"
                  name="interval"
                  id="interval"
                  onChange={(e) => {
                    props.onChange({
                      ...props.config,
                      interval: +e.target.value,
                    });
                  }}
                  defaultValue={props.config?.interval}
                  className="block w-16 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
