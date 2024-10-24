import Header from "@/components/Navbar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Forgot Password - Code Saga",
};

export default function Login() {
  return (
    <div
      className="bg-cover text-white"
      style={{
        backgroundImage: `url('/auth-bg.jpg')`,
      }}
    >
      <div className="h-screen flex flex-col">
        <Header />
        <div className="h-full w-full flex flex-col items-center justify-center ">
          <div className="bg-black bg-opacity-70 backdrop-blur-sm">
            <div className="bg-[#C29736] w-full p-0.5"></div>
            <div className="p-10 space-y-4">
              <div className="font-bold text-xl">FORGOT PASSWORD</div>
              <p className="text-sm text-[#888888]">
                Enter the email you used to register you account with.
              </p>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-black border border-[#C29736] text-[#888888] sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-[#888888]"
                    placeholder="Email"
                    required=""
                  />
                </div>
              </form>
            </div>

            <div className="flex bg-black p-8 justify-between space-x-8 items-center text-sm">
              <div className="flex flex-col">
                <div className="text-[#888888] flex space-x-1">
                  <div>Please make a ticket in our </div>{" "}
                  <a
                    className="hover:underline text-white"
                    href="https://discord.gg/codesagadn"
                  >
                    Discord
                  </a>
                </div>
                <div className="text-[#888888]">
                  if you have forgotten your email.
                </div>
              </div>
              <button className="py-2 px-10 text-lg p-2 bg-gradient-to-r from-[#C29736] to-[#A76D00]">
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
