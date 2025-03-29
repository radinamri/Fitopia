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
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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

  const handleTryOn = async () => {
    if (!selectedImage || !selectedClothingImage) {
      alert("Please upload both your photo and a clothing item.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "userPhoto",
        await fetch(selectedImage).then((r) => r.blob()),
        "user.jpg"
      );
      formData.append(
        "clothingPhoto",
        await fetch(selectedClothingImage).then((r) => r.blob()),
        "clothing.png"
      );

      const response = await fetch("http://localhost:8000/api/try-on", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.status === "success") {
        const resultResponse = await fetch(
          `http://localhost:8000/api/result/${result.result_id}`
        );
        const resultData = await resultResponse.json();
        setResultImage(`data:image/png;base64,${resultData.resultPhoto}`);
      }
    } catch (error) {
      console.error("Try-on error:", error);
      alert("Error processing try-on");
    } finally {
      setLoading(false);
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
        <div className="flex flex-col justify-center items-center gap-8">
          <ArrowRightCircle />
          <button
            onClick={handleTryOn}
            disabled={loading}
            className="border-2 rounded-xl p-2 font-bold text-md hover:bg-gray-800 hover:text-white transition-colors"
          >
            {loading ? "Processing..." : "Try On"}
          </button>
        </div>
        {/* Result Photo Section */}
        <div className="relative flex justify-center items-center w-[300px] h-[400px] rounded-3xl shadow-xl border-2 border-[#171717] dark:border-white p-1">
          {resultImage ? (
            <Image
              src={resultImage}
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
