// Help Truffle find TruffleTutorial.sol in the /contracts directory
const Eventcontract = artifacts.require("Eventcontract");

module.exports = function (deployer) {
    // Command Truffle to deploy the Smart Contract
    deployer.deploy(Eventcontract);
};