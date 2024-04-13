import React from "react";
// import logo from "./VITlogo.jpg";
function Header()
{
  return(
    <div style={{"width":"100%"}}>
      <nav class="navbar fixed-top navbar-light"style={{backgroundColor:'#1b663e',height:"7.5vh",width:"100%"}}>
  <a class="navbar-brand" href="#"><p style={{color:'white',display:'inline',fontFamily:'Times New'}}><h1 style={{display:"inline"}}>VIT</h1> (Vellore Campus)</p></a>
</nav>
    </div>
  )
}

export default Header;