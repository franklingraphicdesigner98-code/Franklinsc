<template>
  <!-- Backdrop -->
  <AppBackdrop />

  <!-- Back button -->
  <router-link to="/" class="back-btn" @click="closeModal">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
    {{ t('nav.volver') }}
  </router-link>

  <!-- Nav -->
  <nav :class="['nav', { hidden: navHidden }]">
    <div class="inner">
      <a href="/" class="brand">
        <span class="dot"></span>
        <span class="b1">Franklin</span>
        <span class="b2"> Studio</span>
      </a>
      <LanguageSwitcher class="page-lang" />
    </div>
  </nav>

  <!-- Hero -->
  <header class="hero">
    <div class="inner">
      <div>
        <span class="eyebrow">{{ t('desarrollo.eyebrow') }}</span>
        <h1 class="display hero-display">
          <span class="line">
            <span class="white">{{ t('desarrollo.titleWhite') }}</span><span class="gold typed-word">{{ typedText }}<span class="cursor"></span></span>
          </span>
        </h1>
        <p class="lead">
          {{ t('desarrollo.lead') }}
        </p>
      </div>
      <div class="hero-meta">
        <div class="glass hero-meta-item">
          <div>
            <small>{{ t('desarrollo.tecnologias') }}</small>
            <strong>{{ t('desarrollo.tecnologiasValue') }}</strong>
          </div>
          <div class="accent-bar"></div>
        </div>
      </div>
    </div>
  </header>

  <!-- Filters -->
  <div class="filters-wrap" :style="{ top: navHidden ? '0px' : '62px' }">
    <div class="filters">
      <div class="filter-pills">
        <button
          v-for="cat in categories" :key="cat"
          :class="['pill', { active: selectedCat === cat }]"
          @click="selectedCat = cat"
        >{{ cat }}</button>
      </div>
      <div class="results-count"><b>{{ filteredProjects.length }}</b> {{ locale === 'en' ? (filteredProjects.length !== 1 ? 'projects' : 'project') : `proyecto${filteredProjects.length !== 1 ? 's' : ''}` }}</div>
    </div>
  </div>

  <!-- Projects Grid -->
  <section class="projects-section">
    <div class="container">
      <div class="projects-grid">
        <article
          v-for="p in filteredProjects" :key="p.id"
          :class="['project reveal', p.span]"
          @click="p.link ? openLink(p.link) : openModal(p)"
        >
          <div class="img-wrap">
            <img :src="p.image" :alt="p.title" loading="lazy" />
            <div class="year-badge">'{{ p.year.slice(-2) }}</div>
            <div class="tags">
              <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
          <div class="body">
            <div class="cat-row">
              <span class="cat">{{ p.category }}</span>
              <span class="client-sm">{{ p.client }}</span>
            </div>
            <h3>{{ t(`desarrollo.projects.${p.key}.title`) }}</h3>
            <p class="client">{{ t(`desarrollo.projects.${p.key}.subtitle`) }}</p>
            <p class="desc">{{ t(`desarrollo.projects.${p.key}.description`) }}</p>
            <span class="view">{{ t('desarrollo.verProyecto') }}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </article>
      </div>

    </div>
  </section>

  <!-- CTA -->
  <section class="cta-section">
    <div class="container">
      <div class="glass-gold cta-card reveal">
        <span class="eyebrow" style="margin-bottom:1.4rem">{{ t('cta.eyebrow') }}</span>
        <h2 class="display h-cta">
          <span class="white">{{ t('desarrollo.ctaTitleWhite') }}</span> <span class="gold">{{ t('desarrollo.ctaTitleGold') }}</span>
        </h2>
        <p class="lead">
          {{ t('desarrollo.ctaLead') }}
        </p>
        <div class="cta-btns">
          <a href="https://api.whatsapp.com/send/?phone=%2B573223003840&text=Hola%2C%20quiero%20un%20proyecto%20de%20desarrollo%20de%20software" target="_blank" rel="noopener noreferrer" class="btn btn-gold">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
            {{ t('cta.whatsapp') }}
          </a>
          <a href="https://www.behance.net/gallery/220454209/Portfolio" target="_blank" rel="noopener noreferrer" class="btn btn-outline">{{ t('desarrollo.verBehance') }}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Signature -->
  <div class="signature">
    <div class="container">
      <div class="sig-line"><span class="h"></span><img src="/img/ico_Mesa de trabajo 1_Mesa de trabajo 1.png" alt="FP" class="sig-mark" /><span class="h right"></span></div>
      <h3>{{ t('signature.name') }}</h3>
      <p>{{ t('signature.role') }}</p>
    </div>
  </div>

  <!-- Footer -->
  <footer class="foot">
    <div class="inner">
      <small>{{ t('footer.copyrightShort') }}</small>
      <nav>
        <a href="https://www.behance.net/gallery/220454209/Portfolio" target="_blank" rel="noopener noreferrer">Behance</a>
        <a href="https://www.instagram.com/franklinp.cs/" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://www.linkedin.com/in/franklin-pe%C3%B1a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </nav>
    </div>
  </footer>

  <!-- Modal -->
  <Transition name="modal-fade">
    <div v-if="modalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <div class="modal-head">
          <div>
            <h2>{{ activeProject ? t(`desarrollo.projects.${activeProject.key}.title`) : '' }}</h2>
            <div class="modal-client">{{ activeProject?.client }}</div>
          </div>
          <button class="close-btn" @click="closeModal" :aria-label="locale === 'en' ? 'Close' : 'Cerrar'">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="carousel">
            <div class="carousel-main">
              <img
                v-for="(src, i) in activeProject?.gallery" :key="i"
                :src="src" :alt="`${activeProject?.title} ${i+1}`"
                :class="{ active: i === imgIdx }"
              />
              <button v-if="activeProject?.gallery.length > 1" class="car-btn prev" @click="prevImage">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button v-if="activeProject?.gallery.length > 1" class="car-btn next" @click="nextImage">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div v-if="activeProject?.gallery.length > 1" class="car-counter">
                {{ imgIdx + 1 }} / {{ activeProject?.gallery.length }}
              </div>
            </div>
            <div v-if="activeProject?.gallery.length > 1" class="thumbs">
              <button
                v-for="(src, i) in activeProject?.gallery" :key="i"
                :class="['thumb', { active: i === imgIdx }]"
                @click="imgIdx = i"
              >
                <img :src="src" :alt="`thumb ${i+1}`" />
              </button>
            </div>
          </div>

          <div class="details-grid">
            <div>
              <h4>{{ t('disenoGrafico.descripcion') }}</h4>
              <p class="desc">{{ activeProject ? t(`desarrollo.projects.${activeProject.key}.fullDesc`) : '' }}</p>
              <div class="modal-tags">
                <span v-for="tag in activeProject?.tags" :key="tag">{{ tag }}</span>
              </div>
            </div>
            <div>
              <h4>{{ t('disenoGrafico.detalles') }}</h4>
              <div class="info-list">
                <div class="info-row"><small>{{ t('disenoGrafico.categoria') }}</small><strong>{{ activeProject?.category }}</strong></div>
                <div class="info-row"><small>{{ t('disenoGrafico.cliente') }}</small><strong>{{ activeProject?.client }}</strong></div>
                <div class="info-row"><small>{{ t('disenoGrafico.anio') }}</small><strong>{{ activeProject?.year }}</strong></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue';

