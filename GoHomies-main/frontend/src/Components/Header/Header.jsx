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
    <div className="p-4 md:p-8 pt-[140px] md:pt-[120px] h-auto md:h-[calc(95vh-60px)] min-h-[500px]">
      <div className="relative rounded-3xl overflow-hidden h-[350px] md:h-[calc(85vh-160px)] shadow-2xl">

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
                <div className="p-4 md:p-8 rounded-2xl flex flex-col items-start gap-3 z-10 text-white max-w-xs md:max-w-2xl text-left m-4 md:m-8 bg-gradient-to-r from-black/40 via-black/20 to-transparent backdrop-blur-md border border-white/20 shadow-xl">
                  <p className="text-[12px] md:text-[16px] text-[#f555a7] font-semibold uppercase tracking-wider">
                    ✨ #{index + 1} Spotlight
                  </p>
                  <h1 className="text-3xl md:text-6xl font-bold mb-1 md:mb-2 bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent">{item.title}</h1>
                  <p className="mb-4 md:mb-6 text-[13px] md:text-[16px] line-clamp-2 md:line-clamp-3 text-gray-100 leading-relaxed">{item.desc}</p>
                  <button className="bg-gradient-to-r from-[#f555a7] to-[#ff1493] hover:from-[#f555a7] hover:to-[#ff69b4] px-6 md:px-8 py-3 rounded-full text-white transition-all duration-300 text-sm md:text-base font-semibold shadow-lg hover:shadow-xl hover:shadow-[#f555a7]/50 hover:scale-105 active:scale-95">
                    Explore Packages
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col absolute bottom-6 md:bottom-8 right-6 md:right-8 gap-2 z-20">
            <button
              className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-full p-3 cursor-pointer hover:from-white/30 hover:to-white/20 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ChevronLeft color="white" size={24} />
            </button>
            <button
              className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-md rounded-full p-3 cursor-pointer hover:from-white/30 hover:to-white/20 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight color="white" size={24} />
            </button>
          </div>


        </div>
      </div>

      {/* Bottom White Glass Box */}
      <div
        className="
          w-[95%] md:w-[800px] h-auto md:h-auto
          absolute top-[72%] md:top-[70%] left-1/2 -translate-x-1/2
          rounded-2xl md:rounded-3xl bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-2xl
          flex flex-col md:flex-row items-stretch justify-between p-5 md:p-8
          font-medium text-black text-sm md:text-base
          shadow-2xl
          border border-white/50 hover:border-white/70
          gap-0
          overflow-hidden
          transition-all duration-300
          hover:shadow-3xl hover:from-white/40 hover:via-white/30 hover:to-white/20
        "
      >
        {/* Location Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg px-2 group"
             onClick={() => setShowLocationSelector(!showLocationSelector)}>
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={20} className="text-[#6B8E23] group-hover:scale-110 transition-transform" />
            <span className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">Location</span>
          </div>
          <h1 className="text-lg md:text-2xl font-bold text-gray-900 group-hover:text-[#6B8E23] transition-colors">{selectedLocation}</h1>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
        <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Best Travel Month Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg px-2 group">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-[#6B8E23] group-hover:scale-110 transition-transform" />
            <span className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">Best Season</span>
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 group-hover:text-[#6B8E23] transition-colors">{locationData[selectedLocation]?.bestMonth || "N/A"}</h2>
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-16 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
        <div className="md:hidden h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>

        {/* Best Travel Partner Section */}
        <div className="flex-1 flex flex-col items-center justify-center py-4 md:py-0 hover:bg-white/20 transition-all duration-300 cursor-pointer rounded-lg px-2 group">
          <div className="flex items-center gap-2 mb-2">
            <Users size={20} className="text-[#6B8E23] group-hover:scale-110 transition-transform" />
            <span className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wide">Travel Buddy Type</span>
          </div>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 text-center group-hover:text-[#6B8E23] transition-colors">{locationData[selectedLocation]?.bestPartner || "N/A"}</h2>
        </div>
      </div>

      {/* Location Selector Modal */}
      {showLocationSelector && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-white/40">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-200 sticky top-0 bg-gradient-to-r from-white to-gray-50">
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#6B8E23] to-[#5a7a1c] bg-clip-text text-transparent">Select a Location</h2>
              <button
                onClick={() => setShowLocationSelector(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-all duration-300 group"
              >
                <X size={24} className="text-gray-600 group-hover:text-gray-900 group-hover:scale-110 transition-all" />
              </button>
            </div>

            {/* Location Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 md:p-8">
              {images.map((location) => (
                <div
                  key={location.title}
                  onClick={() => handleLocationSelect(location.title)}
                  className={`p-4 md:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 group ${
                    selectedLocation === location.title
                      ? "border-[#6B8E23] bg-gradient-to-br from-[#6B8E23]/15 to-[#6B8E23]/5 shadow-lg shadow-[#6B8E23]/20"
                      : "border-gray-200 hover:border-[#6B8E23] bg-white hover:shadow-lg hover:shadow-[#6B8E23]/10"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-[#6B8E23] flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg group-hover:text-[#6B8E23] transition-colors">{location.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{location.desc}</p>
                      {locationData[location.title] && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs text-gray-600">
                            <span className="font-semibold text-gray-900">🗓️ Best Season:</span> {locationData[location.title].bestMonth}
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
