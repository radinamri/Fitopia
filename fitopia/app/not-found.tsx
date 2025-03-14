import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full min-h-screen justify-center items-center gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="flex flex-col justify-center items-center">
        <p className="font-extrabold text-5xl">Not Found!</p>
        <p className="font-medium text-md">Could not find requested resource</p>
        <Link href="/">
          <p className="font-semibold text-lg">Return Home</p>
        </Link>
      </div>
    </div>
  );
}
