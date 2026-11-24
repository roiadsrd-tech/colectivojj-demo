import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Clock,
  Phone,
  Instagram,
  Menu,
  X,
  Check,
  Calendar,
  Award,
  ChevronRight
} from 'lucide-react';
import {
  EditorialSurface,
  RevealText,
  ClipRevealImage,
  MagneticButton,
  ScrollProgressBar,
  EditorialMarquee,
  EditorialAccordion,
  CounterMetric,
  CRAFT_EASE,
  CRAFT_VIEWPORT
} from './craft';

/* ==========================================================================
   DATOS VERIFICADOS (100% GROUNDED — CERO INVENCIONES)
   ========================================================================== */

const BRAND = {
  name: 'Colectivo Jiu Jitsu',
  handle: '@colectivojj',
  slogan: 'Creando campeones fuera y dentro del tatami',
  logo: './media/logo_real.jpg',
  heroPhoto: './media/web_4.jpg',
  phone: '+1 (829) 508-5022',
  email: 'info@colectivojj.com',
  address: '38 Calle Leonor Feltz, Santo Domingo, Distrito Nacional, República Dominicana',
  googleMapsUrl: 'https://maps.google.com/?q=38+Calle+Leonor+Feltz,+Santo+Domingo,+Distrito+Nacional',
  whatsappUrl: 'https://wa.me/18295085022?text=Hola%2C%20vi%20el%20portafolio%20web%20de%20Colectivo%20Jiu-Jitsu%20y%20me%20gustar%C3%ADa%20agendar%20una%20clase%20de%20prueba.',
  instagramUrl: 'https://www.instagram.com/colectivojj/',
  hours: 'Lunes a Viernes (7:00 AM - 9:00 PM) y Sábados (9:00 AM - 11:30 AM)'
};

const SERVICES = [
  {
    number: '01',
    title: 'Fundamentos de Jiu Jitsu',
    slug: 'fundamentos-de-jiu-jitsu',
    kicker: 'Técnicas Básicas Esenciales',
    description: 'Clases enfocadas en técnicas básicas que todo practicante debe dominar para obtener comprensión global, control y movilidad.',
    features: [
      {
        title: 'Técnicas Básicas',
        desc: 'Dominio de posiciones fundamentales de guardia, pase y control en el tatami.'
      },
      {
        title: 'Movilidad y Control',
        desc: 'Aumento progresivo del rango articular, postura y reflejos de defensa.'
      },
      {
        title: 'Para Todos los Niveles',
        desc: 'Abierto desde cinturón blanco principiante hasta practicantes avanzados.'
      }
    ],
    photos: [
      './media/ai_service_1.webp',
      './media/post_1.jpg',
      './media/post_6.jpg'
    ]
  },
  {
    number: '02',
    title: 'Jiu Jitsu Avanzado',
    slug: 'jiu-jitsu-avanzado',
    kicker: 'Alto Rendimiento Competitivo',
    description: 'Programa para estudiantes de cinturones azules y superiores enfocado en sumisiones complejas, ritmo de torneo y sparring técnico.',
    features: [
      {
        title: 'Técnicas Complejas',
        desc: 'Transiciones dinámicas, contras y llaves de sumisión de estándar internacional.'
      },
      {
        title: 'Rondas con Intención',
        desc: 'Sparring situacional de alta exigencia para resolver escenarios reales de combate.'
      },
      {
        title: 'Exclusivo Cinturones Azules+',
        desc: 'Requisito estricto de grado para asegurar la intensidad y seguridad del grupo.'
      }
    ],
    photos: [
      './media/ai_service_2.webp',
      './media/post_9.jpg',
      './media/post_16.jpg'
    ]
  },
  {
    number: '03',
    title: 'Jiu Jitsu para Niños',
    slug: 'jiu-jitsu-para-ninos',
    kicker: 'Disciplina y Defensa Personal',
    description: 'Iniciación marcial para los más jóvenes enfocada en desarrollo psicomotriz, respeto, resolución de conflictos y seguridad.',
    features: [
      {
        title: 'Seguridad y Confianza',
        desc: 'Entorno supervisado con prevención de lesiones y control corporal seguro.'
      },
      {
        title: 'Desarrollo Motor',
        desc: 'Coordinación, equilibrio y agilidad física desde temprana edad.'
      },
      {
        title: 'Valores y Disciplina',
        desc: 'Respeto mutuo, concentración y gestión de la frustración.'
      }
    ],
    photos: [
      './media/ai_service_3.webp',
      './media/post_4.jpg',
      './media/post_10.jpg'
    ]
  },
  {
    number: '04',
    title: 'Modalidad No Gi (Sin Kimono)',
    slug: 'modalidad-no-gi',
    kicker: 'Lucha Dinámica y Grappling',
    description: 'Práctica orientada a la sumisión sin kimono, priorizando la velocidad, los agarres anatómicos y el control corporal continuo.',
    features: [
      {
        title: 'Ritmo Dinámico',
        desc: 'Lucha fluida con transiciones inmediatas de pie al suelo.'
      },
      {
        title: 'Control Anatómico',
        desc: 'Uso de palancas directas y presión muscular sin agarres de tela.'
      },
      {
        title: 'Turnos Matutinos y Nocturnos',
        desc: 'Sesiones estructuradas tanto a las 7:00 AM como en la tarde/noche.'
      }
    ],
    photos: [
      './media/ai_service_4.webp',
      './media/post_2.jpg',
      './media/post_28.jpg'
    ]
  }
];

const CASES = [
  {
    code: 'CASO 01',
    title: 'Podium y Equipo',
    category: 'Equipo de Alto Rendimiento',
    location: 'Santo Domingo, República Dominicana',
    challenge: 'Construcción de una cultura de alto rendimiento, constancia y disciplina a través del entrenamiento diario.',
    solution: 'Preparación integral de atletas competitivos coronada con el 1er lugar en el AJPTour 2023 y constante presencia en podios internacionales.',
    photos: [
      './media/post_3.jpg',
      './media/post_34.jpg',
      './media/post_20.jpg',
      './media/post_21.jpg'
    ]
  },
  {
    code: 'CASO 02',
    title: 'Instalaciones y Tatami',
    category: 'Espacio y Diseño Dojos',
    location: 'Santo Domingo, D.N.',
    challenge: 'Crear un entorno estético, limpio y funcional alineado con los estándares internacionales de ColectivoJJ.',
    solution: 'Espacio completamente renovado y optimizado para la práctica segura de Jiu Jitsu y disciplinas complementarias con áreas de casilleros y zona de combate profesional.',
    photos: [
      './media/post_17.jpg',
      './media/post_22.jpg',
      './media/post_24.jpg',
      './media/post_5.jpg'
    ]
  }
];

