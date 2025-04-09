import React from 'react'
import SideBar from '../../component/SideBar'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import Complaint from './Complaint'
import UserManagement from './UserManagement'
import Feedback from './Feedback'
import Enquiry from './Enquiry'

function Admin() {
  return (
    <div className='w-full  md:flex p-4 md:p-10'>
        <div className='w-full justify-items-center md:justify-items-start pb-10 md:pb-0 sm:w-1/2 lg:w-1/4'>
          <SideBar/>  
        </div>
        <div className='w-full lg:w-4/5'>
            <Routes>
                <Route path='/' element={<AdminDashboard/>}/>
                <Route path='complaint' element={<Complaint/>}/>
                <Route path='user' element={<UserManagement/>}/>
                <Route path='feedback' element={<Feedback/>}/>
                <Route path='enquiry' element={<Enquiry/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default Admin