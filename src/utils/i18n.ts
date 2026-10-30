/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Loqelo Pre-Launch Localization (i18n)
 * Supports English (en), Polish (pl), German (de), Dutch (nl), French (fr), Spanish (es).
 */

export type SupportedLanguage = 'en' | 'pl' | 'de' | 'nl' | 'fr' | 'es';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'pl', name: 'Polish', nativeName: 'Polski', flag: '🇵🇱' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands', flag: '🇳🇱' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
];

export interface TranslationDictionary {
  nav: {
    howItWorks: string;
    videoDemo: string;
    screenshots: string;
    forCustomers: string;
    forPros: string;
    stats: string;
    joinWaitlist: string;
    handoverManual: string;
  };
  hero: {
    launchBadge: string;
    tagline: string;
    headline: string;
    subheadline: string;
    queryPlaceholder: string;
    sampleQueriesLabel: string;
    getQuotesBtn: string;
    joinCustomerBtn: string;
    joinContractorBtn: string;
    trustPoint1: string;
    trustPoint2: string;
    trustPoint3: string;
    countdownTitle: string;
    months: string;
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
  };
  videoSection: {
    kicker: string;
    title: string;
    subtitle: string;
    watchBadge: string;
    captionsBadge: string;
    chapters: {
      time: string;
      label: string;
    }[];
  };
  howItWorks: {
    kicker: string;
    title: string;
    subtitle: string;
    steps: {
      num: string;
      title: string;
      desc: string;
    }[];
  };
  screenshotsSection: {
    kicker: string;
    title: string;
    subtitle: string;
    tabs: {
      id: string;
      label: string;
      caption: string;
    }[];
  };
  dualAudience: {
    customerCard: {
      kicker: string;
      title: string;
      desc: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      cta: string;
    };
    contractorCard: {
      kicker: string;
      title: string;
      desc: string;
      bullet1: string;
      bullet2: string;
      bullet3: string;
      cta: string;
    };
  };
  waitlist: {
    kicker: string;
    title: string;
    subtitle: string;
    customerTab: string;
    contractorTab: string;
    emailLabel: string;
    emailPlaceholder: string;
    countryLabel: string;
    countryPlaceholder: string;
    entityLabel: string;
    entityIndividual: string;
    entityBusiness: string;
    servicesLabel: string;
    radiusLabel: string;
    consentText: string;
    submitCustomerBtn: string;
    submitContractorBtn: string;
    successTitle: string;
    successDesc: string;
    positionLabel: string;
    perkLabel: string;
    addToCalendar: string;
    shareLink: string;
    copyLinkSuccess: string;
  };
  analytics: {
    kicker: string;
    title: string;
    subtitle: string;
    totalVisitors: string;
    totalSignups: string;
    conversionRate: string;
    customersRatio: string;
    contractorsRatio: string;
    exportCSVBtn: string;
    manageContactsBtn: string;
    privacyNote: string;
  };
  footer: {
    tagline: string;
    rights: string;
    privacyPolicy: string;
    terms: string;
    cookies: string;
    manual: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    nav: {
      howItWorks: 'How it works',
      videoDemo: 'Video Demo',
      screenshots: 'Platform Preview',
      forCustomers: 'For Customers',
      forPros: 'For Contractors',
      stats: 'Analytics',
      joinWaitlist: 'Join Waitlist',
      handoverManual: 'Handover & Manual',
    },
    hero: {
      launchBadge: 'Planned Global Launch · February 2027',
      tagline: 'Everything your place needs.',
      headline: 'What do you need? Describe it.',
      subheadline: 'Loqelo finds the right services for home, garden, and office and brings you transparent quotes from rated local pros in minutes.',
      queryPlaceholder: 'I need to clean my house, wash my windows, and wash my car...',
      sampleQueriesLabel: 'Try an example:',
      getQuotesBtn: 'Preview Quotes',
      joinCustomerBtn: 'Join as Customer',
      joinContractorBtn: 'Join as Service Provider',
      trustPoint1: 'Verified, rated providers',
      trustPoint2: 'Free to post, no obligation',
      trustPoint3: 'AI-assisted service matching',
      countdownTitle: 'Launch Countdown to February 2027',
      months: 'Months',
      days: 'Days',
      hours: 'Hours',
      minutes: 'Min',
      seconds: 'Sec',
    },
    videoSection: {
      kicker: 'PROMOTIONAL PREVIEW',
      title: 'Experience Loqelo in motion',
      subtitle: 'Watch how Loqelo turns everyday household and property needs into quick, verified contractor offers.',
      watchBadge: 'Official Launch Video (1:22)',
      captionsBadge: 'HD 1080p · Stereo Audio',
      chapters: [
        { time: '0:00', label: 'Common home & garden needs' },
        { time: '0:16', label: 'Describe in your own words' },
        { time: '0:24', label: 'Add photos & location' },
        { time: '0:30', label: 'Instant local pro matching' },
        { time: '0:39', label: 'Compare transparent price spreads' },
        { time: '0:56', label: 'Contractor dashboard & 1-min bids' },
      ],
    },
    howItWorks: {
      kicker: 'HOW LOQELO WORKS',
      title: 'From one sentence to the right pro.',
      subtitle: 'One simple flow, from describing your need to choosing who does it.',
      steps: [
        {
          num: '01',
          title: 'Describe your need',
          desc: 'One sentence, in your own words. Add photos or specs if it helps.',
        },
        {
          num: '02',
          title: 'We find the services',
          desc: 'Loqelo recognizes what the job needs and notifies matching pros within your radius.',
        },
        {
          num: '03',
          title: 'Receive offers',
          desc: 'Local pros review your request and send direct price, timing, and details.',
        },
        {
          num: '04',
          title: 'Choose your pro',
          desc: 'Compare price spreads, ratings, and completion times, then pick the one that fits.',
        },
      ],
    },
    screenshotsSection: {
      kicker: 'PLATFORM ARCHITECTURE',
      title: 'Designed for effortless clarity',
      subtitle: 'Explore the verified UX/UI screens ready for Loqelo’s February 2027 debut.',
      tabs: [
        { id: 'home', label: 'Home & Request', caption: 'Intuitive natural-language job search and popular categories.' },
        { id: 'post', label: 'Post a Job', caption: 'Takes about 2 minutes with photos, location, and dates.' },
        { id: 'client_panel', label: 'Customer Dashboard', caption: 'Follow all your orders, bids, and active projects in one view.' },
        { id: 'job_details', label: 'Quotes & Price Spread', caption: 'Compare bids along an average price spectrum with verified reviews.' },
        { id: 'contractor_panel', label: 'Contractor Radar Map', caption: 'Find high-paying jobs within your customized kilometer radius.' },
        { id: 'contractor_bid', label: '1-Minute Bidding', caption: 'Send competitive offers with clear pricing, timing, and notes.' },
      ],
    },
    dualAudience: {
      customerCard: {
        kicker: 'FOR CUSTOMERS',
        title: 'Need a hand? Describe it once.',
        desc: 'Tell us what you need in your own words. Loqelo brings you quotes from rated local pros.',
        bullet1: '100% free to post with zero hiring pressure',
        bullet2: 'Direct transparent price comparisons without hidden fees',
        bullet3: 'Privacy-first: contact info remains confidential until you choose',
        cta: 'Join Customer Waitlist',
      },
      contractorCard: {
        kicker: 'FOR CONTRACTORS',
        title: 'Need more jobs? They come to you.',
        desc: 'Get jobs that match your services and your radius, and send an offer in about a minute.',
        bullet1: 'No bidding credits or upfront pay-per-lead charges',
        bullet2: 'Interactive map radar with real-time customer requests',
        bullet3: 'Early access partner perk: 0% service commission for 3 months',
        cta: 'Join Contractor Waitlist',
      },
    },
    waitlist: {
      kicker: 'JOIN THE PRE-LAUNCH',
      title: 'Be the first to experience Loqelo',
      subtitle: 'Sign up today to receive early access invitation, launch updates, and early bird perks before February 2027.',
      customerTab: 'I Need Services (Customer)',
      contractorTab: 'I Provide Services (Contractor)',
      emailLabel: 'Email address',
      emailPlaceholder: 'you@example.com',
      countryLabel: 'Country',
      countryPlaceholder: 'Select your country',
      entityLabel: 'Account Type',
      entityIndividual: 'Individual / Homeowner',
      entityBusiness: 'Business / Company',
      servicesLabel: 'Primary services of interest',
      radiusLabel: 'City or Operating Region',
      consentText: 'I consent to receive occasional email notifications regarding Loqelo’s pre-launch updates, testing milestones, and February 2027 launch day. I can unsubscribe anytime.',
      submitCustomerBtn: 'Secure My Customer Early Access',
      submitContractorBtn: 'Register as Early Contractor Partner',
      successTitle: 'You’re on the Loqelo Waitlist!',
      successDesc: 'Thank you for signing up. We have reserved your early access spot and will keep you informed ahead of February 2027.',
      positionLabel: 'Your Waitlist Position',
      perkLabel: 'Early Bird Privilege',
      addToCalendar: 'Add Launch Day to Calendar (.ics)',
      shareLink: 'Share with friends or colleagues',
      copyLinkSuccess: 'Referral link copied to clipboard!',
    },
    analytics: {
      kicker: 'TRANSPARENT METRICS',
      title: 'Pre-launch traction & interest',
      subtitle: 'Tracking global demand leading up to our planned February 2027 launch.',
      totalVisitors: 'Website Visitors',
      totalSignups: 'Total Registrations',
      conversionRate: 'Conversion Rate',
      customersRatio: 'Future Customers',
      contractorsRatio: 'Contractors & Pros',
      exportCSVBtn: 'Export Contacts to CSV',
      manageContactsBtn: 'Open Admin Lead Console',
      privacyNote: 'Analytics comply with strict GDPR principles. Email addresses and individual submissions are strictly insulated and never transmitted to analytics tools.',
    },
    footer: {
      tagline: 'Everything your place needs. Home, garden, and office services.',
      rights: '© 2026–2027 Loqelo.com. All rights reserved. Planned launch: February 2027.',
      privacyPolicy: 'Privacy Policy',
      terms: 'Terms of Service',
      cookies: 'Cookie Preferences',
      manual: 'Deployment & User Manual',
    },
  },
  pl: {
    nav: {
      howItWorks: 'Jak to działa',
      videoDemo: 'Wideo promocyjne',
      screenshots: 'Podgląd platformy',
      forCustomers: 'Dla Klientów',
      forPros: 'Dla Wykonawców',
      stats: 'Statystyki',
      joinWaitlist: 'Dołącz do listy',
      handoverManual: 'Instrukcja i wdrożenie',
    },
    hero: {
      launchBadge: 'Planowany globalny start · Luty 2027',
      tagline: 'Wszystko, czego potrzebuje Twoje miejsce.',
      headline: 'Czego potrzebujesz? Opisz to.',
      subheadline: 'Loqelo łączy klientów ze sprawdzonymi wykonawcami do domu, ogrodu i biura. Opisz potrzebę własnymi słowami, a w kilka minut otrzymasz oferty.',
      queryPlaceholder: 'Potrzebuję posprzątać dom, umyć okna i wyczyścić samochód...',
      sampleQueriesLabel: 'Przykładowe zapytanie:',
      getQuotesBtn: 'Zobacz oferty',
      joinCustomerBtn: 'Zapisz się jako Klient',
      joinContractorBtn: 'Dołącz jako Wykonawca',
      trustPoint1: 'Zweryfikowani wykonawcy',
      trustPoint2: 'Bezpłatne dodanie zlecenia',
      trustPoint3: 'Inteligentne dopasowanie usług',
      countdownTitle: 'Odliczanie do startu w lutym 2027',
      months: 'Miesięcy',
      days: 'Dni',
      hours: 'Godzin',
      minutes: 'Minut',
      seconds: 'Sekund',
    },
    videoSection: {
      kicker: 'WIDEO PROMOCYJNE',
      title: 'Zobacz Loqelo w akcji',
      subtitle: 'Obejrzyj, jak Loqelo błyskawicznie zamienia codzienne potrzeby w przejrzyste oferty od lokalnych fachowców.',
      watchBadge: 'Oficjalne wideo (1:22)',
      captionsBadge: 'Wysoka jakość HD · Dźwięk stereo',
      chapters: [
        { time: '0:00', label: 'Typowe potrzeby w domu i ogrodzie' },
        { time: '0:16', label: 'Opisujesz własnymi słowami' },
        { time: '0:24', label: 'Dodajesz zdjęcia i lokalizację' },
        { time: '0:30', label: 'Powiadomienie dopasowanych wykonawców' },
        { time: '0:39', label: 'Porównanie ofert i rozpiętości cen' },
        { time: '0:56', label: 'Panel wykonawcy i składanie ofert' },
      ],
    },
    howItWorks: {
      kicker: 'JAK DZIAŁA LOQELO',
      title: 'Od jednego zdania do właściwego wykonawcy.',
      subtitle: 'Jeden prosty proces: od opisania potrzeby do wyboru sprawdzonego specjalisty.',
      steps: [
        {
          num: '01',
          title: 'Opisz swoją potrzebę',
          desc: 'Jedno zdanie, własnymi słowami. Dodaj zdjęcia, jeśli to pomocne.',
        },
        {
          num: '02',
          title: 'Rozpoznajemy usługi',
          desc: 'Loqelo analizuje zadanie i natychmiast powiadamia wykonawców w Twojej okolicy.',
        },
        {
          num: '03',
          title: 'Otrzymuj oferty',
          desc: 'Lokalni wykonawcy przesyłają wyceny, terminy oraz szczegóły realizacji.',
        },
        {
          num: '04',
          title: 'Wybierz wykonawcę',
          desc: 'Porównaj ceny, oceny i opinie, a następnie wybierz najlepszą ofertę.',
        },
      ],
    },
    screenshotsSection: {
      kicker: 'ARCHITEKTURA PLATFORMY',
      title: 'Zaprojektowane z myślą o przejrzystości',
      subtitle: 'Zobacz gotowe ekrany UI/UX przygotowane na start platformy Loqelo w lutym 2027.',
      tabs: [
        { id: 'home', label: 'Strona główna', caption: 'Wyszukiwanie w języku naturalnym i popularne kategorie.' },
        { id: 'post', label: 'Dodawanie zlecenia', caption: 'Tylko 2 minuty: opis, zdjęcia, lokalizacja i termin.' },
        { id: 'client_panel', label: 'Panel Klienta', caption: 'Śledzenie wszystkich zleceń, ofert i postępów prac.' },
        { id: 'job_details', label: 'Oferty i rozpiętość cen', caption: 'Przejrzysty wykres cen i profile wykonawców.' },
        { id: 'contractor_panel', label: 'Mapa zleceń dla Wykonawcy', caption: 'Zlecenia w promieniu działania z potencjałem zarobkowym.' },
        { id: 'contractor_bid', label: 'Szybka oferta w 1 min', caption: 'Składanie prostej i przejrzystej propozycji cenowej.' },
      ],
    },
    dualAudience: {
      customerCard: {
        kicker: 'DLA KLIENTÓW',
        title: 'Potrzebujesz pomocy? Opisz to raz.',
        desc: 'Powiedz własnymi słowami, czego potrzebujesz. Loqelo dostarczy Ci oferty od sprawdzonych lokalnych specjalistów.',
        bullet1: '100% bezpłatne dodawanie zleceń bez zobowiązań',
        bullet2: 'Przejrzyste porównanie cen bez ukrytych opłat',
        bullet3: 'Prywatność: dane kontaktowe chronione do momentu wyboru',
        cta: 'Dołącz do listy Klientów',
      },
      contractorCard: {
        kicker: 'DLA WYKONAWCÓW',
        title: 'Szukasz zleceń? Same do Ciebie przyjdą.',
        desc: 'Otrzymuj zlecenia dopasowane do Twoich usług i obszaru działania, a ofertę wyślesz w minutę.',
        bullet1: 'Brak opłat za punkty licytacji czy wyświetlenia',
        bullet2: 'Interaktywna mapa zleceń w wybranym promieniu',
        bullet3: 'Bonus dla pierwszych partnerów: 0% prowizji przez pierwsze 3 miesiące',
        cta: 'Dołącz do bazy Wykonawców',
      },
    },
    waitlist: {
      kicker: 'DOŁĄCZ PRZED PREMIERĄ',
      title: 'Bądź pierwszy w Loqelo',
      subtitle: 'Zapisz się już dziś, aby otrzymać wcześniejszy dostęp, aktualizacje oraz specjalne korzyści przed lutym 2027.',
      customerTab: 'Szukam usług (Klient)',
      contractorTab: 'Świadczę usługi (Wykonawca)',
      emailLabel: 'Adres e-mail',
      emailPlaceholder: 'twoj@email.pl',
      countryLabel: 'Kraj',
      countryPlaceholder: 'Wybierz swój kraj',
      entityLabel: 'Typ konta',
      entityIndividual: 'Osoba prywatna',
      entityBusiness: 'Firma / Działalność',
      servicesLabel: 'Główne usługi, które Cię interesują',
      radiusLabel: 'Miasto lub rejon działania',
      consentText: 'Wyrażam zgodę na otrzymywanie informacji o postępach w projekcie Loqelo oraz powiadomienia o starcie platformy w lutym 2027. Mogę zrezygnować w każdej chwili.',
      submitCustomerBtn: 'Zarezerwuj wczesny dostęp dla Klienta',
      submitContractorBtn: 'Zarejestruj się jako Wykonawca',
      successTitle: 'Dziękujemy za dołączenie do Loqelo!',
      successDesc: 'Twój adres został pomyślnie dodany do listy oczekujących. Poinformujemy Cię o kolejnych etapach przed lutym 2027.',
      positionLabel: 'Twoja pozycja na liście',
      perkLabel: 'Korzyść wczesnego dostępu',
      addToCalendar: 'Dodaj premierę do kalendarza (.ics)',
      shareLink: 'Udostępnij znajomym lub współpracownikom',
      copyLinkSuccess: 'Link skopiowany do schowka!',
    },
    analytics: {
      kicker: 'PRZEJRZYSTE STATYSTYKI',
      title: 'Zainteresowanie przed startem',
      subtitle: 'Śledzimy globalne zainteresowanie przed oficjalnym startem w lutym 2027.',
      totalVisitors: 'Odwiedzających stronę',
      totalSignups: 'Zapisanych użytkowników',
      conversionRate: 'Wskaźnik konwersji',
      customersRatio: 'Przyszli Klienci',
      contractorsRatio: 'Wykonawcy i Firmy',
      exportCSVBtn: 'Eksportuj kontakty do CSV',
      manageContactsBtn: 'Otwórz panel zarządzania kontaktami',
      privacyNote: 'Statystyki są w pełni zgodne z RODO/GDPR. Treści formularzy oraz adresy e-mail nigdy nie są przekazywane do zewnętrznych narzędzi analitycznych.',
    },
    footer: {
      tagline: 'Wszystko, czego potrzebuje Twoje miejsce. Dom, ogród i biuro.',
      rights: '© 2026–2027 Loqelo.com. Wszelkie prawa zastrzeżone. Start: luty 2027.',
      privacyPolicy: 'Polityka Prywatności',
      terms: 'Regulamin',
      cookies: 'Pliki cookies',
      manual: 'Instrukcja wdrożenia',
    },
  },
  de: {
    nav: {
      howItWorks: 'So funktioniert es',
      videoDemo: 'Video-Demo',
      screenshots: 'Plattform-Vorschau',
      forCustomers: 'Für Kunden',
      forPros: 'Für Dienstleister',
      stats: 'Statistiken',
      joinWaitlist: 'Warteliste',
      handoverManual: 'Handbuch & Übergabe',
    },
    hero: {
      launchBadge: 'Geplanter globaler Start · Februar 2027',
      tagline: 'Alles, was Ihr Zuhause & Büro braucht.',
      headline: 'Was brauchen Sie? Beschreiben Sie es.',
      subheadline: 'Loqelo verbindet Sie mit geprüften Dienstleistern für Haus, Garten und Büro. Beschreiben Sie Ihren Wunsch in eigenen Worten und erhalten Sie faire Angebote.',
      queryPlaceholder: 'Ich möchte mein Haus reinigen, Fenster putzen und das Auto waschen...',
      sampleQueriesLabel: 'Beispiel:',
      getQuotesBtn: 'Angebote ansehen',
      joinCustomerBtn: 'Als Kunde anmelden',
      joinContractorBtn: 'Als Dienstleister beitreten',
      trustPoint1: 'Geprüfte, bewertete Profis',
      trustPoint2: 'Kostenlos & unverbindlich',
      trustPoint3: 'KI-gestützte Serviceerkennung',
      countdownTitle: 'Countdown zum Start im Februar 2027',
      months: 'Monate',
      days: 'Tage',
      hours: 'Stunden',
      minutes: 'Min',
      seconds: 'Sek',
    },
    videoSection: {
      kicker: 'PROMO-VIDEO',
      title: 'Erleben Sie Loqelo in Aktion',
      subtitle: 'Sehen Sie, wie Loqelo alltägliche Anliegen schnell und transparent in verifizierte Angebote verwandelt.',
      watchBadge: 'Offizielles Video (1:22)',
      captionsBadge: 'Full HD · Stereo',
      chapters: [
        { time: '0:00', label: 'Alltägliche Wünsche für Haus & Garten' },
        { time: '0:16', label: 'In eigenen Worten beschreiben' },
        { time: '0:24', label: 'Fotos & Ort angeben' },
        { time: '0:30', label: 'Lokale Profis werden benachrichtigt' },
        { time: '0:39', label: 'Angebote & Preisspanne vergleichen' },
        { time: '0:56', label: 'Dienstleister-Portal & 1-Minuten-Gebote' },
      ],
    },
    howItWorks: {
      kicker: 'WIE ES FUNKTIONIERT',
      title: 'Vom ersten Satz zum passenden Profi.',
      subtitle: 'Ein einfacher Ablauf: vom Beschreiben des Bedarfs bis zur Auswahl des besten Dienstleisters.',
      steps: [
        { num: '01', title: 'Bedarf beschreiben', desc: 'Ein Satz in Ihren eigenen Worten. Fotos hinzufügen, wenn gewünscht.' },
        { num: '02', title: 'Services finden', desc: 'Loqelo erkennt die erforderlichen Gewerke und informiert Profis im Umkreis.' },
        { num: '03', title: 'Angebote erhalten', desc: 'Lokale Anbieter senden Preis, Termin und Details direkt zu.' },
        { num: '04', title: 'Profi wählen', desc: 'Preise, Fristen und Bewertungen vergleichen und entspannt auswählen.' },
      ],
    },
    screenshotsSection: {
      kicker: 'PLATTFORM-DESIGN',
      title: 'Für höchste Benutzerfreundlichkeit geschaffen',
      subtitle: 'Entdecken Sie die Bildschirme von Loqelo vor dem offiziellen Start im Februar 2027.',
      tabs: [
        { id: 'home', label: 'Startseite', caption: 'Natürlichsprachige Auftragserstellung und Kategorien.' },
        { id: 'post', label: 'Auftrag aufgeben', caption: 'Dauert nur ca. 2 Minuten mit Fotos und Wunschtermin.' },
        { id: 'client_panel', label: 'Kunden-Dashboard', caption: 'Alle Aufträge und Angebote zentral im Blick.' },
        { id: 'job_details', label: 'Angebotsvergleich', caption: 'Transparente Preisspanne und Kundenbewertungen.' },
        { id: 'contractor_panel', label: 'Radar-Karte für Profis', caption: 'Passende Aufträge im definierten Umkreis.' },
        { id: 'contractor_bid', label: 'Angebot in 1 Minute', caption: 'Schnelles Angebot mit Festpreis und Verfügbarkeit.' },
      ],
    },
    dualAudience: {
      customerCard: {
        kicker: 'FÜR KUNDEN',
        title: 'Hilfe benötigt? Einmal beschreiben.',
        desc: 'Beschreiben Sie Ihre Aufgabe in Ihren Worten. Loqelo liefert Angebote geprüfter Experten.',
        bullet1: '100% kostenlos ohne Buchungszwang',
        bullet2: 'Transparenter Preisvergleich ohne versteckte Kosten',
        bullet3: 'Privatsphäre: Kontaktdaten bleiben bis zur Vergabe geschützt',
        cta: 'Kunden-Warteliste beitreten',
      },
      contractorCard: {
        kicker: 'FÜR DIENSTLEISTER',
        title: 'Mehr Aufträge? Sie kommen zu Ihnen.',
        desc: 'Erhalten Sie Aufträge passend zu Ihren Leistungen und Ihrem Radius – Angebot in 1 Minute versendet.',
        bullet1: 'Keine Gebühren für Lead-Käufe oder Gebote',
        bullet2: 'Interaktive Radar-Karte mit echten Kundenanfragen',
        bullet3: 'Frühbucher-Vorteil: 0% Provision in den ersten 3 Monaten',
        cta: 'Dienstleister-Warteliste beitreten',
      },
    },
    waitlist: {
      kicker: 'VORAB-ANMELDUNG',
      title: 'Seien Sie von Anfang an dabei',
      subtitle: 'Tragen Sie sich jetzt ein für frühzeitigen Zugang und exklusive Vorteile vor Februar 2027.',
      customerTab: 'Ich suche Services (Kunde)',
      contractorTab: 'Ich biete Services an (Dienstleister)',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'name@beispiel.de',
      countryLabel: 'Land',
      countryPlaceholder: 'Land auswählen',
      entityLabel: 'Kontotyp',
      entityIndividual: 'Privatperson',
      entityBusiness: 'Unternehmen / Gewerbe',
      servicesLabel: 'Interessante Dienstleistungen',
      radiusLabel: 'Stadt oder Einsatzgebiet',
      consentText: 'Ich stimme zu, Updates zum Projekt Loqelo und eine Benachrichtigung zum Start im Februar 2027 per E-Mail zu erhalten. Jederzeit abmeldbar.',
      submitCustomerBtn: 'Frühzeitigen Kunden-Zugang sichern',
      submitContractorBtn: 'Als Partner-Dienstleister vormerken',
      successTitle: 'Willkommen auf der Loqelo-Warteliste!',
      successDesc: 'Vielen Dank für Ihre Anmeldung. Ihr Platz ist reserviert und wir halten Sie auf dem Laufenden.',
      positionLabel: 'Ihre Position auf der Liste',
      perkLabel: 'Early-Bird-Vorteil',
      addToCalendar: 'Starttermin im Kalender speichern (.ics)',
      shareLink: 'Mit Freunden oder Kollegen teilen',
      copyLinkSuccess: 'Link in die Zwischenablage kopiert!',
    },
    analytics: {
      kicker: 'TRANSPARENTE STATISTIKEN',
      title: 'Interesse & Wachstum vor dem Start',
      subtitle: 'Verfolgen Sie die Nachfrage auf dem Weg zum Launch im Februar 2027.',
      totalVisitors: 'Website-Besucher',
      totalSignups: 'Registrierungen',
      conversionRate: 'Konversionsrate',
      customersRatio: 'Zukünftige Kunden',
      contractorsRatio: 'Dienstleister & Betriebe',
      exportCSVBtn: 'Kontakte als CSV exportieren',
      manageContactsBtn: 'Admin-Verwaltungskonsole öffnen',
      privacyNote: 'DSGVO-konforme Erfassung ohne Weitergabe von E-Mail-Adressen an Tracking-Tools.',
    },
    footer: {
      tagline: 'Alles, was Ihr Zuhause & Büro braucht. Haus, Garten und Gewerbe.',
      rights: '© 2026–2027 Loqelo.com. Alle Rechte vorbehalten. Start: Februar 2027.',
      privacyPolicy: 'Datenschutz',
      terms: 'Nutzungsbedingungen',
      cookies: 'Cookie-Einstellungen',
      manual: 'Bedienungsanleitung',
    },
  },
  nl: {
    nav: {
      howItWorks: 'Hoe het werkt',
      videoDemo: 'Video Demo',
      screenshots: 'Platform preview',
      forCustomers: 'Voor Klanten',
      forPros: 'Voor Vakmensen',
      stats: 'Statistieken',
      joinWaitlist: 'Wachtlijst',
      handoverManual: 'Handleiding & Oplevering',
    },
    hero: {
      launchBadge: 'Geplande lancering · Februari 2027',
      tagline: 'Alles wat jouw plek nodig heeft.',
      headline: 'Wat heb je nodig? Omschrijf het.',
      subheadline: 'Loqelo vindt de juiste vakmensen voor huis, tuin en kantoor en bezorgt je binnen enkele minuten transparante offertes van beoordeelde lokale professionals.',
      queryPlaceholder: 'Ik wil mijn huis schoonmaken, ramen lappen en auto wassen...',
      sampleQueriesLabel: 'Voorbeeldopdracht:',
      getQuotesBtn: 'Bekijk offertes',
      joinCustomerBtn: 'Aanmelden als Klant',
      joinContractorBtn: 'Aanmelden als Vakman',
      trustPoint1: 'Geverifieerde, beoordeelde vakmensen',
      trustPoint2: 'Gratis plaatsen, vrijblijvend',
      trustPoint3: 'Slimme service-herkenning',
      countdownTitle: 'Aftellen naar lancering in februari 2027',
      months: 'Maanden',
      days: 'Dagen',
      hours: 'Uur',
      minutes: 'Min',
      seconds: 'Sec',
    },
    videoSection: {
      kicker: 'PROMOTIEVIDEO',
      title: 'Ontdek Loqelo in actie',
      subtitle: 'Zie hoe Loqelo dagelijkse klussen omzet in betrouwbare offertes van lokale specialisten.',
      watchBadge: 'Officiële video (1:22)',
      captionsBadge: 'HD 1080p · Stereo geluid',
      chapters: [
        { time: '0:00', label: 'Veelvoorkomende klussen' },
        { time: '0:16', label: 'Beschrijf in je eigen woorden' },
        { time: '0:24', label: 'Foto’s & locatie toevoegen' },
        { time: '0:30', label: 'Vakmensen in de buurt matchen' },
        { time: '0:39', label: 'Vergelijk offertes & prijsspreiding' },
        { time: '0:56', label: 'Vakman dashboard & 1-minuut biedingen' },
      ],
    },
    howItWorks: {
      kicker: 'HOE LOQELO WERKT',
      title: 'Van één zin naar de juiste vakman.',
      subtitle: 'Eén eenvoudige flow: van het omschrijven van je behoefte tot de keuze wie het uitvoert.',
      steps: [
        { num: '01', title: 'Omschrijf je klus', desc: 'Eén zin in je eigen woorden. Voeg foto’s toe als dat helpt.' },
        { num: '02', title: 'Wij herkennen de diensten', desc: 'Loqelo selecteert de juiste categorieën en benadert direct lokale vakmensen.' },
        { num: '03', title: 'Ontvang offertes', desc: 'Lokale professionals bekijken de klus en sturen direct prijs en datum.' },
        { num: '04', title: 'Kies jouw vakman', desc: 'Vergelijk prijzen, doorlooptijd en beoordelingen en kies wat bij je past.' },
      ],
    },
    screenshotsSection: {
      kicker: 'PLATFORM DESIGN',
      title: 'Ontworpen voor overzicht en rust',
      subtitle: 'Bekijk de UI/UX ontwerpen voor de geplande lancering in februari 2027.',
      tabs: [
        { id: 'home', label: 'Startpagina', caption: 'Eenvoudig omschrijven en populaire categorieën.' },
        { id: 'post', label: 'Plaats een klus', caption: 'Slechts 2 minuten met foto’s en voorkeursdatum.' },
        { id: 'client_panel', label: 'Klantenpaneel', caption: 'Overzicht van al je actieve klussen en offertes.' },
        { id: 'job_details', label: 'Offertevergelijking', caption: 'Transparante prijsbandbreedte en profielen.' },
        { id: 'contractor_panel', label: 'Vakman Radarkaart', caption: 'Klussen binnen jouw gekozen straal.' },
        { id: 'contractor_bid', label: 'Offerte in 1 minuut', caption: 'Direct een duidelijk bod indienen met beschikbaarheid.' },
      ],
    },
    dualAudience: {
      customerCard: {
        kicker: 'VOOR KLANTEN',
        title: 'Hulp nodig? Omschrijf het één keer.',
        desc: 'Vertel ons in je eigen woorden wat je zoekt. Loqelo brengt je offertes van betrouwbare professionals.',
        bullet1: '100% gratis te plaatsen zonder verplichtingen',
        bullet2: 'Transparante prijzen zonder verborgen toeslagen',
        bullet3: 'Privacy: contactgegevens pas gedeeld als jij kiest',
        cta: 'Plaats op de Klantenwachtlijst',
      },
      contractorCard: {
        kicker: 'VOOR VAKMENSEN',
        title: 'Meer opdrachten? Ze komen naar jou.',
        desc: 'Ontvang klussen die passen bij jouw diensten en regio, en stuur een bod in circa één minuut.',
        bullet1: 'Geen kosten per lead of betaalde credits',
        bullet2: 'Interactieve radarkaart met reële aanvragen',
        bullet3: 'Early bird voordeel: 0% commissie in de eerste 3 maanden',
        cta: 'Aanmelden als Partner',
      },
    },
    waitlist: {
      kicker: 'MELD JE AAN VOOR DE LANCERING',
      title: 'Ervaar Loqelo als eerste',
      subtitle: 'Meld je aan voor vroege toegang, updates en exclusieve voordelen voor februari 2027.',
      customerTab: 'Ik zoek hulp (Klant)',
      contractorTab: 'Ik bied diensten aan (Vakman)',
      emailLabel: 'E-mailadres',
      emailPlaceholder: 'naam@domein.nl',
      countryLabel: 'Land',
      countryPlaceholder: 'Kies jouw land',
      entityLabel: 'Account type',
      entityIndividual: 'Particulier',
      entityBusiness: 'Zakelijk / Bedrijf',
      servicesLabel: 'Diensten waarin je geïnteresseerd bent',
      radiusLabel: 'Woonplaats of werkgebied',
      consentText: 'Ik ga akkoord met het ontvangen van e-mails over Loqelo’s voortgang en de lancering in februari 2027. Uitschrijven kan op elk moment.',
      submitCustomerBtn: 'Reserveer Klantvroege Toegang',
      submitContractorBtn: 'Registreer als Vroegtijdige Vakman',
      successTitle: 'Je staat op de Loqelo Wachtlijst!',
      successDesc: 'Bedankt voor je aanmelding. Je plek is gereserveerd en we houden je op de hoogte.',
      positionLabel: 'Jouw plek op de lijst',
      perkLabel: 'Early bird voordeel',
      addToCalendar: 'Voeg lancering toe aan agenda (.ics)',
      shareLink: 'Deel met vrienden of collega’s',
      copyLinkSuccess: 'Link gekopieerd naar klembord!',
    },
    analytics: {
      kicker: 'TRANSPARANTE STATISTIEKEN',
      title: 'Interesse voor de lancering',
      subtitle: 'We volgen de internationale interesse op weg naar februari 2027.',
      totalVisitors: 'Websitebezoekers',
      totalSignups: 'Aanmeldingen',
      conversionRate: 'Conversiepercentage',
      customersRatio: 'Toekomstige Klanten',
      contractorsRatio: 'Vakmensen & Bedrijven',
      exportCSVBtn: 'Exporteer contacten naar CSV',
      manageContactsBtn: 'Open Beheerconsole',
      privacyNote: 'Voldoet aan AVG/GDPR richtlijnen. E-mailadressen worden nooit met trackingtools gedeeld.',
    },
    footer: {
      tagline: 'Alles wat jouw plek nodig heeft. Huis, tuin en kantoor.',
      rights: '© 2026–2027 Loqelo.com. Alle rechten voorbehouden. Lancering: februari 2027.',
      privacyPolicy: 'Privacybeleid',
      terms: 'Voorwaarden',
      cookies: 'Cookie-instellingen',
      manual: 'Handleiding & Oplevering',
    },
  },
  fr: {
    nav: {
      howItWorks: 'Comment ça marche',
      videoDemo: 'Vidéo démo',
      screenshots: 'Aperçu plateforme',
      forCustomers: 'Pour les Clients',
      forPros: 'Pour les Prestataires',
      stats: 'Statistiques',
      joinWaitlist: 'Liste d’attente',
      handoverManual: 'Guide & Livraison',
    },
    hero: {
      launchBadge: 'Lancement mondial prévu · Février 2027',
      tagline: 'Tout ce dont votre lieu a besoin.',
      headline: 'De quoi avez-vous besoin ? Décrivez-le.',
      subheadline: 'Loqelo trouve les bons professionnels pour la maison, le jardin et le bureau et vous apporte des devis transparents en quelques minutes.',
      queryPlaceholder: 'Je souhaite faire nettoyer ma maison, laver les vitres et la voiture...',
      sampleQueriesLabel: 'Exemple de demande :',
      getQuotesBtn: 'Voir les devis',
      joinCustomerBtn: 'Rejoindre comme Client',
      joinContractorBtn: 'Rejoindre comme Prestataire',
      trustPoint1: 'Professionnels vérifiés et notés',
      trustPoint2: 'Gratuit et sans engagement',
      trustPoint3: 'Détection intelligente des services',
      countdownTitle: 'Compte à rebours avant février 2027',
      months: 'Mois',
      days: 'Jours',
      hours: 'Heures',
      minutes: 'Min',
      seconds: 'Sec',
    },
    videoSection: {
      kicker: 'VIDÉO PROMOTIONNELLE',
      title: 'Découvrez Loqelo en action',
      subtitle: 'Voyez comment Loqelo transforme une simple phrase en offres concrètes d’artisans locaux.',
      watchBadge: 'Vidéo officielle (1:22)',
      captionsBadge: 'HD 1080p · Son stéréo',
      chapters: [
        { time: '0:00', label: 'Besoins du quotidien pour la maison' },
        { time: '0:16', label: 'Décrivez avec vos propres mots' },
        { time: '0:24', label: 'Ajout de photos et adresse' },
        { time: '0:30', label: 'Alerte des pros à proximité' },
        { time: '0:39', label: 'Comparaison des offres et fourchettes de prix' },
        { time: '0:56', label: 'Espace pro & devis en 1 minute' },
      ],
    },
    howItWorks: {
      kicker: 'FONCTIONNEMENT DE LOQELO',
      title: 'D’une simple phrase au bon professionnel.',
      subtitle: 'Un parcours fluide : de la description de votre besoin jusqu’au choix de l’artisan.',
      steps: [
        { num: '01', title: 'Décrivez votre besoin', desc: 'Une phrase avec vos propres mots. Ajoutez des photos si besoin.' },
        { num: '02', title: 'Nous identifions les services', desc: 'Loqelo analyse la demande et alerte les professionnels qualifiés dans votre zone.' },
        { num: '03', title: 'Recevez des offres', desc: 'Les artisans locaux examinent votre projet et envoient prix et dates de disponibilité.' },
        { num: '04', title: 'Choisissez votre pro', desc: 'Comparez les prix, délais et avis clients pour faire le meilleur choix.' },
      ],
    },
    screenshotsSection: {
      kicker: 'DESIGN DE LA PLATEFORME',
      title: 'Conçu pour une clarté absolue',
      subtitle: 'Explorez les interfaces UX/UI validées prêtes pour le lancement de février 2027.',
      tabs: [
        { id: 'home', label: 'Accueil & Demande', caption: 'Saisie en langage naturel et catégories courantes.' },
        { id: 'post', label: 'Publier une mission', caption: '2 minutes chrono avec photos et date souhaitée.' },
        { id: 'client_panel', label: 'Tableau de bord Client', caption: 'Suivez toutes vos commandes et offres en temps réel.' },
        { id: 'job_details', label: 'Comparateur d’offres', caption: 'Fourchette de prix claire et profils vérifiés.' },
        { id: 'contractor_panel', label: 'Carte Radar Prestataire', caption: 'Missions géolocalisées selon votre rayon d’action.' },
        { id: 'contractor_bid', label: 'Devis en 1 minute', caption: 'Formulez une offre claire avec tarif fixe et délai.' },
      ],
    },
    dualAudience: {
      customerCard: {
        kicker: 'POUR LES CLIENTS',
        title: 'Besoin d’aide ? Décrivez-le une seule fois.',
        desc: 'Expliquez ce qu’il vous faut en quelques mots. Loqelo vous apporte les meilleures offres locales.',
        bullet1: '100% gratuit et sans obligation d’embauche',
        bullet2: 'Comparaison transparente sans frais cachés',
        bullet3: 'Vie privée : coordonnées masquées jusqu’à votre choix',
        cta: 'S’inscrire sur la liste Clients',
      },
      contractorCard: {
        kicker: 'POUR LES PRESTATAIRES',
        title: 'Besoin de chantiers ? Ils viennent à vous.',
        desc: 'Recevez des missions adaptées à vos compétences et à votre secteur géographique, et répondez en 1 minute.',
        bullet1: 'Aucun coût par prospect ni crédits payants',
        bullet2: 'Carte radar interactive avec demandes réelles',
        bullet3: 'Avantage lancement : 0% de commission pendant 3 mois',
        cta: 'S’inscrire sur la liste Prestataires',
      },
    },
    waitlist: {
      kicker: 'REJOIGNEZ L’AVANT-PREMIÈRE',
      title: 'Soyez parmi les premiers sur Loqelo',
      subtitle: 'Inscrivez-vous pour un accès privilégié, les actualités et les avantages exclusifs avant février 2027.',
      customerTab: 'Je recherche des services (Client)',
      contractorTab: 'Je propose des services (Prestataire)',
      emailLabel: 'Adresse email',
      emailPlaceholder: 'vous@exemple.fr',
      countryLabel: 'Pays',
      countryPlaceholder: 'Sélectionnez votre pays',
      entityLabel: 'Type de compte',
      entityIndividual: 'Particulier',
      entityBusiness: 'Entreprise / Professionnel',
      servicesLabel: 'Services principaux recherchés',
      radiusLabel: 'Ville ou zone d’intervention',
      consentText: 'J’accepte de recevoir des informations par email concernant les avancées de Loqelo et le lancement de février 2027. Désinscription possible à tout moment.',
      submitCustomerBtn: 'Réserver mon accès prioritaire Client',
      submitContractorBtn: 'Rejoindre le réseau de Prestataires',
      successTitle: 'Vous êtes sur la liste Loqelo !',
      successDesc: 'Merci pour votre inscription. Votre place est réservée et nous vous tiendrons informé.',
      positionLabel: 'Votre position sur la liste',
      perkLabel: 'Avantage exclusif',
      addToCalendar: 'Ajouter au calendrier (.ics)',
      shareLink: 'Partager avec vos proches',
      copyLinkSuccess: 'Lien copié dans le presse-papier !',
    },
    analytics: {
      kicker: 'STATISTIQUES TRANSPARENTES',
      title: 'Engouement avant le lancement',
      subtitle: 'Suivi de l’intérêt mondial avant le lancement officiel de février 2027.',
      totalVisitors: 'Visiteurs du site',
      totalSignups: 'Inscriptions totales',
      conversionRate: 'Taux de conversion',
      customersRatio: 'Futurs Clients',
      contractorsRatio: 'Prestataires & Artisans',
      exportCSVBtn: 'Exporter les contacts en CSV',
      manageContactsBtn: 'Ouvrir la console d’administration',
      privacyNote: 'Conforme aux normes RGPD. Aucune adresse email n’est partagée avec des outils d’analyse.',
    },
    footer: {
      tagline: 'Tout ce dont votre lieu a besoin. Maison, jardin et bureau.',
      rights: '© 2026–2027 Loqelo.com. Tous droits réservés. Lancement : février 2027.',
      privacyPolicy: 'Politique de confidentialité',
      terms: 'Conditions d’utilisation',
      cookies: 'Gestion des cookies',
      manual: 'Guide d’utilisation',
    },
  },
  es: {
    nav: {
      howItWorks: 'Cómo funciona',
      videoDemo: 'Video Demo',
      screenshots: 'Vista de la plataforma',
      forCustomers: 'Para Clientes',
      forPros: 'Para Profesionales',
      stats: 'Estadísticas',
      joinWaitlist: 'Lista de espera',
      handoverManual: 'Manual y Entrega',
    },
    hero: {
      launchBadge: 'Lanzamiento global planeado · Febrero 2027',
      tagline: 'Todo lo que tu espacio necesita.',
      headline: '¿Qué necesitas? Descríbelo.',
      subheadline: 'Loqelo conecta a propietarios y empresas con profesionales verificados para hogar, jardín y oficina en minutos.',
      queryPlaceholder: 'Necesito limpiar mi casa, lavar ventanas y el coche...',
      sampleQueriesLabel: 'Ejemplo de búsqueda:',
      getQuotesBtn: 'Ver presupuestos',
      joinCustomerBtn: 'Unirme como Cliente',
      joinContractorBtn: 'Unirme como Profesional',
      trustPoint1: 'Profesionales verificados y valorados',
      trustPoint2: 'Gratis y sin compromiso',
      trustPoint3: 'Reconocimiento inteligente de servicios',
      countdownTitle: 'Cuenta regresiva para febrero de 2027',
      months: 'Meses',
      days: 'Días',
      hours: 'Horas',
      minutes: 'Min',
      seconds: 'Seg',
    },
    videoSection: {
      kicker: 'VIDEO PROMOCIONAL',
      title: 'Descubre Loqelo en acción',
      subtitle: 'Mira cómo Loqelo convierte tus necesidades cotidianas en ofertas claras de profesionales locales.',
      watchBadge: 'Video oficial (1:22)',
      captionsBadge: 'HD 1080p · Audio estéreo',
      chapters: [
        { time: '0:00', label: 'Tareas frecuentes del hogar y jardín' },
        { time: '0:16', label: 'Describe con tus propias palabras' },
        { time: '0:24', label: 'Añade fotos y ubicación' },
        { time: '0:30', label: 'Alerta instantánea a expertos cercanos' },
        { time: '0:39', label: 'Compara precios y plazos de entrega' },
        { time: '0:56', label: 'Panel del contratista y ofertas en 1 min' },
      ],
    },
    howItWorks: {
      kicker: 'CÓMO FUNCIONA LOQELO',
      title: 'De una sola frase al profesional ideal.',
      subtitle: 'Un proceso sencillo: desde explicar lo que necesitas hasta elegir a quién lo realiza.',
      steps: [
        { num: '01', title: 'Describe tu necesidad', desc: 'Una frase en tus propias palabras. Añade fotos o detalles.' },
        { num: '02', title: 'Identificamos los servicios', desc: 'Loqelo clasifica las tareas y avisa a los profesionales adecuados en tu radio.' },
        { num: '03', title: 'Recibe ofertas', desc: 'Los expertos revisan tu solicitud y envían su precio y disponibilidad.' },
        { num: '04', title: 'Elige a tu profesional', desc: 'Compara precios, tiempos y valoraciones con total tranquilidad.' },
      ],
    },
    screenshotsSection: {
      kicker: 'DISEÑO DE LA PLATAFORMA',
      title: 'Creado para máxima transparencia',
      subtitle: 'Explora las pantallas de la plataforma preparadas para el debut de febrero de 2027.',
      tabs: [
        { id: 'home', label: 'Inicio y Búsqueda', caption: 'Petición en lenguaje natural y categorías clave.' },
        { id: 'post', label: 'Publicar trabajo', caption: 'Toma solo 2 minutos con fotos y fecha preferida.' },
        { id: 'client_panel', label: 'Panel del Cliente', caption: 'Sigue todos tus pedidos y ofertas en un solo lugar.' },
        { id: 'job_details', label: 'Comparador de ofertas', caption: 'Rango de precios promedio y valoraciones contrastadas.' },
        { id: 'contractor_panel', label: 'Mapa Radar de Trabajos', caption: 'Solicitudes en tu radio de trabajo personalizado.' },
        { id: 'contractor_bid', label: 'Oferta en 1 minuto', caption: 'Envía tu propuesta con precio cerrado y fecha de inicio.' },
      ],
    },
    dualAudience: {
      customerCard: {
        kicker: 'PARA CLIENTES',
        title: '¿Necesitas ayuda? Explícalo una vez.',
        desc: 'Cuéntanos lo que necesitas en tus palabras. Loqelo te presenta ofertas de profesionales evaluados.',
        bullet1: '100% gratis de publicar y sin compromiso',
        bullet2: 'Comparación transparente sin costes ocultos',
        bullet3: 'Privacidad garantizada hasta que decidas a quién contratar',
        cta: 'Lista de espera para Clientes',
      },
      contractorCard: {
        kicker: 'PARA PROFESIONALES',
        title: '¿Buscas más trabajo? Viene hacia ti.',
        desc: 'Recibe solicitudes que encajen con tus servicios y radio geográfico, y envía tu oferta en un minuto.',
        bullet1: 'Sin coste por contacto ni créditos de puja',
        bullet2: 'Mapa radar con peticiones reales de clientes',
        bullet3: 'Ventaja pionera: 0% de comisión durante los primeros 3 meses',
        cta: 'Lista de espera para Profesionales',
      },
    },
    waitlist: {
      kicker: 'ÚNETE ANTES DEL ESTRENO',
      title: 'Sé de los primeros en probar Loqelo',
      subtitle: 'Regístrate hoy para obtener acceso preferente y beneficios exclusivos antes de febrero de 2027.',
      customerTab: 'Busco servicios (Cliente)',
      contractorTab: 'Ofrezco servicios (Profesional)',
      emailLabel: 'Correo electrónico',
      emailPlaceholder: 'tu@correo.es',
      countryLabel: 'País',
      countryPlaceholder: 'Selecciona tu país',
      entityLabel: 'Tipo de cuenta',
      entityIndividual: 'Particular',
      entityBusiness: 'Empresa / Autónomo',
      servicesLabel: 'Servicios de interés',
      radiusLabel: 'Ciudad o zona de servicio',
      consentText: 'Acepto recibir correos con novedades sobre el desarrollo de Loqelo y el lanzamiento de febrero de 2027. Puedo darme de baja cuando desee.',
      submitCustomerBtn: 'Asegurar mi acceso anticipado como Cliente',
      submitContractorBtn: 'Registrarme como Profesional pionero',
      successTitle: '¡Estás en la lista de Loqelo!',
      successDesc: 'Gracias por registrarte. Hemos reservado tu lugar de acceso anticipado.',
      positionLabel: 'Tu posición en la lista',
      perkLabel: 'Beneficio Early Bird',
      addToCalendar: 'Añadir al calendario (.ics)',
      shareLink: 'Compartir con amigos o colegas',
      copyLinkSuccess: '¡Enlace copiado al portapapeles!',
    },
    analytics: {
      kicker: 'MÉTRICAS TRANSPARENTES',
      title: 'Interés antes del lanzamiento',
      subtitle: 'Monitorización del interés global antes de nuestro lanzamiento en febrero de 2027.',
      totalVisitors: 'Visitantes del sitio',
      totalSignups: 'Registros totales',
      conversionRate: 'Tasa de conversión',
      customersRatio: 'Futuros Clientes',
      contractorsRatio: 'Profesionales y Empresas',
      exportCSVBtn: 'Exportar contactos a CSV',
      manageContactsBtn: 'Abrir consola de administración',
      privacyNote: 'Cumplimiento estricto del RGPD. Los emails nunca se envían a herramientas de analítica externa.',
    },
    footer: {
      tagline: 'Todo lo que tu espacio necesita. Hogar, jardín y oficina.',
      rights: '© 2026–2027 Loqelo.com. Todos los derechos reservados. Lanzamiento: febrero de 2027.',
      privacyPolicy: 'Política de Privacidad',
      terms: 'Términos del Servicio',
      cookies: 'Configuración de cookies',
      manual: 'Manual de usuario y entrega',
    },
  },
};

/**
 * Detects browser language or defaults to English
 */
export function detectInitialLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return 'en';
  try {
    const saved = localStorage.getItem('loqelo_user_lang') as SupportedLanguage;
    if (saved && TRANSLATIONS[saved]) return saved;

    const navLang = (navigator.language || '').toLowerCase();
    if (navLang.startsWith('pl')) return 'pl';
    if (navLang.startsWith('de')) return 'de';
    if (navLang.startsWith('nl')) return 'nl';
    if (navLang.startsWith('fr')) return 'fr';
    if (navLang.startsWith('es')) return 'es';
    return 'en';
  } catch {
    return 'en';
  }
}
