import Female from "@/public/icons/genders/Female";
import Male from "@/public/icons/genders/Male";
import { useState } from "react";

export default function GenderSelection({
  onNext,
  onBack,
}: {
  onNext: (gender: "Male" | "Female") => void;
  onBack: () => void;
}) {
  const [selectedGender, setSelectedGender] = useState<
    "Male" | "Female" | null
  >(null);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-bold text-2xl text-[#171717] mb-4">
        Choose Your Gender
      </p>
      <div className="flex gap-4">
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedGender === "Male" ? "border-[#171717]" : "border-gray-200"
          }`}
          onClick={() => setSelectedGender("Male")}
        >
          <Male />
          <p className="font-semibold text-sm text-[#171717] mt-2">Male</p>
        </button>
        <button
          className={`p-4 border-2 rounded-xl ${
            selectedGender === "Female" ? "border-[#171717]" : "border-gray-200"
          }`}
          onClick={() => setSelectedGender("Female")}
        >
          <Female />
          <p className="font-semibold text-sm text-[#171717] mt-2">Female</p>
        </button>
      </div>
      <div className="flex flex-row justify-center items-center w-full h-auto gap-4 mt-4">
        <button
          className="border-2 border-[#171717] rounded-xl p-2 pl-4 pr-4 font-medium text-md dark:text-[#171717] hover:text-white hover:bg-[#171717] transition-colors duration-200"
          onClick={onBack}
        >
          Close
        </button>
        <button
          className="border-2 border-[#171717] rounded-xl p-2 pl-4 pr-4 font-medium text-md dark:text-[#171717] hover:text-white hover:bg-[#171717] transition-colors duration-200"
          onClick={() => selectedGender && onNext(selectedGender)}
          disabled={!selectedGender}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
