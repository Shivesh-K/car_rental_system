import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch, Redirect } from 'react-router-dom'
import './App.css';
import { Home, Signup, Login, Profile, Admin, NewRental } from './pages/index'
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
        <AdminRoute exact path='/admin' component={Admin} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
}

export default App;
