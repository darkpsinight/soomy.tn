import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { cilBan, cilCheckCircle } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Tooltip from "@mui/material/Tooltip";

function formatJoinDate(joinDate) {
  const formattedDate = new Date(joinDate).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });
  return formattedDate;
}

function BasicTable({ userDetails }) {
  return (
    <TableContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Nom:</TableCell>
            <TableCell>{userDetails.firstName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Prenom:</TableCell>
            <TableCell>{userDetails.lastName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>
              Nom utilisateur:
            </TableCell>
            <TableCell>{userDetails.username}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Email:</TableCell>
            <TableCell>{userDetails.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>N°Telephone:</TableCell>
            <TableCell>{userDetails.phone}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Ban:</TableCell>
            <TableCell>
              <Tooltip title={userDetails.isBanned ? "Bannie" : "Non bannie"}>
                {userDetails.isBanned ? (
                  <CIcon icon={cilBan} className="icon-ban bigger-icon" />
                ) : (
                  <CIcon
                    icon={cilCheckCircle}
                    className="icon-checkMark bigger-icon"
                  />
                )}
              </Tooltip>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Genre:</TableCell>
            <TableCell>{userDetails.genre}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>
              Date d'adhésion:
            </TableCell>
            <TableCell>{formatJoinDate(userDetails.joinDate)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default BasicTable;
