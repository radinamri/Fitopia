"use client";
import Image from "next/image";
import ImageComparison from "@/components/ImageComparison";
import ArrowRepeat from "@/public/icons/ArrowRepeat";

export default function Preview() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-4 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-[73%] h-auto justify-center items-center">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="relative flex justify-center items-center w-[300px] h-[400px] rounded-3xl shadow-xl border-2 border-[#171717] dark:border-white p-1">
            <Image
              src={"/models/men/1.png"}
              alt="Result Image"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl"
            />
            <button className="absolute top-2 right-2 bg-[#171717] p-1 rounded-full shadow-2xl hover:scale-105 transition-transform">
              <ArrowRepeat />
            </button>
          </div>
          <ImageComparison leftSource="/before.png" rightSource="/after.png" />
        </div>
      </div>
    </div>
  );
}
