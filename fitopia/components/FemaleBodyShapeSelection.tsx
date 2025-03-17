import Hourglass from "@/public/body-shapes/female/body-shapes/Hourglass";
import Straight from "@/public/body-shapes/female/body-shapes/Straight";
import Pear from "@/public/body-shapes/female/body-shapes/Pear";
import InvertedTringle from "@/public/body-shapes/female/body-shapes/InvertedTringle";
import Apple from "@/public/body-shapes/female/body-shapes/Apple";
import FlatterFigure from "@/public/body-shapes/female/belly/Flatter";
import AverageFigure from "@/public/body-shapes/female/belly/Average";
import CurvierFigure from "@/public/body-shapes/female/belly/Curvier";
import { useState } from "react";

export default function FemaleBodyShapeSelection({
//   onNext,
  onBack,
}: {
//   onNext: () => void;
  onBack: () => void;
}) {
  const [selectedFemaleBodyShape, setSelectedFemaleBodyShape] = useState<
    "Hourglass" | "Straight" | "Pear" | "Inverted Tringle" | "Apple" | null
  >(null);
  const [selectedFemaleBelly, setSelectedFemaleBelly] = useState<
    "Flatter" | "Average" | "Curvier" | null
  >(null);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-row gap-4">
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedFemaleBodyShape === "Hourglass"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedFemaleBodyShape("Hourglass")}
        >
          <Hourglass />
          <p className="font-semibold text-sm text-[#171717] mt-2">Hourglass</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedFemaleBodyShape === "Straight"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedFemaleBodyShape("Straight")}
        >
          <Straight />
          <p className="font-semibold text-sm text-[#171717] mt-2">Straight</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedFemaleBodyShape === "Pear"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedFemaleBodyShape("Pear")}
        >
          <Pear />
          <p className="font-semibold text-sm text-[#171717] mt-2">Pear</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedFemaleBodyShape === "Inverted Tringle"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedFemaleBodyShape("Inverted Tringle")}
        >
          <InvertedTringle />
          <p className="font-semibold text-sm text-[#171717] mt-2">
            Inverted Tringle
          </p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedFemaleBodyShape === "Apple"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedFemaleBodyShape("Apple")}
        >
          <Apple />
          <p className="font-semibold text-sm text-[#171717] mt-2">Apple</p>
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <button
          className={`flex flex-col justify-center items-center p-4 border-2 rounded-xl ${
            selectedFemaleBelly === "Flatter"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedFemaleBelly("Flatter")}
        >
          <FlatterFigure />
          <p className="font-semibold text-sm text-[#171717] mt-2">Flatter</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedFemaleBelly === "Average"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedFemaleBelly("Average")}
        >
          <AverageFigure />
          <p className="font-semibold text-sm text-[#171717] mt-2">Average</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedFemaleBelly === "Curvier"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedFemaleBelly("Curvier")}
        >
          <CurvierFigure />
          <p className="font-semibold text-sm text-[#171717] mt-2">Curvier</p>
        </button>
      </div>
      <div className="flex flex-row justify-center items-center w-full h-auto gap-4 mt-4">
        <button
          className="border-2 border-[#171717] rounded-xl p-2 pl-4 pr-4 font-medium text-md dark:text-[#171717] hover:text-white hover:bg-[#171717] transition-colors duration-200"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="border-2 border-[#171717] rounded-xl p-2 pl-4 pr-4 font-medium text-md dark:text-[#171717] hover:text-white hover:bg-[#171717] transition-colors duration-200"
        //   onClick={() => selectedGender && onNext(selectedGender)}
        //   disabled={!selectedGender}
        >
          Next
        </button>
      </div>
    </div>
  );
}
