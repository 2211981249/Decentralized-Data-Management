import React, { useState } from "react";

const BlockLogin = ({ state }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [PhoneNumber, setNumber] = useState("");
  const [UserAddress, setAdredd] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  console.log(state);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { contract, signer } = state;
    console.log(email, password, PhoneNumber, UserAddress);
    try {
      if (!contract || !signer) {
        console.error("Contract or signer not initialized");
        return;
      }
      const result = await contract.registerIdentity(
        email,
        password,
        PhoneNumber,
        UserAddress
      );
      console.log(result);
      setLoginStatus("Logged in successfully!");
    } catch (error) {
      console.error("Error during contract interaction", error);
      setLoginStatus("Failed to login");
    }
  };

  return (
    <section className=" flex flex-col justify-center items-center p-1 mt-5">
      <div className="w-full max-w-lg  rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Sign in to your account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
              placeholder="••••••••"
              required
            />
          </div>
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="number"
              id="phoneNumber"
              value={PhoneNumber}
              onChange={(e) => setNumber(e.target.value)}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
              placeholder="123-456-7890"
              required
            />
          </div>
          <div>
            <label
              htmlFor="userAddress"
              className="block text-sm font-medium text-gray-700"
            >
              User Address
            </label>
            <input
              type="text"
              id="userAddress"
              value={UserAddress}
              onChange={(e) => setAdredd(e.target.value)}
              className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
              placeholder="Your Address"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </form>
        {loginStatus && (
          <p className="mt-4 text-center text-sm text-gray-600">{loginStatus}</p>
        )}
      </div>
    </section>
  );
};

export default BlockLogin;
