import React, { useEffect } from "react";
import { useStateValue } from "../contextApi/stateProvider";

export default function Category() {
  const [state, dispatch] = useStateValue();
  useEffect(() => {
    console.log("Category mounted");
    console.log(state?.category);
  }, []);
  return <div></div>;
}
