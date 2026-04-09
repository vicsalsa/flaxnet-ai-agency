import { Mail, Linkedin, Twitter, Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-accent">Flaxnet IA</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Agencia especializada en automatización, IA y transformación digital para empresas modernas.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Automatización n8n</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Agentes de IA</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Diseño Web</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">SEO Profesional</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-accent transition-colors">Sobre Nosotros</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Casos de Éxito</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contacto</h4>
            <div className="space-y-3">
              <a href="mailto:info@flaxnet.es" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors">
                <Mail size={16} />
                info@flaxnet.es
              </a>
              <div className="flex gap-3 pt-2">
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  <Github size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {currentYear} Flaxnet IA. Todos los derechos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-accent transition-colors">Privacidad</a>
            <a href="#" className="hover:text-accent transition-colors">Términos</a>
            <a href="#" className="hover:text-accent transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
