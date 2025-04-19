import React, {useState, useEffect} from 'react';
import DestinationCard from './DestinationCard';

type DestinationType = {
  destinations: {
    imgSrc?: string;
    city: string;
    country: string;
    price: number;
    dayTrip: number;
    rating?: number;
    description?: string | '';
  }[];
};

const VacationSlider: React.FC<DestinationType> = ({
  destinations,
}): React.ReactElement => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  // Number of cards visible at once - responsive
  const getCardsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 1280) return 3; // xl
      if (window.innerWidth > 768) return 2; // md
      return 1; // mobile
    }
    return 3; // default for SSR
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  // Update cards per view on window resize
  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(destinations.length / cardsPerView);

  // Get visible destinations based on current index
  const getVisibleDestinations = () => {
    const startIndex = (currentIndex * cardsPerView) % destinations.length;
    const visibleDestinations = [];

    for (let i = 0; i < cardsPerView; i++) {
      const idx = (startIndex + i) % destinations.length;
      visibleDestinations.push(destinations[idx]);
    }

    return visibleDestinations;
  };

  const goToPrevSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1));

    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNextSlide = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1));

    setTimeout(() => setIsAnimating(false), 500);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart: React.TouchEventHandler = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove: React.TouchEventHandler = (e) => {
    if (isAnimating) return;

    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      goToNextSlide();
    } else if (diff < -50) {
      goToPrevSlide();
    }
  };

  return (
    <div className="vacation-slider-container relative w-full">
      {/* Navigation buttons */}
      <div className="mb-3 flex justify-end gap-3">
        <button
          onClick={goToPrevSlide}
          className="bg-tw-background-white hover:border-tw-primary-orange flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#999999]/50 transition-all duration-300 focus:outline-none"
          disabled={isAnimating}
          aria-label="Previous destinations"
        >
          <img
            className="h-2 w-2"
            src="/assets/arrow-gray.svg"
            alt="Previous"
          />
        </button>
        <button
          onClick={goToNextSlide}
          className="bg-tw-primary-orange hover:bg-opacity-80 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-all duration-300 focus:outline-none"
          disabled={isAnimating}
          aria-label="Next destinations"
        >
          <img className="h-2 w-2" src="/assets/arrow-white.svg" alt="Next" />
        </button>
      </div>
      {/* Slider content */}
      <div
        className="slider-content"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className={`grid grid-cols-1 gap-[15px] md:grid-cols-2 lg:grid-cols-3`}
        >
          {getVisibleDestinations().map((destination, index) => (
            <DestinationCard
              key={`${currentIndex}-${index}`}
              imgSrc={destination.imgSrc}
              city={destination.city}
              country={destination.country}
              price={destination.price}
              dayTrip={destination.dayTrip}
              rating={destination.rating}
            />
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="mt-8 mb-4 flex items-center justify-center">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isAnimating) {
                setIsAnimating(true);
                setCurrentIndex(index);
                setTimeout(() => setIsAnimating(false), 500);
              }
            }}
            className={`mx-1 h-2 w-2 rounded-full transition-all ${
              currentIndex === index ? 'bg-tw-primary-orange' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VacationSlider;
