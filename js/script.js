/* ===============================
   HASLIYANA PORTFOLIO - COMPLETE MAIN JS
   SMOOTH + ORGANIZED ABOUT STACK FIX
   =============================== */


/* ================= ABOUT STACK CSS SAFETY PATCH ================= */
function injectAboutStackFixCSS() {
  if (document.getElementById("aboutStackFixCSS")) return;

  const style = document.createElement("style");
  style.id = "aboutStackFixCSS";
  style.textContent = `
    @media (min-width: 981px) {
      #about .stack-scroll-wrapper {
        position: relative !important;
        height: 650vh !important;
        overflow: visible !important;
        display: block !important;
      }

      #about .stack-stage,
      #about .stack-scroll-stage {
        position: sticky !important;
        top: 0 !important;
        height: 100vh !important;
        width: 100% !important;
        display: block !important;
        perspective: 1300px !important;
        transform-style: flat !important;
        overflow: visible !important;
        isolation: isolate !important;
      }

      #about .stack-reveal-card,
      #about .stack-reveal-card.about-clean-card,
      #about .stack-reveal-card.about-clean-card:nth-child(n) {
        position: absolute !important;
        left: 50% !important;
        top: 50% !important;
        width: min(86vw, 840px) !important;
        min-height: 370px !important;
        margin: 0 !important;
        transform-origin: center center !important;
        backface-visibility: hidden !important;
        transform-style: flat !important;
        will-change: transform, opacity !important;
        overflow: hidden !important;
        isolation: isolate !important;
        background: #fff4c8 !important;
      }

      #about .stack-reveal-card::before,
      #about .stack-reveal-card::after {
        pointer-events: none !important;
        backface-visibility: hidden !important;
      }

      #about .stack-card-content,
      #about .stack-card-grid {
        position: relative !important;
        z-index: 2 !important;
        transition: opacity 0.18s ease !important;
      }

      #about .stack-reveal-card::after {
        z-index: 1 !important;
      }
    }
  `;

  document.head.appendChild(style);
}

injectAboutStackFixCSS();


/* ================= GALLERY FILTER LOGIC ================= */
document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".filter-tabs .tab-btn");
  const projectCards = document.querySelectorAll("#multimedia-grid .project-card");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => {
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach(card => {
        const cardSubCategory = card.getAttribute("data-sub");

        if (filterValue === "all" || cardSubCategory === filterValue) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});


/* ================= IMAGE FALLBACK CHECK ================= */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-img-box").forEach(box => {
    const img = box.querySelector("img");

    const cardTitle =
      box.closest(".project-card, .intermediate-ai-card")?.querySelector("h3")?.textContent ||
      "Project Image";

    box.setAttribute("data-title", cardTitle);

    if (img) {
      img.addEventListener("error", () => {
        box.classList.add("has-error");
      });
    }
  });
});


/* ================= SIMPLE HERO ANIMATION ================= */
document.addEventListener("DOMContentLoaded", () => {
  const heroVisual = document.querySelector(".portfolio-visual-card");
  const glassShapes = document.querySelectorAll(".glass-shape");

  if (heroVisual) {
    heroVisual.style.animation = "softFloat 5s ease-in-out infinite";
  }

  glassShapes.forEach((shape, index) => {
    shape.style.animation = `softFloat ${4 + index}s ease-in-out infinite`;
    shape.style.animationDelay = `${index * 0.4}s`;
  });
});


/* ================= SHARED HELPERS ================= */
function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function easeOutCubic(value) {
  return 1 - Math.pow(1 - clampValue(value, 0, 1), 3);
}

