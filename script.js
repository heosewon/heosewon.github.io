(() => {
  document.getElementById('year').textContent = new Date().getFullYear();
  const links = [...document.querySelectorAll('.topbar nav a')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href')));
  const root = document.documentElement;
  const translations = window.portfolioTranslations || {};
  const textEntries = [];
  const walker = document.createTreeWalker(document, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    // Translate explanatory comments; preserve executable source and error strings.
    if (node.parentElement?.closest('script, style')) continue;
    if (node.parentElement?.closest('pre') && !node.parentElement.closest('.tok-comment')) continue;
    const key = node.textContent.trim();
    if (Object.prototype.hasOwnProperty.call(translations, key)) {
      let translated = node.textContent.replace(key, translations[key]);
      if (node.previousSibling?.nodeType === Node.ELEMENT_NODE && !/^\s|^[,.;:!?]/.test(translated)) translated = ' ' + translated;
      textEntries.push({node, original: node.textContent, translated});
    }
  }
  const attributeEntries = [];
  document.querySelectorAll('[aria-label], [alt], [title], meta[content]').forEach(element => {
    ['aria-label', 'alt', 'title', 'content'].forEach(attribute => {
      const original = element.getAttribute(attribute);
      if (Object.prototype.hasOwnProperty.call(translations, original)) {
        attributeEntries.push({element, attribute, original, translated: translations[original]});
      }
    });
  });
  function savePreference(key, value) { try { localStorage.setItem(key, value); } catch (_) {} }
  function applyTheme(theme) {
    root.dataset.theme = theme;
    document.querySelectorAll('[data-theme-choice]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme)));
    savePreference('portfolio-theme', theme);
  }
  function applyLanguage(language) {
    root.lang = language;
    textEntries.forEach(entry => { entry.node.textContent = language === 'en' ? entry.translated : entry.original; });
    if (language === 'en') {
      const menuLabels = ['About', 'Experience', 'Work', 'Projects', 'Background'];
      links.forEach((link, index) => { link.firstChild.textContent = menuLabels[index]; });
    }
    attributeEntries.forEach(entry => entry.element.setAttribute(entry.attribute, language === 'en' ? entry.translated : entry.original));
    document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    document.querySelector('.copy-status').textContent = '';
    savePreference('portfolio-language', language);
    requestAnimationFrame(() => {
      // Retain the current reading position when translated content changes height.
      updateNavigation();
    });
  }
  document.querySelectorAll('[data-theme-choice]').forEach(button => button.addEventListener('click', () => applyTheme(button.dataset.themeChoice)));
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    const wasAtBottom = document.documentElement.scrollHeight - innerHeight - scrollY <= 2;
    const activeSection = sections.find(section => section.id === location.hash.slice(1)) || sections.find(section => section.id === document.querySelector('.topbar nav a.active')?.hash.slice(1));
    applyLanguage(button.dataset.language);
    requestAnimationFrame(() => {
      if (wasAtBottom) window.scrollTo(0, document.documentElement.scrollHeight);
      else if (activeSection) activeSection.scrollIntoView({block: 'start'});
      updateNavigation();
    });
  }));
  applyTheme(root.dataset.theme === 'light' ? 'light' : 'dark');
  let initialLanguage = 'ko';
  try { if (localStorage.getItem('portfolio-language') === 'en') initialLanguage = 'en'; } catch (_) {}
  let queued = false;
  function setActiveSection(current) {
    links.forEach(link => {
      const active = link.getAttribute('href') === '#' + current.id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function updateNavigation() {
    const offset = document.querySelector('.topbar').offsetHeight + 55;
    let current = sections[0];
    sections.forEach(section => { if (section.getBoundingClientRect().top <= offset) current = section; });
    // The final section can be too short to reach the header's scroll threshold.
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 1 && window.scrollY >= maxScroll - 2) {
      current = sections[sections.length - 1];
    }
    setActiveSection(current);
    queued = false;
  }
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(updateNavigation); }
  }, { passive: true });
  window.addEventListener('resize', updateNavigation);
  window.addEventListener('hashchange', updateNavigation);
  window.addEventListener('load', updateNavigation);
  links.forEach((link, index) => {
    link.addEventListener('click', () => setActiveSection(sections[index]));
  });
  applyLanguage(initialLanguage);
  updateNavigation();
  let statusTimer;
  document.querySelectorAll('.copy-code').forEach(button => {
    button.addEventListener('click', async () => {
      const code = button.closest('.code-panel').querySelector('code');
      const status = document.querySelector('.copy-status');
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(code.textContent);
        } else {
          const field = document.createElement('textarea');
          field.value = code.textContent;
          field.style.cssText = 'position:fixed;left:-9999px;top:0';
          document.body.appendChild(field);
          field.select();
          const copied = document.execCommand('copy');
          field.remove();
          button.focus();
          if (!copied) throw new Error('copy unavailable');
        }
        status.textContent = root.lang === 'en' ? 'Code copied.' : '코드를 복사했습니다.';
      } catch (_) {
        const range = document.createRange();
        range.selectNodeContents(code);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = root.lang === 'en' ? 'Press Ctrl+C (⌘C on Mac) to copy the selected code.' : '선택된 코드를 Ctrl+C로 복사해 주세요.';
      }
      clearTimeout(statusTimer);
      statusTimer = setTimeout(() => { status.textContent = ''; }, 3500);
    });
  });
})();
