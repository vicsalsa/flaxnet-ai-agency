import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-7xl md:text-8xl font-bold text-accent">404</h1>
          <p className="text-2xl md:text-3xl font-semibold text-foreground">Página no encontrada</p>
        </div>
        
        <p className="text-lg text-muted-foreground max-w-md">
          Lo sentimos, la página que buscas no existe o ha sido movida. Vuelve al inicio para continuar.
        </p>

        <Link href="/">
          <button className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 flex items-center justify-center gap-2 group mx-auto">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Volver al Inicio
          </button>
        </Link>
      </div>
    </div>
  );
}
