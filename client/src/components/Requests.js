import React, { useEffect, useState } from 'react'
import { contractAddress } from "../config";
import ABI from "../contract.json";
import { ethers } from "ethers";

import "./styles.css";

import accepted from '../img/accepted.png';
import rejected from '../img/rejected.png';
import payment from '../img/send-money.png';
import payment_done from '../img/paymentDone.png';

const Requests = (props) => {
  const { ethereum } = window;
  const [requests, setRequests] = useState([])
  const reqStatus = {
    0: 'Pending',
    1: 'Rejected',
    2: 'Accepted',
    3: 'Closed'
  }

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const RetailContract = new ethers.Contract(
    contractAddress,
    ABI.abi,
    signer
  );


  const connectContract = async () => {
    try {
      var data = await RetailContract.showRequests();
      console.log(data);
      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  const acceptReq = async (rId) => {
    await RetailContract.acceptRequest(rId)
  }
  const rejectReq = async (rId) => {
    await RetailContract.rejectRequest(rId)
  };

  const doPayment = async (owner, buyer, landId) => {
    const landAddr = await RetailContract.landList(landId)
    var amount = landAddr.price.toNumber() * 0.00001;
    console.log(amount)

    await window.ethereum.send("eth_requestAccounts");
    const tx = await signer.sendTransaction({
      to: owner,
      value: ethers.utils.parseEther(amount.toString())
    });
    console.log("tx", tx);
  }

  const verifyPayment = async (reqId) => {
    await RetailContract.verifyPayment(reqId).then(async (res) => {
      if (res) console.log('payment done')
      else console.log('payment not done')
    })
  }

  useEffect(() => {
    connectContract();
  }, [])

  return (
    <div className="requests_div">
      <h1>Requests</h1>
      <table id="requests_table">
        <thead>
          <tr>
            <th>Owner</th>
            <th>Buyer</th>
            <th>Payment</th>
            <th>RequestStatus</th>
            <th>Accept/Reject</th>
          </tr>
        </thead>
        <tbody>
          {
            requests.map((val, key) => (
              <tr key={key}>
                {/* <td>reqId: {val['reqId'].toNumber()}</td>
                    <td>landId: {val['landId'].toNumber()}</td> */}
                <td>{val['ownerName']}</td>
                <td>{val['buyerName']}</td>
                <td>{val['paymentDone'].toString()}</td>
                <td>{reqStatus[val['requestStatus']]}</td>
                <td>
                  {
                    (props.user == val['owner'] && reqStatus[val['requestStatus']] == reqStatus[0]) ?
                      <>
                        <button onClick={() => acceptReq(val['reqId'])}><img src={accepted} alt="Accepted" /></button>
                        <button onClick={() => rejectReq(val['reqId'])}><img src={rejected} alt="Rejected" /></button>
                      </>
                      :
                      <></>
                  }
                  {
                    (props.user == val['buyer'] && reqStatus[val['requestStatus']] == reqStatus[2] && !val['paymentDone']) ?
                      <button onClick={() => doPayment(val['owner'], val['buyer'], val['landId'].toNumber())}><img src={payment} alt="Pay" /></button>
                      :
                      <></>
                  }
                  {
                    (props.user == val['owner'] && reqStatus[val['requestStatus']] == reqStatus[2]) ?
                      (val['paymentDone'])?
                      <button onClick={() => verifyPayment(val['reqId'])}><img src={payment_done} alt="PaymentDone" /></button>
                      :
                      <button onClick={() => verifyPayment(val['reqId'])}>Payment Done ?</button>
                      :
                      <></>
                  }
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Requests