import React from "react";
import banner from "../assets/images/banner.jpg";
import { updateImage } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Banner = (props) => {
  const user = useSelector((state) => state.user);
  const { userInfo, isAuth } = user;
  const dispatch = useDispatch();
  const handleUpdateImage = (e) => {
    dispatch(updateImage({ id: userInfo._id, file: e.target.files[0] }));
  };
  return (
    <div className="banner edge-shadow">
      <img src={banner} />
      <div className="user-icon">
        <img src={userInfo?.profile_img?.imageURL} className="edge-shadow" />
        <div className="edit-icon">
          {" "}
          <label for="file-input" className="label-upload">
            <i className="fi fi-rr-edit"></i>
          </label>
          <input
            id="file-input"
            className="image-upload"
            type="file"
            onChange={(e) => handleUpdateImage(e)}
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