/* ── Typewriter ── */
const typedText = ref('');
const phrases = ['Software', '& Soluciones Web', 'Aplicaciones', 'Plataformas Web'];
let phraseIdx = 0, charIdx = 0, isDeleting = false, typeTimer = null;
const tick = () => {
  const cur = phrases[phraseIdx];
  typedText.value = isDeleting ? cur.slice(0, charIdx - 1) : cur.slice(0, charIdx + 1);
  isDeleting ? charIdx-- : charIdx++;
  let delay = isDeleting ? 55 : 95;
  if (!isDeleting && charIdx === cur.length) { delay = 1800; isDeleting = true; }
  else if (isDeleting && charIdx === 0) { isDeleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; delay = 350; }
  typeTimer = setTimeout(tick, delay);
};
import { useI18n } from 'vue-i18n';
import AppBackdrop from '../components/landing/AppBackdrop.vue';
import LanguageSwitcher from '../components/landing/LanguageSwitcher.vue';
import { imgCard, imgGallery } from '../utils/cloudinary.js';
import { useReveal } from '../composables/useReveal.js';

useReveal();
const { t, locale } = useI18n();

/* ── Nav hide on scroll ── */
const navHidden = ref(false);
let lastY = 0;
const onScroll = () => {
  const y = window.scrollY;
  navHidden.value = y > lastY && y > 80;
  lastY = y;
};
onMounted(() => { window.addEventListener('scroll', onScroll, { passive: true }); typeTimer = setTimeout(tick, 700); });
onUnmounted(() => { window.removeEventListener('scroll', onScroll); clearTimeout(typeTimer); });

