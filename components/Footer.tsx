import Image from "next/image";
const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="flex text-center items-center justify-between px-10">
        <div>
          <div className="flex space-x-1">
            <p className="text-sm text-[#888888]">@2023 </p>
            <p className="text-sm font-bold">CODE SAGA </p>
          </div>

          <p className="text-sm text-[#888888]">MADE WITH ♡ BY AKA</p>
        </div>

        <a href="/#">
          <Image src="/logo-white.svg" width={70} height={30} alt="Logo" />
        </a>
        <div className="flex space-x-4">
          <a href="https://web.facebook.com/CodesagaDN">
            <Image src="/icon-facebook.svg" width={30} height={30} alt="Logo" />
          </a>
          <a href="https://discord.gg/codesagadn">
            <Image src="/icon-discord.svg" width={30} height={30} alt="Logo" />
          </a>
          <a href="https://www.youtube.com/@CodeSagaDragonNest">YT</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
