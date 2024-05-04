import React, {useState} from "react"
import Login from "./components/account/Login"
import {BrowserRouter, Routes, Route, Outlet, Navigate} from "react-router-dom"
import Home from "./components/home/Home.jsx"
import Header from "./components/headers/Header.jsx"
import CreatePost from "./components/create/CreatePost.jsx"
import DetailView from "./components/postDetails/DetailView.jsx"
import UpdatePost from "./components/update/UpdatePost.jsx"
import Contact from "./components/contact/Contact.jsx"
import About from "./components/about/About.jsx"

const activeUser = {
  name:"",
  username:""
}
var isUserAuthenticated, setUserAuthentication
function PrivateRoute() {
  console.log(isUserAuthenticated)
  return isUserAuthenticated ? 
    <>
      <Header/>
      <Outlet/>
    </>
  :
    <Navigate replace to='/login' />
}

function App() {
  [isUserAuthenticated, setUserAuthentication] = useState(false);
  return (
    <BrowserRouter>
      <div style = {{marginTop: 64}} />
      <Routes>
        <Route path = '/login' element = {<Login user = {activeUser} setUserAuthentication = {setUserAuthentication}/>} />
        <Route path = '/home' element = {<PrivateRoute/>} >
          <Route path = '/home' element = {<Home />} />
        </Route>
        <Route path = '/create' element = {<PrivateRoute/>} >
          <Route path = '/create' element = {<CreatePost user = {activeUser} />} />
        </Route>
        <Route path = '/details/:id' element = {<PrivateRoute/>} >
          <Route path = '/details/:id' element = {<DetailView user = {activeUser} />} />
        </Route>
        <Route path = '/update/:id' element = {<PrivateRoute/>} >
          <Route path = '/update/:id' element = {<UpdatePost/>} />
        </Route>
        <Route path = '/about' element = {<PrivateRoute/>} >
          <Route path = '/about' element = {<About/>} />
        </Route>
        <Route path = '/contact' element = {<PrivateRoute/>} >
          <Route path = '/contact' element = {<Contact/>} />
        </Route>
        <Route path = '/' element = {<PrivateRoute/>} >
          <Route path = '/' element = {<Home/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
