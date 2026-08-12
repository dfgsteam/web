export interface LegalSection {
  heading: string;
  /** Markdown-lite: Absätze getrennt durch Leerzeile, "### " = Unterüberschrift, "- " = Listenpunkt */
  body: string;
}

export interface LegalDoc {
  title: string;
  updated: string;
  sections: LegalSection[];
}

const impressumDe: LegalDoc = {
  title: 'Impressum',
  updated: 'Diensteanbieter',
  sections: [
    {
      heading: 'Diensteanbieter',
      body: 'Julius Hunold\n\nHiratastr. 6b\n\n31157 Sarstedt',
    },
    {
      heading: 'Kontaktmöglichkeiten',
      body: 'E-Mail-Adresse: info@julius-hunold.de',
    },
    {
      heading: 'Angaben zum Unternehmen',
      body: 'Verbraucherstreitbeilegung\n\nWir sind zur Beilegung von Streitigkeiten mit Verbrauchern vor einer Verbraucherschlichtungsstelle bereit.',
    },
    {
      heading: 'Haftungs- und Schutzrechtshinweise',
      body: 'Haftungsausschluss: Die Inhalte dieses Onlineangebotes wurden sorgfältig und nach unserem aktuellen Kenntnisstand erstellt, dienen jedoch nur der Information und entfalten keine rechtlich bindende Wirkung, sofern es sich nicht um gesetzlich verpflichtende Informationen (z. B. das Impressum, die Datenschutzerklärung, AGB oder verpflichtende Belehrungen von Verbrauchern) handelt. Wir behalten uns vor, die Inhalte vollständig oder teilweise zu ändern oder zu löschen, soweit vertragliche Verpflichtungen unberührt bleiben. Alle Angebote sind freibleibend und unverbindlich.',
    },
  ],
};

const impressumEn: LegalDoc = {
  title: 'Imprint',
  updated: 'Service provider',
  sections: [
    {
      heading: 'Service provider',
      body: 'Julius Hunold\n\nHiratastr. 6b\n\n31157 Sarstedt, Germany',
    },
    {
      heading: 'Contact',
      body: 'Email address: info@julius-hunold.de',
    },
    {
      heading: 'Consumer dispute resolution',
      body: 'We are willing to participate in dispute resolution proceedings before a consumer arbitration board.',
    },
    {
      heading: 'Liability and protection rights',
      body: 'Disclaimer: The content of this online offer was compiled carefully and to the best of our current knowledge, but serves only for information purposes and has no legally binding effect, unless it concerns legally mandatory information (e.g. the imprint, the privacy policy, terms and conditions or mandatory consumer notices). We reserve the right to change or delete the content in whole or in part, insofar as contractual obligations remain unaffected. All offers are non-binding.',
    },
  ],
};

const datenschutzDe: LegalDoc = {
  title: 'Datenschutzerklärung',
  updated: 'Stand: 12. August 2026',
  sections: [
    {
      heading: '1. Verantwortlicher',
      body: 'Julius Hunold\nHiratastr. 6b\n31157 Sarstedt\n\nE-Mail-Adresse: info@julius-hunold.de\n\nVerantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) ist die oben genannte Person.',
    },
    {
      heading: '2. Hosting & Server-Log-Dateien',
      body: 'Diese Website wird auf einem Webserver eines externen Dienstleisters (Webhoster) betrieben. Beim Aufruf dieser Website erhebt der Webhoster automatisch technische Informationen in sogenannten Server-Log-Dateien: IP-Adresse, Datum und Uhrzeit des Zugriffs, angeforderte Ressource, HTTP-Statuscode, Browsertyp und Betriebssystem sowie die zuvor besuchte Seite (Referrer).\n\nDie Verarbeitung erfolgt zur Sicherstellung eines sicheren und performanten Betriebs der Website (Art. 6 Abs. 1 lit. f DSGVO – berechtigtes Interesse). Log-Datei-Informationen werden in der Regel nach maximal 30 Tagen gelöscht oder anonymisiert. Die Daten werden nicht mit anderen Datenquellen zusammengeführt.',
    },
    {
      heading: '3. Kontaktformular und Kontaktaufnahme',
      body: 'Wenn Sie mir über das Kontaktformular oder per E-Mail eine Nachricht senden, verarbeite ich Ihre Angaben (Name, E-Mail-Adresse sowie die von Ihnen mitgeteilten Inhalte) ausschließlich zur Bearbeitung Ihrer Anfrage.\n\nDas Kontaktformular wird ohne serverseitige Verarbeitung über Ihren E-Mail-Client versendet – es werden keine Formulardaten auf dieser Website gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Anfragen) bzw. Ihr Einverständnis gemäß Art. 6 Abs. 1 lit. a DSGVO.',
    },
    {
      heading: '4. Lokale Speicherung (Theme-Präferenz)',
      body: 'Für den Hell-/Dunkel-Modus-Umschalter wird Ihre Auswahl lokal in Ihrem Browser gespeichert (localStorage). Diese Angabe verlässt Ihren Browser nicht und wird nicht an Dritte übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung durch Nutzung der Funktion).',
    },
    {
      heading: '5. Cookies & Analyse',
      body: 'Diese Website verwendet keine Tracking-Cookies, kein Analyse-Tool und keine Werbenetzwerke. Schriftarten und Bilder werden lokal von dieser Website geladen; es erfolgt keine Verbindung zu externen Diensten wie Google Fonts. Einwilligungs-Banner für Tracking sind daher nicht erforderlich.',
    },
    {
      heading: '6. Ihre Rechte',
      body: 'Ihnen stehen nach der DSGVO folgende Rechte zu:\n\n- Auskunft über Ihre bei mir verarbeiteten Daten (Art. 15 DSGVO)\n- Berichtigung unrichtiger Daten (Art. 16 DSGVO)\n- Löschung Ihrer Daten (Art. 17 DSGVO)\n- Einschränkung der Verarbeitung (Art. 18 DSGVO)\n- Datenübertragbarkeit (Art. 20 DSGVO)\n- Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)\n\nSie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Für Fragen oder zur Ausübung Ihrer Rechte wenden Sie sich bitte an die oben genannte E-Mail-Adresse.',
    },
    {
      heading: '7. SSL/TLS-Verschlüsselung',
      body: 'Diese Seite nutzt aus Sicherheitsgründen eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie am Schloss-Symbol in Ihrer Browserzeile.',
    },
  ],
};