/* ── Keyboard ── */
const onKey = (e) => {
  if (!modalOpen.value) return;
  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
};
onMounted(() => document.addEventListener('keydown', onKey));
onUnmounted(() => document.removeEventListener('keydown', onKey));

/* ── Data ── */
const categories = ['Todos', 'E-commerce', 'Corporativo'];
const selectedCat = ref('Todos');

const allProjects = [
  {
    id: 1, key: 'fortress', span: 'span-wide', category: 'E-commerce', year: '2024',
    client: 'Fortress',
    tags: ['Vue.js', 'E-commerce', 'Pasarela de pago', 'Responsivo'],
    link: 'https://fortressbga.com/',
    image: imgCard('franklincs/fortress'),
    gallery: [ imgGallery('franklincs/fortress') ]
  },
  {
    id: 2, key: 'coray', span: 'span-wide', category: 'Corporativo', year: '2026',
    client: 'CoRay Dev',
    tags: ['Vue.js', 'Corporativo', 'Software a la medida', 'Responsivo'],
    link: 'https://coraydev.com/',
    image: imgCard('franklincs/coray-cover'),
    gallery: [ imgGallery('franklincs/coray-cover') ]
  },
  {
    id: 3, key: 'simulador', span: 'span-wide', category: 'Corporativo', year: '2026',
    client: 'Instituto Marco Fidel',
    tags: ['Simulador Financiero', 'Educación', 'Herramienta Web'],
    link: 'https://www.instagram.com/reel/Da1ifixzUnq/',
    image: '/img/simulador financiero.jpg',
    gallery: [ '/img/simulador financiero.jpg' ]
  },
];

const filteredProjects = computed(() =>
  selectedCat.value === 'Todos'
    ? allProjects
    : allProjects.filter(p => p.category === selectedCat.value)
);

watch(filteredProjects, () => {
  nextTick(() => {
    document.querySelectorAll('.projects-grid .reveal:not(.in)').forEach(el => el.classList.add('in'));
  });
});

/* ── Modal ── */
const modalOpen = ref(false);
const activeProject = ref(null);
const imgIdx = ref(0);

const openLink = (url) => window.open(url, '_blank', 'noopener,noreferrer');

const openModal = (p) => {
  activeProject.value = p;
  imgIdx.value = 0;
  modalOpen.value = true;
  document.body.style.overflow = 'hidden';
};
const closeModal = () => {
  modalOpen.value = false;
  activeProject.value = null;
  document.body.style.overflow = '';
};
const nextImage = () => {
  if (!activeProject.value) return;
  imgIdx.value = (imgIdx.value + 1) % activeProject.value.gallery.length;
};
const prevImage = () => {
  if (!activeProject.value) return;
  imgIdx.value = (imgIdx.value - 1 + activeProject.value.gallery.length) % activeProject.value.gallery.length;
};

// The back button sits above the modal overlay, so it can be clicked while
// a project is open — make sure navigating away doesn't leave scroll locked.
onUnmounted(() => { document.body.style.overflow = ''; });
</script>

