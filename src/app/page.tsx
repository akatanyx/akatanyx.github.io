// pages/index.js
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen flex justify-center bg-[#161A1E] flex-col">
      <Head>
        <title>3/5 Center Layout</title>
      </Head>

      <div className="flex w-full">
        {/* Left Empty Space */}
        <div className="w-1/5"></div>

        {/* Main Content */}
        <main className="relative w-3/5 shadow-lg rounded-lg text-[#9A9A9A]">
          {/* Navbar */}
          <div className="flex justify-between py-5 relative z-20 items-center">
            <div className="flex space-x-8 items-center">
              <img src="/Logo.png" alt="Hero Image" className="h-12" />
              <div className="flex space-x-8">
                <button className="text-[#19AFFF]">Home</button>
                <button>Produk</button>
                <button>Kontak Kami</button>
                <button>Jadwal</button>
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <button
                type="button"
                className="border py-2 px-6 text-white rounded-full"
              >
                Masuk
              </button>
              <button
                type="button"
                className=" py-2 px-6 bg-[#19AFFF] text-white rounded-full"
              >
                Daftar
              </button>
            </div>
          </div>

          {/* Hero Section - Image Only */}
          <div className="relative h-[40vh]">
            <img
              src="/Hero.png"
              alt="Hero Image"
              className="absolute top-[-23%] left-0 w-full h-[120%] object-cover"
              style={{ clipPath: "inset(0 0 -20% 0)" }} // Ensures image is not cut off at the top
            />
          </div>

          {/* Popular Games */}
          <div className="-mt-2">
            {/* Title with SVG Icon */}
            <div className="py-5 text-[#FBFBFB] flex items-center space-x-2 font-bold">
              <img src="/Fire.svg" alt="Fire Icon" className="h-6 w-6" />
              <span>Popular Games</span>
            </div>

            {/* Cards */}
            <div className="flex space-x-6">
              <img
                src="/Cards/1.png"
                alt="Fire Icon"
                className="rounded-3xl transition duration-300 ease-in-out hover:scale-105"
              />
              <img
                src="/Cards/2.png"
                alt="Fire Icon"
                className="rounded-3xl transition duration-300 ease-in-out hover:scale-105"
              />
              <img
                src="/Cards/3.png"
                alt="Fire Icon"
                className="rounded-3xl transition duration-300 ease-in-out hover:scale-105"
              />
              <img
                src="/Cards/4.png"
                alt="Fire Icon"
                className="rounded-3xl transition duration-300 ease-in-out hover:scale-105"
              />
            </div>
          </div>

          {/* Pre-Order */}
          <div className="py-5">
            {/* Title with SVG Icon */}
            <div className="pb-5 text-[#FBFBFB] flex items-center space-x-2 font-bold">
              <img src="/Sparkle.svg" alt="Fire Icon" className="h-6 w-6" />
              <span>Pre-Order</span>
            </div>

            {/* Cards */}
            <div className="flex flex-col space-y-5">
              <div className="flex space-x-5 ">
                <div className="text-white bg-[#FBFBFB] bg-opacity-20 w-full flex rounded-3xl hover:bg-opacity-30 transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
                  <img
                    src="/Cards/Pre-Order/DE.png"
                    alt="Fire Icon"
                    className="rounded-3xl"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="font-bold">
                        DZ-BT06 Dragon Empire Playset
                      </div>
                      <div className="text-[#9A9A9A] text-sm">
                        Generation Dragenesis JP
                      </div>
                    </div>
                    <div className="flex space-x-2 text-base">
                      <div className="bg-[#37E59F] text-black text-sm p-1 font-bold rounded-full px-2">
                        -15%
                      </div>
                      <div>Rp2,000,000</div>
                    </div>
                  </div>
                </div>
                <div className="text-white bg-[#FBFBFB] bg-opacity-20 w-full flex rounded-3xl hover:bg-opacity-30 transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
                  <img
                    src="/Cards/Pre-Order/KS.png"
                    alt="Fire Icon"
                    className="rounded-3xl"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="font-bold">
                        DZ-BT06 Keter Sanctuary Playset
                      </div>
                      <div className="text-[#9A9A9A] text-sm">
                        Generation Dragenesis JP
                      </div>
                    </div>
                    <div className="flex space-x-2 text-base">
                      <div className="bg-[#37E59F] text-black text-sm p-1 font-bold rounded-full px-2">
                        -15%
                      </div>
                      <div>Rp2,000,000</div>
                    </div>
                  </div>
                </div>
                <div className="text-white bg-[#FBFBFB] bg-opacity-20 w-full flex rounded-3xl hover:bg-opacity-30 transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
                  <img
                    src="/Cards/Pre-Order/ST.png"
                    alt="Fire Icon"
                    className="rounded-3xl"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="font-bold">DZ-BT06 Stoicheia Playset</div>
                      <div className="text-[#9A9A9A] text-sm">
                        Generation Dragenesis JP
                      </div>
                    </div>
                    <div className="flex space-x-2 text-base">
                      <div className="bg-[#37E59F] text-black text-sm p-1 font-bold rounded-full px-2">
                        -15%
                      </div>
                      <div>Rp2,000,000</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-5 ">
                <div className="text-white bg-[#FBFBFB] bg-opacity-20 w-full flex rounded-3xl hover:bg-opacity-30 transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
                  <img
                    src="/Cards/Pre-Order/DS.png"
                    alt="Fire Icon"
                    className="rounded-3xl"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="font-bold">
                        DZ-BT06 Dark States Playset
                      </div>
                      <div className="text-[#9A9A9A] text-sm">
                        Generation Dragenesis JP
                      </div>
                    </div>
                    <div className="flex space-x-2 text-base">
                      <div className="bg-[#37E59F] text-black text-sm p-1 font-bold rounded-full px-2">
                        -15%
                      </div>
                      <div>Rp2,000,000</div>
                    </div>
                  </div>
                </div>
                <div className="text-white bg-[#FBFBFB] bg-opacity-20 w-full flex rounded-3xl hover:bg-opacity-30 transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
                  <img
                    src="/Cards/Pre-Order/BG.png"
                    alt="Fire Icon"
                    className="rounded-3xl"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="font-bold">
                        DZ-BT06 Brandt Gate Playset
                      </div>
                      <div className="text-[#9A9A9A] text-sm">
                        Generation Dragenesis JP
                      </div>
                    </div>
                    <div className="flex space-x-2 text-base">
                      <div className="bg-[#37E59F] text-black text-sm p-1 font-bold rounded-full px-2">
                        -15%
                      </div>
                      <div>Rp2,000,000</div>
                    </div>
                  </div>
                </div>
                <div className="text-white bg-[#FBFBFB] bg-opacity-20 w-full flex rounded-3xl hover:bg-opacity-30 transition duration-300 ease-in-out hover:scale-105 cursor-pointer">
                  <img
                    src="/Cards/Pre-Order/VARGA.png"
                    alt="Fire Icon"
                    className="rounded-3xl"
                  />
                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <div className="font-bold">
                        Varga Dragres Rakshasa DSR
                      </div>
                      <div className="text-[#9A9A9A] text-sm">
                        DZ-BT05/DSR01
                      </div>
                    </div>
                    <div className="flex space-x-2 text-base">
                      <div className="bg-[#37E59F] text-black text-sm p-1 font-bold rounded-full px-2">
                        -15%
                      </div>
                      <div>Rp2,000,000</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Right Empty Space */}
        <div className="w-1/5"></div>
      </div>
      {/* Pre-Order */}
      <div className="w-full bg-[#000000] bg-opacity-40">
        <div className="flex">
          <div className="w-1/5"></div>
          <div className="w-3/5 py-7 flex justify-between text-[#9A9A9A]">
            <div>Made with ♡ by Daniel Chandra 2024</div>
            <div className="flex space-x-8">
              <button>Marketting & Partnership</button>
              <button>Terms of Service</button>
              <button>Privacy Policy</button>
              <button>Support</button>
            </div>
            <div className="flex space-x-4">
              <img src="/Footer/FB.svg" alt="Fire Icon" className="h-6 w-6" />
              <img src="/Footer/DC.svg" alt="Fire Icon" className="h-6 w-6" />
              <img src="/Footer/YT.svg" alt="Fire Icon" className="h-6 w-6" />
            </div>
          </div>
          <div className="w-1/5"></div>
        </div>
      </div>
    </div>
  );
}
