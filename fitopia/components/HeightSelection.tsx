import { useState } from "react";

export default function HeightSelection({
  onNext,
  onBack,
}: {
  onNext: (height: number) => void;
  onBack: () => void;
}) {
  const [selectedHeight, setSelectedHeight] = useState();

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <p className="font-bold text-2xl text-[#171717] mb-4">
        Enter Your Height
      </p>
      <input
        type="number"
        placeholder="Height (cm)"
        className="border-2 border-[#171717] text-[#171717] p-2 rounded-lg w-full"
        required
        onChange={() => setSelectedHeight}
      />
      <div className="flex flex-row justify-center items-center w-full h-auto gap-4 mt-4">
        <button
          className="border-2 border-[#171717] rounded-xl p-2 pl-4 pr-4 font-medium text-md dark:text-[#171717] hover:text-white hover:bg-[#171717] transition-colors duration-200"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="border-2 border-[#171717] rounded-xl p-2 pl-4 pr-4 font-medium text-md dark:text-[#171717] hover:text-white hover:bg-[#171717] transition-colors duration-200"
          onClick={() => selectedHeight && onNext(selectedHeight)}
          disabled={!selectedHeight}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
