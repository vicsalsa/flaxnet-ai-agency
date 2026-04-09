import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "wouter";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "/servicios", hasDropdown: true },
    { label: "Sobre Nosotros", href: "/sobre-nosotros" },
    { label: "Blog", href: "/blog" },
    { label: "Casos de Éxito", href: "/casos-exito" },
    { label: "Contacto", href: "/contacto" },
  ];

  const services = [
    { label: "Automatización n8n", href: "/servicios/n8n" },
    { label: "Agentes de IA", href: "/servicios/agentes-ia" },
    { label: "Diseño Web", href: "/servicios/diseno-web" },
    { label: "SEO Profesional", href: "/servicios/seo" },
    { label: "MCP Integración", href: "/servicios/mcp" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-background text-sm">F</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">
              Flaxnet
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item =>
            item.hasDropdown ? (
              <div key={item.href} className="relative group">
                <span className="flex items-center gap-1 text-foreground hover:text-accent transition-colors cursor-pointer text-sm font-medium py-4">
                  {item.label}
                  <ChevronDown
                    size={14}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </span>
                <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="p-2">
                    {services.map(service => (
                      <Link key={service.href} href={service.href}>
                        <span className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors">
                          {service.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href}>
                <span className="text-foreground hover:text-accent transition-colors cursor-pointer text-sm font-medium">
                  {item.label}
                </span>
              </Link>
            )
          )}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 text-sm">
            Contactar
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-card rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navItems.map(item =>
              item.hasDropdown ? (
                <div key={item.href} className="flex flex-col">
                  <button
                    onClick={() => setServicesOpen(!servicesOpen)}
                    className="flex items-center justify-between text-foreground hover:text-accent transition-colors py-2"
                  >
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown
                      size={16}
                      className={servicesOpen ? "rotate-180" : ""}
                    />
                  </button>
                  {servicesOpen && (
                    <div className="ml-4 mt-2 space-y-2 border-l-2 border-border pl-4">
                      {services.map(service => (
                        <Link key={service.href} href={service.href}>
                          <span
                            onClick={() => setIsOpen(false)}
                            className="block text-muted-foreground hover:text-accent py-1"
                          >
                            {service.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={item.href} href={item.href}>
                  <span
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-accent transition-colors cursor-pointer block py-2 font-medium"
                  >
                    {item.label}
                  </span>
                </Link>
              )
            )}
            <Link href="/contacto">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full px-6 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 mt-2"
              >
                Contactar
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
