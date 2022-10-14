import React from 'react'
import { contractAddress } from '../config';
import ABI from '../contract.json'
import { ethers } from "ethers";

const SendMoney = () => {
    const { ethereum } = window;
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const RetailContract = new ethers.Contract(contractAddress, ABI.abi, signer);

    const makePayment = () => async () => {
        if (!window.ethereum)
          throw new Error("No crypto wallet found. Please install it.");
      
        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tx = await signer.sendTransaction({
          to: "0xc81f0673E01be52D92278A907dc8d38CBC901C3a",
          value: ethers.utils.parseEther("2")
        });
        console.log("tx", tx);
      }

  return (
    <div>Send Money: 
        <button onClick={makePayment()}>send</button>
    </div>
  )
}

export default SendMoney