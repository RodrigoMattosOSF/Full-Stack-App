import React from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';
//Component
import { Consumer } from '../App';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Consumer>
        { 
            ({ user }) => {
                return (
                    <Route {...rest} render={(props) => (
                        !user
                        ? 
                        <Redirect
                            to={{
                            pathname: "/forbidden",
                            state: { from: props.location }
                            }}
                        />  
                        : <Component {...props} user={user}/>
                    )} />
                );
            }
        }    
    </Consumer>
)

export default PrivateRoute;