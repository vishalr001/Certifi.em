import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { create } from 'ipfs-http-client'
import 'minireset.css';
import './Generate.css';
import Form from '../Form';
import Preview from '../Preview'

const ipfs = create({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

function Generate() {




  // Handling form data and specifying Post request to for certificate generation 



  const [formData, setFormData] = useState({
    name: '',
    course: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [certificate, setCertificate] = useState(null);
  const id = uuid().slice(0,13);

  function generateCertificate(e) {
    e.preventDefault();
    setIsLoading(true)
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
        cert_id: id
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
    }, (error) => {
      console.log(error);
      setIsLoading(false)
    });
  }



  // converting PDF file into buffer so we could add it in IPFS

  const [buffer, setBuffer] = useState(null);
  const [pdfHash, setPDFHash] = useState('');

  function fileToBuffer(e){
    e.preventDefault();
    const file = e.target.files[0];
    setBuffer(file)
  }

  async function uploadToIPFS(event) {
    event.preventDefault();
    console.log("uploading to ipfs");
    try{
      const added = await ipfs.add(buffer);
      console.log(added.path);
      const pdfHash = added.path;
    }catch (error) {
      console.log("error in uploading files...", error);
    }
  };



  return (
    <div className="App">


      {/* Generate Certificate */}

      <div className="g-container">
        <header>
          <h1>Generate Certificate</h1>
        </header>

        <section>
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



      {/* Upload certificate to IPFS and ethereum and Sendf mail to recipient */}

      <div>
        <section>
          <form>
            <h1>Upload and Send Certificate</h1>
            <div>
              <label>Enter Downloaded Certificate</label>
              <input type='file' onChange={fileToBuffer}></input>
            </div>
            <div>
              <label>Enter Recipient Email</label>
              <input type='email' placeholder='abc@gmail.com'></input>
            </div>
            <button type="button" onClick={uploadToIPFS}>
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
export default Generate;
