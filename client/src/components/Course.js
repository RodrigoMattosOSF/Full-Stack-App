import React, { Component } from 'react';
import {
    NavLink
} from 'react-router-dom';

//Component
import { Consumer } from '../App';

class Course extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Consumer>
                { 
                    ({ user }) => {
                        return (
                            <div className="grid-33">
                                <NavLink className="course--module course--link" to={ '/courses/' + this.props.course._id }>
                                    <h4 className="course--label">Course</h4>
                                    <h3 className="course--title">{ this.props.course.title }</h3>
                                </NavLink>
                            </div>
                        );
                    }
                }
            </Consumer>
        )
    }
}
  
  export default Course;