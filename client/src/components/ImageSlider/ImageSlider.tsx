import React, { useState, useEffect, useRef } from "react";
import image1 from "../../assets/sliderHome/dan-farrell-fT49QnFucQ8-unsplash.jpg";
import image2 from "../../assets/sliderHome/evie-s-kqJfP-lrl-8-unsplash.jpg";
import image3 from "../../assets/sliderHome/jene-stephaniuk--MCrF6hnojU-unsplash.jpg";
import image4 from "../../assets/sliderHome/muriel-liu-Hb1CiSzPVfk-unsplash.jpg";

const STATIC_SLIDES = [
  {
    id: 1,
    src: image1,
    title: "Mint Your Digital Art",
    subtitle:
      "Transform your creativity into unique on-chain artworks with secure and seamless minting",
  },
  {
    id: 2,
    src: image2,
    title: "Discover Original Artworks",
    subtitle:
      "Explore one-of-one digital creations crafted by emerging and established artists worldwide",
  },
  {
    id: 3,
    src: image3,
    title: "Empowering Artists on Blockchain",
    subtitle:
      "Full ownership, transparent royalties, and global reach for every digital creator",
  },
  {
    id: 4,
    src: image4,
    title: "Build & Collect Art Collections",
    subtitle:
      "Create, showcase, and collect timeless digital art in a decentralized ecosystem",
  },
];

const ImageSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timeoutRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STATIC_SLIDES.length);
    }, 6000);

    return () => {
      if (timeoutRef.current) clearInterval(timeoutRef.current);
    };
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
      timeoutRef.current = setInterval(() => {
        setActiveIndex((i) => (i + 1) % STATIC_SLIDES.length);
      }, 6000);
    }
  };

  return (
    <div className="relative w-full h-[70vh] max-h-[450px] min-h-[350px] overflow-hidden bg-black select-none rounded-2xl shadow-2xl">
      {/* Slides */}
      {STATIC_SLIDES.map((slide, i) => {
        const offset = i - activeIndex;
        const isActive = i === activeIndex;

        return (
          <div
            key={slide.id}
            className="absolute inset-0"
            style={{
              transform: `translateX(${offset * 100}%)`,
              transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover brightness-90"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-10 text-white max-w-3xl">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight py-2
                  bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent
                  drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] transition-all duration-1000`}
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: isActive ? "0.2s" : "0s",
                }}
              >
                {slide.title}
              </h2>

              <p
                className="text-sm sm:text-base md:text-sm lg:text-sm text-white/70 font-light leading-relaxed
                  drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-1000"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(15px)",
                  transitionDelay: isActive ? "0.4s" : "0s",
                }}
              >
                {slide.subtitle}
              </p>
            </div>
          </div>
        );
      })}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 sm:gap-4">
        {STATIC_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="relative group focus:outline-none"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "bg-gradient-to-r from-purple-400 to-pink-500 scale-125 shadow-lg shadow-pink-500/50"
                  : "bg-white/40 group-hover:bg-white/70"
              }`}
            />
            {i === activeIndex && (
              <div className="absolute inset-0 w-3 h-3 rounded-full animate-ping bg-gradient-to-r from-purple-400 to-pink-500/50" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