const datenschutzEn: LegalDoc = {
  title: 'Privacy Policy',
  updated: 'Last updated: August 12, 2026',
  sections: [
    {
      heading: '1. Controller',
      body: 'Julius Hunold\nHiratastr. 6b\n31157 Sarstedt, Germany\n\nEmail address: info@julius-hunold.de\n\nThe controller within the meaning of the General Data Protection Regulation (GDPR) is the person named above.',
    },
    {
      heading: '2. Hosting & server log files',
      body: 'This website is operated on a web server of an external service provider (web host). When you visit this website, the web host automatically collects technical information in so-called server log files: IP address, date and time of access, requested resource, HTTP status code, browser type and operating system as well as the previously visited page (referrer).\n\nThe processing takes place to ensure a secure and performant operation of the website (Art. 6(1)(f) GDPR – legitimate interest). Log file information is usually deleted or anonymised after a maximum of 30 days. The data is not merged with other data sources.',
    },
    {
      heading: '3. Contact form and contact',
      body: 'If you send me a message via the contact form or by email, I process your details (name, email address and the content you provide) exclusively to handle your enquiry.\n\nThe contact form is sent without server-side processing via your email client – no form data is stored on this website. Legal basis is Art. 6(1)(b) GDPR (pre-contractual enquiries) or your consent under Art. 6(1)(a) GDPR.',
    },
    {
      heading: '4. Local storage (theme preference)',
      body: 'For the light/dark mode toggle, your selection is stored locally in your browser (localStorage). This information never leaves your browser and is not transmitted to third parties. Legal basis is Art. 6(1)(a) GDPR (consent by using the feature).',
    },
    {
      heading: '5. Cookies & analytics',
      body: 'This website does not use tracking cookies, no analytics tool and no advertising networks. Fonts and images are loaded locally from this website; there is no connection to external services such as Google Fonts. Consent banners for tracking are therefore not required.',
    },
    {
      heading: '6. Your rights',
      body: 'Under the GDPR, you have the following rights:\n\n- Access to your data processed by me (Art. 15 GDPR)\n- Rectification of inaccurate data (Art. 16 GDPR)\n- Erasure of your data (Art. 17 GDPR)\n- Restriction of processing (Art. 18 GDPR)\n- Data portability (Art. 20 GDPR)\n- Objection to processing (Art. 21 GDPR)\n\nYou also have the right to lodge a complaint with a data protection supervisory authority (Art. 77 GDPR). For questions or to exercise your rights, please contact the email address above.',
    },
    {
      heading: '7. SSL/TLS encryption',
      body: 'For security reasons, this site uses SSL/TLS encryption. You can recognise an encrypted connection by the lock icon in your browser bar.',
    },
  ],
};

export const legal = {
  impressum: { de: impressumDe, en: impressumEn },
  datenschutz: { de: datenschutzDe, en: datenschutzEn },
} as const;
