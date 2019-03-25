import React, { Component } from 'react';
import {
    NavLink,
    Redirect
} from 'react-router-dom';
import axios from 'axios';

//STATIC
import loadingSVG from '../loading.svg';

//Component
import { Consumer } from '../App';

//CONFIG
import config from '../config.json';

class CourseDetail extends Component {

    state = {
        course  : null,
        deleted : false
    }

    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        const that = this;
        const courseID = this.props.match.params.id;
                
        axios({
            method: 'GET',
            url: config.apiURI + '/api/courses/' + courseID,
            responseType : 'json'
        })
        .then(function (response) {
            //handle success
            that.setState( prevState => {
                return {
                    ...prevState,
                    course : response.data
                }
            });
        })
        .catch(function (error) {
            //handle error            
            if (error.response.status === 403)
                return that.props.history.push('/notfound');
                
            that.props.history.push('/error');
        });        
    }    

    render() {
        return (
            <Consumer>
                { 
                    ({ user }) => {

                        if (this.state.deleted) return (<Redirect to="/" />)

                        if (this.state.course) {
                            
                            const deleteCourse = (e) => {
                                e.preventDefault();
                                const that = this;
                                const courseID = this.props.match.params.id;
                                
                                axios({
                                    method: 'DELETE',
                                    url: config.apiURI + '/api/courses/' + courseID,
                                    auth: {
                                        username: user.emailAddress,
                                        password: user.password
                                    },
                                    responseType : 'json'
                                })
                                .then(function (response) {
                                    that.setState( prevState => {
                                        return {
                                            ...prevState,
                                            deleted : true
                                        }
                                    });
                                })
                                .catch(function (response) {
                                    that.props.history.push('/error');
                                });  
                            };
                            const materials = (this.state.course.materialsNeeded || '').split('*').map( (material, index) => (material.length)?<li key={index}>{material}</li>:false);

                            return (                            
                                <div className="coursedetail">
                                    <div className="actions--bar">
                                        <div className="bounds">
                                            <div className="grid-100">                                                
                                                {
                                                    (user && this.state.course.user._id === user._id)
                                                    ?
                                                        <span>
                                                            <NavLink className="button" to={'/courses/' +  this.state.course._id  + '/update'}>Update Course</NavLink>
                                                            <button className="button" onClick={deleteCourse}>Delete Course</button>
                                                        </span>
                                                    :
                                                        ''
                                                }                                               
                                                <NavLink className="button button-secondary" to='/'>Return to List</NavLink>
                                            </div>
                                        </div>
                                        </div>
                                        <div className="bounds course--detail">
                                        <div className="grid-66">
                                            <div className="course--header">
                                                <h4 className="course--label">Course</h4>
                                                <h3 className="course--title">{ this.state.course.title }</h3>
                                                <p>By { this.state.course.user.firstName } { this.state.course.user.lastName }</p>
                                            </div>
                                            <div className="course--description">
                                                { this.state.course.description }
                                            </div>
                                        </div>
                                        <div className="grid-25 grid-right">
                                            <div className="course--stats">
                                                <ul className="course--stats--list">
                                                    <li className="course--stats--list--item">
                                                        <h4>Estimated Time</h4>
                                                        <h3>{ this.state.course.estimatedTime }</h3>
                                                    </li>
                                                    <li className="course--stats--list--item">
                                                        <h4>Materials Needed</h4>
                                                        <ul>
                                                            { materials }
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
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
  
  export default CourseDetail;