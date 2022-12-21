import React from 'react'

import { Web3Storage } from 'web3.storage'



const Uploader = () => {
// Construct with token and endpoint
const client = new Web3Storage({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA1YkU2MkJkNjQ0OGQzOTRDMDM5MDlBQjIxRTk4MDgwMzcwMDU2QzUiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjQ1NjE0MDM5OTAsIm5hbWUiOiJyZXRhaWwifQ.tL7FAncUhsVd-W1P0u7Ko2OmUHqTZPwmVzEakpraDqs' });
const onSubmit=async(e)=>{
  const obj = e.target.files;
  const name = obj[0].name.toString()
  const rootCid = await client.put(obj, { name:  name});

  console.log(`https://${rootCid}.ipfs.dweb.link/${name}`)
}

  return (
    <div>
        {/* <input type="file" name="" id="" onChange={(e)=>onSubmit(e)} /> */}
        <h1>
          Current metamask account is not Authorized
        </h1>
    </div>
  )
}

export default Uploader