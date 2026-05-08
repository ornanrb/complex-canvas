import type { C } from "@/lib/complex";
import { formatC } from "@/lib/complex";
import { Input } from "@/components/ui/input";

interface Props {
  label: string;
  color: "primary" | "secondary";
  value: C;
  onChange: (c: C) => void;
}

export const ComplexInput = ({ label, color, value, onChange }: Props) => {
  const accent = color === "primary" ? "var(--gradient-primary)" : "var(--gradient-secondary)";

  const set = (key: "re" | "im", v: string) => {
    const n = parseFloat(v);
    onChange({ ...value, [key]: Number.isFinite(n) ? n : 0 });
  };

  const Field = ({ k, name }: { k: "re" | "im"; name: string }) => (
    <div className="space-y-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {name}
      </label>
      <Input
        type="number"
        value={value[k]}
        onChange={(e) => set(k, e.target.value)}
        aria-label={`${label} ${name}`}
        className="text-center text-lg font-mono rounded-xl h-10"
      />
    </div>
  );

  return (
    <div className="glass-card p-6 animate-fade-up">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <span
            className="w-10 h-10 rounded-xl grid place-items-center text-lg font-bold text-primary-foreground"
            style={{ background: accent }}
          >
            {label}
          </span>
          <h3 className="text-lg font-semibold">Número complejo {label}</h3>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field k="re" name="Parte real" />
        <Field k="im" name="Parte imaginaria" />
      </div>
      <div className="mt-5 p-4 rounded-xl bg-muted/60 text-center">
        <span className="text-xs text-muted-foreground block mb-1">Forma binómica</span>
        <span className="text-2xl font-mono font-semibold">{label} = {formatC(value)}</span>
      </div>
    </div>
  );
};
