module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "*", // Match any network id
        },
        // Add more networks if needed
    },

    compilers: {
        solc: {
            version: "0.8.21", // Specify the Solidity compiler version you want to use
            settings: {
                optimizer: {
                    enabled: false, // Enable the optimizer (default is on for production runs)
                    runs: 200,      // Optimize for how many times you intend to run the code (default: 200)
                },
                evmVersion: "byzantium", // EVM version to use
            },
        },
    },
};
