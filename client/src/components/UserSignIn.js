import React, { Component } from 'react';
import axios from 'axios';
import {
    Redirect,
    NavLink
} from 'react-router-dom';

//Component
import { Consumer } from '../App';

//CONFIG
import config from '../config.json';

class UserSignIn extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }
    

    emailInput = React.createRef();
    passInput  = React.createRef();

    render() {
        return (
            <Consumer>
                { 
                    ({ apiURI, user, userLogin }) => {
                        let { from } = this.props.location.state || { from: { pathname: "/" } };
                        const that   = this;

                        const handleSubmit = (e) => {
                            e.preventDefault();

                            axios({
                                method: 'GET',
                                url: config.apiURI + '/api/users',
                                auth: {
                                    username: this.emailInput.current.value,
                                    password: this.passInput.current.value
                                },
                                responseType : 'json'
                            })
                            .then(function (response) {
                                userLogin({
                                    ...{
                                        emailAddress : that.emailInput.current.value,
                                        password : that.passInput.current.value
                                    },
                                    ...response.data
                                });
                            })
                            .catch(function (response) {
                                console.log(response);
                                that.props.history.push('/error');
                            });

                            e.currentTarget.reset();                            
                        };

                        if (user)  {
                            return (
                                <Redirect to={from} />
                            );
                        }

                        return (
                            <div className="signin">
                                <div className="bounds">
                                    <div className="grid-33 centered signin">
                                        <h1>Sign In</h1>
                                        <div>
                                            <form onSubmit={handleSubmit}>
                                                <div>
                                                    <input ref={this.emailInput} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" />
                                                </div>
                                                <div>
                                                    <input ref={this.passInput} id="password" name="password" type="password" className="" placeholder="Password" />
                                                </div>
                                                <div className="grid-100 pad-bottom">
                                                    <button className="button" type="submit">Sign In</button>
                                                    <button className="button button-secondary" onClick={(e) => { e.preventDefault(); this.props.history.goBack() }} >Cancel</button>
                                                </div>                        
                                            </form>
                                        </div>
                                        <p>&nbsp;</p>
                                        <p>
                                            Don't have a user account?&nbsp;
                                            <NavLink  to='/signup'>Click here</NavLink> to sign up!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                }            
            </Consumer>
        );
    }
}
  
  export default UserSignIn;