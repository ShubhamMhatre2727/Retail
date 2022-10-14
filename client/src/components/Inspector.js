import React, { useEffect } from 'react'
import styled from 'styled-components'

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
    <Router>
      <Body>
      <SideBar>
      <ul>
      <li>
        <Link to="/">Add User</Link>
      </li>
      <li>
        <Link to="/users">users</Link>
      </li>
      <li>
        <Link to="/lands">lands</Link>
      </li>
      <li>
        <Link to="/requests">requests</Link>
      </li>
    </ul>
      </SideBar>
      <div>
      <Nav><strong>Inspector Dashboard</strong></Nav>
      <Container>
      <Routes>
        <Route exact path='/' element={< AddUser />}></Route>
        <Route exact path='/users' element={< Users inspector={true}/>}></Route>
        <Route exact path='/lands' element={< AllLands inspector={true}/>}></Route>
        <Route exact path='/requests' element={<ApprovedRequests/>}></Route>
        </Routes>
      </Container>
      </div>
    </Body>
    </Router>
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
  height: 90vh;
`

export default Inspector