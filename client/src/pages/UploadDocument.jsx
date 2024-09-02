import React, { useEffect, useState, useRef } from "react";
import { ethers } from "ethers";
import abi from "../contractJson/Identity.json";
import { contractAddress } from "../contractJson/config.js";
import { pinata } from "../contractJson/pinata.js";
import axios from "axios";

const UploadDocument = ({ state }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [documents, setDocuments] = useState([]);

  const dropzoneRef = useRef(null);

  const { contract, account } = state;

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    
    if (file) {
      setImage(file);
      await uploadToIPFS(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      setImage(file);
      await uploadToIPFS(file);
    }
  };

  const uploadToIPFS = async (file) => {
    try {
      const response = await pinata.upload.file(file);
      const ipfsHash = response.IpfsHash;
      await uploadDocumentToBlockchain(ipfsHash, file.name,file,file.type);
    } catch (error) {
      console.error("IPFS upload error:", error);
    }
  };

  const uploadDocumentToBlockchain = async (documentHash, documentName,file,contentType) => {
    try {
      if (contract) {
        const tx = await contract.uploadDocument(documentHash, documentName);
        console.log(tx)
        await tx.wait();
        console.log("upload");
        const email = localStorage.getItem("email")

        const formData = new FormData();
        formData.append("file", file);
        formData.append("contentType", contentType);
        formData.append("email",email);
        formData.append("hex", tx.hash);

        const config = {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };

        const res = await axios.post(
          "http://localhost:7000/api/auth/upload-document",
          formData,
          config
        );
        console.log("Backend response:", res.data);
      } else {
        console.error("Contract or account not set up.");
      }
    } catch (error) {
      console.error("Blockchain upload error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contract || !account) {
    }
  };
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-4 px-9" onSubmit={handleSubmit}>
          <div className="mb-6 pt-4">
            <label className="mb-5 mt-20 justify-center text-center block text-xl font-semibold text-[#07074D]">
              Upload New Data
            </label>

            <div className="mb-5">
              <input
                type="file"
                id="file"
                className="sr-only"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className={`relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed ${
                  isDragOver
                    ? "border-blue-500 bg-blue-100"
                    : "border-[#e0e0e0] bg-[#f9f9f9]"
                } p-12 text-center`}
                ref={dropzoneRef}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drag & Drop Image
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                    Browse
                  </span>
                </div>
              </label>
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="mb-3 block text-base font-medium text-[#07074D]"
              >
                Description:
              </label>
              <textarea
                id="description"
                value={description}
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-blue-500 focus:shadow-md"
                placeholder="Enter description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="hover:bg-blue-700 inline-block rounded border border-transparent bg-blue-600 py-3 px-7 text-base font-medium text-white transition-all duration-200"
            >
              Upload Document
            </button>
          </div>
        </form>

        {/* Display uploaded documents */}
      </div>
    </div>
  );
};

export default UploadDocument;
