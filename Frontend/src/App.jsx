import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { Topbar } from './components'
import {
  Home,
  About,
  Community,
  Docs,
  Ecosystem,
  NewProgram,
  ViewProject,
} from './pages/index'

const App = () => {
  return (
    <>
      <div className='font-main bg-primary text-white '>
        <Topbar />
        <div className=''>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/docs' element={<Docs />} />
            <Route path='/new-program' element={<NewProgram />} />
            <Route path='/view-program/:programId' element={<ViewProject />} />
            <Route path='/community' element={<Community />} />
            <Route path='/ecosystem' element={<Ecosystem />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
