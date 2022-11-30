import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Topbar, Footer } from './components/index'
import { New_PERSONAL_SAVINGS_ROUTE, PROGRAMS_ROUTE, PERSONAL_SAVINGS_DETAILS_ROUTE } from './constants/routes';
import {
  Home,
  About,
  Community,
  Docs,
  Ecosystem,
  NewProgram,
  ViewProject,
  Programs,
  NewPersonalSavings,
} from "./pages/index";
import PersonalSavingsDetails from "./pages/personalSavingsDetails/PersonalSavingsDetails";

const App = () => {
  return (
    <>
      <div className='font-main bg-primary text-white   '>
        <Topbar />
        <div className='relative '>
          <div className='body'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/docs' element={<Docs />} />
              <Route path='/new-program' element={<NewProgram />} />
              <Route
                path='/view-program/:programId'
                element={<ViewProject />}
              />
              <Route path='/community' element={<Community />} />
              <Route path='/ecosystem' element={<Ecosystem />} />
              <Route path={PROGRAMS_ROUTE} element={<Programs />} />
              <Route path={New_PERSONAL_SAVINGS_ROUTE} element={<NewPersonalSavings />} />
              <Route path={PERSONAL_SAVINGS_DETAILS_ROUTE} element={<PersonalSavingsDetails />} />
            </Routes>
          </div>

          <div className='absolute bottom-0 w-full'>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