function smootherStep(value) {
  const t = clampValue(value, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerpValue(start, end, amount) {
  return start + (end - start) * amount;
}

function setImportantStyle(element, property, value) {
  element.style.setProperty(property, value, "important");
}


/* ================= SECTION TITLE ZOOM SCRIPT ================= */
function processTitleScroll() {
  const windowHeight = window.innerHeight;

  document.querySelectorAll(".section-header").forEach(header => {
    const h2 = header.querySelector("h2");
    const p = header.querySelector(".section-subtitle");

    if (!h2) return;

    const rect = header.getBoundingClientRect();
    const titleTop = rect.top;

    const appearStart = windowHeight * 0.92;
    const largeTitlePoint = windowHeight * 0.62;
    const normalTitlePoint = windowHeight * 0.30;

    let h2Scale = 1.45;
    let h2Opacity = 0;
    let pOpacity = 0;
    let pTranslate = 16;

    if (titleTop > appearStart) {
      h2Scale = 1.45;
      h2Opacity = 0;
    } else if (titleTop <= appearStart && titleTop > largeTitlePoint) {
      const appearProgress = clampValue(
        (appearStart - titleTop) / (appearStart - largeTitlePoint),
        0,
        1
      );

      h2Scale = 1.45;
      h2Opacity = appearProgress;
    } else if (titleTop <= largeTitlePoint && titleTop > normalTitlePoint) {
      const shrinkProgress = clampValue(
        (largeTitlePoint - titleTop) / (largeTitlePoint - normalTitlePoint),
        0,
        1
      );

      h2Scale = 1.45 - 0.45 * shrinkProgress;
      h2Opacity = 1;

      pOpacity = clampValue((shrinkProgress - 0.55) / 0.45, 0, 1);
      pTranslate = 16 - 16 * pOpacity;
    } else {
      h2Scale = 1;
      h2Opacity = 1;
      pOpacity = 1;
      pTranslate = 0;
    }

    h2.style.transform = `scale(${h2Scale})`;
    h2.style.opacity = h2Opacity;

    if (p) {
      p.style.opacity = pOpacity;
      p.style.transform = `translateY(${pTranslate}px)`;
    }
  });
}


/* ================= AI HORIZONTAL SCROLL ================= */
const aiSectionWrapper = document.querySelector(".ai-sticky-outer-wrapper");
const aiScrollTrack = document.querySelector(".ai-horizontal-scroll-track");
const aiCards = document.querySelectorAll(".intermediate-ai-card");

function processHorizontalScrollAndScale() {
  if (!aiSectionWrapper || !aiScrollTrack || aiCards.length === 0) return;

  const realAiCards = Array.from(aiCards);
  const lastRealCard = realAiCards[realAiCards.length - 1];

  if (window.innerWidth <= 900) {
    aiScrollTrack.style.transform = "none";

    aiCards.forEach(card => {
      card.style.transform = "none";
      card.style.opacity = "1";
      card.style.zIndex = "1";
    });

    return;
  }

  const wrapperTop = aiSectionWrapper.offsetTop;
  const wrapperHeight = aiSectionWrapper.offsetHeight;
  const windowHeight = window.innerHeight;
  const currentScroll = window.pageYOffset;
  const totalScrollableDistance = wrapperHeight - windowHeight;

  if (totalScrollableDistance <= 0) return;

  const finalTranslateX = Math.max(
    0,
    lastRealCard.offsetLeft + lastRealCard.offsetWidth / 2 - window.innerWidth / 2
  );

  let percentageProgress = 0;

  if (currentScroll <= wrapperTop) {
    percentageProgress = 0;
  } else if (currentScroll >= wrapperTop + totalScrollableDistance) {
    percentageProgress = 1;
  } else {
    percentageProgress = (currentScroll - wrapperTop) / totalScrollableDistance;
  }

  const holdStart = 0.9;
  const floatStart = 0.96;

  let translateValue = 0;

  if (percentageProgress <= holdStart) {
    translateValue = (percentageProgress / holdStart) * finalTranslateX;
  } else {
    translateValue = finalTranslateX;
  }

  aiScrollTrack.style.transform = `translateX(-${translateValue}px)`;

  const screenCenter = window.innerWidth / 2;
  const activationThreshold = 520;

  const floatProgress = clampValue(
    (percentageProgress - floatStart) / (1 - floatStart),
    0,
    1
  );

  const smoothFloat = easeOutCubic(floatProgress);

  aiCards.forEach((card, index) => {
    const cardBoundingBox = card.getBoundingClientRect();
    const cardCenterPoint = cardBoundingBox.left + cardBoundingBox.width / 2;
    const distanceOffset = Math.abs(screenCenter - cardCenterPoint);

    let targetScale = 0.86;
    let targetOpacity = 0.55;

    if (distanceOffset < activationThreshold) {
      const normalizationFactor =
        (activationThreshold - distanceOffset) / activationThreshold;

      const smoothBezierProgress = Math.sin(
        normalizationFactor * (Math.PI / 2)
      );

      targetScale = 0.86 + 0.18 * smoothBezierProgress;
      targetOpacity = 0.55 + 0.45 * smoothBezierProgress;
    }

    const staggerLift = Math.min(1, smoothFloat + index * 0.012);
    const liftAmount = 46 * staggerLift;
    const fadeAmount = 0.16 * smoothFloat;

    card.style.transform = `translateY(-${liftAmount}px) scale(${targetScale})`;
    card.style.opacity = Math.max(0.28, targetOpacity - fadeAmount);
    card.style.zIndex = targetScale > 1 ? "15" : "1";
  });
}


/* ================= REVEAL ON SCROLL ================= */
const revealElements = document.querySelectorAll(
  ".hero-container-split, .contact-container-split, .grid-gallery, .about-stack-intro"
);

function revealOnScroll() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(el => {
    const top = el.getBoundingClientRect().top;

    if (top < windowHeight - 100) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 0.8s ease";
    }
  });
}

