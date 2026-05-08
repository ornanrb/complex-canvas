import type { C, Op } from "@/lib/complex";
import { formatC, opLabel, opSymbol } from "@/lib/complex";
import { Sparkles } from "lucide-react";

interface Props {
  a: C;
  b: C;
  op: Op;
  result: C;
  pulseKey: number;
}

export const ResultCard = ({ a, b, op, result, pulseKey }: Props) => (
  <div
    className="glass-card p-6 overflow-hidden relative"
    style={{ background: "var(--gradient-result)" }}
  >
    <div className="absolute inset-0 opacity-10 pointer-events-none">
      <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white blur-3xl" />
    </div>
    <div className="relative text-primary-foreground">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider opacity-90">
        <Sparkles className="w-4 h-4" />
        Resultado · {opLabel[op]}
      </div>
      <div key={pulseKey} className="mt-4 animate-pop">
        <div className="text-sm opacity-80 font-mono">
          ({formatC(a)}) {opSymbol[op]} ({formatC(b)}) =
        </div>
        <div className="mt-2 text-4xl md:text-5xl font-bold font-mono break-words">
          {formatC(result)}
        </div>
      </div>
    </div>
  </div>
);
