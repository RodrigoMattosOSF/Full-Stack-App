import React, { Component } from 'react';
import axios from 'axios';

//Component
import { Consumer } from '../App';

class UserSignUp extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    firstNameInput = React.createRef();
    lastNameInput  = React.createRef();
    emailInput     = React.createRef();
    passInput      = React.createRef();
    confirmInput   = React.createRef();
    userForm       = React.createRef();

    render() {
        return (
            <Consumer>
                { 
                    ({ apiURI, userLogin }) => {

                        const handleSubmit = (e) => {
                            e.preventDefault();
                            const that = this;
                            const data = {
                                firstName    : this.firstNameInput.current.value,
                                lastName     : this.lastNameInput.current.value,
                                emailAddress : this.emailInput.current.value,
                                password     : this.passInput.current.value,
                                confirm      : this.confirmInput.current.value
                            };

                            axios({
                                method: 'post',
                                url: apiURI + '/api/users',
                                data: data,
                                config: { headers: {'Content-Type': 'application/json' }}
                            })
                            .then(function (response) {                    
                                that.props.history.push('/signin');
                            })
                            .catch(function (response) {
                                that.props.history.push('/error');
                            });

                            e.currentTarget.reset();                            
                        }                

                        return (
                            <div className="signin">
                                <div className="bounds">
                                    <div className="grid-33 centered signin">
                                        <h1>Sign Up</h1>
                                        <div>
                                            <form ref={this.userForm} onSubmit={handleSubmit}>
                                                <div>
                                                    <input ref={this.firstNameInput} id="firstName" name="firstName" type="text" className="" placeholder="First Name" required/>
                                                </div>
                                                <div>
                                                    <input ref={this.lastNameInput} id="lastName" name="lastName" type="text" className="" placeholder="Last Name" required/>
                                                </div>
                                                <div>
                                                    <input ref={this.emailInput} id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" required/>
                                                </div>
                                                <div>
                                                    <input ref={this.passInput} id="password" name="password" type="password" className="" placeholder="Password" required/>
                                                </div>
                                                <div>
                                                    <input ref={this.confirmInput} id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" required/>
                                                </div>
                                                <div className="grid-100 pad-bottom">
                                                    <button className="button" type="submit">Sign Up</button>
                                                    <button className="button button-secondary" onClick={(e) => { e.preventDefault(); this.props.history.goBack() }}>Cancel</button>
                                                </div>
                                            </form>
                                        </div>
                                        <p>&nbsp;</p>
                                        <p>Already have a user account? <a href="sign-in.html">Click here</a> to sign in!</p>
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
  
  export default UserSignUp;