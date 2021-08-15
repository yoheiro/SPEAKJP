import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from './Firebase';
import { AppBar} from '@material-ui/core';
//screens
import Home from './screens/Home';
import Profile from './screens/Profile';
import SignInOrUp from './screens/SignInOrUp';
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome'
import Auth from './Auth';

class App extends React.Component {
    render() {
        return (
            
            <Router>
                <AppBar position="static">
                <div style={{ textAlign: 'center',fontSize:"50px" }}>SPEAK JP</div>
                </AppBar>
                <Switch>
                    
                <Route exact path="/welcome" component={Welcome} />
                    <Route exact path="/signin" component={SignInOrUp} />
                    <Route exact path="/signup" component={SignUp} />
                    {/* 以下認証のみ */}
                    <Auth>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/profile" component={Profile} />
                            <Route render={() => <p>not found.</p>} />
                        </Switch>
                    </Auth>
                </Switch>
            </Router>
        );
    }
}

export default App;