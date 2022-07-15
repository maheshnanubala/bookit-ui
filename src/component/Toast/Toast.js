'use strict';
import React, { useState, useEffect } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastMessage = (props) => {
    const [show, setShow] = useState(props?.show);
    useEffect(() => {
        setShow(props?.show);
    }, [props?.show]);

    return <ToastContainer className="p-3" position="top-end">
        <Toast onClose={() => { props?.onClose() }} show={show}>
            <Toast.Header closeButton="true">
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">{props?.header}</strong>
            </Toast.Header>
            <Toast.Body>{props?.message}</Toast.Body>
        </Toast>
    </ToastContainer>
}

export default ToastMessage;