import React, { useState, useEffect } from "react";
import abi from "../contractJson/Identity.json";
import { ethers } from "ethers";
import axios from "axios";
import BlockLogin from "../pages/BlockLogin";
import UploadDocument from "../pages/UploadDocument";
import Card from "../pages/Card";
import { toast, ToastContainer } from "react-toastify";

function App() {
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
      const contractAddress = "0x39Efd7D1E8CfDE3106dcDe3A527082b7e238173F";
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
  );
}

export default App;
