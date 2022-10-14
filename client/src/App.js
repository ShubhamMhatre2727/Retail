import Inspector from "./components/Inspector";
import { contractAddress } from './config';
import ABI from './contract.json'
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { User } from "./components/User";
import Uploader from "./components/Uploader";

// Account 4 == contractOwner
// Account 5 == landInspector
// Account 6 == user
function App() {

var RetailContract;
const { ethereum } = window;
const [currentAccount, setCurrentAccount] = useState('')
const [isLandInspector, setIsLandInspector] = useState(false)
const [isUser, setIsUser] = useState(false)

  const connectContract = async() => {
    try {
      if (ethereum) {
        // console.log("Metamask detected");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        RetailContract = new ethers.Contract(contractAddress, ABI.abi, signer);


        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(accounts[0])
        
        RetailContract.isLandInspector(accounts[0]).then(res=>{
          setIsLandInspector(res)
        })
        RetailContract.userExists(accounts[0]).then(res=>{
          setIsUser(res)
        })
      } else {
        console.log("Metamask not detected");
        return;
      }
    } catch (error) {
      console.log(error);
    }
  }

  // reloads page whenever user switches account
  ethereum.on('accountsChanged', async()=>{
    document.location.reload()   
  })

  useEffect(() => {
    connectContract()
  }, [])
  

  return (
    <div className="App">
      { (isUser)? <User/>: (isLandInspector)? <Inspector/>: <Uploader/> }
    </div>
  );
}

export default App;
