import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';

//STYLE
import './styles/global.css';

//COMPONENT
import PrivateRoute from './components/PrivateRoute';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignOut from './components/UserSignOut';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import Header from './components/Header';

//CONTEXT
const AppContext = React.createContext();

class App extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        this.userLogin  = this.userLogin.bind(this);
        this.userLogout = this.userLogout.bind(this);
    }

    state = {
        user : null
    }

    userLogout = () => {
        this.setState( prevState => {
            return {
                ...prevState,
                user : null
            }
        });
    }

    userLogin = (data) => {
        this.setState( prevState => {
            return {
                ...prevState,
                user : data
            }
        });  
    }

    render() {
        return (            
            <AppContext.Provider value={{
                userLogin  : this.userLogin,
                userLogout : this.userLogout,
                user       : this.state.user
            }}>
                <Header />
                <Switch>
                    <Route exact path="/" component={Courses} />
                    <PrivateRoute exact path="/courses/create" component={CreateCourse} />
                    <Route exact path="/courses/:id" component={CourseDetail} />                    
                    <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
                    <Route exact path="/signout" component={UserSignOut} />
                    <Route exact path="/signup" component={UserSignUp} />
                    <Route exact path="/signin" component={UserSignIn} />
                    <Route path="/notfound" component={NotFound} />
                    <Route path="/forbidden" component={Forbidden} />
                    <Route path="/error" component={UnhandledError} />
                    <Route component={NotFound} />
                </Switch>
            </AppContext.Provider>
        );
    }
}

export const Consumer = AppContext.Consumer;
export default App;
