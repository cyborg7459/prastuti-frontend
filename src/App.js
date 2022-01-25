import React from "react";
import { Route, Routes } from 'react-router-dom';

import Homepage from "./pages/Homepage/homePage";
import Loginpage from "./pages/Loginpage/loginPage";
import ProfilePage from "./pages/Profilepage/profilePage";
import EventsPage from "./pages/Eventspage/eventsPage";
import IndividualEvent from "./pages/IndividualEvent/individualEvent";
import Teampage from "./pages/Teampage/teampage";
import CreateTeam from "./pages/CreateTeam/createTeam";
import TeamRegister from "./pages/TeamRegister/teamRegister";
import ErrorPage from "./pages/ErrorPage/errorPage";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage/>} exact/>
        <Route path='/login' element={<Loginpage/>} exact />
        <Route path='/profile' element={<ProfilePage/>} exact/>
        <Route path='/events' element={<EventsPage />} exact/>
        <Route path='/event/:eventName' element={<IndividualEvent />} exact/>
        <Route path='/team/:teamSlug' element={<Teampage />} exact/>
        <Route path='/create-team' element={<CreateTeam />} exact/>
        <Route path='/team-register/:eventName' element={<TeamRegister />} exact />
        <Route path='*' element={<ErrorPage />}/>
      </Routes>
    </div>
  );
}

export default App;
