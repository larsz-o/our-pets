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
import UserPage from './components/UserPage/UserPage';
import Dashboard from './components/Dashboard/Dashboard';
import AddPetsPage from './components/AddPetsPage/AddPetsPage';
import CreateHousehold from './components/CreateHousehold/CreateHousehold';
import AddUsers from './components/AddUsersPage/AddUsersPage'; 
import ConfirmHousehold from './components/ConfirmHousehold/ConfirmHousehold';
import MedicationReport from './components/MedicationsReport/MedicationsReport';
import WalkReport from './components/WalkReport/WalkReport';
import MyAccount from './components/MyAccountPage/MyAccountPage';
import EditSettings from './components/EditSettingsPage/EditSettingsPage'; 
import JoinHousehold from './components/JoinHousehold/JoinHousehold'; 

import './styles/main.css';

const App = () => (
  <div>
    <Header title="Our Pets" />
    <Router>
      <Switch>
        <Redirect exact from="/" to="/home" />
        <Route
          path="/home"
          component={LoginPage}
        />
        <Route
          path="/register"
          component={RegisterPage}
        />
        <Route
          path="/user"
          component={UserPage}
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
          path="/medicationreport"
          component={MedicationReport}
        />
         <Route 
          path="/walkreport"
          component={WalkReport}
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
          path="/joinhousehold"
          component={JoinHousehold}
        />
        {/* OTHERWISE (no path!) */}
        <Route render={() => <h1>404</h1>} />

      </Switch>
    </Router>
  </div>
);

export default App;
