import React, { useState, useEffect, useRef } from "react";
import image1 from "../../assets/sliderHome/7950375.jpg";
import image2 from "../../assets/sliderHome/campbell-3ZUsNJhi_Ik-unsplash.jpg";
import image3 from "../../assets/sliderHome/gabriel-gurrola-u6BPMXgURuI-unsplash.jpg";
import image4 from "../../assets/sliderHome/kevin-bhagat-3cLpiv8h5so-unsplash.jpg";

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
    <div className="relative w-full h-[80vh] max-h-[500px] min-h-[400px] overflow-hidden bg-black select-none">
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
              transition: "transform 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <img
                src={slide.src}
                alt={slide.title}
                className="w-full h-full object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 text-white max-w-5xl">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-none mb-3 sm:mb-4 transition-all duration-1000"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: isActive ? "0.3s" : "0s",
                }}
              >
                {slide.title}
              </h2>

              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/40 font-light mb-6 sm:mb-8 max-w-3xl transition-all duration-1000"
                style={{
                  opacity: isActive ? 1 : 0,
                  transform: isActive ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: isActive ? "0.5s" : "0s",
                }}
              >
                {slide.subtitle}
              </p>
            </div>
          </div>
        );
      })}

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 sm:gap-5">
        {STATIC_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className="relative group focus:outline-none"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "bg-white scale-150 shadow-lg shadow-white/60"
                  : "bg-white/40 group-hover:bg-white/70"
              }`}
            />
            {i === activeIndex && (
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-white/50 animate-ping" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
