import React, { useEffect, useState } from 'react'
import { contractAddress } from '../config';
import ABI from '../contract.json'
import { ethers } from "ethers";

const ApprovedRequests = () => {
    const { ethereum } = window;
    const [requests, setRequests] = useState([])
    const reqStatus = {
        0: 'Pending',
        1: 'Rejected',
        2: 'Accepted'
    }
  
    // connection to constract
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const RetailContract = new ethers.Contract(
          contractAddress,
          ABI.abi,
          signer
        );

    const getReqs = async () => {
      try {
        var data = await RetailContract.showApprovedRequests();
        setRequests(data);
      } catch (error) { 
        console.log(error);
      }
    };

    const doTransaction = async(rId)=>{
        await RetailContract.makeTransfer(rId).then(res=>{
            if(res) console.log('done')
            else console.log('not done')
        })

    }

    const showTrans = async()=>{
        var data = await RetailContract.showTransactions();
        console.log(data);
    }

useEffect(() => {
  getReqs();
  showTrans();
}, [])

    
  return (
    <div>
        <table border='1px'>
          <thead>
            <td>Owner</td>
            <td>Buyer</td>
            <td>PaymentStatus</td>
            <td>Transact</td>
          </thead>
          <tbody>
          {
            requests.map((val, key)=>(
                <tr key={key}>
                    {/* <td>{val['reqId'].toNumber()}</td>
                    <td>{val['landId'].toNumber()}</td> */}
                    <td>{val['ownerName']}</td>
                    <td>{val['buyerName']}</td>
                    <td>{val['paymentDone'].toString()}</td>
                    {/* <td>{reqStatus[val['requestStatus']]}</td> */}
                    <button onClick={()=>doTransaction(val['reqId'])}>make transaction</button>
                    
                </tr>
            ))
        }
          </tbody>
        </table>
    </div>
  )
}

export default ApprovedRequests