import Web3 from 'web3';

let selectedAccount;
let contract;

let isInitialized = 'false';

export const init = async() => {
  let provider = window.ethereum;
  if (typeof provider !== 'undefined') {
		provider
			.request({ method: 'eth_requestAccounts' })
			.then((accounts) => {
				selectedAccount = accounts[0];
				console.log(`Selected account is ${selectedAccount}`);
			}, (err) => {
				console.log(err);
			});

		window.ethereum.on('accountsChanged', function (accounts) {
			selectedAccount = accounts[0];
			console.log(`Selected account changed to ${selectedAccount}`);
		});
	}

	const web3 = new Web3(provider);

	const networkId = await web3.eth.net.getId();

	const StoreHashABI = [
    {
			"constant": true,
			"inputs": [],
			"name": "getHash",
			"outputs": [
				{
					"name": "x",
					"type": "string"
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
					"name": "x",
					"type": "string"
				}
			],
			"name": "sendHash",
			"outputs": [],
			"payable": false,
			"stateMutability": "nonpayable",
			"type": "function"
		}
  ];

		contract= new web3.eth.Contract(
			StoreHashABI,

			'0x1aD5F69C09FD97CcDF4C21c72DB8b362765d4553'
		);

		isInitialized = true;
};

export const storePdfHash = async (pdfHash) => {
  
	await contract.methods.sendHash(pdfHash).send({ from: selectedAccount }).then((response) => {console.log("pdf hash stored in Blockchain", response)}).catch((err) => {console.log(err)});
};


