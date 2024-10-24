import Header from "@/components/Navbar";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login - Code Saga",
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
              <div className="font-bold text-xl">LOGIN</div>
              <p className="text-sm text-[#888888]">
                Don’t have an account yet?{" "}
                <a href="/register" className="hover:underline text-white">
                  REGISTER NOW
                </a>
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
                <div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-black border border-[#C29736] text-[#888888] sm:text-sm focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-[#888888]"
                    required=""
                  />
                </div>
              </form>
            </div>

            <div className="flex bg-black p-8 justify-between space-x-8 items-center text-sm">
              <div className="flex space-x-2">
                <div className="text-[#888888]">forgot your password?</div>
                <a href="/forgotpassword" className="hover:underline">
                  CLICK HERE
                </a>
              </div>
              <button className="py-2 px-10 text-lg p-2 bg-gradient-to-r from-[#C29736] to-[#A76D00]">
                LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
