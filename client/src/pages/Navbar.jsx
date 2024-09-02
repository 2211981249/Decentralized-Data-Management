import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import logoImage from "/src/assets/logo-image.png";


const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, user } = useAuth();

  return (
    <div>
      <header className="fixed inset-x-0 top-0 z-50 bg-white shadow">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <NavLink to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logoImage} className="h-11 w-auto" />
            </NavLink>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12"></div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-evenly">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/profile"
                  className="text-sm font-semibold leading-6 text-gray-900 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded-md"
                >
                  Profile <span aria-hidden="true"></span>
                </NavLink>

                <NavLink
                  to="/logout"
                  className="text-sm font-semibold leading-6 text-gray-900 bg-red-200 hover:bg-red-300 py-2 px-4 rounded-md"
                >
                  Log out <span aria-hidden="true">&rarr;</span>
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <NavLink
                  to="/register"
                  className="text-sm font-semibold leading-6 text-gray-900 bg-green-200 hover:bg-green-300 py-2 px-4 rounded-md"
                >
                  Register <span aria-hidden="true">&rarr;</span>
                </NavLink>

                <NavLink
                  to="/login"
                  className="text-sm font-semibold leading-6 text-gray-900 bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded-md"
                >
                  Log in <span aria-hidden="true">&rarr;</span>
                </NavLink>
              </div>
            )}
          </div>
        </nav>

        <Dialog
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <NavLink to="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  alt=""
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  className="h-8 w-auto"
                />
              </NavLink>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6"></div>

                {isLoggedIn && (
                  <div className="py-6">
                    <NavLink to="/profile">
                      <div className="flex items-center space-x-4 mb-4">
                        {user?.avatarUrl ? (
                          <img
                            className="w-10 h-10 rounded-full"
                            src={user.avatarUrl}
                            alt={`${user.username}'s avatar`}
                          />
                        ) : (
                          <svg
                            className="w-10 h-10 text-blue-500 dark:text-blue-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.7 0 4.8-2.2 4.8-4.8S14.7 2.4 12 2.4 7.2 4.6 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8V21h19.2v-1.6c0-3.2-6.4-4.8-9.6-4.8z" />
                          </svg>
                        )}
                        <span className="text-gray-800 font-medium">
                          {user?.username}
                        </span>
                      </div>
                    </NavLink>

                    <NavLink
                      to="/profile"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Profile
                    </NavLink>

                    <NavLink
                      to="/logout"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log out
                    </NavLink>
                  </div>
                )}
                {!isLoggedIn && (
                  <>
                    <NavLink
                      to="/register"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Register
                    </NavLink>

                    <NavLink
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
};

export default Navbar;
