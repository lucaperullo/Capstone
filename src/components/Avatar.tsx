import React from "react";
import { useStateValue } from "../contextApi/stateProvider";
import { useHistory } from "react-router-dom";
export default function Avatar() {
  const [state, dispatch] = useStateValue();
  let history = useHistory();
  return (
    <div>
      <img
        draggable="false"
        onClick={() => history.push("/profile")}
        className="avatar"
        src={state?.user?.profilePic}
      />
    </div>
  );
}
