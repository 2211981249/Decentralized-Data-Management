import { useState } from "react";

const Card = ({ title, description, docs,indexValue }) => {
  const [documentURL, setDocumentURL] = useState(null); // State to hold the document URL
  const [contentType, setContentType] = useState(""); // State to hold the document type

  const handleClick = (indexValue) => {
    console.log("come")
    console.log(indexValue)
    // Find the document corresponding to the description (hex)
    const newData = docs[indexValue]

    console.log(newData)


      // Create a Blob from the buffer data
      const blob = new Blob([Uint8Array.from(newData.userDocument.data)], {
        type: newData.contentType,
      });

      // Generate a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Set the document URL and content type
      setDocumentURL(url);
      setContentType(newData.contentType);
    
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-xs w-full">
      <h1>Welcome</h1>
      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        onClick={() => handleClick(indexValue)}
      >
        View Details
      </button>

      {/* Conditionally render the document */}
      {documentURL && (
        <div className="mt-4">
          {contentType.includes("image") ? (
            // Display image
            <img src={documentURL} alt="Uploaded Document" className="w-full h-auto" />
          ) : contentType === "application/pdf" ? (
            // Display PDF
            <iframe
              src={documentURL}
              title="PDF Document"
              width="100%"
              height="500px"
            />
          ) : (
            <p>Document format not supported</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Card;
