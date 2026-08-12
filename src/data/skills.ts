export type SkillCategory = 'dev' | 'web' | 'infra' | 'biz';
export type SkillBadge = 'core' | 'advanced' | 'proficient';

export interface Skill {
  name: string;
  category: SkillCategory;
  badge: SkillBadge;
  iconName: string;
  description?: string;
}

export const skills: Skill[] = [
  // Sprachen & Entwicklung (dev)
  { name: 'Python', category: 'dev', badge: 'core', iconName: 'python', description: 'Web-Automation, Scripting & Backend-Entwicklung' },
  { name: 'PHP', category: 'dev', badge: 'core', iconName: 'php', description: 'Objektorientierte Entwicklung, Backend & CMS' },
  { name: 'JavaScript / TypeScript', category: 'dev', badge: 'core', iconName: 'js', description: 'Moderne Frontend- & Fullstack-Logik' },
  { name: 'SQL & Datenbanken', category: 'dev', badge: 'core', iconName: 'database', description: 'PostgreSQL, MySQL, Schema-Design & Abfragen' },
  { name: 'HTML5 & CSS3 / Tailwind', category: 'dev', badge: 'core', iconName: 'html', description: 'Responsive Layouts, Design-Systeme & Animationen' },
  { name: 'Java', category: 'dev', badge: 'advanced', iconName: 'java', description: 'Software-Architektur & OO-Programmierung' },
  { name: 'C & C++', category: 'dev', badge: 'advanced', iconName: 'cpp', description: 'Systemnahe Programmierung & Algorithmen' },
  { name: 'BASH / Shell Scripting', category: 'dev', badge: 'advanced', iconName: 'terminal', description: 'Automatisierung & Linux CLI Workflow' },
  { name: 'Haskell', category: 'dev', badge: 'proficient', iconName: 'haskell', description: 'Funktionale Programmierkonzepte' },
  { name: 'Assembly', category: 'dev', badge: 'proficient', iconName: 'binary', description: 'Rechnerarchitektur & Maschinensprache' },

  // Web, CMS & E-Commerce (web)
  { name: 'Astro', category: 'web', badge: 'core', iconName: 'astro', description: 'Blitzschnelle Static Site Generation & Island-Architektur' },
  { name: 'WooCommerce & Shopware', category: 'web', badge: 'core', iconName: 'shopping', description: 'E-Commerce Systeme, Shop-Setups & Anbindungen' },
  { name: 'TYPO3', category: 'web', badge: 'advanced', iconName: 'typo3', description: 'Enterprise CMS Administration & Extensions' },
  { name: 'WordPress', category: 'web', badge: 'advanced', iconName: 'wordpress', description: 'Custom Themes, Plugins & Maintenance' },
  { name: 'React / Next.js', category: 'web', badge: 'advanced', iconName: 'react', description: 'Komponentenbasierte Webanwendungen' },
  { name: 'REST APIs & JSON', category: 'web', badge: 'core', iconName: 'api', description: 'Schnittstellenentwicklung & Datenverarbeitung' },

  // Infrastruktur & Tools (infra)
  { name: 'Linux / Server-Admin', category: 'infra', badge: 'core', iconName: 'server', description: 'Debian/Ubuntu Server, Rechte & Administration' },
  { name: 'Git & GitHub', category: 'infra', badge: 'core', iconName: 'git', description: 'Versionskontrolle, Branching & Collaborative Dev' },
  { name: 'Docker & Container', category: 'infra', badge: 'advanced', iconName: 'docker', description: 'Containerisierung von Anwendungen & Services' },
  { name: 'Webhosting & DNS', category: 'infra', badge: 'core', iconName: 'globe', description: 'Domain-Verwaltung, SSL, Nginx & Apache' },
  { name: 'MS Office & Excel', category: 'infra', badge: 'core', iconName: 'excel', description: 'Erweiterte Datenanalyse & Office-Tools' },

  // Management & Business (biz)
  { name: 'Projektleitung & Organisation', category: 'biz', badge: 'core', iconName: 'briefcase', description: 'Glasfaserausbau, Delegation & Zeitmanagement' },
  { name: 'WaWi & ERP-Einrichtung', category: 'biz', badge: 'core', iconName: 'layers', description: 'Warenwirtschaftssysteme & Prozessoptimierung' },
  { name: 'E-Commerce Administration', category: 'biz', badge: 'core', iconName: 'store', description: 'Amazon, Marktplätze & Shop-Betreuung' },
  { name: 'IT-Beratung & Schulung', category: 'biz', badge: 'core', iconName: 'users', description: 'Kundenberatung, Einweisungen & Support' },
  { name: 'Jugendarbeit (JuLeiCa)', category: 'biz', badge: 'advanced', iconName: 'award', description: 'Verantwortung, Gruppenleitung & Events' },
];
