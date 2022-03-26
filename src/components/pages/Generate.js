import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { create } from 'ipfs-http-client'
import 'minireset.css';
import './Generate.css';
import Form from '../Form';
import Preview from '../Preview';
import { db } from '../../Firebase-config';
import {collection, addDoc} from 'firebase/firestore';


const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

function Generate() {




  // Handling form data and specifying Post request to for certificate generation 



  const [formData, setFormData] = useState({
    name: '',
    course: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const [certid, setCertId] = useState('');
  const ID = uuid().slice(0,13);

  function generateCertificate(e) {
    e.preventDefault();
    setIsLoading(true)
    setCertId(ID);
    const url = 'https://api.make.cm/make/t/fccae3e9-562a-4218-be98-85015a01a6c0/sync';

    //specifying headers for request to API
    const headers = {
      'Content-Type': 'application/json',
      'X-MAKE-API-KEY': '0efd86fe310c83de73088ebd593f5302006c4f6c'
    }

    // specifying body of request to API
    const data = {
      size: 'A4',
      'format': 'pdf',
      'data': {
        ...formData,
        date: new Date().toDateString().split(' ').slice(1).join(' '),
        cert_id: ID
      },
      'postProcessing': {
        optimize: true
      }
    }
    //creating POST request to API with axios
    axios.post(url, data, {
      headers: headers
    })
    .then((response) => {
      setIsLoading(false)
      setCertificate(response.data.resultUrl)
      console.log("cert id:", ID);
    }, (error) => {
      console.log(error);
      setIsLoading(false)
    });
  }



  // converting PDF file into buffer so we could add it in IPFS

  const [buffer, setBuffer] = useState(null);
  const [pdfHash, setPdfHash] = useState('');
  let pdf_hash = '';

  function fileToBuffer(e){
    e.preventDefault();
    const file = e.target.files[0];
    setBuffer(file)
  }

  // Upload PDF to ipfs and add certId and ipfs hash to firebase

  const uploadToIPFS = async (event) => {
    event.preventDefault();
    console.log("uploading to ipfs");
    try{
      const added = await ipfs.add(buffer);
      pdf_hash = added.path;
      console.log("pdfhash:",pdf_hash)
      addDataToCollection(event);
    }catch (error) {
      console.log("error in uploading files...", error);
    }
  };

  //created ref of collection 'certificates'
  const certificatesCollectionRef = collection(db, "certificates");

  //function to add document in firebase collection
  const addDataToCollection = async(event) =>{
    event.preventDefault();
    setPdfHash(pdf_hash)
    console.log("adding data to firebase")
    console.log("id:", certid);
    console.log("hash:", pdf_hash);
    await addDoc(certificatesCollectionRef, {cert_id: certid, cert_hash: pdf_hash});
    
  };


  return (
    <div className="App">


      {/* Generate Certificate */}

      <div className="g-container">
        <header className = "g-header">
          <h1 className='g-h1'>Generate Certificate</h1>
        </header>

        <section className='g-section'>
          <div>
            <Form formData={formData} setFormData={setFormData} />
            <button
              type="button"
              disabled={isLoading}
              onClick={generateCertificate}
            >
              {isLoading ? "Making..." : "Make Certificate"}
            </button>
          </div>
          <div>
            <Preview certificate={certificate} isLoading={isLoading} />
            {certificate && (
              <a
                className="download"
                target="_blank"
                rel="noreferrer"
                href={certificate}
              >
                Download
              </a>
            )}
          </div>
        </section>
      </div>



      {/* Upload certificate to IPFS and ethereum and Send mail to recipient */}

      <div className='g1-container'>
        <header className = "g1-header">
          <h1 className='g1-h1'>Upload and Send Certificate</h1>
        </header>
        <section className='g1-section'>
          <form className='g1-form'>
            <div>
              <label className='g1-label'>Enter Downloaded Certificate</label>
              <input className='g1-input1' type='file' onChange={fileToBuffer}></input>
            </div>
            <div>
              <label className='g1-label'>Enter Recipient Email</label>
              <input className='g1-input2' type='email' placeholder='abc@gmail.com' autoComplete="off"></input>
            </div>
            <button className='g1-button' type="button" onClick={uploadToIPFS}>
              Upload and Send
            </button>
          </form>
          <div className='img-div'>
          <img className='g1-img' src='/images/email.jpg' />
          </div>
        </section>
      </div>
    </div>
  );
}
export default Generate;
