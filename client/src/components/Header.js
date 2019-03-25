import React, { Component } from 'react';
import {
    NavLink
} from 'react-router-dom';

//Component
import { Consumer } from '../App';

class Header extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Consumer>
                { 
                    ({ apiURI, userLogin, user }) => {
                        return (
                            <div className="header">
                                <div className="bounds">
                                    <NavLink className="header--logo" to='/'>Courses</NavLink>
                                    {
                                        user !== null
                                        ?
                                            <nav>
                                                <span>Welcome { user.firstName } {  user.lastName }!</span>
                                                <NavLink className="signout" to="/signout">Sign Out</NavLink>
                                            </nav>
                                        :
                                            <nav>                                        
                                                <NavLink className="signup" to='/signup'>Sign Up</NavLink>
                                                <NavLink className="signin" to='/signin'>Sign In</NavLink>
                                            </nav>
                                    }                                            
                                </div>
                            </div>
                        );
                    }
                }
            </Consumer>
        )
    }
}
  
  export default Header;