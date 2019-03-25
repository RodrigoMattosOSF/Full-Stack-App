import React, { Component } from 'react';

//Component
import { Consumer } from '../App';

class NotFound extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <Consumer>
                { 
                    ({ apiURI, userLogin }) => {
                        return (
                            <div className="notfound">
                                <div className="bounds">
                                    <h1>Not Found</h1>
                                    <p>Sorry! We couldn't find the page you're looking for.</p>
                                </div>
                            </div>
                        );
                    }
                }
            </Consumer>
        )
    }
}
  
  export default NotFound;