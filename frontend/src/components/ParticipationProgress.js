import axios from "axios";
import {useEffect,useState} from "react";
import {
   
    CTableDataCell,
    CProgress,
 
  } from "@coreui/react";
  import { format } from "date-fns";
const ProgressParticipation = (props) =>{
    const [participationNumber, setParticipation] = useState(0)
    useEffect(()=>{ axios.get(`/participations/getNumberOfParticipations/${props.item?._id}`).then(res=>
        setParticipation(res.data))}, [props]);
    return(
        <CTableDataCell>
        <div className="clearfix">
          <div className="float-start">
            <strong>{Math.floor((participationNumber/props.item?.capacity)*100)}%</strong>
          </div>
          <div className="float-end">
            <small className="text-medium-emphasis">
              {" "}
              {format(new Date(props.item.startDate), "Pp")}
            </small>
          </div>
        </div>
        <CProgress thin color={"red"} value={Math.floor((participationNumber/props.item?.capacity)*100)} />
      </CTableDataCell>
    )
}
export default ProgressParticipation