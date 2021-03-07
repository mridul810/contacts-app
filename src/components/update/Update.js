import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import './update.scss';
import { UPDATE_ITEM } from '../../utils/constant';

function Update({ status, handleClose, handleChange,
  submitUpdateForm, state }) {
  const { fullname, phoneNo } = state;
  return (
      <Modal show={status} onHide={handleClose} animation={true} centered>
        <Modal.Header closeButton className='modal-content_update'>
          <Modal.Title>{UPDATE_ITEM}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitUpdateForm}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Full Name"
                name="fullname"
                value={fullname || ''}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter Phone Number"
                name="phoneNo"
                value={phoneNo || ''}
                pattern="[789][0-9]{9}"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={submitUpdateForm}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
  );
}

export default Update;