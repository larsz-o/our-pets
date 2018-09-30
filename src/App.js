import React from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Header from './components/Header/Header';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import Dashboard from './components/Dashboard/Dashboard';
import AddPetsPage from './components/AddPetsPage/AddPetsPage';
import CreateHousehold from './components/CreateHousehold/CreateHousehold';
import AddUsers from './components/AddUsersPage/AddUsersPage'; 
import ConfirmHousehold from './components/ConfirmHousehold/ConfirmHousehold';
import MyAccount from './components/MyAccountPage/MyAccountPage';
import EditSettings from './components/EditSettingsPage/EditSettingsPage'; 
import Inbox from './components/Inbox/Inbox'; 
import JoinHousehold from './components/JoinHousehold/JoinHousehold';
import SelectHousehold from './components/SelectHousehould/SelectHousehold';
import PetProfile from './components/PetProfile/PetProfile'; 
import TechUsed from './components/TechUsed/TechUsed.js'; 

import './styles/main.css';

const App = () => (
  <div>
    <Header/>
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
         <Route
          path="/selecthousehold"
          component={SelectHousehold}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/dashboard"
          component={Dashboard}
        />
        <Route 
          path="/addpets"
          component={AddPetsPage}
        />
        <Route 
          path="/createhousehold"
          component={CreateHousehold}
        />
         <Route 
          path="/addusers"
          component={AddUsers}
        />
         <Route 
          path="/confirmhousehold"
          component={ConfirmHousehold}
        />
        <Route 
          path="/myaccount"
          component={MyAccount}
        />
         <Route 
          path="/editsettings"
          component={EditSettings}
        />
        <Route 
          path="/inbox"
          component={Inbox}
        />
         <Route 
          path="/joinhousehold"
          component={JoinHousehold}
        />
        <Route 
          path="/tech"
          component={TechUsed}
        />
        <Route 
        path="/account/:petId" 
        component={PetProfile}/>
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404: Page Not Found</h1>} />
        
      </Switch>
    </Router>
  </div>
);

export default App;
