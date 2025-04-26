"use client";
import Image from "next/image";
import ImageComparison from "@/components/ImageComparison";
import ArrowRepeat from "@/public/icons/ArrowRepeat";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Preview() {
  const searchParams = useSearchParams();
  const image1Query = searchParams.get("image1");
  const image2Query = searchParams.get("image2");

  const [currentImage, setCurrentImage] = useState<string | null>(
    image1Query ? decodeURIComponent(image1Query) : "/models/men/1.png"
  );
  const [image1, setImage1] = useState<string | null>(
    image1Query ? decodeURIComponent(image1Query) : null
  );
  const [image2, setImage2] = useState<string | null>(
    image2Query ? decodeURIComponent(image2Query) : null
  );

  const handleRepeatClick = () => {
    if (currentImage === image1 && image2) {
      setCurrentImage(image2);
    } else if (currentImage === image2 && image1) {
      setCurrentImage(image1);
    } else if (image1) {
      setCurrentImage(image1); // Fallback to image1 if image2 is not available
    }
  };

  useEffect(() => {
    if (image1Query) {
      setImage1(decodeURIComponent(image1Query));
      setCurrentImage(decodeURIComponent(image1Query)); // Set initial image
    }
    if (image2Query) {
      setImage2(decodeURIComponent(image2Query));
    }
  }, [image1Query, image2Query]);

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-[73%] h-auto justify-center items-center">
        <div className="flex flex-row w-full justify-between items-center">
          {/* Result Photo Section */}
          <div className="relative flex justify-center items-center w-[300px] h-[400px] rounded-3xl shadow-xl border-2 border-[#171717] dark:border-white p-1">
            {currentImage && (
              <Image
                src={currentImage}
                alt="Result Image"
                layout="fill"
                objectFit="cover"
                className="rounded-3xl"
              />
            )}
            <button
              className="absolute top-2 right-2 bg-[#171717] p-1 rounded-full shadow-2xl hover:scale-105 transition-transform"
              onClick={handleRepeatClick}
            >
              <ArrowRepeat />
            </button>
          </div>
          <ImageComparison leftSource="/before.png" rightSource="/after.png" />
        </div>
      </div>
    </div>
  );
}
