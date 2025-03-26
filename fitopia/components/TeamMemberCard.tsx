import Github from "@/public/social-media-icons/Github";
import LinkedIn from "@/public/social-media-icons/LinkedIn";
import Image from "next/image";
import Link from "next/link";

interface TeamMemberCardProps {
  name: string;
  role: string;
  imageSrc: string;
}

export default function TeamMemberCard({
  name,
  role,
  imageSrc,
}: TeamMemberCardProps) {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Image
        className="rounded-[75%]"
        src={imageSrc}
        width={150}
        height={150}
        alt={name}
      />
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex flex-col justify-center items-center">
          <p className="font-bold text-xl">{name}</p>
          <p className="font-bold text-md">{role}</p>
        </div>
        <div className="flex flex-row gap-2">
          <Link
            className="transition-transform duration-200 hover:scale-105"
            href={"/"}
          >
            <Github />
          </Link>
          <Link
            className="transition-transform duration-200 hover:scale-105"
            href={"/"}
          >
            <LinkedIn />
          </Link>
        </div>
      </div>
    </div>
  );
}
