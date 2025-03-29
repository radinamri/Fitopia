"use client";
import { useState } from "react";
import Upload from "@/public/icons/Upload";
import Image from "next/image";
import ArrowRightCircle from "@/public/icons/ArrowRightCircle";

export default function VirtualFittingRoom() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedClothingImage, setSelectedClothingImage] = useState<
    string | null
  >(null);
//   const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setSelectedImage(imageUrl);
    }
  };

  const handleClothingImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setSelectedClothingImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      {/* <div className="flex flex-col w-[85%] h-auto justify-center items-center bg-white rounded-4xl shadow-xl p-16 gap-8"> */}
      <div className="flex flex-row justify-between items-center gap-8">
        {/* Model Photo Section */}
        <div className="relative flex justify-center items-center w-[300px] h-[400px] rounded-3xl shadow-xl border-2 border-[#171717] dark:border-white p-1">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Uploaded Image"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          ) : (
            <div className="flex flex-col justify-center items-center gap-8">
              <Upload />
              <p className="font-bold text-md">Upload Your Photo</p>
              <input
                type="file"
                accept="image/*"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
              />
            </div>
          )}
        </div>
        <ArrowRightCircle />
        {/* Upload Clothing Photo Section */}
        <div className="relative flex justify-center items-center w-[300px] h-[400px] rounded-3xl shadow-xl border-2 border-[#171717] dark:border-white p-1">
          {selectedClothingImage ? (
            <Image
              src={selectedClothingImage}
              alt="Uploaded Image"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          ) : (
            <div className="flex flex-col justify-center items-center gap-8">
              <Upload />
              <p className="font-bold text-md">Upload Your Clothing Photo</p>
              <input
                type="file"
                accept="image/*"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={handleClothingImageChange}
              />
            </div>
          )}
        </div>
        <ArrowRightCircle />
        {/* Result Photo Section */}
        <div className="relative flex justify-center items-center w-[300px] h-[400px] rounded-3xl shadow-xl border-2 border-[#171717] dark:border-white p-1">
          {selectedImage ? (
            <Image
              src={selectedImage}
              alt="Result Image"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
          ) : (
            <div className="flex flex-col justify-center items-center gap-8">
              <p className="font-bold text-md">Result Photo</p>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
