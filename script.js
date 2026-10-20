/* GROUP SAYA TRAVEL — accessible interactions, bilingual UI, theme and PWA */
(() => {
  "use strict";

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const translations = {
    en: {
      skip:"Skip to content", navHome:"Home", navAbout:"About", navServices:"Services", navApproach:"Our approach", navContact:"Contact",
      theme:"Light mode", navCta:"Discuss your project ↗", eyebrow:"YOUR PARTNER IN ABIDJAN",
      heroTitle:"Your plans,<br><em>in motion.</em>", heroLead:"Coordinated support for travel, ticketing, airport security and air freight—with one attentive point of contact.",
      heroCta:"Talk to our team", heroSecondary:"Explore our services ↓", proofTitle:"Rooted in Côte d’Ivoire.", proofText:"Open to local and international projects.",
      caption:"Service with purpose.<br>A world of possibilities.", chip1:"Integrated solutions", chip1s:"Support built around your needs",
      chip2:"Focused on your goals", chip2s:"From your needs to a solution", scroll:"SCROLL TO DISCOVER ↓",
      aboutEyebrow:"WHO WE ARE", aboutTitle:"Services designed<br><em>around you.</em>",
      aboutText:"GROUP SAYA TRAVEL supports individuals and businesses through attentive listening, clarity and coordination. We take the time to understand your needs and guide you toward a suitable service.",
      aboutLink:"Let’s discuss your needs ↗", servicesEyebrow:"WHAT WE DO", servicesTitle:"Practical solutions.<br><em>Committed service.</em>",
      servicesIntro:"Every request starts with a conversation to clarify the need, timeline and next steps.",
      travelTitle:"Travel & ticketing", travelText:"Support for your travel plans and ticketing requests, based on your itinerary and constraints.",
      travel1:"Understand your needs", travel2:"Explore suitable options", travel3:"Information before booking",
      serviceLink:"Discuss this service ↗", securityTitle:"Airport security", securityText:"Professional services related to airport security, assessed according to the operational context.",
      security1:"Discuss the scope", security2:"Understand requirements", security3:"Find the right direction",
      cargoTitle:"Air freight", cargoText:"An initial discussion to assess your shipment, its contents, destination and timing.",
      cargo1:"Shipment information", cargo2:"Destination and timeline", cargo3:"Tailored assessment",
      multiTitle:"Multi-services", multiText:"Tell us about your specific request so we can assess the scope and possible solutions.",
      multi1:"Review your request", multi2:"Clarify priorities", multi3:"Agree on next steps",
      serviceNote:"Services, availability, conditions and rates are confirmed after each request is reviewed.",
      approachEyebrow:"OUR COMMITMENT", approachTitle:"Clarity at every step.<br><em>Service comes first.</em>",
      approachText:"We prioritise direct communication, a clearly defined request and next steps explained without unrealistic promises.",
      approachCta:"Tell us about your project ↗", step1:"You tell us", step1s:"Your needs, destination or project.",
      step2:"We clarify", step2s:"The information needed and the scope.", step3:"We get back to you", step3s:"With next steps based on the information received.",
      contactEyebrow:"GET IN TOUCH", contactTitle:"Your next project<br><em>starts here.</em>",
      contactText:"Tell us what you need. Our team can follow up using the information you provide.",
      emailLabel:"EMAIL US", locationLabel:"LOCATION", location:"Abidjan, Côte d’Ivoire", required:"Fields marked with * are required.",
      formKicker:"LET’S DISCUSS YOUR NEED", formTitle:"How can we help you?",
      nameLabel:"Full name *", namePH:"Your name", emailLabel2:"Email address *", emailPH:"you@example.com",
      phoneLabel:"Phone (optional)", phonePH:"+225 ...", serviceLabel:"Service needed *", choose:"Choose a service",
      other:"Other request", messageLabel:"Your message *", messagePH:"Tell us about your project…",
      consent:"I agree that the information entered may be used to respond to my request.",
      send:"Prepare my request ↗", formNote:"Your email application will open with your request pre-filled.",
      footer:"Travel, security and service solutions—in Abidjan and beyond.", linkedin:"Follow us on LinkedIn", legal:"Each service is confirmed according to the request and applicable conditions.",
      whatsapp:"WhatsApp", install:"Install app", installEyebrow:"ALWAYS WITHIN REACH", installTitle:"Install GROUP SAYA TRAVEL",
      installText:"Add the website to your home screen so you can find it easily.", installConfirm:"Install now", installLater:"Maybe later"
    }
  };

  const serviceNames = {
    "Voyage & billetterie": { fr:"Voyage & billetterie", en:"Travel & ticketing" },
    "Sûreté aéroportuaire": { fr:"Sûreté aéroportuaire", en:"Airport security" },
    "Fret aérien": { fr:"Fret aérien", en:"Air freight" },
    "Multi-services": { fr:"Multi-services", en:"Multi-services" },
    "Autre demande": { fr:"Autre demande", en:"Other request" }
  };

  let language = "fr";
  let deferredInstallPrompt = null;
  let previouslyFocused = null;

  try {
    const savedLanguage = localStorage.getItem("gst-language");
    if (savedLanguage === "en" || savedLanguage === "fr") language = savedLanguage;
    const savedTheme = localStorage.getItem("gst-theme");
    if (savedTheme === "light" || savedTheme === "dark") document.documentElement.dataset.theme = savedTheme;
  } catch (_) { /* Storage can be unavailable in private browsing. */ }

  function translatePage(nextLanguage) {
    language = nextLanguage === "en" ? "en" : "fr";
    document.documentElement.lang = language;
    const dictionary = translations[language] || {};
    $$("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (language === "en" && Object.prototype.hasOwnProperty.call(dictionary, key)) {
        element.textContent = dictionary[key];
      } else {
        element.dataset.originalText ??= element.textContent;
        element.textContent = element.dataset.originalText;
      }
    });
    $$("[data-i18n-html]").forEach(element => {
      const key = element.dataset.i18nHtml;
      if (language === "en" && dictionary[key]) element.innerHTML = dictionary[key];
      else if (element.dataset.originalHtml !== undefined) element.innerHTML = element.dataset.originalHtml;
      else element.dataset.originalHtml = element.innerHTML;
    });
    $$("[data-i18n-placeholder]").forEach(element => {
      const key = element.dataset.i18nPlaceholder;
      if (language === "en" && dictionary[key]) {
        element.dataset.originalPlaceholder ??= element.placeholder;
        element.placeholder = dictionary[key];
      } else if (element.dataset.originalPlaceholder !== undefined) {
        element.placeholder = element.dataset.originalPlaceholder;
      }
    });

    const labels = $$("[data-lang-toggle]");
    labels.forEach(button => {
      button.textContent = language === "fr" ? "EN" : "FR";
      button.setAttribute("aria-label", language === "fr" ? "Switch to English" : "Passer en français");
      button.setAttribute("title", language === "fr" ? "Switch to English" : "Passer en français");
    });

    const themeText = $$("[data-i18n='theme']");
    themeText.forEach(span => {
      span.textContent = language === "en"
        ? (document.documentElement.dataset.theme === "dark" ? "Light mode" : "Dark mode")
        : (document.documentElement.dataset.theme === "dark" ? "Mode clair" : "Mode sombre");
    });

    const select = $('select[name="service"]');
    if (select) {
      [...select.options].forEach(option => {
        if (!option.value) return;
        const frenchName = option.dataset.serviceFr || option.value;
        option.dataset.serviceFr = frenchName;
        const name = serviceNames[frenchName];
        if (name) option.textContent = name[language];
      });
    }
    try { localStorage.setItem("gst-language", language); } catch (_) {}
  }

  function updateTheme(theme) {
    const chosen = theme === "light" ? "light" : "dark";
    document.documentElement.dataset.theme = chosen;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", chosen === "dark" ? "#081526" : "#f5f6f8");
    $$("[data-i18n='theme']").forEach(span => {
      span.textContent = language === "en" ? (chosen === "dark" ? "Light mode" : "Dark mode") : (chosen === "dark" ? "Mode clair" : "Mode sombre");
    });
    $$("[data-theme-toggle]").forEach(button => {
      button.setAttribute("aria-label", language === "en" ? (chosen === "dark" ? "Switch to light theme" : "Switch to dark theme") : (chosen === "dark" ? "Passer en mode clair" : "Passer en mode sombre"));
    });
    try { localStorage.setItem("gst-theme", chosen); } catch (_) {}
  }

  $$("[data-lang-toggle]").forEach(button => button.addEventListener("click", () => translatePage(language === "fr" ? "en" : "fr")));
  $$("[data-theme-toggle]").forEach(button => button.addEventListener("click", () => updateTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark")));

  const menuButton = $("#menuToggle");
  const navigation = $("#mainNav");
  function closeMenu() {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", language === "en" ? "Open menu" : "Ouvrir le menu");
    navigation.classList.remove("is-open");
  }
  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menuButton.setAttribute("aria-label", !expanded ? (language === "en" ? "Close menu" : "Fermer le menu") : (language === "en" ? "Open menu" : "Ouvrir le menu"));
      navigation.classList.toggle("is-open", !expanded);
    });
    $$("#mainNav a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
    document.addEventListener("click", event => {
      if (navigation.classList.contains("is-open") && !navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const header = $(".site-header");
  if (header) {
    const setScrollState = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    setScrollState();
    window.addEventListener("scroll", setScrollState, { passive: true });
  }

  // When a service card is clicked, preselect the corresponding enquiry type.
  const select = $('select[name="service"]');
  $$("[data-service]").forEach(link => link.addEventListener("click", () => {
    if (!select) return;
    const requested = link.dataset.service;
    const options = [...select.options];
    const index = options.findIndex(option => option.dataset.serviceFr === requested || option.value === requested || option.textContent === requested);
    if (index >= 0) select.selectedIndex = index;
  }));

  const form = $("#contactForm");
  const feedback = $("#formFeedback");
  if (form) {
    form.addEventListener("submit", event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();
      const serviceLabel = serviceNames[service]?.[language] || service || (language === "en" ? "Other request" : "Autre demande");
      const subject = (language === "en" ? "Website enquiry — " : "Demande depuis le site — ") + serviceLabel;
      const body = [
        (language === "en" ? "Hello GROUP SAYA TRAVEL," : "Bonjour GROUP SAYA TRAVEL,"),
        "",
        (language === "en" ? "I would like to make the following enquiry:" : "Je souhaite vous adresser la demande suivante :"),
        "",
        (language === "en" ? "Name: " : "Nom : ") + name,
        (language === "en" ? "Email: " : "E-mail : ") + email,
        (language === "en" ? "Phone: " : "Téléphone : ") + (phone || "—"),
        (language === "en" ? "Service: " : "Service : ") + serviceLabel,
        "",
        (language === "en" ? "Message:" : "Message :"),
        message,
        "",
        (language === "en" ? "Sent from the GROUP SAYA TRAVEL website." : "Envoyé depuis le site GROUP SAYA TRAVEL.")
      ].join("\n");
      if (feedback) {
        feedback.textContent = language === "en"
          ? "Your email app should open with the details filled in. Please review and send the email to complete your request."
          : "Votre messagerie devrait s’ouvrir avec les informations préremplies. Vérifiez le message puis envoyez l’e-mail pour terminer votre demande.";
      }
      window.location.href = "mailto:infos@groupsaya.ci?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    });
  }

  // PWA installation is offered only where the browser confirms installability.
  const installButton = $("#installBtn");
  const installModal = $("#installModal");
  const closeInstall = $("#closeInstall");
  const laterInstall = $("#laterInstall");
  const confirmInstall = $("#confirmInstall");
  function openInstallModal() {
    if (!installModal) return;
    previouslyFocused = document.activeElement;
    installModal.hidden = false;
    document.body.style.overflow = "hidden";
    closeInstall?.focus();
  }
  function dismissInstallModal() {
    if (!installModal) return;
    installModal.hidden = true;
    document.body.style.overflow = "";
    previouslyFocused?.focus?.();
  }
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    if (installButton) installButton.hidden = false;
    let seen = false;
    try { seen = sessionStorage.getItem("gst-install-dismissed") === "1"; } catch (_) {}
    if (!seen) window.setTimeout(openInstallModal, 9000);
  });
  installButton?.addEventListener("click", openInstallModal);
  closeInstall?.addEventListener("click", dismissInstallModal);
  laterInstall?.addEventListener("click", () => {
    try { sessionStorage.setItem("gst-install-dismissed", "1"); } catch (_) {}
    dismissInstallModal();
  });
  installModal?.addEventListener("click", event => { if (event.target === installModal) dismissInstallModal(); });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && installModal && !installModal.hidden) dismissInstallModal();
  });
  confirmInstall?.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      if (feedback) feedback.textContent = language === "en"
        ? "Use your browser menu and choose “Install app” or “Add to Home Screen” if available."
        : "Ouvrez le menu de votre navigateur et choisissez « Installer l’application » ou « Ajouter à l’écran d’accueil » si cette option est proposée.";
      dismissInstallModal();
      return;
    }
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    if (installButton) installButton.hidden = true;
    dismissInstallModal();
  });
  window.addEventListener("appinstalled", () => {
    if (installButton) installButton.hidden = true;
    dismissInstallModal();
  });

  // Subtle scroll reveals with a safe fallback when IntersectionObserver is unavailable.
  const revealTargets = $$(".hero-copy, .hero-art, .intro > *, .section-top, .service-card, .approach-panel, .contact-intro, .contact-form");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-on-scroll");
      element.style.setProperty("--reveal-delay", Math.min(index % 4, 3) * 60 + "ms");
      observer.observe(element);
    });
  }

  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Register the local service worker only on HTTP(S), never from file:// previews.
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch(error => console.warn("Service worker registration failed:", error));
    }, { once: true });
  }

  // Snapshot source-language strings before applying any saved language preference.
  $("[data-i18n]").forEach(element => { element.dataset.originalText ??= element.textContent; });
  $("[data-i18n-html]").forEach(element => { element.dataset.originalHtml ??= element.innerHTML; });
  $("[data-i18n-placeholder]").forEach(element => { element.dataset.originalPlaceholder ??= element.placeholder; });
  $('select[name="service"] option').forEach(option => {
    if (option.value && !option.dataset.serviceFr) option.dataset.serviceFr = option.value;
  });
  translatePage(language);
  updateTheme(document.documentElement.dataset.theme || "dark");

  // Avoid trapping keyboard focus if users close the install dialog with Escape.
  installModal?.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusables = $$("button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled])", installModal).filter(element => !element.hidden);
    if (!focusables.length) return;
    if (event.shiftKey && document.activeElement === focusables[0]) { event.preventDefault(); focusables[focusables.length - 1].focus(); }
    else if (!event.shiftKey && document.activeElement === focusables[focusables.length - 1]) { event.preventDefault(); focusables[0].focus(); }
  });
})();