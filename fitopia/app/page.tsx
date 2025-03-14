import ImageComparison from "@/components/ImageComparison";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-16 font-[family-name:var(--font-geist-sans)]">
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
                href={"/"}
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
