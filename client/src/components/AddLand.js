import React, { useState } from "react";
import { contractAddress } from "../config";
import ABI from "../contract.json";
import { ethers } from "ethers";
import { Web3Storage } from 'web3.storage'
import { useEffect } from "react";

import "./styles.css";

const AddLand = () => {
  const { ethereum } = window;
  const [Area, setArea] = useState("");
  const [Price, setPrice] = useState("");
  const [Place, setPlace] = useState("");
  const [doc, setDoc] = useState('')
  const [supDoc, setsupDoc] = useState('')
  const [landImg, setlandImg] = useState('')
  const [location, setLocation] = useState('0,0')
  const [ready_1, setReady_1] = useState('Document:')
  const [ready_2, setReady_2] = useState('Support Document ')
  const [ready_3, setReady_3] = useState('Land Image:')

  const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1YkU2MkJkNjQ0OGQzOTRDMDM5MDlBQjIxRTk4MDgwMzcwMDU2QzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQ1NjE0MDM5OTAsIm5hbWUiOiJyZXRhaWwifQ.tL7FAncUhsVd-W1P0u7Ko2OmUHqTZPwmVzEakpraDqs' });
  const onSubmit = async (e) => {
    setReady_1("wait till documetn is uploaded :")
    const obj = e.target.files;
    const name = obj[0].name.toString()
    const rootCid = await client.put(obj, { name: name });
    const url = `https://${rootCid}.ipfs.dweb.link/${name}`
    setDoc(url)
    setReady_1('ready to upload')
    console.log("doc = " + url)

  }
  const onSubmitDoc = async (e) => {
    setReady_2("wait till documetn is uploaded :")
    const obj = e.target.files;
    const name = obj[0].name.toString()
    const rootCid = await client.put(obj, { name: name });
    const url = `https://${rootCid}.ipfs.dweb.link/${name}`
    setsupDoc(url)
    setReady_2('ready to upload')
    console.log("supporting = " + url)

  }
  const onSubmitImg = async (e) => {
    setReady_3("wait till documetn is uploaded :")
    const obj = e.target.files;
    const name = obj[0].name.toString()
    const rootCid = await client.put(obj, { name: name });
    const url = `https://${rootCid}.ipfs.dweb.link/${name}`
    setlandImg(url)
    setReady_3('ready to upload')
    console.log("image = " + url)

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
      await RetailContract.isUserVerified().then(async (res) => {
        if (res) {
          await RetailContract.addLand(Area, Price, Place, location, landImg, doc, supDoc).then(() => {
            window.location.reload()
          })
        }
        else {
          alert('User is Not Verified')
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // setting location
    navigator.geolocation.getCurrentPosition(function (position) {
      setLocation(position.coords.longitude + ',' + position.coords.latitude)
    });
    console.log(`https://www.google.co.in/maps/@${location},16z?hl=en&authuser=0`)
  }, [])


  return (
    <div className="wrapper">
      <div className="container">
        <div className="title">Add Land</div>
        <div className="content">
          <form onSubmit={submitForm}>
            <div className="user-details">

              <div className="input-box">
                <input
                  placeholder="Area (sq m)"
                  type="number"
                  required
                  value={Area}
                  onChange={(e) => {
                    setArea(e.target.value);
                  }}
                />
              </div>

              <div className="input-box">
                <input
                  placeholder="Price"
                  type="number"
                  required
                  value={Price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>

              <input
                placeholder="Place"
                type="text"
                required
                value={Place}
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
              />

              <label htmlFor="">Location : </label>
              <input placeholder="Location" type="text" value={location} onChange={(e) => { setLocation(e.target.value); }} />


              <div className="input-box">
                <label>{ready_3}
                  <input type="file" name="" id="files" required onChange={(e) => onSubmitImg(e)} />
                </label>
              </div>

              <div className="input-box">
                <label>{ready_1}
                  <input type="file" name="" id="" required onChange={(e) => onSubmit(e)} />
                </label>
              </div>

              <div className="supp_docs">
                <label>{ready_2}<span>(Optional)</span> :
                  <input type="file" name="" id="" onChange={(e) => onSubmitDoc(e)} />
                </label>
              </div>

              <input type="submit" value="ADD" />
            </div>

          </form>
        </div>
      </div >
    </div>



  );
};

export default AddLand;
