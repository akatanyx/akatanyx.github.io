import Image from "next/image";

export default function Header() {
  return (
    <header>
      <nav className="block fixed top-0 shadow-lg z-10 bg-white w-screen">
        <div className="bg-black text-white flex justify-between p-3 items-center">
          <a href="/#">
            <Image src="/logo-white.svg" width={30} height={30} alt="Logo" />
          </a>
          <div className="flex space-x-4 text-sm">
            <a href="/#" className="hover:underline">
              HOME
            </a>
            <a href="/#" className="hover:underline">
              NEWS
            </a>
            <a href="/download" className="hover:underline">
              DOWNLOAD
            </a>
          </div>

          <div className="flex space-x-4">
            <a
              href="/register"
              className="flex items-center text-sm text-[#C29736] border border-[#C29736] py-2 px-5 rounded-lg"
            >
              REGISTER
            </a>
            <a
              href="/login"
              className="flex items-center text-sm bg-[#C29736] py-2 px-8 rounded-lg"
            >
              LOGIN
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