window.addEventListener("load", () => {
  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
  });

  revealOnScroll();
});

window.addEventListener("scroll", revealOnScroll);


/* ================= TOOLKIT ICON PORTAL REVEAL ================= */
const toolkitIcons = Array.from(document.querySelectorAll("[data-toolkit-icon]"));

function revealToolkitIcons() {
  if (!toolkitIcons.length) return;

  const windowHeight = window.innerHeight;

  toolkitIcons.forEach((icon, index) => {
    const rect = icon.getBoundingClientRect();

    if (rect.top < windowHeight * 0.86) {
      icon.style.transitionDelay = `${index * 0.045}s`;
      icon.classList.add("is-visible");
    }
  });
}

window.addEventListener("load", revealToolkitIcons);
window.addEventListener("scroll", revealToolkitIcons);
window.addEventListener("resize", revealToolkitIcons);


/* ================= ABOUT FLOAT TEXT + ORGANIZED STACK CARD REVEAL ================= */
const aboutSection = document.querySelector(".about-stack-section");
const aboutFloatIntro = document.querySelector(".about-float-intro");
const aboutTitle = document.querySelector(".about-reveal-title");
const aboutStackWrapper = document.querySelector("#about .stack-scroll-wrapper");
const stackRevealCards = Array.from(document.querySelectorAll("#about .stack-reveal-card"));
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

let targetStackProgress = 0;
let smoothStackProgress = 0;
let aboutAnimationFrameId = null;

function createFloatingWord(word, isHighlight = false) {
  const outer = document.createElement("span");
  outer.className = "float-word";

  const inner = document.createElement("span");
  inner.textContent = word;

  if (isHighlight) {
    inner.classList.add("float-word-highlight");
  }

  outer.appendChild(inner);
  return outer;
}

function prepareFloatingAboutText() {
  if (!aboutTitle || aboutTitle.dataset.floatPrepared === "true") return;

  const normalText = "What you should know";
  const highlightText = "about me.";

  aboutTitle.innerHTML = "";

  const normalWords = normalText.split(" ");

  normalWords.forEach((word, index) => {
    aboutTitle.appendChild(createFloatingWord(word));

    if (index < normalWords.length - 1) {
      aboutTitle.appendChild(document.createTextNode(" "));
    }
  });

  aboutTitle.appendChild(document.createTextNode(" "));

  const highlightWrapper = document.createElement("span");
  highlightWrapper.className = "about-title-highlight";

  const highlightWords = highlightText.split(" ");

  highlightWords.forEach((word, index) => {
    highlightWrapper.appendChild(createFloatingWord(word, true));

    if (index < highlightWords.length - 1) {
      highlightWrapper.appendChild(document.createTextNode(" "));
    }
  });

  aboutTitle.appendChild(highlightWrapper);
  aboutTitle.dataset.floatPrepared = "true";
}

