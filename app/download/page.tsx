import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
const Home = () => {
  return (
    <>
      <Navbar />
      <div
        className="flex flex-col w-full min-h-[90vh] overflow-hidden bg-cover text-white justify-center"
        style={{
          backgroundImage: `url('/download-bg.png')`,
        }}
      >
        {/* Your hero content goes here */}
        <div className="flex w-5/6 mx-auto text-center flex-col">
          <div className="w-1/2">
            <div className="text-4xl font-bold text-left flex justify-center pt-8">
              DOWNLOAD THE GAME
            </div>

            <div className=" w-full justify-center flex py-8">
              <a
                href="/login"
                className="flex items-center text-xl bg-[#C29736] py-3 px-10"
              >
                DOWNLOAD
              </a>
            </div>
          </div>
          <div className="bg-[#C29736] w-1/2 p-0.5"></div>
          <div className="flex flex-col w-1/2 space-y-4 bg-black bg-opacity-70 backdrop-blur-sm p-8">
            <div className="text-wrap text-left">
              <div className="border-b border-[#FFFFFF]/30 py-2 text-lg font-bold">
                System Requirements
              </div>
              <div className="flex py-2">
                <div className="w-1/2">
                  <div className="py-2 font-bold">MINIMUM SPECIFICATIONS</div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">OS:</div>
                    <div>Windows 7</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">CPU:</div>
                    <div>Intel® Pentium Core i3 530 or higher</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">RAM:</div>
                    <div>4 GB</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">Graphics:</div>
                    <div>NVIDIA GeForce GTS 250</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">Storage:</div>
                    <div>12 GB of available space</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">Direct X:</div>
                    <div>Direct X 9.0c or higher</div>
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="py-2 font-bold">
                    RECOMMENDED SPECIFICATIONS
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">OS:</div>
                    <div>Windows 7</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">CPU:</div>
                    <div>Intel® Core i5 4670 or higher</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">RAM:</div>
                    <div>8 GB</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">Graphics:</div>
                    <div>NVIDIA GeForce GTX 750</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">Storage:</div>
                    <div>15 GB of available space</div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="text-[#989898]">Direct X:</div>
                    <div>Direct X 9.0c or higher</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
