import { useEffect, useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { ComplexInput } from "@/components/ComplexInput";
import { OperationButtons } from "@/components/OperationButtons";
import { ResultCard } from "@/components/ResultCard";
import { StepsCard } from "@/components/StepsCard";
import { ComplexPlane } from "@/components/ComplexPlane";
import { buildSteps, computeOp, type C, type Op } from "@/lib/complex";

const Index = () => {
  const [a, setA] = useState<C>({ re: 3, im: 2 });
  const [b, setB] = useState<C>({ re: 1, im: 4 });
  const [activeOp, setActiveOp] = useState<Op>("add");
  const [showPlot, setShowPlot] = useState(true);
  const [pulseKey, setPulseKey] = useState(0);

  const result = useMemo(() => computeOp(a, b, activeOp), [a, b, activeOp]);
  const steps = useMemo(() => buildSteps(a, b, activeOp), [a, b, activeOp]);

  useEffect(() => { setPulseKey((k) => k + 1); }, [result, activeOp]);

  const run = (next: Op) => setActiveOp(next);

  return (
    <main className="min-h-screen px-4 py-10 md:py-14">
      <div className="max-w-7xl mx-auto">
        <Header />

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <ComplexInput label="A" color="primary" value={a} onChange={setA} />
          <ComplexInput label="B" color="secondary" value={b} onChange={setB} />
        </div>

        <section className="glass-card p-6 mb-6 animate-fade-up">
          <OperationButtons onRun={run} active={activeOp} />
        </section>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <ResultCard a={a} b={b} op={activeOp} result={result} pulseKey={pulseKey} />
          <StepsCard steps={steps} pulseKey={pulseKey} />
        </div>

        <section className="glass-card p-6 animate-fade-up">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div>
              <h3 className="text-lg font-semibold">Plano complejo (Argand)</h3>
              <p className="text-sm text-muted-foreground">Visualiza A, B y el resultado como vectores.</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowPlot((s) => !s)}
              className="rounded-xl"
              aria-pressed={showPlot}
            >
              {showPlot ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
              {showPlot ? "Ocultar gráfica" : "Mostrar gráfica"}
            </Button>
          </div>
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showPlot ? "opacity-100 max-h-[600px]" : "opacity-0 max-h-0"
            }`}
          >
            {showPlot && <ComplexPlane a={a} b={b} result={result} />}
          </div>
        </section>

        <footer className="text-center text-sm text-muted-foreground mt-10">
          Construido con React, Vite, Tailwind, Math.js y Plotly.js
        </footer>
      </div>
    </main>
  );
};

export default Index;
