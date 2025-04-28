interface StoreItemProps {
  Logo: React.ElementType;
  name: string;
  link: string;
  onClick: (logo: {
    component: React.ElementType;
    name: string;
    link: string;
  }) => void;
}

export default function StoreItem({
  Logo,
  name,
  link,
  onClick,
}: StoreItemProps) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className="flex flex-col justify-center items-center bg-white rounded-3xl shadow-xl p-16 gap-16 transition-transform duration-200 hover:scale-105 cursor-pointer"
        onClick={() => onClick({ component: Logo, name, link })}
      >
        <Logo />
        <p className="mt-4 text-xl font-bold text-[#171717] transition-all duration-200 hover:font-extrabold hover:underline hover:underline-offset-4">
          {name}
        </p>
      </div>
    </div>
  );
}
