import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { Home, Signup, Login, Profile, Admin, NewRental, EditProfile } from './pages/index'
import ProtectedRoute from './hoc/ProtectedRoute'
import AdminRoute from './hoc/AdminRoute'

function App() {
  return (
    <Router >
      <Switch>
        <Route exact path='/' component={() => <Redirect to='/home' />} />
        <ProtectedRoute exact path='/home' component={Home} />
        <ProtectedRoute exact path='/rental/new' component={NewRental} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute exact path='/profile/edit' component={EditProfile} />
        <AdminRoute exact path='/admin' component={Admin} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
