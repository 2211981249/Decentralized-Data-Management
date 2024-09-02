import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer class="bg-black dark:bg-black" style={{ marginTop: "10rem" }}>
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div class="md:flex md:justify-between">
            <div class="mb-6 md:mb-0">
              <a href="/" class="flex items-center">
                <img
                  src="/src/assets/logo-image.png"
                  class="h-8 me-3"
                />
                <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  Identity Management
                </span>
              </a>
            </div>
            <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 class="mb-6 text-sm font-semibold text-white uppercase">
                  Resources
                </h2>
                <ul class="text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="/" class="hover:underline text-white">
                      Identity Management
                    </a>
                  </li>
                  <li>
                    <a href="/" class="hover:underline text-white">
                      Explore
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-white uppercase">
                  Follow us
                </h2>
                <ul class="text-gray-400 font-medium">
                  <li class="mb-4">
                    <a
                      href="/src/assets/logo-image.png"
                      class="hover:underline text-white"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://discord.gg/4eeurUVvTy"
                      class="hover:underline text-white"
                    >
                      Discord
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 class="mb-6 text-sm font-semibold text-white uppercase">
                  Legal
                </h2>
                <ul class="text-gray-400 font-medium">
                  <li class="mb-4">
                    <a href="#" class="hover:underline text-white">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" class="hover:underline text-white">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
            <span class="text-sm text-gray-400 sm:text-center">
              © 2023{" "}
              <a href="https://flowbite.com/" class="hover:underline text-white">
                Identity Management
              </a>
              . All Rights Reserved.
            </span>
            <div class="flex mt-4 sm:justify-center sm:mt-0">
        
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;