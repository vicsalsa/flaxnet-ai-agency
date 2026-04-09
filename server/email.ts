import { SupportTicket } from "../drizzle/schema";

/**
 * Email template for ticket confirmation
 */
function getTicketConfirmationTemplate(ticket: SupportTicket): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
    .header { background: linear-gradient(135deg, #00f2ff 0%, #7000ff 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
    .ticket-info { background: #f0f0f0; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .ticket-info p { margin: 8px 0; }
    .label { font-weight: bold; color: #00f2ff; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
    .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #00f2ff 0%, #7000ff 100%); color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✓ Ticket Creado Exitosamente</h1>
    </div>
    <div class="content">
      <p>¡Hola <strong>${ticket.name}</strong>!</p>
      <p>Gracias por contactarnos. Tu ticket de soporte ha sido creado exitosamente.</p>
      
      <div class="ticket-info">
        <p><span class="label">ID del Ticket:</span> ${ticket.ticketId}</p>
        <p><span class="label">Asunto:</span> ${ticket.subject}</p>
        <p><span class="label">Categoría:</span> ${formatCategory(ticket.category)}</p>
        <p><span class="label">Prioridad:</span> ${formatPriority(ticket.priority)}</p>
        <p><span class="label">Estado:</span> Abierto</p>
        <p><span class="label">Fecha de Creación:</span> ${new Date(ticket.createdAt).toLocaleString('es-ES')}</p>
      </div>

      <p><strong>Resumen de tu consulta:</strong></p>
      <p style="background: #f9f9f9; padding: 15px; border-left: 4px solid #00f2ff; border-radius: 3px;">
        ${ticket.description}
      </p>

      <p>Nuestro equipo de soporte revisará tu consulta y se pondrá en contacto contigo pronto a través de este email: <strong>${ticket.email}</strong></p>
      
      <p>Si necesitas hacer seguimiento de tu ticket, puedes usar el ID: <strong>${ticket.ticketId}</strong></p>

      <div class="footer">
        <p>© 2026 Flaxnet IA - Agencia de Automatización y Servicios Digitales Avanzados</p>
        <p>Este es un email automatizado. Por favor, no respondas directamente a este mensaje.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Format category name for display
 */
function formatCategory(category: string): string {
  const categories: Record<string, string> = {
    general: "Consulta General",
    n8n: "Automatización n8n",
    mcp: "Integración MCP",
    "ia-agents": "Agentes de IA",
    "web-design": "Diseño Web",
    seo: "SEO Profesional",
    marketing: "Marketing Digital",
    technical: "Soporte Técnico",
    billing: "Facturación",
    other: "Otro",
  };
  return categories[category] || category;
}

/**
 * Format priority name for display
 */
function formatPriority(priority: string): string {
  const priorities: Record<string, string> = {
    low: "Baja",
    medium: "Media",
    high: "Alta",
  };
  return priorities[priority] || priority;
}

/**
 * Send ticket confirmation email
 */
export async function sendTicketConfirmationEmail(ticket: SupportTicket): Promise<boolean> {
  try {
    // Use the built-in notification API to send email
    const response = await fetch(process.env.BUILT_IN_FORGE_API_URL + "/notification/send_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
      },
      body: JSON.stringify({
        to: ticket.email,
        subject: `[${ticket.ticketId}] Ticket de Soporte Creado - ${ticket.subject}`,
        html: getTicketConfirmationTemplate(ticket),
        replyTo: "support@flaxnet.es",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Email] Failed to send confirmation email:", error);
      return false;
    }

    console.log(`[Email] Confirmation email sent to ${ticket.email} for ticket ${ticket.ticketId}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending confirmation email:", error);
    return false;
  }
}

/**
 * Send ticket update notification email
 */
export async function sendTicketUpdateEmail(ticket: SupportTicket, updateMessage: string): Promise<boolean> {
  try {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; }
    .header { background: linear-gradient(135deg, #00f2ff 0%, #7000ff 100%); color: white; padding: 30px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 28px; }
    .content { background: white; padding: 30px; border-radius: 0 0 8px 8px; }
    .update-box { background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #00f2ff; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 Actualización de tu Ticket</h1>
    </div>
    <div class="content">
      <p>¡Hola <strong>${ticket.name}</strong>!</p>
      <p>Tu ticket <strong>${ticket.ticketId}</strong> ha sido actualizado.</p>
      
      <div class="update-box">
        <p><strong>Actualización:</strong></p>
        <p>${updateMessage}</p>
      </div>

      <p>Estado actual: <strong>${formatStatus(ticket.status)}</strong></p>
      <p>Si tienes preguntas adicionales, responde directamente a este email.</p>

      <div class="footer">
        <p>© 2026 Flaxnet IA</p>
      </div>
    </div>
  </div>
</body>
</html>
    `.trim();

    const response = await fetch(process.env.BUILT_IN_FORGE_API_URL + "/notification/send_email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.BUILT_IN_FORGE_API_KEY}`,
      },
      body: JSON.stringify({
        to: ticket.email,
        subject: `[${ticket.ticketId}] Actualización de tu Ticket de Soporte`,
        html,
        replyTo: "support@flaxnet.es",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("[Email] Failed to send update email:", error);
      return false;
    }

    console.log(`[Email] Update email sent to ${ticket.email} for ticket ${ticket.ticketId}`);
    return true;
  } catch (error) {
    console.error("[Email] Error sending update email:", error);
    return false;
  }
}

/**
 * Format status name for display
 */
function formatStatus(status: string): string {
  const statuses: Record<string, string> = {
    open: "Abierto",
    "in-progress": "En Progreso",
    resolved: "Resuelto",
  };
  return statuses[status] || status;
}
