// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract Identity {

    // Define a structure to store the hashed personal details of the user
    struct UserIdentity {
        bytes32 hashedName;
        bytes32 hashedEmail;
        bytes32 hashedPhone;
        bytes32 hashedAddress;
    }

    // Define a structure to store documents with metadata
    struct Document {
        bytes32 documentHash;
        string documentName;
        uint timestamp;
    }

    // Mapping to store the hashed identities of users with their Ethereum address as the key
    mapping(address => UserIdentity) private identities;

    // Mapping to store documents for each user
    mapping(address => Document[]) private documents;

    // Mapping to check if the user is registered
    mapping(address => bool) private registered;

    // Modifier to ensure that only registered users can call certain functions
    modifier onlyRegistered() {
        require(registered[msg.sender], "User not registered");
        _;
    }

    // Function to register a user with their personal details (hashed)
    function registerIdentity(
        string memory _name,
        string memory _email,
        string memory _phone,
        string memory _userAddress
    ) external {
        require(!registered[msg.sender], "User already registered");

        // Hash the personal details and store them in the contract
        identities[msg.sender] = UserIdentity({
            hashedName: keccak256(abi.encodePacked(_name)),
            hashedEmail: keccak256(abi.encodePacked(_email)),
            hashedPhone: keccak256(abi.encodePacked(_phone)),
            hashedAddress: keccak256(abi.encodePacked(_userAddress))
        });

        // Mark the user as registered
        registered[msg.sender] = true;
    }

    // Function to upload a document (hashed)
    function uploadDocument(string memory _documentHash, string memory _documentName) external onlyRegistered {
        documents[msg.sender].push(Document({
            documentHash: keccak256(abi.encodePacked(_documentHash)),
            documentName: _documentName,
            timestamp: block.timestamp
        }));
    }

    // Function to retrieve the hashed identity of a specific user
    function getHashedIdentity() external view onlyRegistered returns (
        bytes32, bytes32, bytes32, bytes32
    ) {
        UserIdentity storage identity = identities[msg.sender];
        return (
            identity.hashedName,
            identity.hashedEmail,
            identity.hashedPhone,
            identity.hashedAddress
        );
    }

    // Function to retrieve all documents associated with the user's identity
    function getDocuments() external view onlyRegistered returns (Document[] memory) {
        return documents[msg.sender];
    }

    // Function to retrieve both identity and document data together
    function getIdentityAndDocuments() external view onlyRegistered returns (
        bytes32, bytes32, bytes32, bytes32, Document[] memory
    ) {
        UserIdentity storage identity = identities[msg.sender];
        Document[] memory userDocuments = documents[msg.sender];
        return (
            identity.hashedName,
            identity.hashedEmail,
            identity.hashedPhone,
            identity.hashedAddress,
            userDocuments
        );
    }
}
