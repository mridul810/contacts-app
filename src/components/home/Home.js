import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { v4 as uuidv4 } from 'uuid';
import ListItem from "../listItem/ListItem";
import {
  getItems, addItem, updateItem,
  deleteItem, checkItem, allChecked,
  deleteItems
} from "../../actions/contactActions";
import Header from "../header/Header";
import { Jumbotron, Container } from "react-bootstrap";
import Update from "../update/Update";
import Create from "../create/Create";
import Spinner from "../loader/Loader";
import './home.scss';

toast.configure({
  autoClose: 8000,
  draggable: false,
  position: toast.POSITION.BOTTOM_RIGHT
});
function Home() {
  const [state, setState] = useState({
    fullname: "",
    phoneNo: "",
    loading: false,
    checkedArr: []
  });
  const [status, setStatus] = useState({
    edit: false,
    add: false
  });
  const dispatch = useDispatch();
  const { lists } = useSelector(state => state.lists);
  const list = useSelector(state => state);

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const submitCreateForm = e => {
    const { fullname, phoneNo } = state;

    e.preventDefault();
    let obj = {
      id: uuidv4(),
      fullname,
      phoneNo
    };
    if (state.fullname !== '' && state.fullname.length > 3 && state.phoneNo !== '' && state.phoneNo.length > 8 && state.phoneNo.length <= 10) {
      setState({ ...state, loading: true });
      dispatch(addItem(obj));
      setTimeout(() => {
        if (!list.loading) {
          setState({ ...state, fullname: "", phoneNo: "", loading: false });
          toast.success("Added Successfully");
        }
      }, 1000);
    } else if(state.fullname.length <= 3) {
      toast.warning("Full Name should be minimum 4 characters long");
    }
    else if(state.phoneNo.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) == null){
      toast.warning("Phone number should be a number");
    } else if(state.phoneNo.length < 8 || state.phoneNo.length > 10) {
      toast.warning("Phone number should be 10 characters long");
    } else {
      toast.warning("Full Name or Phone Number should not be empty");
    }
    setStatus({ ...status, add: false });
  }
  const submitUpdateForm = e => {
    e.preventDefault();
    if (state.fullname !== '' && state.fullname.length > 3 && state.phoneNo !== '' && state.phoneNo.length > 8 && state.phoneNo.length <= 10) {
    setState({ ...state, loading: true });
    dispatch(updateItem(state));
    setTimeout(() => {
      if (!list.loading) {
        setState({ ...state, fullname: "", phoneNo: "", loading: false });
        toast.success("Successfully Updated");
      }
    }, 1000);
  }else if(state.fullname.length <= 3) {
    toast.warning("Full Name should be minimum 4 characters long");
  }
  else if(state.phoneNo.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/) == null){
    toast.warning("Phone number should be a number");
  } else if(state.phoneNo.length < 8 || state.phoneNo.length > 10) {
    toast.warning("Phone number should be 10 characters long");
  } else {
    toast.warning("Full Name or Phone Number should not be empty");
  }
    setStatus({ ...status, edit: false });
  };
  const onHandleEdit = (list) => {
    const { fullname, phoneNo, id } = list;
    setState({
      ...state,
      id: id,
      fullname: fullname,
      phoneNo: phoneNo
    });
    setStatus({ ...status, edit: true });
  };
  const addHandle = () => {
    setStatus({ ...status, add: true });
  }
  const onDelete = (list) => {
    dispatch(deleteItem(list));
    toast.success(`(${list.fullname}) deleted Successfully`);
  }
  const handleClose = () => {
    setStatus({ ...status, add: false, edit: false });
    setState({ ...state, fullname: "", phoneNo: "", loading: false });
  }

  const onChecked = (e) => {
    dispatch(checkItem(e.target.value, e.target.checked))
  }
  const handleAllChecked = (e) => {
    dispatch(allChecked(e.target.checked));
  }
  const deleteAll = () => {
    dispatch(deleteItems());
  }
  let AnyChecked = lists.some(list => list.completed === true);

  return (
    <div>
      <Header addHandle={addHandle} />
      {state.loading && <Spinner />}
      <div>
        <Container>
          <Jumbotron>
            <ListItem lists={lists}
              onHandleEdit={onHandleEdit}
              loading={true}
              onDelete={onDelete}
              deleteAll={deleteAll}
              onChecked={onChecked}
              AnyChecked={AnyChecked}
              handleAllChecked={handleAllChecked}
            />
          </Jumbotron>
        </Container>
      </div>
      {status.edit ?
        <Update
          status={status.edit}
          handleClose={handleClose}
          handleChange={handleChange}
          submitUpdateForm={submitUpdateForm}
          state={state}
        /> :
        <Create
          status={status.add}
          handleClose={handleClose}
          handleChange={handleChange}
          submitCreateForm={submitCreateForm}
          state={state}
        />
      }
    </div>
  )}

export default Home;
