import { useState, useRef, useEffect } from "react";
import "./Slider.css";

export default function Slider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  let sliders = ["image1.jpg", "image2.jpg", "image3.jpg"];
  let currentImage = process.env.PUBLIC_URL + "/images/" + sliders[activeIndex];

  const startSlide = () => {
    if (intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setActiveIndex((prevIndex) =>
          prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
        );
      }, 1000);
    }
  };

  const stopSlide = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? sliders.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === sliders.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    return () => stopSlide(); // Clean up on unmount
  }, []);
  return (
    <div
      id="controls-carousel"
      className="relative w-full"
      data-carousel="static"
    >
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        <div className="duration-700 ease-in-out" data-carousel-item="active">
          <img
            src={currentImage}
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
        onClick={nextSlide}
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30  group-hover:bg-white/50">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
      <ul className="grid cursor-pointer grid-cols-4 mt-2 gap-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li onClick={prevSlide} className="px-4 py-2">
          Previous
        </li>
        <li
          onClick={startSlide}
          className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"
        >
          Play
        </li>
        <li
          onClick={stopSlide}
          className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"
        >
          Stop
        </li>
        <li
          onClick={nextSlide}
          className="px-4 py-2 border-b border-gray-200 dark:border-gray-600"
        >
          Next
        </li>
      </ul>
    </div>
  );
}
