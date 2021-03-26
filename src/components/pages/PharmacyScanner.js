import React, { useContext, useState } from "react";
import UserContext from "../../context/UserContext";
import NotLoggedIn from "../other/NotLoggedIn";
import { Link } from "react-router-dom";
import { Button, Tile } from 'carbon-components-react';

import QrScan from 'react-qr-reader';

export default function PharmacyScanner() {
  const { userData } = useContext(UserContext);

  const [qrscan, setQrscan] = useState('No result');
   const handleScan = data => {
       if (data) {
           setQrscan(data)
       }
   }
   const handleError = err => {
   console.error(err)
   }

  return (
    <div className="page">
      {userData.user ? (
        <>
        <h1>Pharmacy Prescription Scanner</h1>
        <div>
            <center>
            <div>
                <QrScan
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                     style={{ height: 400, width: 500 }}
                />
            </div>
            </center>

            <div style={{marginTop:150}}>

            <Tile> <h1> {qrscan} </h1></Tile>
            </div>


      </div>
        </>
      ) : (
        <>
          <NotLoggedIn />
        </>
      )}
    </div>
  );
}
