import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import HeaderBannerNew1 from "../../assets/HeaderBannerImage1.jpg";
import HeaderBannerNew2 from "../../assets/HeaderBannerImage2.jpg";
import HeaderBannerNew3 from "../../assets/HeaderBannerImage3.jpg";

import "./Header.css";

const images = [
  {
    src: HeaderBannerNew1,
    title: "Kerala",
    desc: "Known as God’s Own Country, Kerala offers serene backwaters, lush greenery, exotic wildlife, and vibrant traditions.",
  },
  {
    src: HeaderBannerNew2,
    title: "Manali",
    desc: "Manali, a popular hill station in Himachal Pradesh, is known for snow-capped mountains, adventure sports, and scenic valleys.",
  },
  {
    src: HeaderBannerNew3,
    title: "Rishikesh",
    desc: "Rishikesh is a historic city in Uttarakhand known for Its mountains, majestic forts, and rich cultural heritage.",
  },
];

const Header = () => {
  const slideRef = useRef(null);

  const handleNext = () => {
    if (slideRef.current?.children.length) {
      const firstChild = slideRef.current.children[0];
      slideRef.current.appendChild(firstChild);
    }
  };

  const handlePrev = () => {
    if (slideRef.current?.children.length) {
      const lastChild =
        slideRef.current.children[slideRef.current.children.length - 1];
      slideRef.current.prepend(lastChild);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-8 mt-[20px] h-auto md:h-[calc(95vh-60px)] min-h-[400px]">
      <div className="relative rounded-3xl overflow-hidden h-[300px] md:h-[calc(85vh-160px)]">

        <div className="relative overflow-hidden bg-black h-full">
          {/* Black overlay */}
          <div className="absolute inset-0 bg-black opacity-40 z-[5]"></div>

          {/* Slider */}
          <div
            ref={slideRef}
            className="flex transition-all duration-700 ease-in-out h-full"
          >
            {images.map((item, index) => (
              <div
                key={index}
                className="min-w-full h-full bg-cover bg-center flex items-start justify-start"
                style={{ backgroundImage: `url(${item.src})` }}
              >
                <div className="p-4 md:p-6 rounded-xl flex flex-col items-start gap-2 z-10 text-white max-w-xs md:max-w-xl text-left m-4 md:m-10">
                  <p className="text-[14px] md:text-[18px] text-[#f555a7]">
                    #{index + 1} Spotlight
                  </p>
                  <h1 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4">{item.title}</h1>
                  <p className="mb-4 md:mb-6 text-[13px] md:text-[16px] line-clamp-2 md:line-clamp-none">{item.desc}</p>
                  <button className="bg-pink-500 hover:bg-pink-600 px-4 md:px-6 py-2 rounded-full text-white transition text-sm md:text-base">
                    Explore Packages
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col absolute bottom-8 right-8 gap-2 z-20">
            <button
              className="bg-black/70 rounded-md p-2 cursor-pointer hover:bg-black/90 transition"
              onClick={handlePrev}
            >
              <ChevronLeft color="white" size={24} />
            </button>
            <button
              className="bg-black/70 rounded-md p-2 cursor-pointer hover:bg-black/90 transition"
              onClick={handleNext}
            >
              <ChevronRight color="white" size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom White Glass Box */}
      <div
        className="
          w-[90%] md:w-[600px] h-auto md:h-[150px]
          absolute top-[70%] md:top-[68%] left-1/2 -translate-x-1/2
          rounded-3xl bg-white/30 backdrop-blur-2xl
          flex flex-col md:flex-row items-center justify-between p-4 md:p-6
          font-medium text-black text-sm md:text-base
          drop-shadow-[2px_4px_5px_rgba(0,0,0,0.4)]
          border border-[#d7d7d8]
          gap-4 md:gap-0
        "
      >
        <h1 className="text-center flex-1">Location</h1>
        <div className="hidden md:block w-px h-12 bg-[#d7d7d8]/50"></div>
        <h2 className="text-center flex-1">Best Travel Month</h2>
        <div className="hidden md:block w-px h-12 bg-[#d7d7d8]/50"></div>
        <h2 className="text-center flex-1">Best Travel Partner</h2>
      </div>
    </div>
  );
};

export default Header;
