import Link from "next/link";
import TeamMemberCard from "@/components/TeamMemberCard";

export default function About() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-8 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-[85%] h-auto bg-white rounded-4xl shadow-xl p-16 gap-8">
        <p className="font-semibold text-3xl dark:text-[#171717]">
          About FITOPIA-AI
        </p>
        <p className="font-medium text-md dark:text-[#171717]">
          FITOPIA-AI is the leading provider of virtual try-on and virtual
          fashion image generation technology. Its FITOPIA-AI platform enables
          fashion brands and retailers to seamlessly integrate virtual dressing
          rooms and photorealistic avatars into their website, app, and in-store
          solutions. For consumers, the platform creates photorealistic avatars
          of shoppers, enabling accurate size recommendations across brands.
          Avatars can be dressed interactively, offering unlimited outfit
          combinations and virtual background scenes. When using FITOPIA-AI,
          retailers report a 6x growth in sales.
        </p>
        <p className="font-medium text-md dark:text-[#171717]">
          FITOPIA-AI works by transforming existing product photos into virtual
          assets using Artificial Intelligence (AI) to create virtual but
          photorealistic on-model fashion images on demand. These assets can be
          used across multiple phases in a product’s lifecycle – including
          design, planning, visual merchandising, and virtual fitting. The
          process is quick and easy to integrate, enabling retailers to capture
          garments, accessories, shoes, and bags in a matter of minutes.
        </p>
      </div>
      <div className="flex flex-col w-[85%] h-auto justify-center items-center border-4 border-[#171717] dark:border-[#ffffff] rounded-4xl p-16 gap-4">
        <p className="font-semibold text-2xl">
          “FITOPIA AI powers 100+ boutiques with seamless virtual try-on”
        </p>
        <Link
          className="font-medium text-md hover:underline hover:underline-offset-4 transition-colors duration-200"
          href={"/stores"}
        >
          Read more
        </Link>
      </div>
      <div className="flex flex-col w-[85%] h-auto justify-center items-center rounded-4xl p-16 gap-16">
        <p className="font-bold text-5xl">Our Team</p>
        <div className="flex flex-col w-full h-auto justify-center items-center">
          {/* Team Section */}
          <div className="flex flex-row w-full justify-evenly items-center">
            {/* Member 1 */}
            <TeamMemberCard
              name="Radin Amri"
              role="Co-Founder"
              imageSrc="/MW.png"
            />
            {/* Member 2 */}
            <TeamMemberCard
              name="Vargha Khallokhi"
              role="Co-Founder"
              imageSrc="/Waternoose.png"
            />
          </div>
        </div>
      </div>
      {/* Additional Questions */}
      <div className="flex flex-col w-[85%] h-auto justify-center items-center bg-white rounded-4xl shadow-xl p-16 gap-8">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold text-3xl dark:text-[#171717]">
              Wanna try our demo model?
            </p>
            <Link
              className="font-medium text-md dark:text-[#171717] hover:underline hover:underline-offset-4 transition-colors duration-200"
              href={"/"}
            >
              Click Here
            </Link>
          </div>
          <div className="flex flex-col justify-center items-start">
            <p className="font-bold text-3xl dark:text-[#171717]">
              Have additional questions?
            </p>
            <Link
              className="font-medium text-md dark:text-[#171717] hover:underline hover:underline-offset-4 transition-colors duration-200"
              href={"/FAQ"}
            >
              Read FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
