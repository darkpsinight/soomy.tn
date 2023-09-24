import {  faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomRightArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
      variant
    } = rest;
    // onMove means if dragging or swiping in progress.
    return ( <button className="carousel-control-next-icon carousel-control-next" href="#" onClick={()=>onClick()}>
    
    </button>)
  };
export default CustomRightArrow