import React, { Component } from 'react';
import {
    NavLink,
    Redirect
} from 'react-router-dom';
import axios from 'axios';

//Component
import { Consumer } from '../App';

//CONFIG
import config from '../config.json';

class CreateCourse extends Component {

    state = {
        errors : null,
        created : false
    }

    constructor(props) {
        super(props);
        this.props = props;
    }

    titleInput       = React.createRef();
    descriptionInput = React.createRef();
    estimatedInput   = React.createRef();
    materialsInput   = React.createRef();

    render() {
        return (
            <Consumer>
                { 
                    ({ user }) => {
                        if (this.state.created) return (<Redirect to="/" />)

                        const that         = this;
                        const errors       = [];
                        const handleSubmit = (e) => {
                            e.preventDefault();
                            
                            axios({
                                method : 'POST',
                                url    : config.apiURI + '/api/courses',
                                auth   : {
                                    username: this.props.user.emailAddress,
                                    password: this.props.user.password
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
                                that.setState( prevState => {
                                    return {
                                        ...prevState,
                                        created : true
                                    }
                                })
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
                                <h1>Create Course</h1>
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
                                                    <input ref={this.titleInput} id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue="" />
                                                </div>
                                                <p>By {user.firstName} {user.lastName}</p>
                                            </div>
                                            <div className="course--description">
                                                <div>
                                                    <textarea ref={this.descriptionInput} id="description" name="description" className="" placeholder="Course description..." defaultValue=""></textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-25 grid-right">
                                            <div className="course--stats">
                                                <ul className="course--stats--list">
                                                    <li className="course--stats--list--item">
                                                        <h4>Estimated Time</h4>
                                                        <div>
                                                            <input ref={this.estimatedInput} id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue="" />
                                                        </div>
                                                    </li>
                                                    <li className="course--stats--list--item">
                                                        <h4>Materials Needed</h4>
                                                        <div>
                                                            <textarea ref={this.materialsInput} id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." defaultValue=""></textarea>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="grid-100 pad-bottom">
                                            <button className="button" type="submit">Create Course</button>
                                            <NavLink className="button button-secondary" to='/'>Cancel</NavLink>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        );
                    }
                }
            </Consumer>
        )
    }
}
  
  export default CreateCourse;