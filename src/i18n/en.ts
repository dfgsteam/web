import type { Dict } from '../lib/i18n';

export const en: Dict = {
  lang: 'en',
  htmlLang: 'en-GB',
  meta: {
    title: 'Julius Hunold – Web Developer & Tech Project Manager',
    description:
      'Passionate developer crafting custom web apps with PHP & Python. From modern web application development to technical project management – based in Sarstedt, Germany.',
    keywords: 'Julius Hunold, Web Developer, PHP, Python, Web Apps, Portfolio',
  },
  nav: {
    about: 'About',
    projects: 'Projects',
    skills: 'Skills',
    services: 'Services',
    infra: 'Infra',
    cv: 'Resume',
    contact: 'Contact',
    blog: 'Blog',
    menu: 'Menu',
    close: 'Close',
  },
  hero: {
    links: [
      { label: 'Webdesign', url: 'https://hnld.de' },
      { label: 'Custom Apps', url: 'https://hunold24.de' },
    ],
    titleA: 'I build web apps',
    titleB: 'that simply work.',
    titleHighlight: 'web apps',
    subtitle:
      'Bespoke software with PHP & Python – from the first idea to a live system. Studying Applied Computer Science in Göttingen, working at the intersection of engineering and technical project management.',
    primaryCta: 'View projects',
    secondaryCta: 'Get in touch',
    scrollHint: 'Scroll',
    stats: [
      { value: 20, label: 'Projects delivered' },
      { value: 8, label: 'Years of experience' },
      { value: 13, label: 'Technologies in stack' },
    ],
  },
  portfolio: {
    label: 'Portfolio',
    heading: 'Numbers that speak for themselves.',
    subheading:
      'From client work, freelance and university – a few key figures at a glance.',
    imageAlt: 'Portrait of Julius Hunold',
    imageChip: 'Julius Hunold · Web Developer',
    kpiProjects: 'Projects delivered',
    kpiExperience: 'Years of experience',
    kpiTechnologies: 'Technologies in stack',
  },
  about: {
    label: 'About',
    heading: 'Code is the bridge between idea and reality.',
    paragraphs: [
      'Passionate developer focused on bespoke web apps with PHP & Python – spanning everything from modern web application development at sgalinski to technical project management for the FTTH network rollout (NE4) at MD Telekom.',
      'I study Applied Computer Science in Göttingen, deepening my skills in Physics and Business Administration along the way. That mix of technology, science and business shapes how I work: pragmatic, thoughtful, solution-driven.',
      'Outside of work I volunteer as a group leader and in the media team of Schönstatt Mannesjugend, where I have also been responsible for the finances for years.',
    ],
    facts: [
      { icon: 'map-pin', label: 'Location', value: 'Sarstedt, Germany' },
      { icon: 'sparkles', label: 'Age', value: '23' },
      { icon: 'mail', label: 'Email', value: 'info@julius-hunold.de' },
      { icon: 'phone', label: 'Phone', value: 'on request' },
    ],
    cta: 'More about me',
  },
  projects: {
    label: 'Projects',
    heading: 'Selected work.',
    subheading: 'A look at projects from freelance, university and work.',
    all: 'All projects',
    viewDetails: 'View Details',
    back: 'Back to projects',
    client: 'Client',
    year: 'Year',
    tech: 'Technologies',
    overview: 'Overview',
    category: {
      client: 'Clients & Freelancing',
      work: 'Professional Work',
    },
    status: {
      live: 'Live',
      'client-project': 'Client Project',
      'under-construction': 'Under Construction',
    },
    related: 'More projects',
  },
  skills: {
    label: 'Skills',
    heading: 'I’ve got the goods.',
    subheading: 'My toolbox – from Python to Photoshop.',
    levels: {
      master: 'Master',
      expert: 'Expert',
      advanced: 'Advanced',
      medium: 'Medium',
      beginner: 'Beginner',
    },
    legend: 'Level',
  },
  cv: {
    label: 'Resume',
    heading: 'Who I am, where I’ve been.',
    subheading: 'A quick tour through education, work and volunteering.',
    work: 'Work experience',
    education: 'Education',
    volunteer: 'Volunteer work',
    certificates: 'Certificates',
    present: 'present',
    download: 'Download CV as PDF',
    workItems: [
      {
        role: 'Web Developer',
        company: 'sgalinski',
        period: 'May 2024 – present',
        description:
          'Building and developing apps, websites and extensions (web/desktop/mobile).',
      },
      {
        role: 'Project Manager',
        company: 'MD Telekom',
        period: 'Sep 2022 – present',
        description:
          'Planning and organising the FTTH rollout as well as industry-specific software.',
      },
      {
        role: 'E-Commerce',
        company: 'MD Landmaschinen',
        period: 'Feb – Aug 2022',
        description: 'Managing Amazon and WooCommerce shops.',
      },
      {
        role: 'Owner',
        company: 'Julius Hunold IT Services',
        period: 'Dec 2021 – present',
        description:
          'ERP and online shop setup, websites including hosting, IT consulting and training.',
      },
    ],
    educationItems: [
      {
        degree: 'B.Sc. Business Administration',
        school: 'University of Göttingen',
        period: '2024 – expected 2027',
      },
      {
        degree: 'B.Sc. Physics',
        school: 'University of Göttingen',
        period: '2024 – expected 2028',
      },
      {
        degree: 'B.Sc. Applied Computer Science',
        school: 'University of Göttingen',
        period: '2022 – expected 2026',
      },
      {
        degree: 'Abitur',
        school: 'Werner-von-Siemens-Schule Hildesheim',
        period: '2019 – 2022',
      },
    ],
    volunteerItems: [
      {
        role: 'Media Team Leader',
        org: 'Schönstatt Mannesjugend',
        period: '2021 – 2023',
      },
      {
        role: 'Group Leader',
        org: 'Schönstatt Mannesjugend',
        period: '2020 – present',
      },
    ],
    certificateItems: [
      {
        name: 'UniCert II English (B2)',
        issuer: 'University of Göttingen',
        year: '2024',
      },
      {
        name: 'JuLeiCa group leader training',
        issuer: 'Schönstatt Mannesjugend',
        year: '2021',
      },
    ],
  },
  contact: {
    label: 'Contact',
    heading: 'Let’s talk.',
    subheading:
      'Got a project in mind or a question? Drop me a line – I usually reply within a day.',
    emailCta: 'Send an email',
    phoneCta: 'Schedule a call',
    location: 'Sarstedt, Germany',
    availability: 'Available for freelance projects',
    form: {
      name: 'Your name',
      email: 'Your email',
      message: 'Your message',
      submit: 'Send message',
      sent: 'Thanks! Your message is on its way.',
      error: 'Please fill out all fields.',
    },
  },
  footer: {
    rights: 'All rights reserved.',
    builtWith: 'Built with Astro · GSAP · Tailwind',
    imprint: 'Imprint',
    privacy: 'Privacy policy',
    sites: [
      { label: 'Webdesign', url: 'https://hnld.de' },
      { label: 'Custom Apps', url: 'https://hunold24.de' },
    ],
  },
  common: {
    close: 'Close',
    viewDetails: 'View Details',
    readMore: 'Read more',
  },
  blog: {
    label: 'Blog',
    heading: 'Notes & insights.',
    subheading: 'Thoughts on web development, tooling and this project.',
    readMore: 'Read more',
    back: 'Back to blog',
    published: 'Published on',
  },
  infra: {
    label: 'Availability & Infrastructure',
    heading: 'Reliable, fast & modern hosting.',
    subheading:
      'Modern web applications need a rock-solid foundation. I ensure websites and apps stay fast, secure, and available 24/7 with zero downtime.',
    status: {
      online: 'Operational',
      degraded: 'Maintenance',
    },
    features: [
      {
        title: 'Security & SSL Protection',
        description:
          'Modern Let’s Encrypt SSL encryption, firewalls, and isolated container environments protect user and customer data.',
      },
      {
        title: 'Automated Updates (CI/CD)',
        description:
          'New code is automatically tested and deployed live on every update without any service downtime.',
      },
      {
        title: 'Maximum Speed & Caching',
        description:
          'Optimized Nginx webservers and Redis in-memory caching deliver page responses in milliseconds.',
      },
      {
        title: 'Reliable Databases',
        description:
          'Structured PostgreSQL databases store business data safely with automated backups and high reliability.',
      },
      {
        title: 'Scalable S3 Cloud Storage',
        description:
          'Images, uploads, and documents are stored and delivered from scalable MinIO S3 Object Storage.',
      },
      {
        title: '24/7 Stability & Monitoring',
        description:
          'Continuous health monitoring ensures servers remain stable and any issues are instantly resolved.',
      },
    ],
  },
  services: {
    label: 'Services & Inquiry',
    heading: 'From concept to production-ready software.',
    subheading:
      'Scroll through the options – choose your scope and send a direct project inquiry.',
    cards: [
      {
        tag: '01 // CUSTOM APPS',
        title: 'Custom Web Apps & APIs',
        description:
          'High-performance software solutions with PHP (Laravel/TYPO3) & Python. From complex business logic to scalable REST APIs.',
        highlights: ['Laravel & Python Backend', 'Scalable Databases', 'REST / GraphQL APIs', 'Clean Code & Type Safety'],
        badge: 'High Performance',
      },
      {
        tag: '02 // E-COMMERCE',
        title: 'E-Commerce & Shop Systems',
        description:
          'Professional WooCommerce online shops with custom payment gateways, ERP synchronization, and automated inventory sync.',
        highlights: ['WooCommerce Customization', 'ERP & Inventory Sync', 'Payment Gateway Integration', 'Conversion Focus'],
        badge: 'Conversion Focused',
      },
      {
        tag: '03 // DEVOPS & INFRA',
        title: 'IT Consulting & Infrastructure',
        description:
          'Setup of secure Linux servers, Docker environments, CI/CD pipelines, and automated backup & monitoring systems.',
        highlights: ['Docker & Linux Server Setup', 'GitHub Actions CI/CD', 'SSL, Security & Nginx Proxy', 'IT Services & Hosting'],
        badge: 'Self-Hosted',
      },
      {
        tag: '04 // START A PROJECT',
        title: 'Ready for your next project?',
        description:
          'Select your scope and send me a direct message – I will get back to you within 24 hours.',
        cta: 'Send Inquiry Now →',
        badge: 'Direct & Fast',
      },
    ],
  },
  cmdPalette: {
    title: 'Quick Navigation & Commands',
    placeholder: 'Type a command or search (e.g. CV, Contact, Projects)...',
    sections: 'Sections',
    actions: 'Quick Actions',
    noResults: 'No matching results found.',
    kbdHint: 'Use ↑↓ to navigate, Enter to select, Esc to close',
    downloadCv: 'Download Resume as PDF',
    downloadVcard: 'Download vCard Contact (.vcf)',
    copyEmail: 'Copy Email Address',
    copied: 'Copied to clipboard! ✓',
    switchLang: 'Switch language to German',
    openGithub: 'Open GitHub Profile',
    openLinkedin: 'Open LinkedIn Profile',
  },
  contactRecruiter: {
    vcardBtn: 'vCard Contact (.vcf)',
    copyEmailBtn: 'Copy Email',
    copied: 'Copied to clipboard! ✓',
  },
  brands: {
    label: 'Brands & Digital Studios',
    heading: 'Specialized expertise for your digital growth.',
    hnld: {
      tag: 'hnld.de · Webdesign Studio',
      title: 'High-Performance Web Design & Brand Identity',
      subtitle: 'Modern websites built to impress. Aesthetic, lightning-fast, and optimized for maximum conversions.',
      cta: 'Visit hnld.de',
      highlights: ['Custom Web Design', 'Responsive & Mobile First', 'SEO & Performance'],
    },
    hunold24: {
      tag: 'hunold24.de · Custom Software',
      title: 'Tailored Web Applications & Cloud Apps',
      subtitle: 'Complex business workflows, PHP/Symfony backend systems, REST APIs & scalable cloud architectures.',
      cta: 'Explore hunold24.de',
      highlights: ['Custom Software Apps', 'APIs & Data Pipelines', 'Docker & Cloud Infra'],
    },
  },
};
