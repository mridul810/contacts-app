import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './create.scss';
import { ADD_ITEM } from '../../utils/constant';

function Create({ status, handleClose,
    handleChange, submitCreateForm, state }) {
    const { fullname, phoneNo } = state;
    return (
        <Modal show={status} onHide={handleClose} animation={true} centered>
            <Modal.Header closeButton className='modal-content_add'>
                <Modal.Title>{ADD_ITEM}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={submitCreateForm}>
                    <Form.Group controlId="formBasicFullName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Full Name"
                            name="fullname"
                            value={fullname || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasicPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Enter Phone Number"
                            name="phoneNo"
                            value={phoneNo || ''}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
          </Button>
                <Button variant="success" onClick={submitCreateForm}>
                    Save
          </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Create;