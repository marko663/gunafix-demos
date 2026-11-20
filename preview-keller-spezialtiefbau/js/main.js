(function () {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mqDesk = window.matchMedia('(min-width: 1025px)');

  const header = document.querySelector('[data-header]');
  const burger = document.querySelector('[data-burger]');
  const panel = document.getElementById('mobilnav');

  const onScrollHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  const closeNav = () => {
    document.body.classList.remove('nav-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    if (panel) panel.setAttribute('hidden', '');
  };
  const openNav = () => {
    document.body.classList.add('nav-open');
    if (burger) burger.setAttribute('aria-expanded', 'true');
    if (panel) panel.removeAttribute('hidden');
  };
  if (burger && panel) {
    burger.addEventListener('click', () => {
      document.body.classList.contains('nav-open') ? closeNav() : openNav();
    });
    panel.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));
  }

  document.querySelectorAll('[data-acc]').forEach((root) => {
    root.querySelectorAll('.acc-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.closest('.acc-item');
        const open = item.classList.contains('is-open');
        if (window.matchMedia('(min-width: 768px) and (max-width: 1024px)').matches) {
          item.classList.toggle('is-open', !open);
          btn.setAttribute('aria-expanded', String(!open));
          return;
        }
        root.querySelectorAll('.acc-item').forEach((it) => {
          it.classList.remove('is-open');
          const b = it.querySelector('.acc-btn');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!open) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

  const form = document.querySelector('[data-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const get = (id) => (document.getElementById(id) || {}).value || '';
      const subject = encodeURIComponent('Anfrage über die Website: ' + get('bereich'));
      const body = encodeURIComponent(
        ['Name: ' + get('name'), 'Firma: ' + get('firma'), 'Telefon: ' + get('telefon'), 'E-Mail: ' + get('email'), 'Bereich: ' + get('bereich'), '', get('nachricht')].join('\n')
      );
      window.location.href = 'mailto:mail@keller-spezialtiefbau.de?subject=' + subject + '&body=' + body;
    });
  }
  const offsetOf = () => (header ? header.getBoundingClientRect().height : 76) + 20;
  const scrollToId = (id, lenis) => {
    const el = document.querySelector(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - offsetOf();
    if (lenis) lenis.scrollTo(top, { immediate: false });
    else window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
  };
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      closeNav();
      scrollToId(id, window.__kellerLenis || null);
    });
  });


  const steps = [
    { title: 'Vom Plan in den Boden', text: 'Jedes Bauwerk braucht einen tragfähigen Anschluss an den Baugrund. Im Schnitt zeigen wir, wie unsere Verfahren ineinandergreifen – vom Verbau über den Pfahl bis zur Wasserhaltung.' },
    { title: 'Spundwandverbau', text: 'Spundwände sichern die Baugrube gegen Boden und Nachbarbebauung. Wir planen die Baugrube mit Statik und führen den Verbau mit eigenem Gerät aus – auch auf engen, innerstädtischen Flächen.' },
    { title: 'Bohrpfähle', text: 'Bohrpfähle mit Kelly-, VOM- und SOB-Verfahren, dazu Verpress-, Verdränger- und duktile Gussrammpfähle. Die Pfähle gehen durch die Schichten bis in den tragfähigen Horizont.' },
    { title: 'Verankerungen', text: 'Verankerungen mit Prüfungen halten den Verbau. Ergänzend setzen wir Stahlgurtungen, Steifen, Bodenvernagelungen und Spritzbeton – und unterfangen, wo der Bestand es verlangt.' },
    { title: 'Grundwasserabsenkung', text: 'Mit Bohrbrunnen und Vakuumlanzen halten wir die Baugrube trocken. Der Brunnenbau ist die Wurzel des Hauses – und bis heute nach DVGW W 120 zertifiziert.' },
    { title: 'Rohrleitungsbau', text: 'Leitungen aus Gusseisen, Stahl, PE und PVC für Trinkwasser, Abwasser und Erdgas, geschweißt von geprüften Stahl- und PE-Rohrschweißern. Zertifiziert nach DVGW GW 301.' }
  ];

  const setStep = (n, tween) => {
    const i = Math.max(0, Math.min(5, n | 0));
    const title = document.getElementById('proc-title');
    const text = document.getElementById('proc-text');
    if (title) title.textContent = steps[i].title;
    if (text) text.textContent = steps[i].text;
    document.querySelectorAll('[data-proc-steps] button').forEach((b) => {
      b.classList.toggle('is-on', Number(b.dataset.step) === i);
    });
    if (tween && tween.scrollTrigger && mqDesk.matches && !reduce) {
      const st = tween.scrollTrigger;
      const p = i / 5;
      st.scroll(st.start + (st.end - st.start) * p);
    } else if (!tween) {
      applyCut(i / 5);
    }
  };

  function applyCut(p) {
    const clamp = (v) => Math.max(0, Math.min(1, v));
    const g = (id) => document.getElementById(id);
    const shaft = g('pfahl-schaft');
    const tip = g('pfahl-spitze');
    const spund = g('spund');
    const anker = g('anker');
    const brunnen = g('brunnen');
    const rohr = g('rohr');
    const water = g('water');
    const lbl = g('lbl-water');
    if (spund) spund.setAttribute('opacity', String(clamp((p - 0.08) / 0.14)));
    const pile = clamp((p - 0.22) / 0.28);
    if (shaft) {
      const h = 520 * pile;
      shaft.setAttribute('height', String(h));
      if (tip) {
        const y = 80 + h;
        tip.setAttribute('points', '268,' + y + ' 304,' + y + ' 286,' + (y + 22));
        tip.setAttribute('opacity', pile > 0.02 ? '1' : '0');
      }
    }
    if (anker) anker.setAttribute('opacity', String(clamp((p - 0.48) / 0.14)));
    if (brunnen) brunnen.setAttribute('opacity', String(clamp((p - 0.64) / 0.14)));
    if (water) water.setAttribute('opacity', String(0.85 * clamp((p - 0.64) / 0.14)));
    if (lbl) lbl.setAttribute('opacity', String(clamp((p - 0.64) / 0.14)));
    if (rohr) rohr.setAttribute('opacity', String(clamp((p - 0.82) / 0.14)));
  }

  const ready = () => {
    let pinTween = null;
    if (!reduce && window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      let lenis = null;
      if (window.Lenis) {
        lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
        window.__kellerLenis = lenis;
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((t) => lenis.raf(t * 1000));
        gsap.ticker.lagSmoothing(0);
      }
      if (window.SplitType) {
        const h = document.querySelector('[data-split]');
        if (h) {
          const split = new SplitType(h, { types: 'lines, words' });
          gsap.set(split.words, { yPercent: 110, opacity: 0 });
          gsap.to(split.words, { yPercent: 0, opacity: 1, duration: 1, stagger: 0.06, ease: 'power3.out', delay: 0.15 });
        }
      }
      gsap.to('[data-hero-media]', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
      gsap.utils.toArray('.media-card img, .gallery img, .story img').forEach((img) => {
        gsap.fromTo(img, { yPercent: -8, scale: 1.08 }, {
          yPercent: 8, scale: 1.02, ease: 'none',
          scrollTrigger: { trigger: img.closest('figure, .story, .media-card') || img, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });
      if (mqDesk.matches) {
        const proxy = { p: 0 };
        pinTween = gsap.to(proxy, {
          p: 1,
          ease: 'none',
          onUpdate: () => {
            applyCut(proxy.p);
            const idx = Math.round(proxy.p * 5);
            const title = document.getElementById('proc-title');
            if (title && title.textContent !== steps[idx].title) {
              title.textContent = steps[idx].title;
              document.getElementById('proc-text').textContent = steps[idx].text;
              document.querySelectorAll('[data-proc-steps] button').forEach((b) => {
                b.classList.toggle('is-on', Number(b.dataset.step) === idx);
              });
            }
          },
          scrollTrigger: {
            trigger: '.verfahren',
            start: 'top top',
            end: '+=220%',
            pin: true,
            scrub: 0.5,
            anticipatePin: 1
          }
        });
      }
      document.querySelectorAll('[data-proc-steps] button').forEach((b) => {
        b.addEventListener('click', () => setStep(Number(b.dataset.step), pinTween));
      });
    } else {
      applyCut(0);
      document.querySelectorAll('[data-proc-steps] button').forEach((b) => {
        b.addEventListener('click', () => setStep(Number(b.dataset.step), null));
      });
    }

    if (mqDesk.matches && !reduce) {
      document.querySelectorAll('.media-card').forEach((card) => {
        card.addEventListener('mousemove', (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width - 0.5;
          const y = (e.clientY - r.top) / r.height - 0.5;
          card.style.transform = 'perspective(900px) rotateY(' + (x * 6) + 'deg) rotateX(' + (-y * 4) + 'deg)';
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
      });
    }
  };

  ready();
  window.addEventListener('load', () => {
    if (window.ScrollTrigger) ScrollTrigger.refresh();
  });
})();
