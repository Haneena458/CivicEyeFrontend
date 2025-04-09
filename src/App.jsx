import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Toaster } from 'react-hot-toast'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Password from './pages/Password'
import LoginPage from './pages/LoginPage'
import Admin from './pages/adminpage/Admin'
import Profile from './pages/Profile'
import About from './pages/About'
import Contact from './pages/Contact'
import MyComplaint from './pages/user/MyComplaint'
import RegisterComplaint from './pages/user/RegisterComplaint'
import ViewComplaint from './pages/user/ViewComplaint'


function App() {

  return (
    <>
     <BrowserRouter>
     <Toaster/>
     <Routes>
     <Route path='/' element={<LoginPage/>}/>
     <Route path='/signup' element={<Signup/>}/>
      <Route path='/admin/*' element={<Admin/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/password' element={<Password/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/myComplaint' element={<MyComplaint/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/complaint/:category' element={<RegisterComplaint/>}/>
      <Route path='/viewComplaint' element={<ViewComplaint/>}/>

     </Routes>
     </BrowserRouter>

    </>
  )
}

export default App