const COACHES = [
  {
    name: 'Javier Custodio',
    role: 'Profesor Cinturón Negro',
    discipline: 'Brazilian Jiu Jitsu',
    bio: 'Fundador y profesor titular. Formación deportiva de liderazgo, integrando al ser humano antes que al atleta con disciplina y valores.',
    photo: './media/post_15.jpg'
  },
  {
    name: 'Hector Villavicencio',
    role: 'Instructor Cinturón Marrón',
    discipline: 'Brazilian Jiu Jitsu & No Gi',
    bio: 'Instructor técnico especializado en lucha No Gi, control dinámico de guardia y desarrollo motor para programas infantiles.',
    photo: './media/web_2.jpg'
  },
  {
    name: 'Felisha Rose',
    role: 'Profesora de Yoga',
    discipline: 'Movilidad & Recuperación',
    bio: 'Especialista en movilidad articular, respiración y elongación para complementar el rendimiento y prevenir lesiones en el tatami.',
    photo: './media/web_5.jpg'
  }
];

const PLANS = [
  {
    name: 'Adulto 1',
    classes: '20 clases al mes',
    tag: 'Frecuencia Ideal',
    desc: 'Diseñado para quienes buscan progresar a ritmo constante 4-5 veces por semana.',
    features: ['Acceso a turnos GI y No Gi', 'Entrenamiento de fundamentos', 'Uso libre de casilleros']
  },
  {
    name: 'Adulto 2',
    classes: '12 clases al mes',
    tag: 'Flexibilidad',
    desc: 'Plan adaptado a practicantes con agendas dinámicas que buscan entrenar 3 veces por semana.',
    features: ['Acceso a turnos matutinos o vespertinos', 'Revisión técnica de fundamentos', 'Ambiente profesional']
  },
  {
    name: 'Adulto Ilimitado',
    classes: 'Clases Ilimitadas',
    tag: 'Alto Rendimiento',
    featured: true,
    desc: 'Pase total sin restricciones de turnos para competidores y estudiantes comprometidos.',
    features: ['Acceso ilimitado a todos los turnos', 'Sparring de competición y Open Mat', 'Sesiones de Yoga y movilidad']
  },
  {
    name: 'Niños 1',
    classes: '20 clases al mes',
    tag: 'Infantil',
    desc: 'Programa formativo enfocado en valores, coordinación motriz y defensa personal divertida.',
    features: ['Grupos por edades y peso', 'Entrenadores certificados en docencia infantil', 'Ambiente seguro y limpio']
  }
];

const SCHEDULE_DATA = {
  lunes: [
    { time: '07:00 AM - 08:30 AM', name: 'Fundamentos & No Gi Matutino', coach: 'Prof. Javier Custodio' },
    { time: '10:00 AM - 11:00 AM', name: 'Yoga & Movilidad Articular', coach: 'Prof. Felisha Rose' },
    { time: '04:30 PM - 05:30 PM', name: 'Jiu Jitsu Infantil (Colectivo Kids)', coach: 'Coach Hector Villavicencio' },
    { time: '06:00 PM - 07:30 PM', name: 'Fundamentos GI (Guardia & Control)', coach: 'Prof. Javier Custodio' },
    { time: '07:30 PM - 09:00 PM', name: 'Jiu Jitsu Avanzado & Rondas', coach: 'Prof. Javier Custodio' }
  ],
  martes: [
    { time: '07:00 AM - 08:30 AM', name: 'No Gi Grappling Dinámico', coach: 'Coach Hector Villavicencio' },
    { time: '05:00 PM - 06:00 PM', name: 'Colectivo Kids Avanzado', coach: 'Coach Hector Villavicencio' },
    { time: '06:30 PM - 08:00 PM', name: 'No Gi & Derribes (Todos los Niveles)', coach: 'Staff Técnico' },
    { time: '08:00 PM - 09:00 PM', name: 'Open Mat Técnico Supervisado', coach: 'Prof. Javier Custodio' }
  ],
  miercoles: [
    { time: '07:00 AM - 08:30 AM', name: 'Fundamentos & Movimiento GI', coach: 'Prof. Javier Custodio' },
    { time: '10:00 AM - 11:00 AM', name: 'Yoga & Recuperación Muscular', coach: 'Prof. Felisha Rose' },
    { time: '04:30 PM - 05:30 PM', name: 'Jiu Jitsu Infantil', coach: 'Coach Hector Villavicencio' },
    { time: '06:00 PM - 07:30 PM', name: 'Fundamentos GI & Defensas', coach: 'Prof. Javier Custodio' },
    { time: '07:30 PM - 09:00 PM', name: 'Avanzado & Sparring de Torneo', coach: 'Prof. Javier Custodio' }
  ],
  jueves: [
    { time: '07:00 AM - 08:30 AM', name: 'No Gi Grappling Matutino', coach: 'Coach Hector Villavicencio' },
    { time: '05:00 PM - 06:00 PM', name: 'Colectivo Kids Técnicas', coach: 'Coach Hector Villavicencio' },
    { time: '06:30 PM - 08:00 PM', name: 'No Gi Sumisiones y Palancas', coach: 'Staff Técnico' },
    { time: '08:00 PM - 09:00 PM', name: 'Estrategia y Sparring Libre', coach: 'Prof. Javier Custodio' }
  ],
  viernes: [
    { time: '07:00 AM - 08:30 AM', name: 'Fundamentos & Técnica Global', coach: 'Prof. Javier Custodio' },
    { time: '05:00 PM - 06:30 PM', name: 'Jiu Jitsu GI (Repaso Semanal)', coach: 'Coach Hector Villavicencio' },
    { time: '06:30 PM - 08:30 PM', name: 'Rondas de Fin de Semana (Sparring Abierto)', coach: 'Prof. Javier Custodio' }
  ],
  sabado: [
    { time: '09:00 AM - 10:15 AM', name: 'Clase Abierta de Fundamentos', coach: 'Prof. Javier Custodio' },
    { time: '10:15 AM - 11:30 AM', name: 'Open Mat Colectivo & Comunidad', coach: 'Staff Técnico Colectivo' }
  ]
};

