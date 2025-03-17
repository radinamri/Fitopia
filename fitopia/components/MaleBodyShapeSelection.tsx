import NarrowShoulder from "@/public/body-shapes/male/shoulder/Narrow";
import AverageShoulder from "@/public/body-shapes/male/shoulder/Average";
import BroadShoulder from "@/public/body-shapes/male/shoulder/Broad";
import FlatBelly from "@/public/body-shapes/male/belly/Flat";
import AverageBelly from "@/public/body-shapes/male/belly/Average";
import RoundBelly from "@/public/body-shapes/male/belly/Round";
import { useState } from "react";

export default function MaleBodyShapeSelection({
//   onNext,
  onBack,
}: {
//   onNext: () => void;
  onBack: () => void;
}) {
  const [selectedMaleShoulder, setSelectedMaleShoulder] = useState<
    "Narrow" | "Average" | "Broad" | null
  >(null);
  const [selectedMaleBelly, setSelectedMaleBelly] = useState<
    "Flat" | "Average" | "Round" | null
  >(null);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div className="flex flex-row gap-4">
        <button
          className={`flex flex-col justify-center items-center p-4 border-2 rounded-xl ${
            selectedMaleShoulder === "Narrow"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedMaleShoulder("Narrow")}
        >
          <NarrowShoulder />
          <p className="font-semibold text-sm text-[#171717] mt-2">Narrow</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedMaleShoulder === "Average"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedMaleShoulder("Average")}
        >
          <AverageShoulder />
          <p className="font-semibold text-sm text-[#171717] mt-2">Average</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedMaleShoulder === "Broad"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedMaleShoulder("Broad")}
        >
          <BroadShoulder />
          <p className="font-semibold text-sm text-[#171717] mt-2">Broad</p>
        </button>
      </div>
      <div className="flex flex-row gap-4">
        <button
          className={`flex flex-col justify-center items-center p-4 border-2 rounded-xl ${
            selectedMaleBelly === "Flat"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedMaleBelly("Flat")}
        >
          <FlatBelly />
          <p className="font-semibold text-sm text-[#171717] mt-2">Flat</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedMaleBelly === "Average"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedMaleBelly("Average")}
        >
          <AverageBelly />
          <p className="font-semibold text-sm text-[#171717] mt-2">Average</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedMaleBelly === "Round"
              ? "border-[#171717]"
              : "border-gray-200"
          }`}
          onClick={() => setSelectedMaleBelly("Round")}
        >
          <RoundBelly />
          <p className="font-semibold text-sm text-[#171717] mt-2">Round</p>
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
