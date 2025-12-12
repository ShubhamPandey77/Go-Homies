import React, { useState, useEffect, useRef } from "react";
import { useScreenResizeValue } from "../../../ScreenSizeFunction";
import { PostFeedLeft, PostFeedRight, PostFeedCenter } from "../../index";
import Image1 from "../../../assets/6.jpg";

const PostFeedSection = () => {
  const breakpoint = useScreenResizeValue();
  const containerRef = useRef(null);
  const [isStuck, setIsStuck] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsStuck(entry.intersectionRatio < 1),
      { threshold: [1] }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex relative items-center justify-center w-full h-full">
      <div className="bg-[#FAFAFA] w-full h-full absolute top-0"></div>

      <div
        className={`${
          breakpoint <= 1440 ? "w-[96%]" : "w-[1392px]"
        } flex flex-col items-center gap-8 py-16 px-4`}
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-black">
          <span className="px-8 py-1 rounded-full bg-[#6B8E23] text-white text-sm md:text-base">
            Go With The Homie
          </span>

          <h1 className="text-[2rem] md:text-[3rem] text-center font-semibold leading-[1.2] mt-4">
            View Where Your <br /> Buddies Are Going
          </h1>

          <p className="text-[0.9rem] md:text-[1rem] text-center w-full md:w-[70%] capitalize mt-4">
            The Top Travellers are on GoHomies
          </p>
        </div>

        {/* Feed Section */}
        <div className="relative top-[40px] md:top-[80px] w-full h-auto md:h-[100vh]">
          <div
            ref={containerRef}
            className="sticky top-[40px] md:top-[80px] h-auto md:h-[calc(100vh-82px)] flex flex-col md:flex-row items-start justify-between w-full gap-4"
          >
            

            <PostFeedCenter
              className={`${isStuck ? "overflow-hidden" : "overflow-auto"} z-20 w-full lg:flex-1`}
            />

            <div className="hidden lg:flex w-full lg:w-auto">
              <PostFeedRight />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostFeedSection;
