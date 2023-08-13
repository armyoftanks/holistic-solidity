const fs = require('fs');
const Web3 = require('web3');
const solc = require('solc');

async function deployContract() {
    try {
        const contractSource = fs.readFileSync('MyContract.sol', 'utf8');

        const input = {
            language: 'Solidity',
            sources: {
                'MyContract.sol': {
                    content: contractSource,
                },
            },
            settings: {
                outputSelection: {
                    '*': {
                        '*': ['*'],
                    },
                },
            },
        };

        const output = JSON.parse(solc.compile(JSON.stringify(input)));
        const abi = output.contracts['MyContract.sol']['MyContract'].abi;
        const bytecode = output.contracts['MyContract.sol']['MyContract'].evm.bytecode.object;

        const web3 = new Web3('http://localhost:8545');
        const accounts = await web3.eth.getAccounts();

        if (accounts.length === 0) {
            console.error('No accounts available for deployment.');
            return;
        }

        const contract = new web3.eth.Contract(abi);

        const deployTransaction = contract.deploy({
            data: bytecode,
            arguments: [42],
        });

        const gasEstimate = await deployTransaction.estimateGas({ from: accounts[0] });

        const options = {
            data: deployTransaction.encodeABI(),
            gas: gasEstimate,
            gasPrice: await web3.eth.getGasPrice(),
            from: accounts[0],
        };

        const privateKey = process.env.PRIVATE_KEY; // Replace with your private key
        const signedTx = await web3.eth.accounts.signTransaction(options, privateKey);
        const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('Contract deployed at:', tx.contractAddress);
    } catch (error) {
        console.error('Error deploying contract:', error);
    }
}

deployContract();
