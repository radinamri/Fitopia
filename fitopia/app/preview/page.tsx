"use client";
import Image from "next/image";
import ImageComparison from "@/components/ImageComparison";
import ArrowRepeat from "@/public/icons/ArrowRepeat";
import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PersonStanding from "@/public/icons/PersonStanding";
import Download from "@/public/icons/Download";
import Share from "@/public/icons/Share";
import Plus from "@/public/icons/Plus";

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

  const downloadImage = useCallback(
    (imageUrl: string | null, filename: string) => {
      if (imageUrl) {
        fetch(imageUrl)
          .then((response) => response.blob())
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
          });
      }
    },
    []
  );

  const handleSaveClick = () => {
    if (image1) {
      downloadImage(image1, "fitopia_model_photo.png");
    }
    if (image2) {
      downloadImage(image2, "fitopia_result_photo.png");
    } else if (image1) {
      downloadImage(image1, "result_photo.png"); // If only one image is available
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-[60%] h-auto justify-center items-center">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col justify-center items-center">
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
          </div>
          <ImageComparison
            leftSource="/models/men/1.png"
            rightSource="/models/men/3.png"
            width={300}
            height={400}
          />
          <div className="flex flex-col justify-center items-center gap-4">
            <button
              className="flex flex-row justify-center items-center w-full font-medium text-md bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-xl p-2 hover:scale-105 gap-2"
              onClick={handleSaveClick}
            >
              <Download />
              Save
            </button>
            <button className="flex flex-row justify-center items-center w-full font-medium text-md bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-xl p-2 hover:scale-105 gap-2">
              <Share />
              Share
            </button>
            <button className="flex flex-row justify-center items-center w-full font-medium text-md bg-[#171717] dark:bg-white text-white dark:text-[#171717] rounded-xl p-2 hover:scale-105 gap-2">
              <Plus />
              Add More Cloth
            </button>
            <Link
              className="flex flex-row justify-center items-center font-medium text-md hover:underline hover:underline-offset-4 duration-200 gap-1"
              href={"/room"}
            >
              <PersonStanding />
              Edit Person Model Photo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
