// ClothingItem.tsx
import Image from "next/image";

interface ClothingItemProps {
  source: string;
  width: number;
  height: number;
  name: string;
  price: string;
  onClick: (clothing: { src: string; name: string; price: string }) => void;
  onTryOn: (src: string) => void;
}

export default function ClothingItem({
  source,
  width,
  height,
  name,
  price,
  onClick,
  onTryOn,
}: ClothingItemProps) {
  return (
    <div
      className="flex flex-col justify-center items-center bg-white rounded-3xl shadow-xl p-4 gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer"
      onClick={() => onClick({ src: source, name, price })}
    >
      <Image
        src={source}
        alt={name}
        width={width}
        height={height}
        className="rounded-lg"
      />
      <p className="mt-2 text-md font-bold text-[#171717] transition-all duration-200 hover:underline text-center">
        {name}
      </p>
      <p className="text-sm font-semibold text-gray-500">{price}</p>
      <button
        className="flex flex-row justify-center items-center font-semibold text-sm bg-[#171717] text-white p-2 rounded-xl pl-4 pr-4 hover:scale-105"
        onClick={() => onTryOn(source)}
      >
        TRY ON
      </button>
    </div>
  );
}
