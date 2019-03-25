import React, { Component } from 'react';
import axios from 'axios';
import {
    NavLink,
    Redirect
} from 'react-router-dom';

//STATIC
import loadingSVG from '../loading.svg';

//Component
import { Consumer } from '../App';

//CONFIG
import config from '../config.json';

class UpdateCourse extends Component {

    state = {
        course : null,
        errors : null
    }

    titleInput       = React.createRef();
    descriptionInput = React.createRef();
    estimatedInput   = React.createRef();
    materialsInput   = React.createRef();

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
            auth: {
                username: this.props.user.emailAddress,
                password: this.props.user.password
            },
            responseType : 'json'
        })
        .then(function (response) {
            that.setState( prevState => {
                return {
                    ...prevState,
                    course : response.data
                }
            });
        })
        .catch(function (response) {
            that.props.history.push('/error');
        });        
    }

    render() {
        return (
            <Consumer>
                { 
                    ({ user }) => {
                        if (this.state.course) {

                            if (this.state.course.user._id !== user._id) return (<Redirect to="/forbidden" />)

                            const errors       = [];
                            const that         = this;
                            const handleSubmit = (e) => {
                                e.preventDefault();                           
                                
                                axios({
                                    method : 'PUT',
                                    url    : config.apiURI + '/api/courses/' + this.state.course._id,
                                    auth   : {
                                        username : this.props.user.emailAddress,
                                        password : this.props.user.password
                                    },
                                    data : {
                                        user            : user._id,
                                        title           : this.titleInput.current.value,
                                        description     : this.descriptionInput.current.value,
                                        estimatedTime   : this.estimatedInput.current.value,
                                        materialsNeeded : this.materialsInput.current.value
                                    },
                                    responseType : 'json'
                                })
                                .then(function (response) {
                                    //handle success
                                })
                                .catch( error => {
                                    that.setState( prevState => {
                                        return {
                                            ...prevState,
                                            errors : error.response.data.error
                                        }
                                    })
                                });
                                                            
                            };
                            
                            if (this.state.errors)
                                Object.keys(this.state.errors).forEach( (error, index) => { errors.push(<li key={index}>{this.state.errors[error].message}</li>); });

                            return (
                                <div className="bounds course--detail">
                                    <h1>Update Course</h1>
                                    <div>
                                        {
                                            errors && errors.length
                                            ?
                                            <div>
                                                <h2 className="validation--errors--label">Validation errors</h2>
                                                <div className="validation-errors">
                                                    <ul>
                                                        {errors}
                                                    </ul>
                                                </div>
                                            </div>
                                            :
                                            ''
                                        }
                                        <form onSubmit={handleSubmit}>
                                            <div className="grid-66">
                                                <div className="course--header">
                                                    <h4 className="course--label">Course</h4>
                                                    <div>
                                                        <input ref={this.titleInput} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue={ this.state.course.title } />
                                                    </div>
                                                    <p>By { this.state.course.user.firstName } { this.state.course.user.lastName }</p>
                                                </div>
                                                <div className="course--description">
                                                    <div>
                                                        <textarea ref={this.descriptionInput} id="description" name="description" className="" placeholder="Course description..." defaultValue={ this.state.course.description }></textarea>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="grid-25 grid-right">
                                                <div className="course--stats">
                                                    <ul className="course--stats--list">
                                                        <li className="course--stats--list--item">
                                                            <h4>Estimated Time</h4>
                                                            <div>
                                                                <input ref={this.estimatedInput} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue={ this.state.course.estimatedTime } />
                                                            </div>
                                                        </li>
                                                        <li className="course--stats--list--item">
                                                            <h4>Materials Needed</h4>
                                                            <div>
                                                                <textarea ref={this.materialsInput} id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue={ this.state.course.materialsNeeded }></textarea>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="grid-100 pad-bottom">
                                                <button className="button" type="submit">Update Course</button>
                                                <NavLink className="button button-secondary" to={ '/courses/' + this.state.course._id }>Cancel</NavLink>
                                            </div>
                                        </form>
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
  
  export default UpdateCourse;