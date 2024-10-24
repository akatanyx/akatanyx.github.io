import Header from "@/components/Navbar";
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
              <div className="font-bold text-xl">PLEASE VERIFY YOUR EMAIL</div>
              <p className="text-sm text-[#888888]">We sent an email to</p>

              <div className="bg-black border border-[#C29736] text-[#C29736] sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5">
                nashyid@gmail.com
              </div>
              <div>
                <p className="text-sm text-[#888888]">
                  Press on the link in the email to complete your account
                </p>
                <p className="text-sm text-[#888888]">
                  creation. You may need to check your spam folder.
                </p>
              </div>
            </div>

            <div className="flex bg-black p-8 justify-between space-x-8 items-center text-sm">
              <div className="flex flex-col">
                <div className="text-[#888888]">
                  Still can’t find the email?
                </div>
              </div>
              <button className="py-2 px-10 text-lg p-2 bg-gradient-to-r from-[#C29736] to-[#A76D00]">
                RESEND EMAIL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
