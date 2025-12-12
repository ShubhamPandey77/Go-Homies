import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, X } from "lucide-react";

import HeaderBannerNew1 from "../../assets/HeaderBannerImage1.jpg";
import HeaderBannerNew2 from "../../assets/HeaderBannerImage2.jpg";
import HeaderBannerNew3 from "../../assets/HeaderBannerImage3.jpg";

import "./Header.css";

const images = [
  {
    src: HeaderBannerNew1,
    title: "Kerala",
    desc: "Known as God's Own Country, Kerala offers serene backwaters, lush greenery, exotic wildlife, and vibrant traditions.",
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
  {
    src: HeaderBannerNew1,
    title: "Jaipur",
    desc: "The Pink City of Jaipur is famous for its stunning palaces, forts, vibrant culture, and royal heritage.",
  },
  {
    src: HeaderBannerNew2,
    title: "Agra",
    desc: "Home to the iconic Taj Mahal, Agra is a city of architectural marvels and timeless romance.",
  },
  {
    src: HeaderBannerNew3,
    title: "Goa",
    desc: "Goa's pristine beaches, Portuguese heritage, and vibrant nightlife make it a paradise for beach lovers.",
  },
  {
    src: HeaderBannerNew1,
    title: "Shimla",
    desc: "Nestled in the Himalayas, Shimla offers breathtaking mountain views, pleasant weather, and adventure sports.",
  },
  {
    src: HeaderBannerNew2,
    title: "Udaipur",
    desc: "The City of Lakes, Udaipur enchants visitors with palaces reflected in shimmering lakes and romantic ambiance.",
  },
  {
    src: HeaderBannerNew3,
    title: "Ooty",
    desc: "This Nilgiri gem is renowned for its lush gardens, tea plantations, and cool mountain air.",
  },
  {
    src: HeaderBannerNew1,
    title: "Coorg",
    desc: "Coorg is a misty paradise known for its coffee plantations, scenic beauty, and adventure activities.",
  },
];

const locationData = {
  Kerala: {
    bestMonth: "October - May",
    bestPartner: "Adventure Seekers & Nature Lovers",
    description: "Perfect for backwater cruises and wildlife exploration",
  },
  Manali: {
    bestMonth: "June - September",
    bestPartner: "Adventure Enthusiasts & Trekkers",
    description: "Ideal for mountain activities and scenic hikes",
  },
  Rishikesh: {
    bestMonth: "October - March",
    bestPartner: "Spiritual Travelers & Yoga Enthusiasts",
    description: "Best for meditation, yoga, and cultural exploration",
  },
  Jaipur: {
    bestMonth: "October - March",
    bestPartner: "Culture & History Enthusiasts",
    description: "Perfect for exploring palaces and heritage sites",
  },
  Agra: {
    bestMonth: "October - March",
    bestPartner: "Romance & History Lovers",
    description: "Ideal for experiencing architectural marvels",
  },
  Goa: {
    bestMonth: "November - February",
    bestPartner: "Beach & Party Enthusiasts",
    description: "Perfect for beach getaways and water sports",
  },
  Shimla: {
    bestMonth: "April - June, September - October",
    bestPartner: "Mountain Lovers & Adventure Seekers",
    description: "Ideal for snow activities and hill station experiences",
  },
  Udaipur: {
    bestMonth: "October - March",
    bestPartner: "Couples & Romantic Travelers",
    description: "Perfect for palace tours and lake cruises",
  },
  Ooty: {
    bestMonth: "April - June, September - October",
    bestPartner: "Nature Lovers & Garden Enthusiasts",
    description: "Ideal for botanical tours and tea plantation visits",
  },
  Coorg: {
    bestMonth: "September - March",
    bestPartner: "Adventure & Coffee Lovers",
    description: "Perfect for trekking and coffee plantation tours",
  },
};

const Header = () => {
  const slideRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState("Kerala");
  const [showLocationSelector, setShowLocationSelector] = useState(false);

  const handleNext = () => {
    if (slideRef.current?.children.length) {
      const firstChild = slideRef.current.children[0];
      slideRef.current.appendChild(firstChild);
      updateLocationIndex(1);
    }
  };

  const handlePrev = () => {
    if (slideRef.current?.children.length) {
      const lastChild =
        slideRef.current.children[slideRef.current.children.length - 1];
      slideRef.current.prepend(lastChild);
      updateLocationIndex(-1);
    }
  };

  const updateLocationIndex = (direction) => {
    const currentIndex = images.findIndex((img) => img.title === selectedLocation);
    const newIndex = (currentIndex + direction + images.length) % images.length;
    setSelectedLocation(images[newIndex].title);
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    const newIndex = images.findIndex((img) => img.title === location);
    const currentIndex = images.findIndex((img) => img.title === selectedLocation);
    const diff = newIndex - currentIndex;
    
    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        if (slideRef.current?.children.length) {
          const firstChild = slideRef.current.children[0];
          slideRef.current.appendChild(firstChild);
        }
      }
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) {
        if (slideRef.current?.children.length) {
          const lastChild = slideRef.current.children[slideRef.current.children.length - 1];
          slideRef.current.prepend(lastChild);
        }
      }
    }
    
    setShowLocationSelector(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 md:p-8 pt-[100px] h-auto md:h-[calc(95vh-60px)] min-h-[400px]">
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
          w-[95%] md:w-[700px] h-auto md:h-auto
          absolute top-[70%] md:top-[68%] left-1/2 -translate-x-1/2
          rounded-3xl bg-white/40 backdrop-blur-3xl
          flex flex-col md:flex-row items-stretch justify-between p-6 md:p-8
          font-medium text-black text-sm md:text-base
          drop-shadow-[2px_4px_15px_rgba(0,0,0,0.2)]
          border border-white/60
          gap-0
          overflow-hidden
        "
      >
        {/* Location Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 hover:bg-white/20 transition cursor-pointer rounded-lg px-2"
             onClick={() => setShowLocationSelector(!showLocationSelector)}>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={20} className="text-[#6B8E23]" />
            <span className="text-xs md:text-sm font-semibold text-gray-700 uppercase">Location</span>
          </div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900">{selectedLocation}</h1>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#d7d7d8] to-transparent"></div>
        <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-[#d7d7d8] to-transparent"></div>

        {/* Best Travel Month Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 hover:bg-white/20 transition cursor-pointer rounded-lg px-2">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-[#6B8E23]" />
            <span className="text-xs md:text-sm font-semibold text-gray-700 uppercase">Best Season</span>
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900">{locationData[selectedLocation]?.bestMonth || "N/A"}</h2>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-[#d7d7d8] to-transparent"></div>
        <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-[#d7d7d8] to-transparent"></div>

        {/* Best Travel Partner Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 hover:bg-white/20 transition cursor-pointer rounded-lg px-2">
          <div className="flex items-center gap-2 mb-2">
            <Users size={20} className="text-[#6B8E23]" />
            <span className="text-xs md:text-sm font-semibold text-gray-700 uppercase">Travel Buddy Type</span>
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 text-center">{locationData[selectedLocation]?.bestPartner || "N/A"}</h2>
        </div>
      </div>

      {/* Location Selector Modal */}
      {showLocationSelector && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-[95%] md:w-full max-h-[70vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">Select a Location</h2>
              <button
                onClick={() => setShowLocationSelector(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
              {images.map((location) => (
                <div
                  key={location.title}
                  onClick={() => handleLocationSelect(location.title)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedLocation === location.title
                      ? "border-[#6B8E23] bg-[#6B8E23]/10"
                      : "border-gray-200 hover:border-[#6B8E23] bg-white"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-[#6B8E23] flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{location.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{location.desc}</p>
                      {locationData[location.title] && (
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-xs text-gray-500">
                            <span className="font-semibold">Best Season:</span> {locationData[location.title].bestMonth}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
