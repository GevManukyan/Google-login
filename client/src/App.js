import React, { useEffect, useState } from "react";
import "./App.css";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import Posts from "./components/Posts";
export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [loginStatus, setLoginStatus] = useState(false);
  const clientId ='118817317743-32f22c5n2ciilkt1svcpk1te2900tbkn.apps.googleusercontent.com';

  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.auth2.init({clientId: clientId});
    });
  }, [])

  const responseGoogle = response => {
    console.log(response);
    setName(response.profileObj.name);
    setEmail(response.profileObj.email);
    setUrl(response.profileObj.imageUrl);
    if(response){
      setLoginStatus(true);
    }
  };
  
  return (
    <div className="App">
      <h1 >Login with <span className="g1">Go</span><span className="o">o</span><span className="g2">g</span><span className="le">le</span></h1>
      {!loginStatus && (
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      )}
      {loginStatus && (
        <Posts loggedIn={loginStatus} clientId={clientId} setLoginStatus={setLoginStatus}/>
      )}
    </div>
  );
}