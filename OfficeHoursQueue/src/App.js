import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div>
      <div className="Banner">
        <div className="Title">
          <b style={{color:'white', fontSize:30}}>Office Howlers</b>
          <p style={{color:'white', fontSize:20, marginTop:0}}>Think and Do</p>
          <p>{data}</p>
        </div>
      </div>
      <div className="Body">
        <div className="Login" style={{textAlign:"center"}}>
          <b style={{color:'white', fontSize:20, textAlign:"center"}}>Local Sign On</b>
          <div style={{textAlign:"left"}}>
            <p style={{color:'white', fontSize:13, marginBottom:3}}>Username</p>
            <input style={{marginTop:0, borderRadius:"5px", width: "97%"}}></input>
            <p style={{color:'white', fontSize:13, marginBottom:3}}>Password</p>
            <input style={{marginTop:0, borderRadius:"5px", width: "97%"}}></input>
          </div>
          <button className="Login-button">Login</button>
          <br></br>
          <a href = "" style={{color:'white', fontSize:13, marginBottom:3}}>Forgot Password</a>
          <hr></hr>
          <b style={{color:'white', fontSize:20}}>SSO</b>
          <br></br>
          <button className="SSO-button">
            <img src="NCSU Belltower Image.png" style={{float:"left"}}></img>
              <p style={{textAlign:"center", marginBottom:0}}>Campus ID Login</p><p style={{fontSize:12, marginTop:0}}>Students/Faculty/Staff</p>
      </button>
            
        </div>
        <b style={{position:"absolute", bottom:30, left: 15}}>NC STATE</b>
        <br></br>
        <p style={{position:"absolute", bottom:0, left: 15}}>UNIVERSITY</p>
      </div>
    </div>
  );
}

export default App;