function processAboutIntroTitle() {
  if (!aboutSection || !aboutFloatIntro || !aboutTitle) return;

  const wordSpans = aboutTitle.querySelectorAll(".float-word > span");

  if (reduceMotionQuery.matches || window.innerWidth <= 980) {
    aboutTitle.style.transform = "none";
    aboutTitle.style.opacity = "1";
    aboutTitle.style.filter = "none";

    wordSpans.forEach(word => {
      word.style.transform = "none";
      word.style.opacity = "1";
      word.style.filter = "none";
    });

    return;
  }

  const introRect = aboutFloatIntro.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  const revealProgress = clampValue(
    (viewportHeight * 0.76 - introRect.top) / (viewportHeight * 0.56),
    0,
    1
  );

  const shrinkProgress = clampValue(
    (-introRect.top - viewportHeight * 0.35) / (viewportHeight * 0.78),
    0,
    1
  );

  const smoothReveal = easeOutCubic(revealProgress);
  const smoothShrink = easeOutCubic(shrinkProgress);

  const titleScale = 1 - smoothShrink * 0.54;
  const titleY = -smoothShrink * 220;
  const titleOpacity = clampValue(smoothReveal - smoothShrink * 0.05, 0, 1);
  const titleBlur = (1 - smoothReveal) * 3;

  aboutTitle.style.transform = `translateY(${titleY}px) scale(${titleScale})`;
  aboutTitle.style.opacity = titleOpacity;
  aboutTitle.style.filter = `blur(${titleBlur}px)`;

  wordSpans.forEach((word, index) => {
    const wordProgress = clampValue(
      (smoothReveal - index * 0.065) / 0.55,
      0,
      1
    );

    const smoothWord = easeOutCubic(wordProgress);

    word.style.opacity = smoothWord;
    word.style.filter = `blur(${(1 - smoothWord) * 9}px)`;
    word.style.transform = `translateY(${(1 - smoothWord) * 115}%) rotateX(${(1 - smoothWord) * 30}deg)`;
  });
}

function calculateTargetStackProgress() {
  if (!aboutStackWrapper) return 0;

  const rect = aboutStackWrapper.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const scrollableDistance = Math.max(1, rect.height - viewportHeight);

  return clampValue(-rect.top / scrollableDistance, 0, 1);
}

