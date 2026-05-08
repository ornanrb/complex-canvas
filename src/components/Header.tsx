import { Sigma } from "lucide-react";

export const Header = () => (
  <header className="text-center mb-10 animate-fade-up">
    <div className="inline-flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-2xl bg-[image:var(--gradient-primary)] grid place-items-center shadow-[var(--shadow-glow)]">
        <Sigma className="w-6 h-6 text-primary-foreground" />
      </div>
      <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
        Laboratorio Matemático
      </span>
    </div>
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
      Operaciones con <span className="gradient-text">Números Complejos</span>
    </h1>
    <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
      Explora suma, resta y multiplicación de complejos con desarrollo paso a paso y visualización interactiva en el plano de Argand.
    </p>
  </header>
);
