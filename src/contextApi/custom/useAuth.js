import { useState, useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../stateProvider";

export default function useAuth(code) {
  const [state, dispatch] = useStateValue();
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const expiresIn = localStorage.getItem("expires_in");
  useEffect(() => {
    axios
      .post("http://localhost:3999/users/login", {
        code,
      })
      .then((res) => {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("refresh_token", res.data.refreshToken);
        localStorage.setItem("expires_in", res.data.expiresIn);
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3999/users/refresh", {
          refreshToken,
        })
        .then((res) => {
          localStorage.setItem("access_token", res.data.accessToken);
          localStorage.setItem("expires_in", res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