function renderAboutStack(progress) {
  if (!aboutStackWrapper || !stackRevealCards.length) return;

  if (reduceMotionQuery.matches || window.innerWidth <= 980) {
    stackRevealCards.forEach(card => {
      setImportantStyle(card, "transform", "none");
      setImportantStyle(card, "opacity", "1");
      setImportantStyle(card, "z-index", "1");

      card.classList.remove("is-past", "is-hidden", "is-active");

      const content = card.querySelector(".stack-card-content, .stack-card-grid");

      if (content) {
        content.style.opacity = "1";
      }
    });

    return;
  }

  const cardCount = stackRevealCards.length;

  /*
    ORGANIZED FINAL STACK VERSION:
    - Smooth entrance remains.
    - All cards rise from the same lower path.
    - Later cards stack on top of earlier cards.
    - Background cards peek neatly instead of floating too high.
  */
  const cardHold = 1.3;
  const preRoll = 2.05;
  const step = 1 + cardHold;
  const totalTimeline = (cardCount - 1) * step + 1.5;
  const timeline = progress * totalTimeline;

  stackRevealCards.forEach((card, index) => {
    const local = timeline - index * step;
    const nextLocal = index < cardCount - 1 ? timeline - (index + 1) * step : -999;
    const content = card.querySelector(".stack-card-content, .stack-card-grid");

    const motionProgress = smootherStep(
      clampValue((local + preRoll) / (1 + preRoll), 0, 1)
    );

    const earlyFadeProgress = smootherStep(
      clampValue((local + preRoll) / 0.72, 0, 1)
    );

    const normalRevealProgress = smootherStep(
      clampValue((local + preRoll) / preRoll, 0, 1)
    );

    const nextRevealProgress = smootherStep(
      clampValue((nextLocal + preRoll) / preRoll, 0, 1)
    );

    const stacked = clampValue((local - 1) / step, 0, cardCount);

    card.classList.remove("is-past", "is-hidden", "is-active");

    let translateY = (1 - motionProgress) * 560;
    let rotateX = (1 - motionProgress) * 10;
    let rotateZ = (1 - motionProgress) * 0.8;
    let scale = 0.9 + motionProgress * 0.1;
    let opacity = earlyFadeProgress;
    let contentOpacity = 1;
    let zIndex = 30 + index * 10;

    if (local < -preRoll) {
      card.classList.add("is-hidden");

      opacity = 0;
      contentOpacity = 1;
      zIndex = 1 + index;
    } else if (local >= 1) {
      card.classList.add("is-past");

      /*
        Cleaner final stack:
        the previous cards only peek slightly behind the active card.
      */
      const neatStackOffset = stacked * 8;
      const revealLift = nextRevealProgress * 14;

      translateY = -(neatStackOffset + revealLift);
      rotateX = 0;
      rotateZ = 0;
      scale = 1 - stacked * 0.01 - nextRevealProgress * 0.006;

      opacity = Math.max(0.82, 1 - stacked * 0.035);

      contentOpacity = Math.max(
        0.34,
        0.72 - stacked * 0.07 - nextRevealProgress * 0.1
      );

      zIndex = 30 + index * 10;
    } else {
      card.classList.add("is-active");

      opacity = Math.max(0.98, opacity);
      contentOpacity = Math.min(1, Math.max(0.84, normalRevealProgress));

      zIndex = 30 + index * 10;
    }

    setImportantStyle(
      card,
      "transform",
      `translate(-50%, -50%) translateY(${translateY}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) scale(${scale})`
    );

    setImportantStyle(card, "opacity", String(opacity));
    setImportantStyle(card, "z-index", String(zIndex));
    setImportantStyle(card, "background", "#fff4c8");

    card.style.filter = "none";
    card.style.backfaceVisibility = "hidden";
    card.style.transformStyle = "flat";

    if (content) {
      content.style.opacity = String(contentOpacity);
    }
  });
}

function startAboutSmoothLoop() {
  if (aboutAnimationFrameId) return;

  const tick = () => {
    smoothStackProgress = lerpValue(smoothStackProgress, targetStackProgress, 0.085);

    if (Math.abs(smoothStackProgress - targetStackProgress) < 0.0005) {
      smoothStackProgress = targetStackProgress;
    }

    renderAboutStack(smoothStackProgress);

    if (smoothStackProgress !== targetStackProgress) {
      aboutAnimationFrameId = requestAnimationFrame(tick);
    } else {
      aboutAnimationFrameId = null;
    }
  };

  aboutAnimationFrameId = requestAnimationFrame(tick);
}

function updateAboutStackTarget() {
  targetStackProgress = calculateTargetStackProgress();
  processAboutIntroTitle();
  startAboutSmoothLoop();
}

window.addEventListener("load", () => {
  prepareFloatingAboutText();

  targetStackProgress = calculateTargetStackProgress();
  smoothStackProgress = targetStackProgress;

  processAboutIntroTitle();
  renderAboutStack(smoothStackProgress);
});

window.addEventListener("resize", () => {
  prepareFloatingAboutText();

  targetStackProgress = calculateTargetStackProgress();
  smoothStackProgress = targetStackProgress;

  processAboutIntroTitle();
  renderAboutStack(smoothStackProgress);
});

window.addEventListener("scroll", updateAboutStackTarget, { passive: true });


/* ================= SMOOTH ANCHOR SCROLL ================= */
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


/* ================= ACTIVE NAV LINK ================= */
const sectionAnchors = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

