import React from "react";
import useAuth from "../contextApi/custom/useAuth";

export default function Dashboard({ code }: { code: any }) {
  const accessToken = useAuth(code);
  return <div>{code}</div>;
}
