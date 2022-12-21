import react, { useState, useEffect } from 'react';
import { contractAddress } from '../config';
import ABI from '../contract.json'
import { ethers } from "ethers";

import "./styles.css";
import "./modal.css";

import view_file from '../img/file.png';
import down_arrow from '../img/down-chevron.png';

const AllLands = (props) => {

  const { ethereum } = window;
  const [Lands, setLands] = useState([])
  const [landData, setLandData] = useState("")
  var landTransactions = []

  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const RetailContract = new ethers.Contract(
    contractAddress,
    ABI.abi,
    signer
  );

  const connectContract = async () => {
    try {
      var data = await RetailContract.getAllLands();
      setLands(data);
    } catch (error) {
      console.log(error);
    }
  };

  async function verifyLand(landId) {
    await RetailContract.verifyLand(landId)
      .then(async () => {
        await setTimeout(() => { }, 5000)
        window.location.reload()
      })
  }

  async function makeLandForSell(landId) {
    await RetailContract.isLandVerified(landId).then(async (res) => {
      if (res) {
        await RetailContract.makeLandForSell(landId)
          .then(async () => {
            await setTimeout(() => { }, 5000)
            window.location.reload()
          })
      }
      else {
        alert('Land is Not Verified')
      }
    })

  }


  async function sendRequest(landId) {
    await RetailContract.isUserVerified().then(async (res) => {
      if (res) {
        await RetailContract.addRequest(landId)
          .then(async (res) => {
            if (res) {
              setTimeout(() => { }, 5000)
              window.location.reload()
              console.log('sent')
            }
          })
      } else alert('User Not Verified')
    })

  }

  async function showModal(landId) {
    // getting land data

    var land = await RetailContract.landList(landId)
    const modal = document.getElementById('modal-toggle')
    modal.checked = true;
    // console.log(land);
    setLandData({
      'area': land['area'].toNumber(),
      'doc': land['doc'],
      'isForSell': land['isForSell'].toString(),
      'isLandVerified': land['isLandVerified'].toString(),
      'landId': land['landId'].toNumber(),
      'landImage': land['landImage'],
      'location': land['location'],
      'ownerAddr': land['ownerAddr'],
      'place': land['place'],
      'price': land['price'].toNumber(),
      'supportingDoc': land['supportingDoc'],
    })

    // getting transactions related to selected land
    var transactions = await RetailContract.showTransactions()
    transactions.map((val, key) => {
      if (val['landId'].toNumber() == land['landId'].toNumber()) {
        landTransactions.push({
          'from': val['from'],
          'fromName': val['fromName'],
          'landId': val['landId'].toNumber(),
          'tId': val['tId'].toNumber(),
          'to': val['to'],
          'toName': val['toName'],
        })
      }
    })
    console.log(landTransactions)
    var transacts = document.getElementById('transactions-data')
    var str = '<p>Previuos Transactions</p><div>';
    landTransactions.forEach(transaction => {
      str += `<div>
                <p><span>From: </span>${transaction['fromName']}</p>
                <img src=${down_arrow} alt="View" />
                <p><span>To: </span>${transaction['toName']}</p>
              </div>`
    })
    str += `</div>`
    console.log(str);
    transacts.innerHTML = str;
  }



  useEffect(() => {
    connectContract()
  }, [])

  return (
    <div className="all_lands_div">
      <h1>Lands List</h1>
      <table id="all_lands_table">
        <thead>
          <tr>
            <th>Area</th>
            <th>Price</th>
            <th>Place</th>
            <th>isForSell</th>
            <th>isVerified</th>
          </tr>
        </thead>
        <tbody>
          {
            Lands.map((land, key) => (
              <tr key={key}>
                {/* <p>landId: {land['landId'].toNumber()}</p>
            <p>ownerAddr: {land['ownerAddr']}</p> */}
                <td>{land['area'].toNumber()}</td>
                <td>{land['price'].toNumber()}</td>
                <td>{land['place']}</td>
                <td>{land['isForSell'].toString()}</td>
                <td>{land['isLandVerified'].toString()}</td>
                <td><a href={land['doc'].toString()} target='blank'>

                </a></td>
                <td><button onClick={() => showModal(land['landId'].toNumber())}><img src={view_file} alt="View" /></button></td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <div className="modal-container">
        <input id="modal-toggle" type="checkbox" />
        <div className="modal-backdrop">
          <div className="modal-content">
            {
              <div class="modal_info">
                <label className="modal-close" htmlFor="modal-toggle">x</label>
                <div class="to_modal">
                  <h4><span>Area: </span>{landData['area']}</h4>
                  <h4><span>Price: </span>{landData['price']}</h4>
                  <h4><span>Place: </span>{landData['place']}</h4>
                  <h4><span>For Sell: </span>{landData['isForSell']}</h4>
                  <h4><span>Land Verified: </span>{landData['isLandVerified']}</h4>
                  <h4><span>Location: </span>{landData['location']}</h4>
                  <h4><span>Owner Address: </span>{landData['ownerAddr']}</h4>
                  <h4><span>Document: </span><a href={landData['doc']} target='blank'>View</a></h4>
                  <h4><span>Land: </span><a href={landData['landImage']} target='blank'>View</a></h4>
                  {
                    (landData['supportingDoc'] == '')?
                      <></>
                      :
                      <h4><span>Supporting Document: </span><a href={landData['supportingDoc']} target='blank'>View</a></h4>
                  }
                  {
                    (props.inspector) ?
                      <div><button onClick={() => verifyLand(landData["landId"])}>
                        {(landData['isLandVerified']==='true')? <>
                          {/* <img src={verified} alt="Verified" /> */}Unverify
                        </> : <>
                          {/* <img src={unverified} alt="Unverified" /> */}Verify
                        </>}
                      </button></div>
                      :
                      <></>
                  }
                  {
                    (props.user == landData['ownerAddr']) ?
                      <div><button onClick={() => makeLandForSell(landData["landId"])}>
                        {(landData['isForSell'] === 'true')? <>
                          {/* <img src={available} alt="Available" /> */}Don't Sell
                        </> : <>
                          {/* <img src={unavailable} alt="Unavailable" /> */}Available
                        </>}
                      </button></div>
                      :
                      <></>
                  }

                  {
                    (props.user != landData['ownerAddr'] && landData['isForSell']==='true' && !props.inspector) ?
                      <div><button onClick={() => sendRequest(landData['landId'])}>
                        Send Request
                      </button></div>
                      :
                      <></>
                  }
                </div>
                <br />
                <div id='transactions-data'></div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default AllLands;