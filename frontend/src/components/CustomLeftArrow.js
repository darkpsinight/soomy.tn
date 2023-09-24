import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomLeftArrow = ({ onClick, ...rest }) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
      variant
    } = rest;
    // onMove means if dragging or swiping in progress.
    return ( <button className="carousel-control-prev-icon carousel-control-prev" href="#" onClick={()=>onClick()}>
    
    </button>)
  };
export default CustomLeftArrow