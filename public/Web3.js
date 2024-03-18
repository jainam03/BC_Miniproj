const Web3 = require('web3')
const web3 = new web3(new web3.providers.HttpProvider('http://localhost:7545'))


const contractABI = [

    {
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
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "nextId",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
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
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
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
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
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
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
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
        "stateMutability": "nonpayable",
        "type": "function"
    }

]
const contractAddress = '0x2784fEC3F6ccb38b9dB9f7186f463fa7969bcD21';

const eventContract = new web3.eth.Contract(contractABI, contractAddress)

eventContract.methods.createEvent("Event name", 1234567890, 100, 50)
    .send({ from: "0x2784fEC3F6ccb38b9dB9f7186f463fa7969bcD21" })
    .on('receipt', function (receipt) {
        console.log('Event created with ID: ' + receipt.events.LogEvent.returnValues.eventId);
    })
    .on('error', function (error) {
        console.error(error);
    })