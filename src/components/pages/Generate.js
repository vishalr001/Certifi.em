import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import 'minireset.css';
import './Generate.css';

import Form from '../Form';
import Preview from '../Preview'

function Generate() {

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

  return (
    <div className="App">
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
    </div>
  );
}
export default Generate;
