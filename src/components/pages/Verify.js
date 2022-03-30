import React from 'react';
import './Verify.css';
import { useState } from 'react';
import { db } from '../../Firebase-config';
import {collection, getDocs, query, where} from 'firebase/firestore';

function Verify() {

  const certificatesCollectionRef = collection(db, "certificates");

  const [searchId, setSearchId] = useState("");
  const [srcResult, setSrcResult] = useState("");

  const getCertHash = async() => {
    const q = query(certificatesCollectionRef, where('cert_id', '==', searchId ));
    const queryData = await getDocs(q);
    const matchedData = queryData.size;
    if(matchedData){
      queryData.forEach((doc) => {
        console.log(doc.data().cert_hash);
        setSrcResult(doc.data().cert_hash);
      })
    }
    else{
      alert("No such Certificate with ID exists");
    }
  };


  return (
    <div className="Verify App">
      <div className="v-container">
        <header className='v-header'>
          <h1 className="v-h1">Verify Certificates</h1>
        </header>

        <section className="v-section">
          <input
            className="v-input"
            placeholder="Enter Certificate ID"
            autoComplete="off"
            onChange={(event) => setSearchId(event.target.value)}
          ></input>
          <button className='v-button' type="button" onClick={getCertHash}>
            {" "}
            Verify{" "}
          </button>
          {srcResult && (
            <div className="v-certified-div">
              <h2 className="certified">Certificate is valid</h2>
            </div>
          )}
          {srcResult && (
            <a
              className="v-download"
              target="_blank"
              rel="noreferrer"
              href={`https://ipfs.infura.io/ipfs/${srcResult}`}
            >
              View Certificate
            </a>
          )}
        </section>
      </div>
    </div>
  );
}
export default Verify;
