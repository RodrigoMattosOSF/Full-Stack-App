import React, { Component } from 'react';
import {
    Redirect
} from 'react-router-dom';

//Component
import { Consumer } from '../App';

class UserSignOut extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Consumer>
                { 
                    ({ apiURI, userLogin, userLogout }) => {
                        userLogout();
                        return (
                            <Redirect to="/" />
                        );
                    }
                }
            </Consumer>
        )
    }
}
  
  export default UserSignOut;