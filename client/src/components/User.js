import React, { useEffect, useState } from 'react'

import "./styles.css";

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

  const connectContract = async () => {
    try {
      if (ethereum) {
        // console.log("Metamask detected");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        RetailContract = new ethers.Contract(contractAddress, ABI.abi, signer);

        await RetailContract.getUser().then(res => {
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
    <div className="siderbarOption">
      <Router>
        <Body>
          <SideBar>
            <ul>
              <div className="navSide">
                <li>
                  <Link to="/users"><h2>Users</h2></Link>
                </li>
                <li>
                  <Link to="/addLand"><h2>Add Land</h2></Link>
                </li>
                <li>
                  <Link to="/allLands"><h2>Lands</h2></Link>
                </li>
                <li>
                  <Link to="/requests"><h2>Requests</h2></Link>
                </li>
              </div>
            </ul>
          </SideBar>
          <div>
            <Nav><UserNav /></Nav>
            <Container>
              <Routes>
                <Route exact path='/users' element={<Users />}></Route>
                <Route exact path='/addLand' element={<AddLand />}></Route>
                <Route exact path='/requests' element={<Requests user={userData['addr']} />}></Route>
                <Route exact path='/allLands' element={<AllLands user={userData['addr']} owner={true} />}></Route>

              </Routes>
            </Container>
          </div>
        </Body>
      </Router>
    </div >
  )
}

const Body = styled.div`
  display: grid;
  grid-template-rows:    repeat(1, 100vh);
  grid-template-columns: repeat(2, 15vw 80vw);
  font-family: "Lato", sans-serif;
`

const Nav = styled.div`
  /* background-color: blue; */
  border: 1px solid #e6ecf0;
  height: 10vh;
`

const SideBar = styled.div`
  /* background-color: green; */
  border: 1px solid #e6ecf0;
  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  /* background-color: red; */
  border: 1px solid #e6ecf0;
  height: 85vh;
`