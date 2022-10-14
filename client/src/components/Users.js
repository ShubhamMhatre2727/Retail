import React from "react";
import { useEffect, useState } from "react";
import { contractAddress } from "../config";
import ABI from "../contract.json";
import { ethers } from "ethers";

const Users = (props) => {
  const { ethereum } = window;
  const [Users, setUsers] = useState([])
  var RetailContract;
  


  const connectContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      RetailContract = new ethers.Contract(
        contractAddress,
        ABI.abi,
        signer
      );
      var data = await RetailContract.getUsers();
      setUsers(data)
    } catch (error) { 
      console.log(error);
    }
  };

  const verifyUserData = async(addr)=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      RetailContract = new ethers.Contract(
        contractAddress,
        ABI.abi,
        signer
      );
    await RetailContract.verifyUser(addr)
        .then(async ()=>{
          await setTimeout(()=>{}, 5000)
          var data = await RetailContract.getUsers();
        setUsers(data)
        })
  }

  useEffect(() => {
    connectContract();
  }, []);

  return (
    <div>
      <h1>list of users</h1>
      <table border={'1px'}>
      <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Age</th>
        <th>Phone</th>
        <th>Verified</th>
        <th>ID</th>
        {
          (props.inspector)?<th>verification</th>:<></>
        }
      </tr>
      </thead>
      <tbody>
      {
        Users.map((user, key)=>(
          <tr key={key}>
            <td>{user['name']}</td>
            <td>{user['addr']}</td>
            <td>{user['age'].toString()}</td>
            <td>{user['phone'].toString()}</td>
            <td>{user['isVerified'].toString()}</td>
            <td><a href={user['identity'].toString()} target='blank'>view</a></td>
            <td>
            {
              (props.inspector)?
              <button onClick={()=>verifyUserData(user['addr'])}>
                {(user['isVerified'])? <>unverify</>: <>verify</>}
              </button>
              : <></>
            }
            </td>
          </tr>
        ))
      }
      </tbody>
      </table>
    </div>
  );
};

export default Users;
