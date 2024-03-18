// Replace with the address of your deployed EventContract
const contractAddress = '0x1B03d302C548bb097E6808b7b60F33A9c9CcEE12';

// Load the ABI from the compiled Solidity contract
const abi = [
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "events",
        "outputs": [
            {
                "internalType": "address",
                "name": "organizer",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ticketCount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ticketRemain",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "nextId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "tickets",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "price",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "ticketCount",
                "type": "uint256"
            }
        ],
        "name": "createEvent",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            }
        ],
        "name": "buyTicket",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }
        ],
        "name": "transferTicket",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

// Connect to a local Ethereum node or use Infura for a public node
const web3 = new Web3('http://localhost:8545');

// Create a contract instance
const eventContract = new web3.eth.Contract(abi, contractAddress);

// Function to create a new event
async function createEvent() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = new Date(document.getElementById('eventDate').value).getTime() / 1000;
    const eventPrice = document.getElementById('eventPrice').value;
    const ticketCount = document.getElementById('ticketCount').value;

    // Use the web3.js library to send a transaction to the smart contract
    console.log("Before calling the creteEvent function")
    await eventContract.methods.createEvent(eventName, eventDate, eventPrice, ticketCount)
        .send({ from: web3.eth.defaultAccount, gas: 2000000 });
    console.log("After calling the creteEvent function")

    // Optionally, update the UI or show a success message
}

// Function to buy tickets for an event
async function buyTicket() {
    const eventId = document.getElementById('eventId').value;
    const buyQuantity = document.getElementById('buyQuantity').value;

    // Use the web3.js library to send a transaction to the smart contract
    await eventContract.methods.buyTicket(eventId, buyQuantity)
        .send({ from: web3.eth.defaultAccount, gas: "2000000", value: web3.utils.toWei((eventPrice * buyQuantity).toString(), 'ether') });

    // Optionally, update the UI or show a success message
}

// Function to transfer tickets to another address
async function transferTicket() {
    const eventId = document.getElementById('eventId').value;
    const transferQuantity = document.getElementById('transferQuantity').value;
    const transferTo = document.getElementById('transferTo').value;

    // Use the web3.js library to send a transaction to the smart contract
    await eventContract.methods.transferTicket(eventId, transferQuantity, transferTo)
        .send({ from: web3.eth.defaultAccount, gas: 2000000 });

    // Optionally, update the UI or show a success message
}

// Initialize the default account on page load
window.onload = async function () {
    const accounts = await web3.eth.getAccounts();
    web3.eth.defaultAccount = accounts[0];
};
