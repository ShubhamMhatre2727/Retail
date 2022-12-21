import React, { useState, useEffect } from "react";
import { contractAddress } from "../config";
import ABI from "../contract.json";
import { ethers } from "ethers";
import { Web3Storage } from 'web3.storage'

import "./inspect_style.css";

const AddUser = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState()
  const [phone, setPhone] = useState('')
  const [identity, setIdentity] = useState('')
  const [ready, setReady] = useState('Upload Document :')

  const { ethereum } = window;

  const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1YkU2MkJkNjQ0OGQzOTRDMDM5MDlBQjIxRTk4MDgwMzcwMDU2QzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQ1NjE0MDM5OTAsIm5hbWUiOiJyZXRhaWwifQ.tL7FAncUhsVd-W1P0u7Ko2OmUHqTZPwmVzEakpraDqs' });
  const onSubmit = async (e) => {
    setReady("wait till documetn is uploaded :")
    const obj = e.target.files;
    const name = obj[0].name.toString()
    const rootCid = await client.put(obj, { name: name });
    const url = `https://${rootCid}.ipfs.dweb.link/${name}`
    setIdentity(url)
    setReady('ready to upload :')
    console.log(url)

  }

  const submitForm = async (event) => {
    try {
      event.preventDefault();
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      var RetailContract = new ethers.Contract(
        contractAddress,
        ABI.abi,
        signer
      );

      RetailContract.addUser(address, name, age, phone, identity)
      setName(''); setAddress(''); setAge('')
      setPhone(''); setIdentity('')

    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="container_land">

      <div className="wrapper_addUser">
        <form onSubmit={submitForm}>
          <h1>Add User</h1>

          <input type="text" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}
          />

          <input type="text" placeholder="Contract Address" required value={address} onChange={(e) => setAddress(e.target.value)}
          />
          <input type="text" placeholder="Age" required value={age} onChange={(e) => setAge(e.target.value)}
          />

          <input type="text" placeholder="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)}
          />

          <label>{ready}
            <input type="file" name="" id="" required onChange={(e) => onSubmit(e)} />
          </label><br />
          <input type='submit' />
        </form>
      </div>
    </div>
  );
};

export default AddUser;
