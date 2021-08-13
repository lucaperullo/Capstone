import React from "react";
import { useStateValue } from "../contextApi/stateProvider";

export default function Avatar() {
  const [state, dispatch] = useStateValue();

  return (
    <div>
      <img
        onClick={() => window.location.assign("/profile")}
        className="avatar"
        src={state?.user?.profilePic}
      />
    </div>
  );
}
