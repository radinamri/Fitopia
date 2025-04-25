"use client";
import { useState } from "react";
import Upload from "@/public/icons/Upload";
import Image from "next/image";
import XIcon from "@/public/icons/XIcon";
import Link from "next/link";

const menModels = [
  { src: "/models/men/1.png" },
  { src: "/models/men/2.png" },
  { src: "/models/men/3.png" },
  { src: "/models/men/4.png" },
  { src: "/models/men/5.png" },
  { src: "/models/men/6.png" },
  { src: "/models/men/7.png" },
  { src: "/models/men/8.png" },
  { src: "/models/men/9.png" },
  { src: "/models/men/10.png" },
  { src: "/models/men/11.png" },
  { src: "/models/men/12.png" },
  { src: "/models/men/13.png" },
  { src: "/models/men/14.png" },
  { src: "/models/men/15.png" },
  { src: "/models/men/16.png" },
];

const womenModels = [
  { src: "/models/women/1.png" },
  { src: "/models/women/2.png" },
  { src: "/models/women/3.png" },
  { src: "/models/women/4.png" },
  { src: "/models/women/5.png" },
  { src: "/models/women/6.png" },
  { src: "/models/women/7.png" },
  { src: "/models/women/8.png" },
  { src: "/models/women/9.png" },
  { src: "/models/women/10.png" },
  { src: "/models/women/11.png" },
  { src: "/models/women/12.png" },
  { src: "/models/women/13.png" },
  { src: "/models/women/14.png" },
  { src: "/models/women/15.png" },
  { src: "/models/women/16.png" },
  { src: "/models/women/17.png" },
  { src: "/models/women/18.png" },
  { src: "/models/women/19.png" },
  { src: "/models/women/20.png" },
  { src: "/models/women/21.png" },
  { src: "/models/women/22.png" },
  { src: "/models/women/23.png" },
  { src: "/models/women/24.png" },
  { src: "/models/women/25.png" },
  { src: "/models/women/26.png" },
  { src: "/models/women/27.png" },
  { src: "/models/women/28.png" },
  { src: "/models/women/29.png" },
  { src: "/models/women/30.png" },
  { src: "/models/women/31.png" },
  { src: "/models/women/32.png" },
  { src: "/models/women/33.png" },
  { src: "/models/women/34.png" },
  { src: "/models/women/35.png" },
  { src: "/models/women/36.png" },
  { src: "/models/women/37.png" },
];

