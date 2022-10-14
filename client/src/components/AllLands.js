import react, {useState, useEffect} from 'react';
import { contractAddress } from '../config';
import ABI from '../contract.json'
import { ethers } from "ethers";

const AllLands = (props)=>{

    const { ethereum } = window;
    const [Lands, setLands] = useState([])

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

    async function verifyLand(landId){
      await RetailContract.verifyLand(landId)
        .then(async ()=>{
          await setTimeout(()=>{}, 5000)
          window.location.reload()
        })
      }

    async function makeLandForSell(landId){
      await RetailContract.isLandVerified(landId).then(async(res)=>{
        if(res){
          await RetailContract.makeLandForSell(landId)
          .then(async ()=>{
          await setTimeout(()=>{}, 5000)
          window.location.reload()
        })
        }
        else{
          alert('Land is not verified')
        }
      })
    
      }


    async function sendRequest(landId){
          await RetailContract.isUserVerified().then(async(res)=>{
            if(res){
              await RetailContract.addRequest(landId)
              .then(async (res)=>{
                if (res){
                  setTimeout(()=>{}, 5000)
                  window.location.reload()
                  console.log('sent')
                }
              })
            }else alert('user not verified')
          })
          
      }

      async function showModal(landId){
        // getting land data
        var landData = await RetailContract.landList(landId)
        console.log(landData);

        // getting transactions related to selected land
        var transactions = await RetailContract.showTransactions()
        var listItem = []
        transactions.map((val, key)=>{
          if(val['landId'].toNumber()==landData['landId'].toNumber()){
            listItem.push(val)
          }
        })

        console.log(listItem);
      }
  


      useEffect(() => {
        connectContract()
      }, [])

    return(
        <div>
          <h2>Lands List</h2>
          <table border={'1px'}>
            <thead>
              <tr>
                <td>Area</td>
                <td>Price</td>
                <td>Place</td>
                <td>isForSell</td>
                <td>isVerified</td>
                <td>Document</td>
                {
                  (props.inspector)?<td>verification</td>:<></>
                }
                {
                  (!props.inspector)?
                  <td>makeForSell/requestPurchase</td>
                  :<></>
                }
              </tr>
            </thead>
            <tbody>
            {
              Lands.map((land, key)=>(
                <tr key={key} onClick={()=>showModal(land['landId'].toNumber())}>
            {/* <p>landId: {land['landId'].toNumber()}</p>
            <p>ownerAddr: {land['ownerAddr']}</p> */}
            <td>{land['area'].toNumber()}</td>
            <td>{land['price'].toNumber()}</td>
            <td>{land['place']}</td>
            <td>{land['isForSell'].toString()}</td>
            <td>{land['isLandVerified'].toString()}</td>
            <td><a href={land['doc'].toString()} target='blank'>view</a></td>
            
            {
              (props.inspector)?
              <td><button onClick={()=>verifyLand(land["landId"].toNumber())}>
                {(land['isLandVerified'])? <>unverify</>: <>verify</>}
                </button></td>
              :
              <></>
            }
            
            
            {
              ( props.user == land['ownerAddr'])?
              <td><button onClick={()=>makeLandForSell(land["landId"].toNumber())}>
                {(land['isForSell'])? <>don't make available</>: <>make available</>}
                </button></td>
              :
              <></>
            }
            
            
            {
              (props.user != land['ownerAddr'] && land['isForSell'] && !props.inspector)?
              <td><button onClick={()=>sendRequest(land['landId'].toNumber())}>send request</button></td>
              :
              <></>
            }
            
          </tr>
              ))
            }
            </tbody>
            </table>
        </div>
    )
}

export default AllLands;