<style scoped>
/* ── Back button ── */
.back-btn {
  position: fixed; top: 14px; left: 24px; z-index: 200;
  display: inline-flex; align-items: center; gap: .5rem;
  padding: .55rem .95rem; border-radius: 999px;
  background: linear-gradient(135deg, #f5cf7a, #e6b34a 50%, #b8862c);
  color: #1a1207; font-weight: 700; font-size: .8rem; letter-spacing: .04em;
  box-shadow: 0 8px 24px rgba(230,179,74,.4), inset 0 1px 0 rgba(255,255,255,.35);
  transition: all .25s ease;
  pointer-events: auto;
}
.back-btn:hover { transform: translateX(-3px); box-shadow: 0 12px 32px rgba(230,179,74,.6), inset 0 1px 0 rgba(255,255,255,.4) }
.back-btn svg { transition: transform .25s ease }
.back-btn:hover svg { transform: translateX(-3px) }

/* ── Nav ── */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  background: rgba(8,8,8,.78);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border-bottom: 1px solid rgba(230,179,74,.10);
  transition: transform .3s ease;
}
.nav.hidden { transform: translateY(-100%) }
.nav .inner {
  position: relative;
  max-width: 1280px; margin: 0 auto;
  padding: 1rem 32px; display: flex; justify-content: center; align-items: center; gap: .5rem;
}
.page-lang { position: absolute; right: 32px; top: 50%; transform: translateY(-50%) }
.brand { font-size: 1.25rem; font-weight: 600; letter-spacing: -.01em; display: flex; align-items: center; gap: .5rem }
.brand .dot { width: 9px; height: 9px; border-radius: 50%; background: linear-gradient(135deg,#f5cf7a,#a47a23); box-shadow: 0 0 14px var(--gold-glow) }
.brand .b1 { color: #fff }
.brand .b2 { color: var(--gold) }

/* ── Hero ── */
.hero { position: relative; padding: 9rem 0 6rem }
.hero .inner {
  max-width: 1280px; margin: 0 auto; padding: 0 32px;
  display: grid; grid-template-columns: 1.3fr 1fr; gap: 4rem; align-items: end;
}
.hero-display { font-size: clamp(2.2rem, 5.5vw, 4.8rem); margin-top: 1.5rem }
.hero-display .line { display: block; overflow: visible }
.hero-display .line > span {
  display: inline;
}
.typed-word { display: inline }
.cursor {
  display: inline-block; width: 3px; height: .85em;
  background: var(--gold); margin-left: 3px; vertical-align: middle;
  animation: blink .75s step-end infinite;
}
@keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
.hero p.lead { margin-top: 1.5rem; font-size: 1.05rem; color: var(--fg-dim); line-height: 1.75 }
.hero-meta { display: grid; gap: 1.4rem }
.hero-meta-item { padding: 1.2rem 1.4rem; display: flex; justify-content: space-between; align-items: center }
.hero-meta-item small { display: block; color: var(--fg-mute); font-size: .7rem; letter-spacing: .18em; text-transform: uppercase; margin-bottom: .25rem }
.hero-meta-item strong { font-family: var(--f-display); font-size: 1.4rem; font-weight: 400; letter-spacing: .04em; color: #fff }
.accent-bar { width: 3px; height: 40px; background: linear-gradient(180deg, var(--gold-2), var(--gold-3)); border-radius: 2px; box-shadow: 0 0 8px var(--gold-glow) }

/* ── Filters ── */
.filters-wrap {
  position: sticky; top: 62px; z-index: 60;
  transition: top .3s ease;
  background: rgba(8,8,8,.55);
  backdrop-filter: blur(20px) saturate(150%);
  -webkit-backdrop-filter: blur(20px) saturate(150%);
  border-top: 1px solid rgba(230,179,74,.08);
  border-bottom: 1px solid rgba(230,179,74,.08);
  padding: 1rem 0;
}
.filters { max-width: 1280px; margin: 0 auto; padding: 0 32px; display: flex; flex-wrap: wrap; gap: .6rem; align-items: center; justify-content: space-between }
.filter-pills { display: flex; flex-wrap: wrap; gap: .5rem }
.pill {
  padding: .55rem 1.2rem; border-radius: 999px;
  font-size: .85rem; font-weight: 500; letter-spacing: .04em;
  background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.08); color: var(--fg-dim);
  transition: all .2s ease;
}
.pill:hover { border-color: rgba(230,179,74,.4); color: var(--gold); background: rgba(230,179,74,.06) }
.pill.active {
  background: linear-gradient(135deg, #f5cf7a, #e6b34a 50%, #b8862c);
  color: #1a1207; font-weight: 700; border-color: transparent;
  box-shadow: 0 6px 20px rgba(230,179,74,.35), inset 0 1px 0 rgba(255,255,255,.3);
}
.results-count { font-family: var(--f-body); color: var(--fg-mute); font-size: .82rem; letter-spacing: .05em }
.results-count b { color: var(--gold); font-weight: 600; font-family: var(--f-display); font-size: 1.1rem; margin-right: .2rem }

/* ── Projects grid ── */
.projects-section { padding: 4rem 0 6rem }
.projects-grid {
  display: grid; grid-template-columns: repeat(12, 1fr); gap: 1.4rem;
  grid-auto-rows: minmax(140px, auto);
}
.project {
  position: relative; border-radius: var(--r-lg); overflow: hidden;
  background: #0a0a0a; cursor: pointer;
  transition: transform .4s ease, box-shadow .4s ease;
  isolation: isolate; min-height: 380px;
  display: flex; flex-direction: column;
}
.project:hover { transform: translateY(-6px); box-shadow: 0 30px 70px rgba(0,0,0,.7), 0 0 0 1px rgba(230,179,74,.25) }
.img-wrap { position: relative; flex: 1; min-height: 240px; overflow: hidden }
.img-wrap img {
  position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;
  transition: transform .8s ease, filter .4s ease;
  filter: saturate(.9) brightness(.85);
}
.project:hover .img-wrap img { transform: scale(1.07); filter: saturate(1.1) brightness(1) }
.img-wrap::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,.7) 100%);
  pointer-events: none;
}
.tags { position: absolute; left: 1rem; right: 1rem; bottom: 1rem; z-index: 2; display: flex; flex-wrap: wrap; gap: .35rem }
.tag { padding: .3rem .7rem; border-radius: 999px; background: rgba(0,0,0,.55); backdrop-filter: blur(8px); border: 1px solid rgba(230,179,74,.35); color: var(--gold); font-size: .68rem; font-weight: 600; letter-spacing: .06em }
.year-badge {
  position: absolute; top: 1rem; right: 1rem; z-index: 2;
  width: 54px; height: 54px; border-radius: 50%;
  background: rgba(0,0,0,.55); backdrop-filter: blur(10px); border: 1px solid rgba(230,179,74,.3);
  display: grid; place-items: center;
  font-family: var(--f-display); font-size: .9rem; color: var(--gold); line-height: 1; text-align: center; letter-spacing: .02em;
}
.body {
  padding: 1.4rem 1.6rem 1.6rem;
  background: rgba(255,255,255,.025);
  border-top: 1px solid rgba(255,255,255,.06);
  backdrop-filter: blur(10px);
}
.cat-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: .6rem }
.cat { color: var(--gold); font-size: .7rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase }
.client-sm { color: var(--fg-mute); font-size: .78rem }
.project h3 { font-family: var(--f-display); font-weight: 400; font-size: 1.6rem; letter-spacing: .02em; text-transform: uppercase; margin: 0 0 .3rem; color: #fff; transition: color .25s ease }
.project:hover h3 { color: var(--gold-2) }
.client { color: var(--fg-dim); font-size: .85rem; font-weight: 500; margin-bottom: .6rem }
.desc { color: var(--fg-mute); font-size: .88rem; line-height: 1.55; margin: 0 0 1.2rem; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden }
.view { display: inline-flex; align-items: center; gap: .5rem; color: var(--gold); font-size: .85rem; font-weight: 600; letter-spacing: .04em; transition: gap .25s ease }
.project:hover .view { gap: .85rem }

/* spans */
.span-tall  { grid-column: span 6; grid-row: span 2 }
.span-wide  { grid-column: span 6 }
.span-third { grid-column: span 4 }
.span-half  { grid-column: span 6 }

/* ── CTA ── */
.cta-section { padding: 4rem 0 6rem }
.cta-card {
  padding: 5rem 4rem; text-align: center; position: relative; overflow: hidden;
  background: radial-gradient(700px 400px at 50% 100%, rgba(230,179,74,.25), transparent 65%), var(--glass-bg-strong);
  display: flex; flex-direction: column; align-items: center;
}
.h-cta { font-size: clamp(2.4rem, 5vw, 4.4rem); margin-bottom: 1.5rem }
.cta-card .lead { margin: 0 auto 2.5rem; text-align: center; color: var(--fg-dim); font-size: 1.05rem; line-height: 1.75; max-width: 62ch }
.cta-btns { display: flex; flex-wrap: wrap; gap: .85rem; justify-content: center }

/* ── Signature ── */
.signature { text-align: center; padding: 4rem 0 1.5rem }
.sig-line { display: flex; align-items: center; gap: 1.5rem; justify-content: center; margin-bottom: .8rem }
.sig-line .h { width: 90px; height: 1px; background: linear-gradient(90deg,transparent,var(--gold)) }
.sig-line .h.right { background: linear-gradient(90deg,var(--gold),transparent) }
.sig-mark { width: 72px; height: 72px; object-fit: contain; filter: drop-shadow(0 0 14px rgba(230,179,74,.4)) }
.signature h3 { font-family: var(--f-display); font-size: 2rem; font-weight: 400; color: #fff; margin: .3rem 0 .2rem; letter-spacing: .02em }
.signature p { margin: 0; color: var(--gold); font-size: .85rem; letter-spacing: .22em; text-transform: uppercase }

/* ── Footer ── */
.foot { border-top: 1px solid rgba(255,255,255,.06); padding: 2rem 0; background: rgba(0,0,0,.4); margin-top: 2rem }
.foot .inner { max-width: 1280px; margin: 0 auto; padding: 0 32px; display: flex; flex-wrap: wrap; gap: 1.5rem; justify-content: space-between; align-items: center }
.foot nav { display: flex; gap: 1.4rem }
.foot nav a { font-size: .86rem; color: var(--fg-dim); transition: color .2s }
.foot nav a:hover { color: var(--gold) }
.foot small { font-size: .8rem; color: var(--fg-mute) }

/* ── Modal ── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(0,0,0,.92);
  display: flex;
}
.modal {
  width: 100%; height: 100%;
  max-width: none; max-height: none;
  border-radius: 0; overflow: hidden;
  background: linear-gradient(180deg, rgba(14,11,7,.98), rgba(6,6,6,1));
  position: relative; display: flex; flex-direction: column;
}
.modal-head {
  padding: .9rem 1.6rem; flex-shrink: 0;
  display: flex; align-items: center; justify-content: space-between; gap: 1rem;
  border-bottom: 1px solid rgba(255,255,255,.08);
  background: rgba(0,0,0,.3);
}
.modal-head h2 { font-family: var(--f-display); font-weight: 400; font-size: 1.4rem; letter-spacing: .04em; text-transform: uppercase; margin: 0; color: #fff }
.modal-client { color: var(--gold); font-size: .75rem; letter-spacing: .18em; text-transform: uppercase; margin-top: .15rem; font-weight: 600 }
.close-btn { width: 38px; height: 38px; border-radius: 50%; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.1); display: grid; place-items: center; color: #fff; transition: all .2s ease; flex-shrink: 0 }
.close-btn:hover { background: var(--gold); color: #1a1207; border-color: var(--gold); transform: rotate(90deg) }

.modal-body {
  flex: 1; overflow: hidden;
  display: flex; flex-direction: row;
  padding: 0;
}
.modal-body::-webkit-scrollbar { width: 6px }
.modal-body::-webkit-scrollbar-thumb { background: rgba(230,179,74,.3); border-radius: 4px }

.carousel {
  flex: 0 0 62%; display: flex; flex-direction: column;
  padding: 1.2rem 1.2rem 1.2rem 1.4rem;
  border-right: 1px solid rgba(255,255,255,.06);
  overflow: hidden;
}
.carousel-main { flex: 1; border-radius: 12px; overflow: hidden; background: #000; position: relative; border: 1px solid rgba(255,255,255,.05); min-height: 0 }
.carousel-main img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0; transition: opacity .4s ease }
.carousel-main img.active { opacity: 1 }
.car-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 44px; height: 44px; border-radius: 50%; background: rgba(0,0,0,.55); backdrop-filter: blur(8px); border: 1px solid rgba(230,179,74,.3); display: grid; place-items: center; color: #fff; transition: all .2s ease; z-index: 2 }
.car-btn:hover { background: var(--gold); color: #1a1207; border-color: var(--gold) }
.car-btn.prev { left: .8rem }
.car-btn.next { right: .8rem }
.car-counter { position: absolute; bottom: .8rem; left: 50%; transform: translateX(-50%); padding: .35rem .9rem; border-radius: 999px; background: rgba(0,0,0,.6); backdrop-filter: blur(8px); border: 1px solid rgba(230,179,74,.25); font-size: .75rem; color: var(--gold); font-weight: 600; letter-spacing: .1em }
.thumbs { display: flex; gap: .45rem; margin-top: .75rem; overflow-x: auto; padding-bottom: .25rem; flex-shrink: 0 }
.thumbs::-webkit-scrollbar { height: 4px }
.thumbs::-webkit-scrollbar-thumb { background: rgba(230,179,74,.3); border-radius: 2px }
.thumb { flex-shrink: 0; width: 68px; height: 68px; border-radius: 8px; overflow: hidden; border: 2px solid rgba(255,255,255,.08); transition: border-color .2s ease, transform .2s ease; cursor: pointer }
.thumb:hover { transform: translateY(-2px) }
.thumb.active { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(230,179,74,.15) }
.thumb img { width: 100%; height: 100%; object-fit: cover }

.details-grid {
  flex: 1; overflow-y: auto;
  display: flex; flex-direction: column; gap: 1.4rem;
  padding: 1.4rem 1.6rem;
}
.details-grid::-webkit-scrollbar { width: 6px }
.details-grid::-webkit-scrollbar-thumb { background: rgba(230,179,74,.2); border-radius: 4px }
.details-grid h4 { font-family: var(--f-display); font-weight: 400; font-size: 1rem; text-transform: uppercase; letter-spacing: .06em; color: #fff; margin: 0 0 .8rem }
.details-grid p.desc { color: var(--fg-dim); font-size: .92rem; line-height: 1.7; margin: 0 0 1rem }
.modal-tags { display: flex; flex-wrap: wrap; gap: .4rem }
.modal-tags span { padding: .3rem .75rem; border-radius: 999px; background: rgba(230,179,74,.1); color: var(--gold); border: 1px solid rgba(230,179,74,.3); font-size: .7rem; font-weight: 600; letter-spacing: .06em }
.info-list { display: grid; gap: .75rem }
.info-row { padding: .75rem .9rem; border-radius: 10px; background: rgba(255,255,255,.03); border: 1px solid rgba(255,255,255,.06) }
.info-row small { color: var(--fg-mute); font-size: .68rem; letter-spacing: .18em; text-transform: uppercase; font-weight: 600; display: block; margin-bottom: .2rem }
.info-row strong { font-family: var(--f-display); font-weight: 400; font-size: 1rem; color: #fff; letter-spacing: .02em }

/* ── Modal transition ── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity .25s ease }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0 }

/* ── Responsive ── */
@media (max-width: 1080px) {
  .hero .inner { grid-template-columns: 1fr; gap: 2.5rem; align-items: start }
  .span-tall, .span-wide, .span-third, .span-half { grid-column: span 6 }
  .stats { grid-template-columns: repeat(2,1fr); gap: 2rem }
  .stat + .stat::before { display: none }
  .modal-body { flex-direction: column }
  .carousel { flex: 0 0 50%; border-right: none; border-bottom: 1px solid rgba(255,255,255,.06) }
}
@media (max-width: 720px) {
  .back-btn { padding: .5rem .8rem; font-size: .75rem; top: 10px; left: 16px }
  .hero { padding: 7rem 0 4rem }
  .hero .inner { padding: 0 16px }
  .hero-meta-item { padding: .9rem 1rem }
  .hero-meta-item strong { font-size: 1rem }
  .filters-wrap { top: 58px !important }
  .filters { padding: 0 16px }
  .span-tall, .span-wide, .span-third, .span-half { grid-column: span 12 }
  .stats { grid-template-columns: 1fr 1fr; padding: 1.8rem; gap: 1.2rem }
  .cta-card { padding: 3rem 1.5rem }
  .modal-head { padding: .75rem 1rem }
  .modal-head h2 { font-size: 1.1rem }
  .carousel { padding: .8rem }
  .details-grid { padding: 1rem }
}
@media (max-width: 480px) {
  .hero-display { font-size: clamp(1.8rem, 7.5vw, 2.8rem) }
  .hero-meta-item strong { font-size: .88rem; word-break: break-word }
  .hero-meta-item small { font-size: .65rem }
  .filters { flex-direction: column; align-items: flex-start; gap: .4rem }
  .pill { padding: .45rem .9rem; font-size: .8rem }
  .results-count { font-size: .82rem }
}
</style>
