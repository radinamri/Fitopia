"use client";
import Modal from "@/components/Modal";
import AmazonLogo from "@/public/stores/amazon-logo";
import AppleLogo from "@/public/stores/apple-logo";
import CocaColaLogo from "@/public/stores/cocacola-logo";
import FacebookLogo from "@/public/stores/facebook-logo";
import GoogleLogo from "@/public/stores/google-logo";
import HeinkenLogo from "@/public/stores/heinken-logo";
import LinkedInLogo from "@/public/stores/linkedin-logo";
import McdonaldsLogo from "@/public/stores/mcdonalds-logo";
import MicrosoftLogo from "@/public/stores/microsoft-logo";
import NetflixLogo from "@/public/stores/netflix-logo";
import NikeLogo from "@/public/stores/nike-logo";
import RedbullLogo from "@/public/stores/redbull-logo";
import SpotifyLogo from "@/public/stores/spotify-logo";
import StarWarsLogo from "@/public/stores/starwars-logo";
import TikTokLogo from "@/public/stores/tiktok-logo";
import VisaLogo from "@/public/stores/visa-logo";
import YamahaLogo from "@/public/stores/yamaha-logo";
import YoutubeLogo from "@/public/stores/youtube-logo";
import Link from "next/link";
import { useState } from "react";
import StoreItem from "@/components/StoreItem";

const logos = [
  { component: AmazonLogo, name: "Amazon", link: "https://www.amazon.com" },
  { component: AppleLogo, name: "Apple", link: "https://www.apple.com" },
  {
    component: CocaColaLogo,
    name: "Coca Cola",
    link: "https://www.coca-cola.com",
  },
  {
    component: FacebookLogo,
    name: "Facebook",
    link: "https://www.facebook.com",
  },
  { component: GoogleLogo, name: "Google", link: "https://www.google.com" },
  {
    component: HeinkenLogo,
    name: "Heineken",
    link: "https://www.heineken.com",
  },
  {
    component: LinkedInLogo,
    name: "LinkedIn",
    link: "https://www.linkedin.com",
  },
  {
    component: McdonaldsLogo,
    name: "McDonald's",
    link: "https://www.mcdonalds.com",
  },
  {
    component: MicrosoftLogo,
    name: "Microsoft",
    link: "https://www.microsoft.com",
  },
  { component: NetflixLogo, name: "Netflix", link: "https://www.netflix.com" },
  { component: NikeLogo, name: "Nike", link: "https://www.nike.com" },
  { component: RedbullLogo, name: "Red Bull", link: "https://www.redbull.com" },
  { component: SpotifyLogo, name: "Spotify", link: "https://www.spotify.com" },
  {
    component: StarWarsLogo,
    name: "Star Wars",
    link: "https://www.starwars.com",
  },
  { component: TikTokLogo, name: "TikTok", link: "https://www.tiktok.com" },
  { component: VisaLogo, name: "Visa", link: "https://www.visa.com" },
  { component: YamahaLogo, name: "Yamaha", link: "https://www.yamaha.com" },
  { component: YoutubeLogo, name: "YouTube", link: "https://www.youtube.com" },
];

const ITEMS_PER_PAGE = 16; // 4x4 grid

export default function Stores() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedLogo, setSelectedLogo] = useState<{
    component: React.ElementType;
    name: string;
    link: string;
  } | null>(null);
  const totalPages = Math.ceil(logos.length / ITEMS_PER_PAGE);

  const paginatedLogos = logos.slice(
    page * ITEMS_PER_PAGE,
    (page + 1) * ITEMS_PER_PAGE
  );

  const handleLogoClick = (logo: {
    component: React.ElementType;
    name: string;
    link: string;
  }) => {
    setSelectedLogo(logo); // Set the selected logo and name
    setIsModalOpen(true); // Open the modal
  };

  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col w-[85%] justify-center items-center gap-8">
        <div className="grid grid-cols-4 gap-8 w-full justify-center">
          {paginatedLogos.map(({ component, name, link }, index) => (
            <StoreItem
              key={index}
              Logo={component}
              name={name}
              link={link}
              onClick={handleLogoClick}
            />
          ))}
        </div>
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="border-2 border-[#171717] dark:border-white rounded-xl p-2 pl-4 pr-4 font-bold text-md text-[#171717] dark:text-white hover:text-white hover:bg-[#171717] dark:hover:text-[#171717] dark:hover:bg-white transition-colors duration-200 px-4 py-2 disabled:opacity-20"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((prev) => Math.min(prev + 1, totalPages - 1))
            }
            disabled={page === totalPages - 1}
            className="border-2 border-[#171717] dark:border-white rounded-xl p-2 pl-4 pr-4 font-bold text-md text-[#171717] dark:text-white hover:text-white hover:bg-[#171717] dark:hover:text-[#171717] dark:hover:bg-white transition-colors duration-200 px-4 py-2 disabled:opacity-20"
          >
            Next
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedLogo && (
          <div className="flex flex-col justify-center items-center gap-8">
            <div className="flex flex-col justify-center items-center bg-white rounded-3xl shadow-xl p-16 gap-16">
              <selectedLogo.component />
              <p className="text-2xl font-bold mt-4 text-[#171717]">
                {selectedLogo.name}
              </p>
            </div>
            <Link
              href={selectedLogo.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="text-md font-medium text-[#171717]">
                Visit {selectedLogo.name} for more details
              </p>
            </Link>
          </div>
        )}
      </Modal>
    </div>
  );
}
