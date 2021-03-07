import React from "react";
import { OverlayTrigger, Tooltip, Card, Button, Row, Col} from "react-bootstrap";
import { MdDelete } from "react-icons/md";
import { GrTooltip } from "react-icons/gr";
import './listItem.scss';

function ListItem({ lists, onHandleEdit, onDelete, onChecked,
  AnyChecked, handleAllChecked, deleteAll }) {
  
  const renderTooltip = (list) => {
    return (
      <>
        <span>{list.fullname.length > 15 ?
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip>
                {list.fullname}
              </Tooltip>
            }>
            <span className="tooltip-text">
              {list.fullname.substring(0, 15).trim() + '...'}
              <GrTooltip />
            </span>
          </OverlayTrigger>
          : list.fullname}
        </span>
      </>
    )
  }
  return (
    <>
    <Row className="p-2">
      <Col xs={12} md={6}>
        <h2>
          List of all the contacts
        </h2>
      </Col>
      
      <Col xs={12} md={6} className="text-right" style={{ display: lists.length < 1 && 'none' }}>
        <span className="mr-1">Select</span>
        <span className={AnyChecked ? 'check-all action-border' : 'check-all'}>
          {AnyChecked && <span>All</span>}
          <input type="checkbox" onChange={handleAllChecked}
            checked={AnyChecked} />
          {AnyChecked && <MdDelete className="delete" onClick={deleteAll}
          alt="delete"/>}
        </span>
      </Col>
    </Row>
    <Row style={{ display: lists.length < 1 && 'none' }}>
    {lists &&
            lists.map((list) => (
      <Col xs={12} md={4} key={list.id} className={`d-flex justify-content-center ${list.completed ? 'selected' : ''}`}>
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <div className="text-center fullName">
              {renderTooltip(list)}
            </div>
            <div className="text-center phoneNumber">
              {list.phoneNo.length > 20 ? list.phoneNo.substring(0, 20).trim() + '...' : list.phoneNo}
            </div>
            <div onClick={() => onHandleEdit(list)} className="edit-contact">Edit</div>
                    <input key={list.id} onChange={onChecked} type="checkbox" checked={list.completed} value={list.fullname} className="select-contact"/>
                    {list.completed && <MdDelete className="delete" onClick={() => onDelete(list)} alt="delete"/>}
          </Card.Body>
        </Card>
      </Col>
      ))}
      
    </Row>
    <Row>
    <Col>
        <div className="table_no-content">
          {lists.length < 1 &&
            'All Items are deleted'
          }
        </div>
      </Col>
     
    </Row>
    </>
  );
}

export default ListItem;