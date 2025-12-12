import React, { useState, useEffect } from "react";
import { useScreenResizeValue } from "../../ScreenSizeFunction";

import Image1 from "../../assets/1.jpg";
import Image2 from "../../assets/2.jpg";
import Image3 from "../../assets/3.jpg";
import Image4 from "../../assets/4.jpg";
import Image5 from "../../assets/5.jpg";

const TopPackages = () => {
  const breakpoint = useScreenResizeValue();
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // PRELOAD ALL IMAGES
  const preloadImages = (images) => {
    const loaders = images.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        })
    );
    return Promise.all(loaders);
  };

  useEffect(() => {
    const imgs = [Image1, Image2, Image3, Image4, Image5];
    preloadImages(imgs)
      .then(() => setImagesLoaded(true))
      .catch((err) => console.error("Image failed to load", err));
  }, []);

  const TopPackagesArray = [
    {
      image: Image1,
      name: "Kerala Paradise",
      Desgn: "5D/4N • ₹25,000",
      location: "Kerala",
    },
    {
      image: Image2,
      name: "Himalayan Adventure",
      Desgn: "7D/6N • ₹35,000",
      location: "Manali",
    },
    {
      image: Image3,
      name: "Mountain Escape",
      Desgn: "4D/3N • ₹20,000",
      location: "Himachal",
    },
    {
      image: Image4,
      name: "City Explorer",
      Desgn: "3D/2N • ₹18,000",
      location: "Delhi",
    },
    {
      image: Image5,
      name: "Spiritual Journey",
      Desgn: "6D/5N • ₹28,000",
      location: "Rishikesh",
    },
  ];

  if (!imagesLoaded) return null;

  return (
    <div className="flex items-center justify-center overflow-hidden w-full py-[2rem] px-4">
      <div
        className={`${
          breakpoint <= 1440 ? "w-[96%]" : "w-[1392px]"
        } flex flex-col items-center justify-center gap-[2rem]`}
      >
        {/* ------------ TEXT SECTION ------------ */}
        <div className="flex flex-col items-center justify-center">
          <span className="px-[2rem] py-[.25rem] rounded-full bg-[#6B8E23] text-white text-sm md:text-base">
            Browse over 1000 Packages
          </span>

          <h1 className="text-[2rem] md:text-[3rem] text-center capitalize font-semibold mt-4">
            Discover what top <br className="hidden md:block" /> platforms have to offer you
          </h1>

          <p className="text-[0.9rem] md:text-[1rem] text-center w-full md:w-[70%] mt-4">
            Get the top trending packages from top travel companies to your
            favourite destination
          </p>
        </div>

        {/* ------------ PACKAGES LIST ------------ */}
        <div className="w-full overflow-x-auto md:overflow-visible">
          <ul className="flex items-center justify-center gap-[1rem] h-[250px] md:h-[400px] select-none min-w-max md:min-w-0">
            {TopPackagesArray.map((packages, index) => (
              <li
                key={index}
                className="
                  w-[80px] 
                  group 
                  hover:w-[260px] 
                  bg-[rgba(0,0,0,0.5)] 
                  h-full 
                  relative 
                  rounded-[50px] 
                  overflow-hidden 
                  transition-all 
                  duration-500 
                  ease-in-out
                "
              >
                {/* Dark overlay */}
                <div
                  className="
                    absolute inset-0 
                    bg-[rgba(0,0,0,0.55)] 
                    group-hover:bg-[rgba(0,0,0,0.15)]
                    z-10 
                    transition-all 
                    duration-500
                    pointer-events-none
                  "
                />

                {/* Image */}
                <img
                  src={packages.image}
                  className="object-cover h-full w-full"
                  loading="lazy"
                  alt={packages.name}
                />

                {/* Vertical text (collapsed state) */}
                <span
                  className="
                    absolute 
                    z-20 
                    top-1/2 
                    left-1/2 
                    -translate-x-1/2 
                    -translate-y-1/2
                    group-hover:-top-[50%]
                    rotate-[-90deg]
                    transition-all 
                    duration-300
                    text-white
                  "
                >
                  <h2 className="text-[1rem] whitespace-nowrap">
                    {packages.name}
                  </h2>
                </span>

                {/* Expanded info (hover state) */}
                <span
                  className="
                    absolute 
                    z-20 
                    top-[70%]
                    left-[-150%]
                    group-hover:left-[20%]
                    transition-all 
                    duration-500
                    text-white
                  "
                >
                  <h2 className="whitespace-nowrap text-[1.3rem] font-semibold">
                    {packages.name}
                  </h2>
                  <p className="whitespace-nowrap text-[0.9rem]">
                    {packages.Desgn}
                  </p>
                  <p className="whitespace-nowrap text-[0.8rem] mt-1 opacity-90">
                    {packages.location}
                  </p>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TopPackages;
