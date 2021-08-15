import React from 'react';

import { Link, withRouter } from 'react-router-dom'
import {Paper} from '@material-ui/core'
class Welcome extends React.Component {

   
    render() {
        return (
            <div className="container">
                <paper >
                <p >SpeakJP is a service for creating conversation opportunities with native Japanese speakers.</p>
                <p>You can talk with Japanese speakers living in Japan, and you can feel free to learn Japanese and experience Japanese culture.</p>
                </paper>
                
                <div className="mx-auto" style={{marginTop:"20%" }}>
                
                    <Link to="/signin">Already have an account? Sign in</Link>
                </div>

            </div>
        );
    }
}

export default withRouter(Welcome);