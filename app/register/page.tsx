import Header from "@/components/Navbar";
import Dialog from "@/components/Dialog";
export default function Register() {
  async function onClose() {
    "use server";
    console.log("Modal has closed");
  }

  async function onOk() {
    "use server";
    console.log("Ok was clicked");
  }
  return (
    <>
      <Dialog title="TERMS OF SERVICE" onClose={onClose} onOk={onOk}>
        <div className="overflow-y-auto h-64">
          <h1 className="font-bold">Terms of Service Foundation</h1>
          <div>
            - This Agreement is between you ("you" or "user") and Code Saga
            ("we" or "us") regarding your use of Code Saga Services, including
            games, websites, support, and community channels.{" "}
          </div>
          <div>
            - Code Saga Game(s): Refers to any game(s) launched or to be
            launched by Code Saga, including software, updates, patches, and
            related services. Cheat Detection software may be included to
            maintain fair play.
          </div>
          <div>
            - Data Collection: Code Saga Game(s) with Cheat Detection may
            collect and transmit Account details, gameplay, and information
            about unauthorized programs, following our Privacy Policy.{" "}
          </div>
          <div>
            - Agreement Acceptance: By registering, downloading game software,
            or using Code Saga Services, you accept and agree to all terms in
            this Agreement.
          </div>
          <div>
            - Updates: Code Saga may update this Agreement; continued use of
            Code Saga Services implies acceptance of the updated terms.
          </div>
          <h1 className="font-bold">Accounts</h1>
          <div>
            - Account Creation and Responsibility: When registering an account
            on Code Saga, you agree to the Terms of Service, Privacy Policy, and
            other agreements of Code Saga. You are responsible for all actions
            on your Account.
          </div>
          <div>
            - Account Security: Keep your Account info confidential. Don't share
            it or use someone else's Account. Selling your Account is allowed
            but trade at your own risk. The Admins & CMs are not obliged to
            settle or provide judgment over disputes on account trades. We have
            an authorized Midman in this server, just refer to the midman
            channel. Report unauthorized access immediately.
          </div>
          <div>
            - Username Guidelines: Create an Account responsibly, keep it
            secure, and choose a suitable username to enjoy Code Saga services.
          </div>
        </div>
      </Dialog>
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
                <div className="font-bold text-xl">REGISTER</div>
                <p className="text-sm text-[#888888]">
                  Already have an account?{" "}
                  <a href="/login" className="hover:underline text-white">
                    LOGIN NOW
                  </a>
                </p>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <input
                      type="text"
                      name="userId"
                      id="email"
                      className="bg-black border border-[#C29736] text-[#888888] sm:text-sm  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-[#888888]"
                      placeholder="User ID"
                      required=""
                    />
                  </div>
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
                <div className="flex  flex-col">
                  <div className="text-[#888888]">
                    By registering your account, you agree to our
                  </div>
                  <a href="?showDialog=y" className="hover:underline">
                    terms of service.
                  </a>
                </div>
                <a
                  href="/confirmation"
                  className="py-2 px-10 text-lg p-2 bg-gradient-to-r from-[#C29736] to-[#A76D00]"
                >
                  REGISTER
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
