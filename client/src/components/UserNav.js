import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { contractAddress } from '../config';
import ABI from '../contract.json'
import { ethers } from "ethers";

const UserNav = () => {
    var RetailContract;
    const { ethereum } = window;
    const [userData, setUserData] = useState([]);
    
      const connectContract = async() => {
        try {
          if (ethereum) {
            // console.log("Metamask detected");
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            RetailContract = new ethers.Contract(contractAddress, ABI.abi, signer);
            
            await RetailContract.getUser().then(res=>{
                setUserData({
                  'addr': res['addr'],
                  'name': res['name'],
                  'age': res['age'].toNumber(),
                  'isVerified': res['isVerified'].toString(),
                });
              })

          } else {
            console.log("Metamask not detected");
            return;
          }
        } catch (error) {
          console.log(error);
        }
      }
  
      useEffect(() => {
        connectContract()
      }, [])
  return (
    <div>
        <Nav>
        <h5>NameL {userData['name']}</h5>
        {/* <h5>{userData['addr']}</h5> */}
        <h5>Age: {userData['age']}</h5>
        <h5>verification Status: {userData['isVerified']}</h5>
      </Nav>
    </div>
  )
}

export default UserNav



const Nav = styled.nav`
    display: flex;
    justify-content: center;
    h5{
      margin: 0 15px;
    }
`