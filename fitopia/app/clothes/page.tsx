"use client";
import Modal from "@/components/Modal";
import Image from "next/image";
import { useState } from "react";

const clothes = [
  { src: "/clothes/upper/1.png", name: "Casual Shirt", price: "$29.99" },
  { src: "/clothes/upper/2.png", name: "Formal Shirt", price: "$34.99" },
  { src: "/clothes/upper/3.png", name: "Leather Jacket", price: "$99.99" },
  { src: "/clothes/upper/4.png", name: "Winter Jacket", price: "$120.00" },
  { src: "/clothes/upper/5.png", name: "Denim Jeans", price: "$45.50" },
  { src: "/clothes/upper/6.png", name: "Chino Pants", price: "$40.00" },
  { src: "/clothes/upper/7.png", name: "Sneakers", price: "$60.00" },
  { src: "/clothes/upper/8.png", name: "Formal Shoes", price: "$75.00" },
  { src: "/clothes/lower/1.png", name: "Summer Dress", price: "$55.99" },
  { src: "/clothes/lower/2.png", name: "Evening Gown", price: "$140.00" },
  { src: "/clothes/lower/3.png", name: "Casual Hoodie", price: "$39.99" },
  { src: "/clothes/lower/4.png", name: "Zipped Hoodie", price: "$49.99" },
  { src: "/clothes/lower/5.png", name: "Mini Skirt", price: "$25.99" },
  { src: "/clothes/overall/1.png", name: "Maxi Skirt", price: "$30.99" },
  { src: "/clothes/overall/2.png", name: "Graphic T-Shirt", price: "$19.99" },
  { src: "/clothes/overall/3.png", name: "Plain T-Shirt", price: "$14.99" },
  { src: "/clothes/overall/4.png", name: "Casual Shirt", price: "$14.99" },
  { src: "/clothes/upper/1.png", name: "Casual Shirt", price: "$29.99" },
  { src: "/clothes/upper/2.png", name: "Formal Shirt", price: "$34.99" },
  { src: "/clothes/upper/3.png", name: "Leather Jacket", price: "$99.99" },
  { src: "/clothes/upper/4.png", name: "Winter Jacket", price: "$120.00" },
  { src: "/clothes/upper/5.png", name: "Denim Jeans", price: "$45.50" },
  { src: "/clothes/upper/6.png", name: "Chino Pants", price: "$40.00" },
  { src: "/clothes/upper/7.png", name: "Sneakers", price: "$60.00" },
  { src: "/clothes/upper/8.png", name: "Formal Shoes", price: "$75.00" },
  { src: "/clothes/lower/1.png", name: "Summer Dress", price: "$55.99" },
  { src: "/clothes/lower/2.png", name: "Evening Gown", price: "$140.00" },
  { src: "/clothes/lower/3.png", name: "Casual Hoodie", price: "$39.99" },
  { src: "/clothes/lower/4.png", name: "Zipped Hoodie", price: "$49.99" },
  { src: "/clothes/lower/5.png", name: "Mini Skirt", price: "$25.99" },
  { src: "/clothes/overall/1.png", name: "Maxi Skirt", price: "$30.99" },
  { src: "/clothes/overall/2.png", name: "Graphic T-Shirt", price: "$19.99" },
  { src: "/clothes/overall/3.png", name: "Plain T-Shirt", price: "$14.99" },
  { src: "/clothes/overall/4.png", name: "Casual Shirt", price: "$14.99" },
  { src: "/clothes/upper/1.png", name: "Casual Shirt", price: "$29.99" },
  { src: "/clothes/upper/2.png", name: "Formal Shirt", price: "$34.99" },
  { src: "/clothes/upper/3.png", name: "Leather Jacket", price: "$99.99" },
  { src: "/clothes/upper/4.png", name: "Winter Jacket", price: "$120.00" },
  { src: "/clothes/upper/5.png", name: "Denim Jeans", price: "$45.50" },
  { src: "/clothes/upper/6.png", name: "Chino Pants", price: "$40.00" },
  { src: "/clothes/upper/7.png", name: "Sneakers", price: "$60.00" },
  { src: "/clothes/upper/8.png", name: "Formal Shoes", price: "$75.00" },
  { src: "/clothes/lower/1.png", name: "Summer Dress", price: "$55.99" },
  { src: "/clothes/lower/2.png", name: "Evening Gown", price: "$140.00" },
  { src: "/clothes/lower/3.png", name: "Casual Hoodie", price: "$39.99" },
  { src: "/clothes/lower/4.png", name: "Zipped Hoodie", price: "$49.99" },
  { src: "/clothes/lower/5.png", name: "Mini Skirt", price: "$25.99" },
  { src: "/clothes/overall/1.png", name: "Maxi Skirt", price: "$30.99" },
  { src: "/clothes/overall/2.png", name: "Graphic T-Shirt", price: "$19.99" },
  { src: "/clothes/overall/3.png", name: "Plain T-Shirt", price: "$14.99" },
  { src: "/clothes/overall/4.png", name: "Casual Shirt", price: "$14.99" },
  { src: "/clothes/upper/1.png", name: "Casual Shirt", price: "$29.99" },
  { src: "/clothes/upper/2.png", name: "Formal Shirt", price: "$34.99" },
  { src: "/clothes/upper/3.png", name: "Leather Jacket", price: "$99.99" },
  { src: "/clothes/upper/4.png", name: "Winter Jacket", price: "$120.00" },
  { src: "/clothes/upper/5.png", name: "Denim Jeans", price: "$45.50" },
  { src: "/clothes/upper/6.png", name: "Chino Pants", price: "$40.00" },
  { src: "/clothes/upper/7.png", name: "Sneakers", price: "$60.00" },
  { src: "/clothes/upper/8.png", name: "Formal Shoes", price: "$75.00" },
  { src: "/clothes/lower/1.png", name: "Summer Dress", price: "$55.99" },
  { src: "/clothes/lower/2.png", name: "Evening Gown", price: "$140.00" },
  { src: "/clothes/lower/3.png", name: "Casual Hoodie", price: "$39.99" },
  { src: "/clothes/lower/4.png", name: "Zipped Hoodie", price: "$49.99" },
  { src: "/clothes/lower/5.png", name: "Mini Skirt", price: "$25.99" },
  { src: "/clothes/overall/1.png", name: "Maxi Skirt", price: "$30.99" },
  { src: "/clothes/overall/2.png", name: "Graphic T-Shirt", price: "$19.99" },
  { src: "/clothes/overall/3.png", name: "Plain T-Shirt", price: "$14.99" },
  { src: "/clothes/overall/4.png", name: "Casual Shirt", price: "$14.99" },
];

