import Image from "next/image";
import XpIcon from "@/public/xp_icon.png";

export default function Taskbar() {
  return (
    <div className="highlight w-full h-10 bg-[#3b77bc] fixed bottom-0 left-0 flex items-center justify-center overflow-hidden z-0">
      <div className="w-32 h-full bg-[#45a746] italic mr-auto flex justify-center items-center relative z-10 cursor-pointer select-none hover:brightness-110">
        <Image src={XpIcon} width={32} height={32} alt="Xp" className="z-20" />
        <p className="text-white font-noto-sans font-extrabold text-2xl z-20 ml-2 drop-shadow-lg shadow-black">
          start
        </p>
        <div className="h-28 w-28 bg-[#45a746] rounded-full absolute -right-2 z-[5]"></div>
      </div>
      <div className="highlight w-20 h-full bg-[#4bafff] absolute right-0"></div>
    </div>
  );
}
