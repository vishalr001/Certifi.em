import React from 'react';
import './Verify.css';
import { useState } from 'react';
import { db } from '../../Firebase-config';
import {collection, getDocs, addDoc, query, where} from 'firebase/firestore';

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
    <div className="App">
      <div className="v-container">
        <h1>Verify Certificates</h1>

        <section>
          <form>
            <input
              placeholder="Serach by Id"
              autoComplete="off"
              onChange={(event) => setSearchId(event.target.value)}
            ></input>
            <button type="button" onClick={getCertHash}>
              {" "}
              Search{" "}
            </button>
          </form>
          {srcResult &&
            <header>
              <h2>Certified</h2>
            </header> 
          }
          {srcResult && (
            <a 
              class='download' 
              target="_blank"
              rel="noreferrer"
              href={`https://ipfs.infura.io/ipfs/${srcResult}`}>
              View Certificate
            </a>
          )}
        </section>
      </div>
    </div>
  );
}
export default Verify;
