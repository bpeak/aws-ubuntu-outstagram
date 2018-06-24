import React, { Component } from 'react';

//scss

class ProfileOther extends Component {
    render() {
        return (
            <div>
                {this.props.nick}는 누구냐면
            </div>
        );
    }
}

export default ProfileOther;