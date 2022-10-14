import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import AddLand from './AddLand';
import AllLands from './AllLands';
import Requests from './Requests';
import UserNav from './UserNav';
import Users from './Users';

import { contractAddress } from '../config';
import ABI from '../contract.json'
import { ethers } from "ethers";
import SendMoney from './SendMoney';
import styled from 'styled-components';

export const User = () => {

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
    document.title = 'User Dashboard'
    connectContract();
  }, [])
  
  return (
    <div>
      <Router>
      <Body>
      <SideBar>
      <ul>
      <li>
        <Link to="/users">Users</Link>
      </li>
      <li>
        <Link to="/addLand">Add Land</Link>
      </li>
      <li>
        <Link to="/allLands">Lands</Link>
      </li>
      <li>
        <Link to="/requests">requests</Link>
      </li>
    </ul>
      </SideBar>
      <div>
      <Nav><UserNav/></Nav>
      <Container>
      <Routes>
        <Route exact path='/users' element={<Users/>}></Route>
        <Route exact path='/addLand' element={<AddLand/>}></Route>
        <Route exact path='/requests' element={<Requests user={userData['addr']}/>}></Route>
        <Route exact path='/allLands' element={<AllLands user={userData['addr']} owner={true} />}></Route>

        </Routes>
      </Container>
      </div>
    </Body>
    </Router>
      
      
      
      
      
    </div>
  )
}

const Body = styled.div`
  display: grid;
  grid-template-rows:    repeat(1, 100vh);
  grid-template-columns: repeat(2, 20vw 80vw);
`

const Nav = styled.div`
  /* background-color: blue; */
  border: 1px solid black;
  height: 10vh;
`

const SideBar = styled.div`
  /* background-color: green; */
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  /* background-color: red; */
  border: 1px solid black;
  height: 85vh;
`