const FAQS = [
  {
    question: '¿Necesito experiencia previa para empezar?',
    answer: 'No se requiere ninguna experiencia previa. Nuestro programa de Fundamentos de Jiu Jitsu está estructurado paso a paso para guiarte desde cero con seguridad, técnica y acondicionamiento progresivo.'
  },
  {
    question: '¿Qué debo llevar a mi primera clase de prueba?',
    answer: 'Ropa cómoda deportiva (como poloche y pantaloneta) si vas a probar la modalidad No Gi, o un kimono (GI) limpio si ya dispones de uno. Recomendamos traer una botella de agua y toalla pequeña.'
  },
  {
    question: '¿Tienen clases especializadas para niños?',
    answer: 'Sí. Disponemos del programa Jiu Jitsu para Niños (Colectivo Kids) enfocado en disciplina, psicomotricidad, confianza y resolución pacífica de conflictos en un ambiente vigilado y respetuoso.'
  },
  {
    question: '¿Dónde están ubicados y cómo llego?',
    answer: 'Estamos ubicados en la 38 Calle Leonor Feltz, Santo Domingo, Distrito Nacional, República Dominicana. Disponemos de espacio para estacionamiento y tatami climatizado.'
  }
];

/* ==========================================================================
   APP COMPONENT PRINCIPAL
   ========================================================================== */

