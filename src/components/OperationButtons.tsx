import type { Op } from "@/lib/complex";
import { Button } from "@/components/ui/button";
import { Plus, Minus, X } from "lucide-react";

interface Props {
  onRun: (op: Op) => void;
  active?: Op;
}

const items: { op: Op; label: string; Icon: typeof Plus; gradient: string }[] = [
  { op: "add", label: "Sumar", Icon: Plus, gradient: "var(--gradient-primary)" },
  { op: "sub", label: "Restar", Icon: Minus, gradient: "var(--gradient-secondary)" },
  { op: "mul", label: "Multiplicar", Icon: X, gradient: "var(--gradient-accent)" },
];

export const OperationButtons = ({ onRun, active }: Props) => (
  <div className="grid grid-cols-3 gap-3">
    {items.map(({ op, label, Icon, gradient }) => (
      <Button
        key={op}
        onClick={() => onRun(op)}
        className="h-14 rounded-xl text-primary-foreground font-semibold transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-elegant)] border-0"
        style={{
          background: gradient,
          boxShadow: active === op ? "var(--shadow-elegant)" : undefined,
          transform: active === op ? "scale(1.02)" : undefined,
        }}
      >
        <Icon className="w-5 h-5 mr-1.5" />
        {label}
      </Button>
    ))}
  </div>
);
