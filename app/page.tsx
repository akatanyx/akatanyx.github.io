import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen overflow-hidden bg-gradient-to-r from-[#121212] via-[#212121] to-[#121212]">
        {/* Hero Section (5/6 of the screen) */}
        <section
          className="flex h-[90vh] text-white overflow-y-auto flex items-center justify-center bg-cover"
          style={{
            backgroundImage: `url('/hero-bg.jpg')`,
          }}
        >
          {/* Your hero content goes here */}
          <div className="container mx-auto p-8 text-center">
            <div className="flex flex-col w-1/2 space-y-4">
              <Image src="/logo-full.svg" width={200} height={30} alt="Logo" />
              <h1 className="text-4xl font-bold mb-4 text-left">
                DISCOVER THE UNKNOWN
              </h1>
              <p className="text-lg text-wrap text-left mb-4">
                CODE SAGA is unique with custom contents and brand-new
                progression made to compliment the gameplay of Dragon Nest!
              </p>
              <div className=" w-full items-start flex">
                <a
                  href="/login"
                  className="flex items-center text-xl bg-[#C29736] py-3 px-10"
                >
                  PLAY NOW
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* News Section (2/3 of the screen) */}
        <section className="flex h-[83.33vh] overflow-y-auto text-white flex items-start">
          <div className="container mx-auto pb-8 pt-16 h-full border-l border-[#FFFFFF]/30">
            <div>
              <h2 className="text-4xl font-bold mb-4 border-l-8 pl-8 border-[#C29736]">
                LATEST NEWS
              </h2>
              <p className="text-base px-8 border-l-8 border-black/0">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
                accusantium quaerat at cupiditate nulla reiciendis commodi
                temporibus, corrupti saepe impedit non harum ipsa natus!
                Repellendus dolore quisquam provident voluptates labore.
              </p>
            </div>
          </div>
        </section>

        {/* News Section (2/3 of the screen) */}
        <section className="flex h-[83.33vh] overflow-y-auto text-white flex items-start">
          <div className="container mx-auto pb-8 pt-16 h-full border-l border-[#FFFFFF]/30">
            <div>
              <h2 className="text-4xl font-bold mb-4 border-l-8 pl-8 border-[#C29736]">
                WHY CODE SAGA?
              </h2>
              <p className="text-base px-8 border-l-8 border-black/0">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
                accusantium quaerat at cupiditate nulla reiciendis commodi
                temporibus, corrupti saepe impedit non harum ipsa natus!
                Repellendus dolore quisquam provident voluptates labore.
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
      </div>
      <Footer />
    </>
  );
};

export default Home;
