import React, { Component } from 'react';
import axios from 'axios';
import {
    NavLink
} from 'react-router-dom';

//Component
import { Consumer } from '../App';
import Course from './Course';

//STATIC
import loadingSVG from '../loading.svg';

//CONFIG
import config from '../config.json';

class Courses extends Component {

    state = {
        courses : null
    }

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        const that = this;
        
        axios({
            method: 'GET',
            url: config.apiURI + '/api/courses',
            responseType : 'json'
        })
        .then(function (response) {
            //handle success
            that.setState( prevState => {
                return {
                    ...prevState,
                    courses : response.data
                }
            });
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });        
    }

    render() {
        return (
            <Consumer>
                { 
                    ({ user }) => {
                        var courses = [];

                        if (this.state.courses) {
                            courses = this.state.courses.map( (course, index) => { return <Course course={course} key={index} />; });

                            return (
                                <div className="courses">
                                    <div className="bounds">
                                        {
                                            (courses.length)
                                            ?
                                                courses
                                            :
                                                false
                                        }
                                        {
                                            (user)
                                            ?
                                            <div className="grid-33">
                                                <NavLink className="course--module course--add--module" to='/courses/create'>
                                                    <h3 className="course--add--title">
                                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                                                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                                                        </svg>
                                                        New Course
                                                    </h3>
                                                </NavLink>
                                            </div>
                                            :
                                            ''
                                        }                                        
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <p>
                                    <img src={loadingSVG} alt="Loading...."/>
                                </p>
                            );
                        }                        
                    }
                }
            </Consumer>
        )
    }
}
  
  export default Courses;