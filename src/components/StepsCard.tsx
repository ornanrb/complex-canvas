import { ListOrdered } from "lucide-react";

interface Props {
  steps: string[];
  pulseKey: number;
}

export const StepsCard = ({ steps, pulseKey }: Props) => (
  <div className="glass-card p-6">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-9 h-9 rounded-xl bg-accent/15 grid place-items-center">
        <ListOrdered className="w-5 h-5 text-accent" />
      </div>
      <h3 className="text-lg font-semibold">Desarrollo paso a paso</h3>
    </div>
    <ol key={pulseKey} className="space-y-2.5">
      {steps.map((s, i) => (
        <li
          key={i}
          className="flex gap-3 items-start font-mono text-sm md:text-base p-3 rounded-xl bg-muted/50 animate-fade-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className="shrink-0 w-6 h-6 rounded-full bg-[image:var(--gradient-primary)] text-primary-foreground text-xs font-bold grid place-items-center">
            {i + 1}
          </span>
          <span className="break-words">{s}</span>
        </li>
      ))}
    </ol>
  </div>
);
