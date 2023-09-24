import {useState} from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {handleClose,handleShow} from "../redux/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    cilSearch,
  } from "@coreui/icons";
  import {useNavigate} from "react-router-dom";
  import CIcon from "@coreui/icons-react";
const SearchModal = (props) => {
  const [search , setSearch] = useState('')
  const dispatch = useDispatch()
const navigate = useNavigate()
return(
    <Modal {...props} className="fixed-bar-modal-wrapper" centered>
    <Modal.Header className="p-5" >
      <Modal.Title></Modal.Title>
    </Modal.Header>
    <Modal.Body style={{height:"50px"}}>  
    <form onSubmit={(e)=>{
          e.preventDefault()
          dispatch(handleClose())
          navigate(`/search?search=${search}`)
        }}>
          <div className="dashboard-search">
        <CIcon icon={cilSearch} style={{color:"black"}} className="mx-2" />
     
        <input
          placeholder="Rechercher"
          onChange={(e)=>setSearch(e.target.value)}
        />
        <button type="submit" className='d-none'></button>
       
      </div>
      </form></Modal.Body>

  </Modal>
)
}
export default SearchModal