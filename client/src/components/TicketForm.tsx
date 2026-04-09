import { useState } from "react";
import { Send, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface TicketFormProps {
  onTicketCreated?: (ticketId: string) => void;
  onCancel?: () => void;
}

export default function TicketForm({ onTicketCreated, onCancel }: TicketFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "general",
    subject: "",
    description: "",
    priority: "medium" as const,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const createTicketMutation = trpc.tickets.create.useMutation();

  const categories = [
    { value: "general", label: "Consulta General" },
    { value: "n8n", label: "Automatización n8n" },
    { value: "mcp", label: "Integración MCP" },
    { value: "ia-agents", label: "Agentes de IA" },
    { value: "web-design", label: "Diseño Web" },
    { value: "seo", label: "SEO Profesional" },
    { value: "marketing", label: "Marketing Digital" },
    { value: "technical", label: "Soporte Técnico" },
    { value: "billing", label: "Facturación" },
    { value: "other", label: "Otro" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.subject.trim()) newErrors.subject = "El asunto es requerido";
    if (!formData.description.trim()) newErrors.description = "La descripción es requerida";
    if (formData.description.trim().length < 10) {
      newErrors.description = "La descripción debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await createTicketMutation.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        category: formData.category,
        subject: formData.subject,
        description: formData.description,
        priority: formData.priority as "low" | "medium" | "high",
      });

      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        category: "general",
        subject: "",
        description: "",
        priority: "medium",
      });

      onTicketCreated?.(result.ticketId);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error creating ticket:", error);
      const errorMessage = error instanceof Error ? error.message : "Error al crear el ticket. Por favor, intenta de nuevo.";
      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-accent/10 border border-accent/30 rounded-lg">
          <h3 className="font-semibold text-accent mb-2">✓ Ticket Creado Exitosamente</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Tu ticket ha sido registrado. Se ha enviado una confirmación por email. Nos pondremos en contacto pronto.
          </p>
        </div>
        <button
          onClick={() => {
            setSubmitSuccess(false);
            onCancel?.();
          }}
          className="w-full px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
        >
          Volver al Chat
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Nombre *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-sm"
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Email *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-sm"
        />
        {errors.email && (
          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Teléfono (Opcional)
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+34 (900) 000-000"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-sm"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Categoría *
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-sm"
        >
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Prioridad
        </label>
        <div className="flex gap-2">
          {(["low", "medium", "high"] as const).map((priority) => (
            <label key={priority} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="priority"
                value={priority}
                checked={formData.priority === priority}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-xs capitalize">
                {priority === "low" ? "Baja" : priority === "medium" ? "Media" : "Alta"}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Subject */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Asunto *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Resumen del problema"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-sm"
        />
        {errors.subject && (
          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.subject}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Descripción Detallada *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Cuéntanos más sobre tu consulta..."
          rows={4}
          className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/50 transition-all text-sm resize-none"
        />
        {errors.description && (
          <p className="text-xs text-destructive mt-1 flex items-center gap-1">
            <AlertCircle size={12} /> {errors.description}
          </p>
        )}
      </div>

      {/* Submit Error */}
      {errors.submit && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <AlertCircle size={12} /> {errors.submit}
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting || createTicketMutation.isPending}
          className="flex-1 px-3 py-2 bg-accent text-accent-foreground rounded-lg hover:shadow-lg hover:shadow-accent/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm flex items-center justify-center gap-2"
        >
          <Send size={16} />
          {isSubmitting || createTicketMutation.isPending ? "Enviando..." : "Crear Ticket"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-3 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