function updateActiveNavLink() {
  let currentSection = "home";

  sectionAnchors.forEach(section => {
    const sectionTop = section.offsetTop - 160;

    if (window.pageYOffset >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    link.classList.toggle("active", href === `#${currentSection}`);
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);


/* ================= BACK TO TOP BUTTON ================= */
const backToTopBtn = document.getElementById("backToTopBtn");

function toggleBackToTopButton() {
  if (!backToTopBtn) return;

  if (window.pageYOffset > 450) {
    backToTopBtn.classList.add("show");
  } else {
    backToTopBtn.classList.remove("show");
  }
}

if (backToTopBtn) {
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

window.addEventListener("scroll", toggleBackToTopButton);
window.addEventListener("load", toggleBackToTopButton);


/* ================= HIDE / SHOW NAVBAR ON SCROLL ================= */
let lastScrollPosition = 0;
const navbarElement = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!navbarElement) return;

  const currentScrollPosition = window.pageYOffset;

  if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 100) {
    navbarElement.style.transform = "translateY(-100%)";
  } else {
    navbarElement.style.transform = "translateY(0)";
  }

  lastScrollPosition = currentScrollPosition;
});


/* ================= MOBILE NAVIGATION ================= */
const mobileMenuButton = document.querySelector(".mobile-menu-btn");
const mobileMenu = document.querySelector(".nav-menu");

if (mobileMenuButton && mobileMenu) {
  mobileMenuButton.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("open");

    mobileMenuButton.classList.toggle("is-open", isOpen);
    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
  });

  mobileMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
      mobileMenuButton.classList.remove("is-open");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });
}


/* ================= PROJECT MODAL ================= */
const projectModal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalTag = document.getElementById("modalTag");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");

let lastFocusedProjectCard = null;

function openProjectModal(card) {
  if (!projectModal || !modalTitle || !modalTag || !modalDescription || !modalImage) {
    return;
  }

  const title =
    card.querySelector("h3")?.textContent?.trim() || "Project Details";

  const tag =
    card.querySelector(".tools-tag")?.textContent?.trim() ||
    "Portfolio Project";

  const description =
    card.getAttribute("data-description") ||
    "A selected portfolio piece showcasing visual direction, layout, and creative production.";

  const image = card.querySelector("img");
  const imageSrc = image?.getAttribute("src") || "";

  lastFocusedProjectCard = card;

  modalTitle.textContent = title;
  modalTag.textContent = tag;
  modalDescription.textContent = description;

  if (imageSrc) {
    modalImage.style.backgroundImage = `url("${imageSrc}")`;
  } else {
    modalImage.style.backgroundImage =
      "linear-gradient(135deg, #FFE9B8, #FFD37A)";
  }

  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  projectModal.querySelector(".modal-close")?.focus();
}

function closeProjectModal() {
  if (!projectModal) return;

  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";

  if (lastFocusedProjectCard) {
    lastFocusedProjectCard.focus();
  }
}

document.querySelectorAll(".project-card, .intermediate-ai-card").forEach(card => {
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

  const cardTitle =
    card.querySelector("h3")?.textContent?.trim() || "project";

  card.setAttribute("aria-label", `View details for ${cardTitle}`);

  card.addEventListener("click", () => {
    openProjectModal(card);
  });

  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProjectModal(card);
    }
  });
});

document.querySelectorAll("[data-close-modal]").forEach(button => {
  button.addEventListener("click", closeProjectModal);
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && projectModal?.classList.contains("is-open")) {
    closeProjectModal();
  }
});


/* ================= CONTACT FORM DEMO FEEDBACK ================= */
const contactForm = document.querySelector(".modern-form");

if (contactForm) {
  contactForm.addEventListener("submit", event => {
    event.preventDefault();

    const submitButton = contactForm.querySelector(".submit-btn-yellow");

    if (!submitButton) return;

    const originalText = submitButton.textContent;

    submitButton.textContent = "Message ready ✓";

    setTimeout(() => {
      submitButton.textContent = originalText;
    }, 1800);
  });
}


/* ================= MASTER EVENTS ================= */
window.addEventListener("load", () => {
  processTitleScroll();
  processHorizontalScrollAndScale();
});

window.addEventListener("resize", () => {
  processHorizontalScrollAndScale();
});

window.addEventListener("scroll", () => {
  processTitleScroll();
  processHorizontalScrollAndScale();
});