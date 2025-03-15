import ImageComparison from "@/components/ImageComparison";
import Camera from "@/public/icons/Camera";
import PersonStanding from "@/public/icons/PersonStanding";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <video
        className="w-full h-full object-cover filter brightness-20 z-1"
        src="/videos/virtual-try-on.mp4"
        autoPlay
        loop
        muted
      />
      <div className="absolute top-64 left-0 right-0 flex flex-col items-center justify-center gap-8 z-20">
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-4xl text-white">
            TRY ON The Future of Fashion
          </p>
          <p className="font-bold text-2xl text-white">
            “Your Perfect Outfit, One Click Away!”
          </p>
        </div>
        <div className="flex flex-row justify-center items-center gap-16">
          <Link
            className="flex flex-row justify-center items-center font-medium text-lg text-white hover:underline hover:underline-offset-4 transition-colors duration-200 gap-1"
            href={"/"}
          >
            <PersonStanding />
            Create Avatar
          </Link>
          <Link
            className="flex flex-row justify-center items-center font-medium text-lg text-white hover:underline hover:underline-offset-4 transition-colors duration-200 gap-1"
            href={"/"}
          >
            <Camera />
            Upload Photo
          </Link>
        </div>
      </div>
      <div className="flex flex-col w-[85%] h-auto justify-center items-center bg-white rounded-4xl shadow-xl p-16 gap-8">
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col justify-center items-start gap-16">
            <div>
              <p className="font-bold text-4xl dark:text-[#171717]">
                TRY ON The Future of Fashion
              </p>
              <p className="font-bold text-2xl dark:text-[#171717]">
                “Your Perfect Outfit, One Click Away!”
              </p>
            </div>
            <div className="flex flex-row w-full justify-start items-center gap-8">
              <Link
                className="border-2 border-[#171717] rounded-xl p-2 pl-4 pr-4 font-bold text-md dark:text-[#171717] hover:text-white hover:bg-[#171717] transition-colors duration-200"
                href={"/try-on"}
              >
                Virtual Try On
              </Link>
              <Link
                className="font-medium text-md dark:text-[#171717] hover:underline hover:underline-offset-4 transition-colors duration-200"
                href={"/about"}
              >
                About FITOPIA-AI
              </Link>
            </div>
          </div>
          <ImageComparison leftSource="/before.png" rightSource="/after.png" />
        </div>
      </div>
    </div>
  );
}
