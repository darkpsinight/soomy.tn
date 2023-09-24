import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

function DenseTable({ tenLastMisesData }) {
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async (userId) => {
      try {
        const response = await axios.get(
          `https://soomy.tn/users/getUserDetailsById/${userId}`
        );
        return response.data;
      } catch (error) {
        console.error("Erreur serveur:", error);
        return null;
      }
    };

    const fetchAllUserDetails = async () => {
      const uniqueUserIds = [
        ...new Set(tenLastMisesData.map((item) => item?.user)),
      ];
      const cachedUserDetails = {};

      const userDetailsPromises = uniqueUserIds.map(async (userId) => {
        if (userDetails[userId]) {
          return userDetails[userId];
        }

        const userDetail = await fetchUserDetails(userId);
        cachedUserDetails[userId] = userDetail;
        return userDetail;
      });

      const userDetailResults = await Promise.all(userDetailsPromises);

      const updatedUserDetails = userDetailResults.reduce(
        (acc, userDetail) => {
          if (userDetail) {
            acc[userDetail._id] = userDetail;
          }
          return acc;
        },
        { ...userDetails }
      );

      setUserDetails(updatedUserDetails);
      setIsLoading(false);
    };

    fetchAllUserDetails();
  }, [tenLastMisesData]);

  // format date
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      fractionalSecondDigits: 3, // Display milliseconds
    };
    return new Intl.DateTimeFormat("fr-FR", options).format(date);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Image:</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Nom Utilisateur:
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>
                Date de mise:
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={2}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress size={25} />
                  </div>
                </TableCell>
              </TableRow>
            ) : tenLastMisesData && tenLastMisesData?.length > 0 ? (
              tenLastMisesData.map((dataItem, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {userDetails[dataItem?.user] && (
                      <img
                        src={userDetails[dataItem?.user]?.profile_img?.imageURL}
                        alt="img_user"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{userDetails[dataItem?.user]?.username}</TableCell>{" "}
                  {/* Username in a separate cell */}
                  <TableCell>{formatDate(new Date(dataItem?.date))}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={2}>
                  Pas de 10 dernières mises trouvées pour cette enchères
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DenseTable;
