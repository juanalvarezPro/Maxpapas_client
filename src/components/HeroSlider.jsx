import { useEffect, useRef, useState } from "react";
import maxpapasSlides from "../utils/maxpapasSlides";

const INTERVALO_MS = 5000;

export default function HeroSlider({ slides = maxpapasSlides }) {
  const trackRef = useRef(null);
  const [actual, setActual] = useState(0);
  const [pausado, setPausado] = useState(false);

  const irA = (index) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
  };

  // Detecta el slide visible cuando el usuario desliza con el dedo
  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    if (index !== actual) setActual(index);
  };

  // Avance automático
  useEffect(() => {
    if (pausado || slides.length < 2) return;
    const id = setInterval(() => {
      irA((actual + 1) % slides.length);
    }, INTERVALO_MS);
    return () => clearInterval(id);
  }, [actual, pausado, slides.length]);

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-ink text-white shadow-lift"
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      onTouchStart={() => setPausado(true)}
      onTouchEnd={() => setPausado(false)}
      aria-roledescription="carrusel"
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "url(/background/maxpapas.webp)", backgroundSize: "140px" }}
      />
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl pointer-events-none" />

      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="relative flex overflow-x-auto snap-x snap-mandatory scrollbar"
      >
        {slides.map((slide, index) => (
          <article
            key={index}
            className="w-full shrink-0 snap-center flex items-center gap-3 sm:gap-6 px-5 py-5 sm:px-8 sm:py-7"
            aria-hidden={index !== actual}
          >
            <div className="flex-1 min-w-0">
              <span className="inline-block rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink">
                {slide.etiqueta}
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                {slide.titulo}
              </h2>
              <p className="mt-1.5 text-sm sm:text-base text-white/70 line-clamp-2">
                {slide.texto}
              </p>
            </div>
            <div className="shrink-0 grid place-items-center h-24 w-24 sm:h-32 sm:w-32 lg:h-36 lg:w-36 rounded-full bg-white overflow-hidden">
              <img
                src={`/img/${slide.imagen}.webp`}
                alt=""
                className="h-[68%] w-[68%] object-contain"
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          </article>
        ))}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-3 left-5 sm:left-8 flex gap-1.5">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Ir al slide ${index + 1}`}
              onClick={() => irA(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === actual ? "w-6 bg-primary" : "w-1.5 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
