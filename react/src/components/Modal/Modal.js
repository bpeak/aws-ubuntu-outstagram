import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './Modal.scss'

class Modal extends Component {
    render() {
        return ReactDOM.createPortal(
            <div className="modal-container">
                {this.props.children}
            </div>,
            document.getElementById('modal-root')
        )
    }
}

export default Modal;