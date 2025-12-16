import React, { useState, useEffect } from "react";
import { useScreenResizeValue } from "../../ScreenSizeFunction";
import { Star, MapPin, Users, DollarSign } from "lucide-react";

import Image1 from "../../assets/1.jpg";
import Image2 from "../../assets/2.jpg";
import Image3 from "../../assets/3.jpg";

const TopPackages = () => {
  const breakpoint = useScreenResizeValue();
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

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
    const imgs = [Image1, Image2, Image3];
    preloadImages(imgs)
      .then(() => setImagesLoaded(true))
      .catch((err) => console.error("Image failed to load", err));
  }, []);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:8001/package/fetch?sort=rating');
        if (response.ok) {
          const data = await response.json();
          setPackages(data.slice(0, 6));
        }
      } catch (error) {
        console.log("Using default packages due to:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const TopPackagesArray = packages.length > 0 ? packages.map((pkg, i) => ({
    id: pkg._id,
    image: pkg.coverImage || [Image1, Image2, Image3][i % 3],
    name: pkg.name,
    design: `${pkg.duration}${pkg.durationUnit === 'days' ? 'D' : 'W'} • ₹${pkg.basePrice}`,
    location: pkg.destination,
    rating: pkg.rating || 4.5,
    difficulty: pkg.difficulty,
  })) : [
    {
      image: Image1,
      name: "Kerala Paradise",
      design: "5D/4N • ₹25,000",
      location: "Kerala",
      rating: 4.8,
      difficulty: "Easy",
    },
    {
      image: Image2,
      name: "Himalayan Adventure",
      design: "7D/6N • ₹35,000",
      location: "Manali",
      rating: 4.6,
      difficulty: "Moderate",
    },
    {
      image: Image3,
      name: "Mountain Escape",
      design: "4D/3N • ₹20,000",
      location: "Himachal",
      rating: 4.7,
      difficulty: "Moderate",
    },
  ];

  if (!imagesLoaded && !loading) return null;

  return (
    <div className="flex items-center justify-center overflow-hidden w-full py-[3rem] px-4 bg-gradient-to-b from-white via-[#fafafa] to-[#f5f5f5]">
      <div
        className={`${
          breakpoint <= 1440 ? "w-[96%]" : "w-[1392px]"
        } flex flex-col items-center justify-center gap-[2rem]`}
      >
        {/* ------------ TEXT SECTION ------------ */}
        <div className="flex flex-col items-center justify-center">
          <span className="px-[2rem] py-[.5rem] rounded-full bg-[#6B8E23] text-white text-xs md:text-sm font-medium">
            ✨ Popular Destinations
          </span>

          <h1 className="text-[2.2rem] md:text-[3.5rem] text-center capitalize font-bold mt-6 leading-tight">
            Explore Trending <br className="hidden md:block" /> Travel Packages
          </h1>

          <p className="text-[0.9rem] md:text-[1.05rem] text-center w-full md:w-[75%] mt-5 text-gray-600 leading-relaxed">
            Discover curated travel experiences designed for adventurers. From serene backwaters to majestic mountains, find your perfect destination with our handpicked packages.
          </p>
        </div>

        {/* ------------ PACKAGES GRID ------------ */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TopPackagesArray.map((pkg, index) => (
            <div
              key={index}
              className="
                group relative rounded-2xl overflow-hidden shadow-lg 
                hover:shadow-2xl transition-all duration-500 cursor-pointer
                bg-white hover:scale-105
              "
            >
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                
                {/* Difficulty Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#6B8E23] text-white text-xs font-semibold rounded-full">
                    {pkg.difficulty}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#6B8E23] transition">
                  {pkg.name}
                </h3>
                
                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                  <MapPin size={16} className="text-[#6B8E23]" />
                  <span>{pkg.location}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(pkg.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                    />
                  ))}
                  <span className="ml-1 text-xs text-gray-500">({pkg.rating})</span>
                </div>

                {/* Price & Duration */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-[#6B8E23] font-bold text-sm">{pkg.design}</span>
                  <button className="px-3 py-1.5 bg-[#6B8E23] text-white text-xs rounded-lg hover:bg-[#5a7a1c] transition">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopPackages;
