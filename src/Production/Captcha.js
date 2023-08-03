import React, { useState, useRef } from 'react';
import Axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

export default function CaptchaImplemented({setDisplaySearch}) {
    const [SuccessMsg, setSuccessMsg] = useState("")
    const [ErrorMsg, setErrorMsg] = useState("")
    const [valid_token, setValidToken] = useState([]);

    const SITE_KEY =  process.env['REACT_APP_reCAPTCHA_SITE_KEY']
    const SECRET_KEY = process.env['REACT_APP_reCAPTCHA_SECRET_KEY']
    const captchaRef = useRef(null);

    const handleVerify = (token) => {
        setDisplaySearch(true);

        if (token) {
          verifyToken(token)
            .then((validToken) => {
              if (validToken.success === true) {
                console.log('verified');
                setDisplaySearch(true);
              } else {
                console.log('not verified');
                setErrorMsg('Sorry!! Verify you are not a bot');
                setDisplaySearch(true);

              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
    
    const verifyToken = async (token) => {
        let APIResponse = [];

        try {
            let response = await Axios.post(`http://localhost:5001/verify-token`, {
                reCAPTCHA_TOKEN: token,
                Secret_Key: SECRET_KEY,
            });

            APIResponse.push(response['data']);
            return APIResponse;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={{ marginTop:'20px', minWidth:'100px'}}>

                <ReCAPTCHA
                            sitekey={SITE_KEY}
                            ref={captchaRef}
                            onChange={handleVerify}
                />

        </div>
    );
}
