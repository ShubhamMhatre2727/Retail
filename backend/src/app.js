const contractAddress = '0x24830B474261F9a9E5B3807045935c57b310E28E';
const abi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "inspectorCount",
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
      "inputs": [],
      "name": "userCount",
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
          "name": "sender",
          "type": "address"
        }
      ],
      "name": "isContractOwner",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
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
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "isLandInspector",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
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
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
        }
      ],
      "name": "addLandInspector",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getLandInspectors",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "landInspectorID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "addr",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "string",
              "name": "designation",
              "type": "string"
            }
          ],
          "internalType": "struct Retail.landInspector[]",
          "name": "",
          "type": "tuple[]"
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
          "name": "addr",
          "type": "address"
        }
      ],
      "name": "userExists",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
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
          "name": "addr",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "age",
          "type": "uint256"
        }
      ],
      "name": "addUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getUsers",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "userID",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "addr",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "age",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isVerified",
              "type": "bool"
            }
          ],
          "internalType": "struct Retail.user[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "userID",
          "type": "uint256"
        }
      ],
      "name": "verifyUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "userID",
          "type": "uint256"
        }
      ],
      "name": "isUserVerified",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "userId",
          "type": "uint256"
        }
      ],
      "name": "addLand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "userId",
          "type": "uint256"
        }
      ],
      "name": "getLands",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "landId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "userId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "area",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "price",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "isForSell",
              "type": "bool"
            },
            {
              "internalType": "bool",
              "name": "isLandVerified",
              "type": "bool"
            }
          ],
          "internalType": "struct Retail.land[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        }
      ],
      "name": "verifyLand",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        }
      ],
      "name": "isLandVerified",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "landId",
          "type": "uint256"
        }
      ],
      "name": "landForSell",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

let RetailContract;

// loading contract
connectContract = () => {
    try{
        const { ethereum } = window
        if(ethereum){
            console.log('Metamask detected')
            const provider = new ethers.providers.Web3Provider(ethereum)
            const signer = provider.getSigner()
            RetailContract = new ethers.Contract(
                contractAddress,
                abi,
                signer
            )
        }
        else {
            console.log('Metamask not detected')
            return
        }
    }
    catch (error){
        console.log(error)
    }
}

// check account is land inspectore or not
getUsers = ()=>{

    let users =  RetailContract.getUsers()
    console.log(users)
    // return users
}

// function to add user
addUser = (addr, userName, age) =>{
    let res =  RetailContract.addUser(addr, userName, age)
    // console.log(res)
}
$(()=>{
  $(window).load(async()=>{
      connectContract()
      var head = document.getElementById('head');
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      head.innerText = accounts[0];
      // // addUser('0x55537c64a2446c27AA025bd81b35d20df7c795df', 'user2', 23)
      // // getUsers()
      // // console.log(RetailContract.isUserVerified(0))
  }),

  // reloads page when metamask account changed
  ethereum.on('accountsChanged', ()=>{
    // console.log('changed')
    document.location.reload()
  })
})