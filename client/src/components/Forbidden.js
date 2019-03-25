import React, { Component } from 'react';

//Component
import { Consumer } from '../App';

class Forbidden extends Component {

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
                            <div className="forbidden">
                                <div class="bounds">
                                    <h1>Forbidden</h1>
                                    <p>Oh oh! You can't access this page.</p>
                                </div>
                            </div>
                        );
                    }
                }
            </Consumer>
        )
    }
}
  
  export default Forbidden;