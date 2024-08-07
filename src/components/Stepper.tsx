export default function Stepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const options = [1, 2, 3, 4, 5, 7, 8, 9, 10];
  const index = options.findLastIndex((option) => option <= value);
  const prev = options[index - 1] ?? 1;
  const next = options[index + 1] ?? 11;

  const numLength = value.toString().length;
  const zeroPadding = numLength >= 3 ? "" : "0".padStart(3 - numLength, "0");

  return (
    <div className="flex flex-row items-center justify-center gap-2 rounded-b-md py-2 mt-2">
      <button
        type="button"
        className="w-8 h-8 rounded-md bg-blue-600 text-white font-viga text-xl active:pt-0.5"
        onClick={() => onChange(prev)}
        disabled={value <= 1}
      >
        -
      </button>
      <div className="text-white font-roboto tabular-nums text-2xl">
        <span className="opacity-30">{zeroPadding}</span>
        {value}
      </div>
      <button
        type="button"
        className="w-8 h-8 rounded-md bg-blue-600 text-white font-viga text-xl active:pt-0.5"
        onClick={() => onChange(next)}
        disabled={value >= 1000}
      >
        +
      </button>
    </div>
  );
}