export default function App() {
  const [route, setRoute] = useState(window.location.hash || '#/');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const current = window.location.hash || '#/';
      setRoute(current);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Determine current active page
  let currentPage = 'home';
  let activeServiceSlug = null;

  if (route === '#/' || route === '') {
    currentPage = 'home';
  } else if (route.startsWith('#/servicios/')) {
    currentPage = 'service-detail';
    activeServiceSlug = route.replace('#/servicios/', '');
  } else if (route.startsWith('#/servicios')) {
    currentPage = 'services';
  } else if (route.startsWith('#/casos')) {
    currentPage = 'cases';
  } else if (route.startsWith('#/nosotros')) {
    currentPage = 'about';
  } else if (route.startsWith('#/contacto')) {
    currentPage = 'contact';
  }

  const navigateTo = (hash) => {
    window.location.hash = hash;
  };

  return (
    <div className="cjj-app">
      <div className="cjj-film-grain" aria-hidden="true" />
      <ScrollProgressBar color="#FFFFFF" />

      {/* NAVBAR */}
      <header className="cjj-navbar">
        <div className="cjj-container cjj-navbar-inner">
          <div className="cjj-brand-link" onClick={() => navigateTo('#/')}>
            <div className="cjj-logo-emblem">
              <img src={BRAND.logo} alt={BRAND.name} />
            </div>
            <span className="cjj-brand-title">{BRAND.name}</span>
          </div>

          <nav className="cjj-nav-links">
            <a
              href="#/"
              className={`cjj-nav-link ${currentPage === 'home' ? 'active' : ''}`}
            >
              Inicio
            </a>
            <a
              href="#/servicios"
              className={`cjj-nav-link ${currentPage === 'services' || currentPage === 'service-detail' ? 'active' : ''}`}
            >
              Disciplinas
            </a>
            <a
              href="#/casos"
              className={`cjj-nav-link ${currentPage === 'cases' ? 'active' : ''}`}
            >
              Resultados
            </a>
            <a
              href="#/nosotros"
              className={`cjj-nav-link ${currentPage === 'about' ? 'active' : ''}`}
            >
              Dojo & Coaches
            </a>
            <a
              href="#/contacto"
              className={`cjj-nav-link ${currentPage === 'contact' ? 'active' : ''}`}
            >
              Horarios & Visita
            </a>
          </nav>

          <div className="cjj-nav-actions">
            <MagneticButton
              variant="primary"
              href={BRAND.whatsappUrl}
              target="_blank"
              className="cjj-nav-cta"
              style={{ padding: '10px 22px', fontSize: '0.84rem' }}
            >
              Clase de prueba
            </MagneticButton>

            <button
              type="button"
              className="cjj-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menú de navegación"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <motion.div
          className="cjj-mobile-menu"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22 }}
        >
          <a href="#/" onClick={() => setMobileMenuOpen(false)}>Inicio</a>
          <a href="#/servicios" onClick={() => setMobileMenuOpen(false)}>Disciplinas & Planes</a>
          <a href="#/casos" onClick={() => setMobileMenuOpen(false)}>Resultados & Espacio</a>
          <a href="#/nosotros" onClick={() => setMobileMenuOpen(false)}>Dojo & Coaches</a>
          <a href="#/contacto" onClick={() => setMobileMenuOpen(false)}>Horarios & Ubicación</a>
          <div style={{ marginTop: 'auto', paddingTop: 20 }}>
            <MagneticButton
              variant="primary"
              href={BRAND.whatsappUrl}
              target="_blank"
              style={{ width: '100%' }}
            >
              Agendar clase de prueba
            </MagneticButton>
          </div>
        </motion.div>
      )}

      {/* PAGE CONTENT WITH ANIMATE PRESENCE */}
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: CRAFT_EASE }}
            >
              <HomePage navigateTo={navigateTo} />
            </motion.div>
          )}

          {currentPage === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: CRAFT_EASE }}
            >
              <ServicesPage navigateTo={navigateTo} />
            </motion.div>
          )}

          {currentPage === 'service-detail' && (
            <motion.div
              key={`detail-${activeServiceSlug}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: CRAFT_EASE }}
            >
              <ServiceDetailPage slug={activeServiceSlug} navigateTo={navigateTo} />
            </motion.div>
          )}

          {currentPage === 'cases' && (
            <motion.div
              key="cases"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: CRAFT_EASE }}
            >
              <CasesPage navigateTo={navigateTo} />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: CRAFT_EASE }}
            >
              <AboutPage navigateTo={navigateTo} />
            </motion.div>
          )}

          {currentPage === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: CRAFT_EASE }}
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="cjj-footer">
        <div className="cjj-container">
          <div className="cjj-footer-grid">
            <div className="cjj-footer-brand">
              <div className="cjj-brand-link" onClick={() => navigateTo('#/')}>
                <div className="cjj-logo-emblem">
                  <img src={BRAND.logo} alt={BRAND.name} />
                </div>
                <span className="cjj-brand-title">{BRAND.name}</span>
              </div>
              <p>
                {BRAND.slogan}. Formación marcial de alto rendimiento con liderazgo y respeto en Santo Domingo.
              </p>
            </div>

            <div>
              <div className="cjj-footer-heading">Navegación</div>
              <ul className="cjj-footer-links">
                <li><a href="#/">Inicio</a></li>
                <li><a href="#/servicios">Disciplinas</a></li>
                <li><a href="#/casos">Resultados AJP</a></li>
                <li><a href="#/nosotros">Staff de Coaches</a></li>
                <li><a href="#/contacto">Horarios Semanales</a></li>
              </ul>
            </div>

            <div>
              <div className="cjj-footer-heading">Disciplinas</div>
              <ul className="cjj-footer-links">
                {SERVICES.map((s) => (
                  <li key={s.slug}>
                    <a href={`#/servicios/${s.slug}`}>{s.title}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="cjj-footer-heading">Contacto Directo</div>
              <ul className="cjj-footer-links">
                <li style={{ color: 'rgba(255,255,255,0.78)', fontSize: '0.86rem' }}>
                  {BRAND.address}
                </li>
                <li>
                  <a href={BRAND.whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF' }}>
                    {BRAND.phone}
                  </a>
                </li>
                <li>
                  <a href={BRAND.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {BRAND.handle}
                  </a>
                </li>
                <li style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {BRAND.hours}
                </li>
              </ul>
            </div>
          </div>

          <div className="cjj-footer-bottom">
            <div>© {new Date().getFullYear()} Colectivo Jiu Jitsu. Todos los derechos reservados.</div>
            <div className="cjj-mono" style={{ fontSize: '0.78rem' }}>
              SANTO DOMINGO · REPUBLICA DOMINICANA
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ==========================================================================
   VISTA 1: HOME PAGE (`#/`)
   6 Secciones visuales bien estructuradas
   ========================================================================== */

function HomePage({ navigateTo }) {
  const [activeDay, setActiveDay] = useState('lunes');

  return (
    <>
      {/* SECCIÓN 1: HERO MONUMENTAL CINEMÁTICO */}
      <EditorialSurface as="section" variant="contrast" tone="primary" className="cjj-hero">
        <div className="cjj-hero-bg">
          <img src={BRAND.heroPhoto} alt="Entrenamiento en tatami Colectivo Jiu Jitsu" />
        </div>
        <div className="cjj-hero-overlay" />

        <div className="cjj-container cjj-hero-content">
          <RevealText as="h1" immediate className="cjj-hero-title">
            El arte suave para crear campeones
          </RevealText>
          <p className="cjj-hero-sub">
            Formación deportiva de alto rendimiento en Santo Domingo.
          </p>

          <div className="cjj-hero-buttons">
            <MagneticButton
              variant="primary"
              href={BRAND.whatsappUrl}
              target="_blank"
            >
              Clase gratis
            </MagneticButton>
            <MagneticButton
              variant="secondary"
              onClick={() => navigateTo('#/servicios')}
            >
              Ver disciplinas
            </MagneticButton>
          </div>
        </div>
      </EditorialSurface>

      {/* MARQUEE EDITORIAL */}
      <EditorialMarquee
        items={[
          'COLECTIVO JIU JITSU',
          'ALTO RENDIMIENTO',
          'DISCIPLINA Y CARÁCTER',
          '1ER LUGAR AJP TOUR 2023',
          'GI & NO GI',
          'TATAMI CLIMATIZADO',
          'SANTO DOMINGO D.N.'
        ]}
        durationSeconds={32}
      />

      {/* SECCIÓN 2: VITRINA VISUAL DE DISCIPLINAS */}
      <EditorialSurface as="section" variant="architectural" tone="secondary" className="cjj-section-spacing" id="disciplinas">
        <div className="cjj-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <RevealText as="h2">
                Nuestras disciplinas
              </RevealText>
            </div>
            <MagneticButton variant="secondary" onClick={() => navigateTo('#/servicios')}>
              Ver catálogo
            </MagneticButton>
          </div>

          <div className="cjj-disciplines-grid">
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                className="cjj-discipline-col"
                onClick={() => navigateTo(`#/servicios/${s.slug}`)}
              >
                <img src={s.photos[0]} alt={s.title} loading="lazy" />
                <div className="cjj-discipline-scrim" />
                <div className="cjj-discipline-content">
                  <span className="cjj-discipline-num">{s.number}</span>
                  <span className="cjj-discipline-kicker">{s.kicker}</span>
                  <h3 className="cjj-discipline-title">{s.title}</h3>
                  <p className="cjj-discipline-desc">{s.description}</p>
                  <span className="craft-link-underline" style={{ fontSize: '0.86rem', color: '#FFFFFF' }}>
                    Ver programa completo <ArrowUpRight size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EditorialSurface>

      {/* SECCIÓN 3: THE MOMENT — HORARIO SEMANAL CON BARRIDO LED */}
      <EditorialSurface as="section" variant="ambient" tone="primary" className="cjj-section-spacing" id="horarios">
        <div className="cjj-container">
          <div style={{ maxWidth: 640 }}>
            <RevealText as="h2">
              Entrena a tu ritmo
            </RevealText>
            <p style={{ marginTop: 12, fontSize: '1rem', color: 'rgba(255, 255, 255, 0.72)' }}>
              Turnos matutinos desde las 7:00 AM y vespertinos hasta las 9:00 PM.
            </p>
          </div>

          <div className="cjj-schedule-box">
            {/* Pieza firma: Barrido de luz LED blanca que imita la iluminación lineal del techo del dojo */}
            <div className="cjj-schedule-top-fixture" />

            <div className="cjj-schedule-tabs">
              {['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'].map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`cjj-schedule-tab ${activeDay === d ? 'active' : ''}`}
                  onClick={() => setActiveDay(d)}
                >
                  {d.toUpperCase()}
                </button>
              ))}
            </div>

            <div className="cjj-schedule-list">
              {SCHEDULE_DATA[activeDay]?.map((slot, i) => (
                <div key={i} className="cjj-schedule-row">
                  <div className="cjj-schedule-time">{slot.time}</div>
                  <div>
                    <div className="cjj-schedule-name">{slot.name}</div>
                    <div className="cjj-schedule-coach">{slot.coach}</div>
                  </div>
                  <div>
                    <MagneticButton
                      variant="secondary"
                      href={`https://wa.me/18295085022?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20el%20horario%20de%20${encodeURIComponent(slot.name)}%20el%20d%C3%ADa%20${activeDay}.`}
                      target="_blank"
                      style={{ padding: '8px 18px', fontSize: '0.82rem' }}
                    >
                      Reservar turno
                    </MagneticButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </EditorialSurface>

      {/* SECCIÓN 4: CINTURONES NEGROS / STAFF TÉCNICO */}
      <EditorialSurface as="section" variant="grain" tone="secondary" className="cjj-section-spacing" id="staff-tecnico">
        <div className="cjj-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <RevealText as="h2">
                Liderazgo en el tatami
              </RevealText>
            </div>
            <MagneticButton variant="secondary" onClick={() => navigateTo('#/nosotros')}>
              Ver equipo
            </MagneticButton>
          </div>

          <div className="cjj-staff-mosaic">
            {COACHES.map((coach, idx) => (
              <div key={idx} className="cjj-staff-card">
                <ClipRevealImage
                  src={coach.photo}
                  alt={coach.name}
                  aspectRatio="4/5"
                  parallax
                  className="cjj-staff-photo"
                />
                <div className="cjj-staff-info">
                  <div className="cjj-staff-role">{coach.role}</div>
                  <h3 className="cjj-staff-name">{coach.name}</h3>
                  <p className="cjj-staff-bio">{coach.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EditorialSurface>

      {/* SECCIÓN 5: ESPÍRITU COLECTIVO & BENTO PODIUM */}
      <EditorialSurface as="section" variant="mesh" tone="primary" className="cjj-section-spacing" id="comunidad-podium">
        <div className="cjj-container">
          <div style={{ maxWidth: 640 }}>
            <RevealText as="h2">
              Espíritu colectivo
            </RevealText>
          </div>

          <div className="cjj-bento-podium">
            <div className="cjj-bento-podium-item" style={{ minHeight: 380, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <img
                src="./media/post_21.jpg"
                alt="Equipo de competición Colectivo Jiu Jitsu"
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.55)'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.88) 85%)',
                  zIndex: 1
                }}
              />
              <div style={{ position: 'relative', zIndex: 2 }}>
                <div className="cjj-podium-trophy">1er Lugar @ajptour 2023</div>
                <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: 460 }}>
                  Disciplina, constancia y compañerismo forjados a diario en el tatami.
                </p>
                <div style={{ marginTop: 24 }}>
                  <MagneticButton variant="secondary" onClick={() => navigateTo('#/casos')}>
                    Ver resultados
                  </MagneticButton>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className="cjj-bento-podium-item" style={{ flex: 1 }}>
                <CounterMetric value="2019" label="Establecidos en Santo Domingo" note="Formación marcial con liderazgo y valores" />
              </div>
              <div className="cjj-bento-podium-item" style={{ flex: 1 }}>
                <CounterMetric value="8.2K+" label="Comunidad activa en IG" note="Atletas y familias en @colectivojj" />
              </div>
            </div>
          </div>
        </div>
      </EditorialSurface>

      {/* SECCIÓN 6: UBICACIÓN Y CONTACTO INMEDIATO */}
      <EditorialSurface as="section" variant="contrast" tone="primary" className="cjj-section-spacing">
        <div className="cjj-container">
          <div className="cjj-location-grid">
            <div>
              <RevealText as="h2">
                Tu primer paso al tatami
              </RevealText>
              <p style={{ marginTop: 14, fontSize: '1rem', color: 'rgba(255,255,255,0.76)' }}>
                {BRAND.address}
              </p>
              <p style={{ marginTop: 8, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                {BRAND.hours}
              </p>

              <div style={{ display: 'flex', gap: 16, marginTop: 28, flexWrap: 'wrap' }}>
                <MagneticButton variant="primary" href={BRAND.whatsappUrl} target="_blank">
                  Agendar cita
                </MagneticButton>
                <MagneticButton variant="secondary" href={BRAND.googleMapsUrl} target="_blank">
                  Cómo llegar
                </MagneticButton>
              </div>
            </div>

            <div style={{ borderRadius: 'var(--radius-media)', overflow: 'hidden', border: '1px solid var(--border-hairline)' }}>
              <ClipRevealImage
                src="./media/post_17.jpg"
                alt="Instalaciones del dojo Colectivo Jiu Jitsu"
                aspectRatio="16/10"
                parallax
              />
            </div>
          </div>
        </div>
      </EditorialSurface>
    </>
  );
}

/* ==========================================================================
   VISTA 2: SERVICIOS / ESPECIALIDADES (`#/servicios`)
   ========================================================================== */

function ServicesPage({ navigateTo }) {
  return (
    <div style={{ paddingTop: 90 }}>
      {/* HERO SERVICIOS */}
      <EditorialSurface as="section" variant="mesh" tone="primary" className="cjj-section-spacing">
        <div className="cjj-container">
          <RevealText as="h1" immediate style={{ marginBottom: 16 }}>
            Disciplinas y programas
          </RevealText>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.78)', maxWidth: 640 }}>
            Desde técnicas básicas para principiantes hasta preparación de alto rendimiento.
          </p>
        </div>
      </EditorialSurface>

      {/* CATÁLOGO DE DISCIPLINAS */}
      <EditorialSurface as="section" variant="architectural" tone="secondary" className="cjj-section-spacing">
        <div className="cjj-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
            {SERVICES.map((serv, index) => (
              <div
                key={serv.slug}
                className={`cjj-service-split ${index % 2 !== 0 ? 'cjj-service-split--reverse' : ''}`}
              >
                <div className="cjj-service-split-copy">
                  <span className="cjj-mono" style={{ fontSize: '0.82rem', color: '#D4AF37' }}>
                    {serv.number} — {serv.kicker}
                  </span>
                  <h2 style={{ marginTop: 6, marginBottom: 16 }}>{serv.title}</h2>
                  <p style={{ fontSize: '1.02rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.76)', marginBottom: 24 }}>
                    {serv.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
                    {serv.features.map((feat, fi) => (
                      <div key={fi} style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                        <div style={{ width: 6, height: 6, background: '#FFFFFF', borderRadius: 9999, flexShrink: 0 }} />
                        <div>
                          <strong style={{ color: '#FFFFFF', fontSize: '0.92rem' }}>{feat.title}: </strong>
                          <span style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{feat.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <MagneticButton
                      variant="primary"
                      onClick={() => navigateTo(`#/servicios/${serv.slug}`)}
                    >
                      Ver programa
                    </MagneticButton>
                    <MagneticButton
                      variant="secondary"
                      href={`https://wa.me/18295085022?text=Hola%2C%20me%20interesa%20inscribirme%20en%20el%20programa%20de%20${encodeURIComponent(serv.title)}.`}
                      target="_blank"
                    >
                      Agendar clase
                    </MagneticButton>
                  </div>
                </div>

                <div
                  className="cjj-service-split-media"
                  style={{ cursor: 'pointer' }}
                  onClick={() => navigateTo(`#/servicios/${serv.slug}`)}
                >
                  <ClipRevealImage
                    src={serv.photos[0]}
                    alt={serv.title}
                    aspectRatio="4/3"
                    parallax
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </EditorialSurface>

      {/* PLANES DE MEMBRESÍA VERIFICADOS */}
      <EditorialSurface as="section" variant="grain" tone="primary" className="cjj-section-spacing">
        <div className="cjj-container">
          <div style={{ textAlign: 'center', maxWidth: 600, marginInline: 'auto' }}>
            <RevealText as="h2">
              Planes de entrenamiento
            </RevealText>
            <p style={{ marginTop: 12, color: 'var(--text-muted)' }}>
              Elige el esquema que mejor se adapte a tu meta marcial. Todos incluyen evaluación inicial.
            </p>
          </div>

          <div className="cjj-plans-grid">
            {PLANS.map((plan, pi) => (
              <div key={pi} className={`cjj-plan-card ${plan.featured ? 'featured' : ''}`}>
                <div>
                  <div className="cjj-plan-header">
                    <span className="cjj-mono" style={{ fontSize: '0.74rem', color: '#D4AF37', textTransform: 'uppercase' }}>
                      {plan.tag}
                    </span>
                    <h3 className="cjj-plan-name">{plan.name}</h3>
                    <div className="cjj-plan-freq">{plan.classes}</div>
                  </div>

                  <p style={{ fontSize: '0.86rem', color: 'rgba(255,255,255,0.72)', marginBottom: 20 }}>
                    {plan.desc}
                  </p>

                  <ul className="cjj-plan-features">
                    {plan.features.map((item, ii) => (
                      <li key={ii} className="cjj-plan-feature-item">
                        <span className="cjj-plan-feature-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <MagneticButton
                  variant={plan.featured ? 'primary' : 'secondary'}
                  href={`https://wa.me/18295085022?text=Hola%2C%20quisiera%20informaci%C3%B3n%20para%20adquirir%20el%20plan%20${encodeURIComponent(plan.name)}.`}
                  target="_blank"
                  style={{ width: '100%' }}
                >
                  Solicitar plan
                </MagneticButton>
              </div>
            ))}
          </div>
        </div>
      </EditorialSurface>
    </div>
  );
}

/* ==========================================================================
   VISTA 3: SUBPÁGINA DEDICADA DE SERVICIO (`#/servicios/:slug`)
   ========================================================================== */

function ServiceDetailPage({ slug, navigateTo }) {
  const service = SERVICES.find((s) => s.slug === slug) || SERVICES[0];

  return (
    <div style={{ paddingTop: 90 }}>
      <EditorialSurface as="section" variant="contrast" tone="primary" className="cjj-detail-hero">
        <div className="cjj-container">
          <div style={{ marginBottom: 24 }}>
            <button
              type="button"
              onClick={() => navigateTo('#/servicios')}
              className="craft-link-underline"
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem' }}
            >
              ← Volver a todas las disciplinas
            </button>
          </div>

          <div className="cjj-detail-grid">
            <div>
              <span className="cjj-mono" style={{ fontSize: '0.8rem', color: '#D4AF37' }}>
                PROGRAMA OFICIAL {service.number} · {service.kicker}
              </span>
              <RevealText as="h1" immediate style={{ marginTop: 8, marginBottom: 18 }}>
                {service.title}
              </RevealText>
              <p style={{ fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.55 }}>
                {service.description}
              </p>

              <div className="cjj-detail-benefits">
                {service.features.map((feat, index) => (
                  <div key={index} className="cjj-benefit-card">
                    <h4>{feat.title}</h4>
                    <p>{feat.desc}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 32 }}>
                <MagneticButton
                  variant="primary"
                  href={`https://wa.me/18295085022?text=Hola%2C%20deseo%20agendar%20mi%20clase%20de%20prueba%20para%20el%20programa%20${encodeURIComponent(service.title)}.`}
                  target="_blank"
                >
                  Agendar esta disciplina
                </MagneticButton>
                <MagneticButton
                  variant="secondary"
                  onClick={() => navigateTo('#/contacto')}
                >
                  Ver horarios disponibles
                </MagneticButton>
              </div>
            </div>

            <div>
              <ClipRevealImage
                src={service.photos[0]}
                alt={service.title}
                aspectRatio="4/3"
                priority
              />

              {service.photos[1] && (
                <div style={{ marginTop: 24 }}>
                  <ClipRevealImage
                    src={service.photos[1]}
                    alt={`${service.title} sesión`}
                    aspectRatio="16/9"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </EditorialSurface>
    </div>
  );
}

/* ==========================================================================
   VISTA 4: CASOS Y RESULTADOS REALES (`#/casos`)
   ========================================================================== */

function CasesPage({ navigateTo }) {
  return (
    <div style={{ paddingTop: 90 }}>
      <EditorialSurface as="section" variant="mesh" tone="primary" className="cjj-section-spacing">
        <div className="cjj-container">
          <RevealText as="h1" immediate style={{ marginBottom: 16 }}>
            Resultados y espacios reales
          </RevealText>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.78)', maxWidth: 640 }}>
            Proyectos, competiciones y diseño de instalaciones verificadas de Colectivo Jiu Jitsu en Santo Domingo.
          </p>
        </div>
      </EditorialSurface>

      <EditorialSurface as="section" variant="grain" tone="secondary" className="cjj-section-spacing">
        <div className="cjj-container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 72 }}>
            {CASES.map((caso, idx) => (
              <div
                key={caso.code}
                style={{
                  border: '1px solid var(--border-hairline)',
                  borderRadius: 'var(--radius-card)',
                  background: 'var(--bg-card)',
                  padding: 'clamp(28px, 4vw, 48px)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
                  <span className="cjj-mono" style={{ fontSize: '0.84rem', color: '#D4AF37' }}>
                    {caso.code} · {caso.category}
                  </span>
                  <span className="cjj-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {caso.location}
                  </span>
                </div>

                <h2 style={{ marginBottom: 20 }}>{caso.title}</h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 28, marginBottom: 36 }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', marginBottom: 6 }}>El Reto</h4>
                    <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.74)' }}>{caso.challenge}</p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', color: '#FFFFFF', marginBottom: 6 }}>La Solución</h4>
                    <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.74)' }}>{caso.solution}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
                  {caso.photos.map((ph, pi) => (
                    <div key={pi} style={{ borderRadius: 'var(--radius-media)', overflow: 'hidden' }}>
                      <ClipRevealImage
                        src={ph}
                        alt={`${caso.title} foto ${pi + 1}`}
                        aspectRatio="4/3"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 64 }}>
            <MagneticButton variant="primary" href={BRAND.whatsappUrl} target="_blank">
              Forma parte del equipo
            </MagneticButton>
          </div>
        </div>
      </EditorialSurface>
    </div>
  );
}

/* ==========================================================================
   VISTA 5: NOSOTROS / DOJO & COACHES (`#/nosotros`)
   ========================================================================== */

function AboutPage({ navigateTo }) {
  return (
    <div style={{ paddingTop: 90 }}>
      {/* HERO SOBRE NOSOTROS */}
      <EditorialSurface as="section" variant="contrast" tone="primary" className="cjj-section-spacing">
        <div className="cjj-container">
          <RevealText as="h1" immediate style={{ marginBottom: 18 }}>
            Formar al ser humano antes que al atleta
          </RevealText>
          <p style={{ fontSize: '1.18rem', color: 'rgba(255, 255, 255, 0.85)', maxWidth: 700, lineHeight: 1.6 }}>
            Establecidos en septiembre de 2019 en Santo Domingo, en Colectivo Jiu-Jitsu constituimos una escuela de formación deportiva con liderazgo, principios éticos y búsqueda del alto rendimiento.
          </p>

          <div className="cjj-about-stats">
            <CounterMetric value="2019" label="Año de Fundación" />
            <CounterMetric value="1er L." label="@ajptour 2023" />
            <CounterMetric value="8.2K+" label="Comunidad IG" />
          </div>
        </div>
      </EditorialSurface>

      {/* PROCESO DE INGRESO EN 3 PASOS */}
      <EditorialSurface as="section" variant="ambient" tone="secondary" className="cjj-section-spacing">
        <div className="cjj-container">
          <RevealText as="h2" style={{ marginBottom: 36 }}>
            Cómo comenzar en ColectivoJJ
          </RevealText>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}>
            {[
              {
                step: '01',
                title: 'Clase de Prueba Gratis',
                desc: 'Contáctanos vía WhatsApp para agendar tu primera sesión sin costo y conocer el ambiente del tatami.'
              },
              {
                step: '02',
                title: 'Evaluación y Fundamentos',
                desc: 'Comienza en nuestro bloque de técnicas básicas guiado directamente por profesores cinturón negro y marrón.'
              },
              {
                step: '03',
                title: 'Evolución Constante',
                desc: 'Entrena con propósito, asiste a clases GI, No Gi o infantiles y forma parte de la familia ColectivoJJ.'
              }
            ].map((p, pi) => (
              <div
                key={pi}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-hairline)',
                  borderRadius: 'var(--radius-card)',
                  padding: 32
                }}
              >
                <div className="cjj-mono" style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: 12 }}>
                  {p.step}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.72)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </EditorialSurface>

      {/* PERFILES DE COACHES COMPLETOS */}
      <EditorialSurface as="section" variant="grain" tone="primary" className="cjj-section-spacing">
        <div className="cjj-container">
          <RevealText as="h2" style={{ marginBottom: 36 }}>
            Equipo técnico verificado
          </RevealText>

          <div className="cjj-staff-mosaic">
            {COACHES.map((coach, idx) => (
              <div key={idx} className="cjj-staff-card">
                <ClipRevealImage
                  src={coach.photo}
                  alt={coach.name}
                  aspectRatio="4/5"
                  parallax
                  className="cjj-staff-photo"
                />
                <div className="cjj-staff-info">
                  <div className="cjj-staff-role">{coach.role}</div>
                  <h3 className="cjj-staff-name">{coach.name}</h3>
                  <div className="cjj-mono" style={{ fontSize: '0.78rem', color: '#D4AF37', marginBottom: 8 }}>
                    {coach.discipline}
                  </div>
                  <p className="cjj-staff-bio">{coach.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </EditorialSurface>

      {/* INSTALACIONES */}
      <EditorialSurface as="section" variant="architectural" tone="secondary" className="cjj-section-spacing">
        <div className="cjj-container">
          <div style={{ maxWidth: 600, marginBottom: 36 }}>
            <RevealText as="h2">
              Instalaciones profesionales
            </RevealText>
            <p style={{ marginTop: 8, color: 'var(--text-muted)' }}>
              Ladrillo negro mate, tatami gris industrial, casilleros privados y ambiente climatizado en Santo Domingo.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <ClipRevealImage src="./media/post_20.jpg" alt="Dojo Colectivo Jiu Jitsu" aspectRatio="16/10" parallax />
            <ClipRevealImage src="./media/post_14.jpg" alt="Comunidad en dojo" aspectRatio="16/10" parallax />
            <ClipRevealImage src="./media/post_17.jpg" alt="Tatami y entrenamiento" aspectRatio="16/10" parallax />
          </div>
        </div>
      </EditorialSurface>
    </div>
  );
}

/* ==========================================================================
   VISTA 6: VISÍTANOS & CONTACTO (`#/contacto`)
   ========================================================================== */

function ContactPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    disciplina: 'Fundamentos de Jiu Jitsu',
    horario: 'Matutino (7:00 AM)'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hola, mi nombre es ${formData.nombre}. Me gustaría agendar una clase de prueba en el programa de ${formData.disciplina} en horario ${formData.horario}.`;
    const url = `https://wa.me/18295085022?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div style={{ paddingTop: 90 }}>
      <EditorialSurface as="section" variant="contrast" tone="primary" className="cjj-section-spacing">
        <div className="cjj-container">
          <RevealText as="h1" immediate style={{ marginBottom: 16 }}>
            Visítanos en el tatami
          </RevealText>
          <p style={{ fontSize: '1.15rem', color: 'rgba(255, 255, 255, 0.78)', maxWidth: 640 }}>
            Estamos listos para recibirte en tu primera sesión de prueba en Santo Domingo.
          </p>

          <div className="cjj-contact-grid">
            {/* DATOS VERIFICADOS */}
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ background: 'var(--bg-card)', padding: 24, border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, color: '#FFFFFF' }}>
                    <MapPin size={20} />
                    <h3 style={{ fontSize: '1.1rem' }}>Dirección</h3>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.76)' }}>{BRAND.address}</p>
                  <div style={{ marginTop: 16 }}>
                    <MagneticButton variant="secondary" href={BRAND.googleMapsUrl} target="_blank" style={{ padding: '8px 18px', fontSize: '0.84rem' }}>
                      Abrir en Google Maps
                    </MagneticButton>
                  </div>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: 24, border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, color: '#FFFFFF' }}>
                    <Clock size={20} />
                    <h3 style={{ fontSize: '1.1rem' }}>Horarios</h3>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.76)' }}>{BRAND.hours}</p>
                </div>

                <div style={{ background: 'var(--bg-card)', padding: 24, border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-card)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, color: '#FFFFFF' }}>
                    <Phone size={20} />
                    <h3 style={{ fontSize: '1.1rem' }}>Contacto</h3>
                  </div>
                  <p style={{ color: 'rgba(255,255,255,0.76)' }}>WhatsApp: {BRAND.phone}</p>
                  <p style={{ color: 'rgba(255,255,255,0.76)', marginTop: 4 }}>Correo: {BRAND.email}</p>
                </div>
              </div>
            </div>

            {/* FORMULARIO DIRECTO A WHATSAPP */}
            <div style={{ background: '#0D0E10', padding: 'clamp(28px, 4vw, 36px)', border: '1px solid var(--border-hairline)', borderRadius: 'var(--radius-card)' }}>
              <h3 style={{ fontSize: '1.35rem', marginBottom: 8 }}>Solicita tu clase gratis</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 24 }}>
                Completa tus datos y te responderemos inmediatamente por WhatsApp para confirmar tu cupo.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: 6, color: 'rgba(255,255,255,0.8)' }}>
                    TU NOMBRE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Escribe tu nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#141619',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-card)',
                      color: '#FFFFFF',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: 6, color: 'rgba(255,255,255,0.8)' }}>
                    DISCIPLINA DE INTERÉS
                  </label>
                  <select
                    value={formData.disciplina}
                    onChange={(e) => setFormData({ ...formData, disciplina: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#141619',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-card)',
                      color: '#FFFFFF',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="Fundamentos de Jiu Jitsu">Fundamentos de Jiu Jitsu</option>
                    <option value="Jiu Jitsu Avanzado">Jiu Jitsu Avanzado</option>
                    <option value="Jiu Jitsu para Niños">Jiu Jitsu para Niños</option>
                    <option value="Modalidad No Gi (Sin Kimono)">Modalidad No Gi (Sin Kimono)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', marginBottom: 6, color: 'rgba(255,255,255,0.8)' }}>
                    HORARIO PREFERIDO
                  </label>
                  <select
                    value={formData.horario}
                    onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      background: '#141619',
                      border: '1px solid var(--border-hairline)',
                      borderRadius: 'var(--radius-card)',
                      color: '#FFFFFF',
                      fontSize: '0.92rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="Matutino (7:00 AM - 8:30 AM)">Matutino (7:00 AM - 8:30 AM)</option>
                    <option value="Tarde Infantil (4:30 PM - 5:30 PM)">Tarde Infantil (4:30 PM - 5:30 PM)</option>
                    <option value="Noche (6:00 PM - 9:00 PM)">Noche (6:00 PM - 9:00 PM)</option>
                    <option value="Sábados (9:00 AM - 11:30 AM)">Sábados (9:00 AM - 11:30 AM)</option>
                  </select>
                </div>

                <div style={{ marginTop: 8 }}>
                  <MagneticButton type="submit" variant="primary" style={{ width: '100%' }}>
                    Confirmar por WhatsApp
                  </MagneticButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </EditorialSurface>

      {/* FAQS EDITORIAL */}
      <EditorialSurface as="section" variant="grain" tone="secondary" className="cjj-section-spacing">
        <div className="cjj-container">
          <div style={{ maxWidth: 600, marginBottom: 36 }}>
            <RevealText as="h2">
              Dudas comunes
            </RevealText>
          </div>

          <EditorialAccordion items={FAQS} />
        </div>
      </EditorialSurface>
    </div>
  );
}
