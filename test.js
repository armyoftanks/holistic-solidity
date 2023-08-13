const fs = require('fs');
const Web3 = require('web3');

async function interactWithContract() {
    try {
        const abi = JSON.parse(fs.readFileSync('MyContract.abi', 'utf8'));

        const web3 = new Web3('http://localhost:8545');
        const accounts = await web3.eth.getAccounts();

        if (accounts.length === 0) {
            console.error('No accounts available for interaction.');
            return;
        }

        const contract = new web3.eth.Contract(abi, '0xYourContractAddress');

        const initialData = await contract.methods.data().call();
        console.log('Initial data:', initialData);

        const newValue = 100;

        const nonce = await web3.eth.getTransactionCount(accounts[0], 'latest');

        const txObject = {
            nonce: web3.utils.toHex(nonce),
            to: contract.options.address,
            value: '0x0',
            gasLimit: web3.utils.toHex(300000),
            gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
            data: contract.methods.setData(newValue).encodeABI(),
        };

        const privateKey = process.env.PRIVATE_KEY; 
        const signedTx = await web3.eth.accounts.signTransaction(txObject, privateKey);
        const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('Transaction hash:', tx.transactionHash);

        const updatedData = await contract.methods.data().call();
        console.log('Updated data:', updatedData);
    } catch (error) {
        console.error('Error interacting with contract:', error);
    }
}

interactWithContract();
