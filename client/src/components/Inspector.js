import React, { useEffect } from 'react'
import styled from 'styled-components'

import "./styles.css";
import "./inspect_style.css";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import AddUser from './AddUser'
import AllLands from './AllLands'
import ApprovedRequests from './ApprovedRequests'
import Users from './Users'

const Inspector = () => {

  useEffect(() => {
    document.title = 'Land Inspector Dashboard'
  }, [])


  return (
    <div className="siderbarOption">
      <Router>
        <Body>
          <SideBar>
            <ul>
              <div className="navSide">
                <li>
                  <Link to="/"><h2>Add User</h2></Link>
                </li>
                <li>
                  <Link to="/users"><h2>Users</h2></Link>
                </li>
                <li>
                  <Link to="/lands"><h2>Lands</h2></Link>
                </li>
                <li>
                  <Link to="/requests"><h2>Requests</h2></Link>
                </li>
              </div>
            </ul>
          </SideBar>
          <div>
            <div className="navBar_inspect">
              <Nav><h3>Inspector Dashboard</h3></Nav>
            </div>
            <Container>
              <Routes>
                <Route exact path='/' element={< AddUser />}></Route>
                <Route exact path='/users' element={< Users inspector={true} />}></Route>
                <Route exact path='/lands' element={< AllLands inspector={true} />}></Route>
                <Route exact path='/requests' element={<ApprovedRequests />}></Route>
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
  grid-template-columns: repeat(2, 15vw 80vw);
  font-family: "Lato", sans-serif;
`

const Nav = styled.div`
  /* background-color: blue; */
  border: 1px solid #e6ecf0;
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
  height: 90vh;
`

export default Inspector