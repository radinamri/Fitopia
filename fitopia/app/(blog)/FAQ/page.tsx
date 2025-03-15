import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function FAQ() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-[85%] justify-center items-center gap-8">
        <p className="font-semibold  text-3xl">Frequently Asked Questions</p>
        {/* General Questions */}
        <div className="flex flex-col w-full h-auto bg-white rounded-4xl shadow-xl p-16 gap-8">
          <p className="font-semibold text-2xl dark:text-[#171717]">
            General Questions
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-md dark:text-[#171717]">
                What Is Virtual Try On?
              </AccordionTrigger>
              <AccordionContent className="font-medium  text-md dark:text-[#171717]">
                Virtual try on is a technology that allows users to see how an
                item of clothing would look on them without having to physically
                try it on. This can be done either by using a 3D model of the
                user, or by taking a photo of the user and superimposing the
                clothes onto them.
              </AccordionContent>
            </AccordionItem>
            <div className="border-b"></div>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold  text-md dark:text-[#171717]">
                How Does Virtual Try On Work?
              </AccordionTrigger>
              <AccordionContent className="font-medium  text-md dark:text-[#171717]">
                Virtual try on works by using a 3D model of the user, or by
                taking a photo of the user and superimposing the clothes onto
                them. This allows the user to see how an item of clothing would
                look on them without having to physically try it on.
              </AccordionContent>
            </AccordionItem>
            <div className="border-b"></div>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold  text-md dark:text-[#171717]">
                What Are the Benefits of Virtual Try On?
              </AccordionTrigger>
              <AccordionContent className="font-medium text-md dark:text-[#171717]">
                Virtual try-on technology offers numerous benefits for both
                shoppers and retailers. It saves time by allowing customers to
                see how items look on them without physical trials, reducing
                hassle, especially for busy shoppers. It minimizes returns by
                enabling customers to confirm their preferences before
                purchasing. This, in turn, boosts sales, as shoppers are more
                confident in their choices. Additionally, it enhances the
                shopping experience by providing a personalized and enjoyable
                way to visualize products in their own environment. Overall,
                virtual try-on improves efficiency, satisfaction, and sales in
                both e-commerce and in-store retail.
              </AccordionContent>
            </AccordionItem>
            <div className="border-b"></div>
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-semibold  text-md dark:text-[#171717]">
                How Accurate Is Virtual Try-On?
              </AccordionTrigger>
              <AccordionContent className="font-medium text-md dark:text-[#171717]">
                When it comes to virtual try-on, accuracy is key. If the
                software isn’t accurate, it can cause major problems with the
                fit of the clothes. This can lead to clothes that are too big or
                too small, and it can even cause clothes to not fit at all.
                FITOPIA-AI creates a highly accurate 3D model of the consumer’s
                body from just 5 measurements. Together with the technical
                specifications of the garment, we give the most accurate size
                recommendation today. This ensures that the clothes you’re
                trying on in the virtual environment will also fit perfectly in
                reality, every time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* Scanning Questions */}
        <div className="flex flex-col w-full h-auto bg-white rounded-4xl shadow-xl p-16 gap-8">
          <p className="font-semibold text-2xl dark:text-[#171717]">
            Scanning Questions
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold  text-md dark:text-[#171717]">
                Are there specific clothing requirements?
              </AccordionTrigger>
              <AccordionContent className="font-medium text-md dark:text-[#171717]">
                FITOPIA-AI works best when users wear tight-fitted bottoms (ie,
                leggings) and tops (ie, tight tee shirt, tank top, sports bra).
              </AccordionContent>
            </AccordionItem>
            <div className="border-b"></div>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-semibold text-md dark:text-[#171717]">
                How long does it take to scan?
              </AccordionTrigger>
              <AccordionContent className="font-medium  text-md dark:text-[#171717]">
                Scanning is a breeze — completed in under 3 minutes. The moment
                a scan is done, measurements appear instantly in your admin
                panel. Fast and efficient, just like your business needs to be.
              </AccordionContent>
            </AccordionItem>
            <div className="border-b"></div>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-semibold text-md dark:text-[#171717]">
                What if the user is alone? How do they scan?
              </AccordionTrigger>
              <AccordionContent className="font-medium  text-md dark:text-[#171717]">
                We offer two options for customers to scan themselves: ‘With a
                friend’ mode, where another person can take the scan, or
                ‘Hands-free’ mode, where our voice control guides the user
                through a quick scan by themselves, using a desk-high table to
                angle the phone making the process quick and easy.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* Product Questions */}
        <div className="flex flex-col w-full h-auto bg-white rounded-4xl shadow-xl p-16 gap-8">
          <p className="font-semibold  text-2xl dark:text-[#171717]">
            Product Questions
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold text-md dark:text-[#171717]">
                Can users check their measurements?
              </AccordionTrigger>
              <AccordionContent className="font-medium text-md dark:text-[#171717]">
                Sure. We provide all user measurements directly in your
                FITOPIA-AI profile upon scan completion.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        {/* Additional Questions */}
        <div className="flex flex-col w-full h-auto justify-center items-center bg-white rounded-4xl shadow-xl p-16 gap-8">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="flex flex-col justify-center items-start">
              <div>
                <p className="font-bold text-3xl dark:text-[#171717]">
                  Have additional questions?
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-start gap-4">
              <div>
                <p className="font-medium text-md dark:text-[#171717]">
                  Customer Support
                </p>
                <p className="font-bold text-3xl dark:text-[#171717]">
                  fitopia.ai@gmail.com
                </p>
              </div>
              <Link
                className="border-2 border-[#171717] rounded-xl p-2 pl-4 pr-4 font-bold text-lg dark:text-[#171717] hover:text-white hover:bg-[#171717] transition-colors duration-200"
                href={"/FAQ"}
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