export default function VirtualFittingRoom() {
  const MODELS_PER_PAGE = 8;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedClothingImage, setSelectedClothingImage] = useState<
    string | null
  >(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("upper");
  const [selectedPersonModel, setSelectedPersonModel] = useState<{
    src: string;
  } | null>(null);
  const [activeGender, setActiveGender] = useState<"men" | "women">("men");
  const [currentPage, setCurrentPage] = useState(1);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setSelectedImage(imageUrl);
      setSelectedPersonModel(null); // Clear selected model if uploading
    }
  };

  const handlePersonModelClick = (model: { src: string }) => {
    setSelectedPersonModel(model);
    setSelectedImage(null); // Clear uploaded image if choosing a model
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
    const sourceImage = selectedImage || selectedPersonModel?.src;

    if (!sourceImage || !selectedClothingImage) {
      alert("Please upload or select both a person photo and a clothing item.");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append(
        "userPhoto",
        await fetch(sourceImage).then((r) => r.blob()),
        "user.jpg"
      );
      formData.append(
        "clothingPhoto",
        await fetch(selectedClothingImage).then((r) => r.blob()),
        "clothing.png"
      );
      formData.append("category", category);

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

  const currentModels = activeGender === "men" ? menModels : womenModels;
  const totalPages = Math.ceil(currentModels.length / MODELS_PER_PAGE);
  const paginatedModels = currentModels.slice(
    (currentPage - 1) * MODELS_PER_PAGE,
    currentPage * MODELS_PER_PAGE
  );

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-[50%] h-auto justify-center items-center">
        <div className="flex flex-row w-full justify-between items-center">
          {/* Model Photo Section */}
          <div className="relative flex justify-center items-center w-[300px] h-[400px] rounded-3xl shadow-xl border-2 border-[#171717] dark:border-white">
            {selectedImage || selectedPersonModel ? (
              <>
                <Image
                  src={selectedImage || selectedPersonModel!.src}
                  alt="Person Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl"
                />
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setSelectedPersonModel(null);
                  }}
                  className="absolute top-2 right-2 bg-[#171717] p-1 rounded-full shadow-2xl hover:scale-105 transition-transform"
                >
                  <XIcon />
                </button>
              </>
            ) : (
              <div className="relative flex justify-center items-center w-full h-full">
                {/* Background Image */}
                <Image
                  src="/avatars/background.png"
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-3xl opacity-50 z-0"
                />
                {/* Upload UI */}
                <div className="flex flex-col justify-center items-center gap-4 z-10">
                  <Upload />
                  <p className="font-bold text-md">Upload Your Photo</p>
                </div>
                {/* File input */}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </div>
            )}
          </div>
          {/* Upload Clothing Photo Section */}
          <div className="flex flex-col justify-center items-center gap-8">
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
                <div className="flex flex-col justify-center items-center gap-4">
                  <Upload />
                  <p className="font-bold text-md">
                    Upload Your Clothing Photo
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute w-full h-full opacity-0 cursor-pointer"
                    onChange={handleClothingImageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-[51%] h-auto justify-center items-center">
        <div className="flex flex-row w-full justify-between items-start">
          <div className="flex flex-col justify-center items-center gap-4">
            {/* Gender Selection */}
            <div className="flex flex-row justify-center items-center gap-8">
              <div
                className={`font-medium text-md cursor-pointer transition-colors duration-200 ${
                  activeGender === "men"
                    ? "underline underline-offset-4 text-[#171717] dark:text-white"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveGender("men");
                  setCurrentPage(1);
                }}
              >
                Men
              </div>
              <div
                className={`font-medium text-md cursor-pointer transition-colors duration-200 ${
                  activeGender === "women"
                    ? "underline underline-offset-4 text-[#171717] dark:text-white"
                    : "text-gray-500"
                }`}
                onClick={() => {
                  setActiveGender("women");
                  setCurrentPage(1);
                }}
              >
                Women
              </div>
            </div>
            {/* Person Model Selector */}
            <div className="grid grid-cols-4 gap-2">
              {paginatedModels.map((model, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePersonModelClick(model)}
                  className={`w-[70px] h-[91px] border-2 rounded-xl cursor-pointer overflow-hidden transition-transform duration-200 hover:scale-105 ${
                    selectedPersonModel?.src === model.src
                      ? "border-[#171717] dark:border-white"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={model.src}
                    alt={`Model ${idx + 1}`}
                    width={70}
                    height={91}
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`text-sm font-medium px-2 py-1 rounded-md border-1 ${
                    currentPage === i + 1
                      ? "bg-[#171717] text-white dark:bg-white dark:text-[#171717]"
                      : "text-[#171717] border-[#171717] dark:text-white dark:border-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <Link
              className="flex flex-row justify-center items-center font-medium text-md pr-8 hover:underline hover:underline-offset-4 duration-200"
              href={"/clothes"}
            >
              Choose cloth photo from Clothes
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        {/* 🔥 Dropdown Category Selector */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-[#171717] dark:border-white rounded-lg p-2 text-md font-bold"
        >
          <option value="upper">Upper</option>
          <option value="lower">Lower</option>
          <option value="overall">Overall</option>
        </select>
        <button
          onClick={handleTryOn}
          disabled={loading}
          className="border-2 rounded-xl p-2 font-bold text-md hover:bg-[#171717] hover:text-white dark:hover:bg-white dark:hover:text-[#171717] transition-colors"
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
  );
}
