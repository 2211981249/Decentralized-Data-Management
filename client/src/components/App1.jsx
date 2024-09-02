import React, { useState, useEffect } from "react";
import abi from "../contractJson/Identity.json";
import { ethers } from "ethers";
import axios from "axios";
import BlockLogin from "../pages/BlockLogin";
import UploadDocument from "../pages/UploadDocument";
import Card from "../pages/Card";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../store/auth";

function App() {

  const { user, userAuthentication } = useAuth();
  useEffect(()=>{
    userAuthentication();
  },[]);

  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [documents, setDocuments] = useState([]);
  const [account, setAccount] = useState("Not connected");
  const [imageDoc, setImageDoc] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const initializeBlockchain = async () => {
      const contractAddress = "0x5FB4c864863615ee38a33021615157C129008922";
      const contractABI = abi.abi;

      try {
        const { ethereum } = window;
        if (!ethereum) {
          toast.error("MetaMask not detected");
          return;
        }

        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        setState({ provider, signer, contract });
        setLoggedIn(true);
      } catch (error) {
        toast.error("Please connect to MetaMask");
        console.error("Error initializing blockchain:", error);
      }
    };

    initializeBlockchain();
  }, []);

  const fetchDocuments = async () => {
    if (!state.contract) {
      console.error("Contract not initialized");
      return;
    }

    try {
      const docs = await state.contract.getDocuments();
      setDocuments(docs);

      const email = localStorage.getItem("email");
      console.log(email)
      const data = await axios.get(`http://localhost:7000/api/auth/get-document?email=${email}`);
      setImageDoc(data.data.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    if (state.contract) {
      fetchDocuments();
    }
  }, [state.contract]);

  return (

    <>
    <h2 className="text-xl sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-80 dark:text-dark-50 mb-4 text-center">
  Welcome @ {user?.username}😊
</h2>
    <div>
      <ToastContainer />
      {/* If logged in, show account details, otherwise show BlockLogin */}
      {!loggedIn ? (
        <BlockLogin state={state} />
      ) : (
        <div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#07074D]">
              Connected to MetaMask with Account: {account}
            </h2>
            <UploadDocument state={state} />
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-[#07074D]">Uploaded Documents</h2>
            <ul>
              {documents.length > 0
                ? documents.map((doc, index) => (
                    <Card
                      key={index}
                      title={doc.documentName}
                      description={doc.documentHash}
                      docs={imageDoc}
                      indexValue={index}
                    />
                  ))
                : "No data found"}
            </ul>
          </div>
        </div>
      )}

    </div>

    <div className="flex flex-wrap justify-center gap-4 mt-8">

  <div className="bg-white white:bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
    <h1>Welcome</h1>
    <h3 className="text-xl font-semibold text-dark-800 dark:text-gray-200 mb-2" style={{color:"black"}}>
      "hello"
    </h3>
    <p className="text-gray-600 dark:text-gray-400 break-words">
      dhagsdghasgdhagsdgagsdgahdgagsdhgahdgagsdgadhgasgdgj
    </p>
    <button
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      onClick={() => handleClick(indexValue)}
    >
      View Details
    </button>
  
    {/* Conditionally render the document */}
  </div>
  






  <div className="bg-white white:bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4" >
  <h1>Welcome</h1>
  <h3 className="text-xl font-semibold text-dark-800 dark:text-gray-200 mb-2" style={{color:"black"}}>
    "hello"
  </h3>
  <p className="text-gray-600 dark:text-gray-400 break-words">
    dhagsdghasgdhagsdgagsdgahdgagsdhgahdgagsdgadhgasgdgj
  </p>
  <button
    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
    onClick={() => handleClick(indexValue)}
  >
    View Details
  </button>

  {/* Conditionally render the document */}
</div>



    <div className="bg-white white:bg-gray-800 rounded-lg shadow-lg p-6 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
    <h1>Welcome</h1>
    <h3 className="text-xl font-semibold text-dark-800 dark:text-gray-200 mb-2" style={{color:"black"}}>
      "hello"
    </h3>
    <p className="text-gray-600 dark:text-gray-400 break-words">
      dhagsdghasgdhagsdgagsdgahdgagsdhgahdgagsdgadhgasgdgj
    </p>
    <button
      className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
      onClick={() => handleClick(indexValue)}
    >
      View Details
    </button>
  
    {/* Conditionally render the document */}
  </div>
  


  
    
    </div>
    </>
  );
}

export default App;
