import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useDispatch, useSelector } from 'react-redux';
import { getRoomParticipations , updateParticipation} from '../redux/participationSlice';
import {
    cilBan
} from '@coreui/icons';
import CIcon from "@coreui/icons-react";
const RoomParticipation = (props) => {
    const dispatch = useDispatch()
    const {id}= props
    
    useEffect(()=>{
        if(id){dispatch(getRoomParticipations(id))}
    },[id])
    const participation = useSelector(state=>state.participation)
    const {roomParticipationList}=participation
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Liste de Participation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="mt-3">
        <table className="table mx-2">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Participant</th>
      <th scope="col" className="mx-2 text-start">Action</th>
 
    </tr>
  </thead>
  <tbody>
  
  {Array.isArray(roomParticipationList)&&roomParticipationList?.map((elm,index)=>
    <tr>
      <th scope="row">{index+1}</th>
      <td>{elm.user.lastName} {elm.user.firstName}</td>
      <td className="text-start"> <CIcon className="mx-2" style={{color:elm.ban?"red":"gray",cursor:"pointer"}} icon={cilBan} onClick={()=>{dispatch(updateParticipation({id:elm._id,room:id,data:{ban:!elm.ban,user:elm.user._id}}))}}/></td>
    </tr>)}
  </tbody>
</table>
     
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
};

export default RoomParticipation;