const ITEMS_PER_PAGE = 64; // 8 rows * 8 columns

export default function Clothes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedClothing, setSelectedClothing] = useState<{
    src: string;
    name: string;
    price: string;
  } | null>(null);
  const totalPages = Math.ceil(clothes.length / ITEMS_PER_PAGE);

  const paginatedClothes = clothes.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handleClothingClick = (clothing: {
    src: string;
    name: string;
    price: string;
  }) => {
    setSelectedClothing(clothing);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-[85%] justify-center items-center gap-8">
        {/* Grid Container for 8x8 Layout */}
        <div className="grid grid-cols-8 gap-6 w-full">
          {paginatedClothes.map(({ src, name, price }, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center"
            >
              <div
                className="flex flex-col justify-center items-center bg-white rounded-3xl shadow-xl p-4 gap-2 transition-transform duration-200 hover:scale-105 cursor-pointer"
                onClick={() => handleClothingClick({ src, name, price })}
              >
                <Image
                  src={src}
                  alt={name}
                  width={120} // Adjusted size for 8x8 grid
                  height={120}
                  className="rounded-lg"
                />
                <p className="mt-2 text-md font-bold text-[#171717] transition-all duration-200 hover:underline text-center">
                  {name}
                </p>
                <p className="text-sm font-semibold text-gray-500">{price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="border-2 border-[#171717] dark:border-white rounded-xl px-4 py-2 font-bold text-md text-[#171717] dark:text-white hover:bg-[#171717] dark:hover:bg-white transition-colors duration-200 disabled:opacity-20"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page === totalPages - 1}
            className="border-2 border-[#171717] dark:border-white rounded-xl px-4 py-2 font-bold text-md text-[#171717] dark:text-white hover:bg-[#171717] dark:hover:bg-white transition-colors duration-200 disabled:opacity-20"
          >
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedClothing && (
          <div className="flex flex-col justify-center items-center gap-8">
            <Image
              src={selectedClothing.src}
              alt={selectedClothing.name}
              width={300}
              height={300}
              className="rounded-lg"
            />
            <div className="flex flex-col justify-center items-center gap-2">
              <p className="text-2xl font-bold mt-4 text-[#171717]">
                {selectedClothing.name}
              </p>
              <p className="text-md font-semibold text-gray-500">
                Price: {selectedClothing.price}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
