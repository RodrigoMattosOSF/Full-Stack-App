import React, { Component } from 'react';

//Component
import { Consumer } from '../App';

class UnhandledError extends Component {

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
                            <div className="unhandlederror">
                                <div className="bounds">
                                    <h1>Error</h1>
                                    <p>Sorry! We just encountered an unexpected error.</p>
                                </div>
                            </div>
                        );
                    }
                }
            </Consumer>
        )
    }
}
  
  export default UnhandledError;