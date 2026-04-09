-- Knowledge Base Schema for FAQ Management
-- This schema stores FAQ articles that the chatbot can use to answer questions

CREATE TABLE IF NOT EXISTS `knowledge_base` (
  `id` int AUTO_INCREMENT NOT NULL,
  `articleId` varchar(64) NOT NULL UNIQUE,
  `title` varchar(255) NOT NULL,
  `category` varchar(64) NOT NULL,
  `keywords` text NOT NULL,
  `content` longtext NOT NULL,
  `summary` text,
  `isActive` boolean NOT NULL DEFAULT true,
  `views` int NOT NULL DEFAULT 0,
  `helpful` int NOT NULL DEFAULT 0,
  `notHelpful` int NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `knowledge_base_articleId_unique` (`articleId`),
  KEY `knowledge_base_category_idx` (`category`),
  KEY `knowledge_base_isActive_idx` (`isActive`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default FAQ articles
INSERT INTO `knowledge_base` (`articleId`, `title`, `category`, `keywords`, `content`, `summary`, `isActive`) VALUES
('kb-001', '¿Qué es n8n y cómo funciona?', 'n8n', 'n8n, automatización, flujos, workflow', 
'n8n es una plataforma de automatización de flujos de trabajo sin código que permite conectar más de 500 aplicaciones diferentes. Con n8n puedes:\n\n• Automatizar procesos repetitivos sin escribir código\n• Integrar múltiples herramientas empresariales\n• Crear flujos complejos con lógica condicional\n• Monitorear y alertar en tiempo real\n• Escalar tus operaciones automáticamente\n\nEn Flaxnet, implementamos soluciones personalizadas de n8n que se adaptan a tus necesidades específicas, desde automatización simple hasta orquestación compleja de procesos.',
'n8n es una plataforma de automatización sin código que conecta 500+ aplicaciones para automatizar procesos empresariales.',
true),

('kb-002', '¿Cuál es la diferencia entre n8n y Zapier?', 'n8n', 'n8n, Zapier, comparación, diferencia', 
'Aunque ambas son plataformas de automatización, existen diferencias importantes:\n\n**n8n:**\n• Más integraciones disponibles (500+)\n• Mejor para flujos complejos\n• Opción de auto-hospedaje\n• Mejor relación precio-funcionalidad\n• Comunidad activa y en crecimiento\n\n**Zapier:**\n• Más conocido y establecido\n• Interfaz más simple\n• Mejor para automatizaciones básicas\n• Precio más alto\n• Soporte más extenso\n\nEn Flaxnet recomendamos n8n para empresas que necesitan mayor control, flexibilidad y escalabilidad.',
'n8n ofrece más integraciones, mejor precio y mayor flexibilidad que Zapier para automatizaciones complejas.',
true),

('kb-003', '¿Qué es MCP (Model Context Protocol)?', 'mcp', 'MCP, Model Context Protocol, integración, IA', 
'Model Context Protocol (MCP) es un protocolo estándar que permite que los modelos de IA accedan de forma segura a datos y herramientas empresariales. Con MCP puedes:\n\n• Conectar modelos de IA a tus datos privados\n• Mantener la seguridad y privacidad de la información\n• Crear agentes de IA más inteligentes y contextualizados\n• Integrar herramientas empresariales con IA\n• Automatizar tareas complejas con inteligencia artificial\n\nFlaxnet implementa MCP para crear soluciones de IA que entienden tu contexto empresarial.',
'MCP permite que los modelos de IA accedan de forma segura a datos empresariales para crear agentes más inteligentes.',
true),

('kb-004', '¿Cuánto cuesta implementar automatización con n8n?', 'precios', 'precio, costo, presupuesto, n8n', 
'El costo de implementación depende de varios factores:\n\n**Factores que afectan el precio:**\n• Complejidad del flujo de trabajo\n• Número de integraciones necesarias\n• Volumen de datos a procesar\n• Nivel de personalización requerida\n• Soporte y mantenimiento\n\n**Modelo de precios típico:**\n• Proyectos simples: €1,500 - €3,000\n• Proyectos medianos: €3,000 - €8,000\n• Proyectos complejos: €8,000+\n\nOfrecemos una consulta gratuita de 30 minutos para analizar tu caso específico y darte un presupuesto exacto.',
'El costo varía según complejidad, desde €1,500 para proyectos simples hasta €8,000+ para soluciones empresariales.',
true),

('kb-005', '¿Cuánto tiempo tarda la implementación?', 'tiempos', 'plazo, duración, tiempo, implementación', 
'El tiempo de implementación depende de la complejidad del proyecto:\n\n**Estimaciones típicas:**\n• Automatizaciones simples: 1-2 semanas\n• Proyectos medianos: 2-4 semanas\n• Soluciones complejas: 1-3 meses\n• Implementaciones empresariales: 3-6 meses\n\n**Factores que afectan el plazo:**\n• Número de integraciones\n• Disponibilidad de datos\n• Cambios de requisitos\n• Pruebas y validación\n• Capacitación de usuarios\n\nEn la consulta inicial establecemos un cronograma detallado con hitos claros.',
'Proyectos simples: 1-2 semanas. Medianos: 2-4 semanas. Complejos: 1-3 meses. Empresariales: 3-6 meses.',
true),

('kb-006', '¿Qué es un agente de IA autónomo?', 'ia-agents', 'agente, IA, autónomo, inteligencia artificial', 
'Un agente de IA autónomo es un sistema de inteligencia artificial que puede:\n\n• Tomar decisiones de forma independiente\n• Ejecutar tareas sin intervención humana\n• Aprender de sus acciones\n• Adaptarse a nuevas situaciones\n• Trabajar 24/7 sin descanso\n\n**Casos de uso:**\n• Atención al cliente automatizada\n• Análisis de datos en tiempo real\n• Gestión de inventario\n• Detección de anomalías\n• Optimización de procesos\n\nFlaxnet crea agentes de IA personalizados que se integran con tus sistemas existentes.',
'Sistemas de IA que toman decisiones independientes, ejecutan tareas automáticamente y trabajan 24/7.',
true),

('kb-007', '¿Cómo garantizan la seguridad de nuestros datos?', 'seguridad', 'seguridad, datos, privacidad, protección', 
'La seguridad es nuestra prioridad máxima. Implementamos:\n\n**Medidas de seguridad:**\n• Encriptación de datos en tránsito y en reposo\n• Autenticación de múltiples factores\n• Acceso basado en roles (RBAC)\n• Auditoría completa de todas las acciones\n• Cumplimiento con GDPR y regulaciones locales\n• Backups automáticos y redundancia\n• Monitoreo 24/7 de seguridad\n\n**Certificaciones:**\n• ISO 27001 (Seguridad de la información)\n• SOC 2 Type II\n• GDPR compliant\n\nTodos tus datos permanecen bajo tu control y nunca son compartidos con terceros.',
'Encriptación, autenticación MFA, RBAC, auditoría completa, GDPR compliant, backups automáticos y monitoreo 24/7.',
true),

('kb-008', '¿Ofrecen soporte técnico después de la implementación?', 'soporte', 'soporte, mantenimiento, ayuda, técnico', 
'Sí, ofrecemos diferentes niveles de soporte:\n\n**Soporte Estándar (incluido):**\n• Corrección de errores\n• Actualizaciones de integraciones\n• Soporte por email (24-48 horas)\n• Documentación y guías\n\n**Soporte Premium (opcional):**\n• Soporte prioritario (4 horas)\n• Asistencia telefónica\n• Reuniones mensuales de revisión\n• Optimización proactiva\n• Capacitación continua del equipo\n\n**Soporte 24/7 (para clientes empresariales):**\n• Respuesta inmediata\n• Equipo dedicado\n• SLA garantizado\n• Mantenimiento preventivo\n\nTodos nuestros clientes reciben capacitación inicial y documentación completa.',
'Soporte estándar incluido, con opciones de Premium (prioritario) y 24/7 para clientes empresariales.',
true),

('kb-009', '¿Puedo cambiar o escalar mi solución después?', 'escalabilidad', 'escalabilidad, cambios, modificaciones, crecimiento', 
'Absolutamente. Nuestras soluciones están diseñadas para crecer con tu negocio:\n\n**Escalabilidad:**\n• Añadir nuevas integraciones fácilmente\n• Aumentar volumen de procesamiento\n• Expandir a nuevos departamentos\n• Integrar nuevas herramientas\n• Mejorar funcionalidades existentes\n\n**Proceso de cambios:**\n• Evaluación de requisitos\n• Análisis de impacto\n• Implementación gradual\n• Pruebas exhaustivas\n• Capacitación del equipo\n\n**Costos:**\n• Cambios menores: generalmente incluidos\n• Expansiones significativas: presupuesto adicional\n• Consultoría: disponible según sea necesario\n\nTrabajamos contigo para asegurar que tu solución evoluciona con tus necesidades.',
'Sí, nuestras soluciones son escalables. Puedes añadir integraciones, aumentar volumen y expandir funcionalidades fácilmente.',
true),

('kb-010', '¿Cuáles son los beneficios del SEO profesional?', 'seo', 'SEO, posicionamiento, Google, visibilidad', 
'El SEO profesional ofrece múltiples beneficios:\n\n**Beneficios comerciales:**\n• Aumento de tráfico orgánico (30-300%)\n• Mejora de visibilidad en Google\n• Generación de leads cualificados\n• Reducción de costos de adquisición\n• ROI a largo plazo\n\n**Beneficios técnicos:**\n• Mejor rendimiento del sitio\n• Mejor experiencia del usuario\n• Estructura optimizada\n• Indexación mejorada\n\n**Beneficios de marca:**\n• Mayor autoridad\n• Confianza del usuario\n• Posicionamiento como experto\n• Ventaja competitiva\n\nNuestras estrategias de SEO combinan técnica, contenido y análisis de datos para resultados medibles.',
'Aumento de tráfico orgánico, mejor visibilidad en Google, generación de leads y ROI a largo plazo.',
true),

('kb-011', '¿Cómo funciona el marketing digital inteligente?', 'marketing', 'marketing digital, campañas, leads, conversiones', 
'El marketing digital inteligente utiliza datos e IA para optimizar resultados:\n\n**Componentes clave:**\n• Análisis de datos y audiencia\n• Segmentación inteligente\n• Personalización de mensajes\n• Optimización de canales\n• A/B testing continuo\n• Automatización de campañas\n\n**Resultados típicos:**\n• Aumento de CTR (20-50%)\n• Mejora de conversión (15-40%)\n• Reducción de CPC (10-30%)\n• ROI mejorado (2-5x)\n\n**Canales:**\n• Email marketing\n• Social media\n• Publicidad programática\n• Content marketing\n• Retargeting\n\nFlaxnet crea estrategias personalizadas que generan leads y conversiones medibles.',
'Usa datos e IA para segmentar audiencias, personalizar mensajes y optimizar campañas para máximo ROI.',
true),

('kb-012', '¿Cómo es el proceso de diseño web en Flaxnet?', 'diseño-web', 'diseño, web, proceso, UX, UI', 
'Nuestro proceso de diseño web es completo y colaborativo:\n\n**Fase 1: Descubrimiento (1-2 semanas)**\n• Análisis de requisitos\n• Investigación de competencia\n• Definición de objetivos\n• Análisis de usuario\n\n**Fase 2: Diseño (2-3 semanas)**\n• Wireframes\n• Prototipos interactivos\n• Diseño visual\n• Revisión y feedback\n\n**Fase 3: Desarrollo (3-6 semanas)**\n• Desarrollo frontend\n• Integración backend\n• Optimización de rendimiento\n• Testing exhaustivo\n\n**Fase 4: Lanzamiento (1 semana)**\n• Deployment\n• Monitoreo\n• Capacitación\n• Soporte post-lanzamiento\n\nTrabajamos en sprints con revisiones regulares para asegurar satisfacción.',
'Proceso en 4 fases: Descubrimiento, Diseño, Desarrollo y Lanzamiento con revisiones regulares.',
true);
