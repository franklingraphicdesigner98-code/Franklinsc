import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'Franklin Peña — Concept Studio | Branding, diseño y desarrollo a medida',
        description: 'Integramos branding, diseño, tecnología y fabricación digital para construir marcas con impacto.'
      }
    },
    {
      // Muestra el portafolio de casos de estudio de diseño (PortfolioDiseno.vue):
      // Montessia, CoRay Dev, Los Socios, etc. El meta describe ese contenido real,
      // aunque el slug de la URL diga "identidad-marca".
      path: '/identidad-marca',
      name: 'identidad-marca',
      component: () => import('../views/PortfolioDiseno.vue'),
      meta: {
        title: 'Portafolio de Diseño Gráfico | Franklin Peña Concept Studio',
        description: 'Identidades visuales únicas que comunican la esencia de cada marca, desde el concepto inicial hasta la implementación final.'
      }
    },
    {
      // Muestra las piezas y mockups de identidad de marca (IdentidadMarca.vue):
      // logotipo, papelería, menús, señalética, packaging, etc.
      path: '/diseno-grafico',
      name: 'diseno-grafico',
      component: () => import('../views/IdentidadMarca.vue'),
      meta: {
        title: 'Identidad de Marca | Franklin Peña Concept Studio',
        description: 'Sistemas visuales completos — estrategia, concepto y aplicación — para una identidad de marca coherente, memorable y confiable.'
      }
    },
    {
      path: '/diseno-empaques',
      name: 'diseno-empaques',
      component: () => import('../views/DisenoEmpaques.vue'),
      meta: {
        title: 'Diseño de Empaques | Franklin Peña Concept Studio',
        description: 'Packaging que protege, comunica y vende — desde la estructura y el troquel hasta el acabado gráfico final.'
      }
    },
    {
      path: '/impresion-3d',
      name: 'impresion-3d',
      component: () => import('../views/Impresion3D.vue'),
      meta: {
        title: 'Diseño e Impresión 3D | Franklin Peña Concept Studio',
        description: 'Modelamos, prototipamos e imprimimos piezas a medida — desde validaciones rápidas de diseño hasta producción de series cortas.'
      }
    },
    {
      path: '/comunicacion-corporativa',
      name: 'comunicacion-corporativa',
      component: () => import('../views/PortfolioComunicacion.vue'),
      meta: {
        title: 'Comunicación Corporativa y Marketing Digital | Franklin Peña Concept Studio',
        description: 'Estrategias de comunicación efectivas que fortalecen tu presencia corporativa y conectan con tu audiencia.'
      }
    },
    {
      path: '/consultoria-digital',
      name: 'consultoria-digital',
      component: () => import('../views/PortfolioConsultoria.vue'),
      meta: {
        title: 'Consultoría Digital | Franklin Peña Concept Studio',
        description: 'Estrategias digitales que transforman negocios y optimizan procesos, con decisiones basadas en datos.'
      }
    },
    {
      path: '/desarrollo-software',
      name: 'desarrollo-software',
      component: () => import('../views/PortfolioDesarrollo.vue'),
      meta: {
        title: 'Desarrollo de Software a Medida | Franklin Peña Concept Studio',
        description: 'Productos digitales a medida, desde sitios web hasta plataformas completas — código limpio y resultados que impulsan tu negocio.'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0, behavior: 'smooth' }
  }
})

// Safety net: some views lock body scroll while a modal is open
// (document.body.style.overflow = 'hidden'). If the user navigates away
// without closing the modal (e.g. clicking the fixed "Volver" button,
// which sits above the modal overlay), that lock would otherwise persist
// forever and freeze scrolling on every page after.
router.afterEach(() => {
  document.body.style.overflow = ''
})

export default router