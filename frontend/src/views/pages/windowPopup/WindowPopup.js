import React, { useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const WindowPopup = () => {
  useEffect(() => {
    window.close();
  }, []);

  const closePopup = () => {
    window.close();
  };

  return (
    <div className="px-3 py-2">
      <h2 className="mx-auto" style={{ marginTop: "200px" }}>
        <div className="row justify-content-center">
          <div className="col-9 text-center popup-text">Chargement...</div>
        </div>
      </h2>

      <Box sx={{ display: "flex", justifyContent: "center", margin: "20px" }}>
        <CircularProgress />
      </Box>

      <button className="btn btn-outline-cancel w-100" onClick={closePopup}>
        Fermer
      </button>
    </div>
  );
};

export default WindowPopup;
