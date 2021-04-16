import React, { useState } from "react";
import Log from "../components/Log";
import Reg from "../components/Reg";
function AuthPage() {
  const [flag, setFlag] = useState(false);
  if (flag) {
    return <Reg setFlag={setFlag}></Reg>;
  } else {
    return <Log setFlag={setFlag}></Log>;
  }
}

export default AuthPage;
