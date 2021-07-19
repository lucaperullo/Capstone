import { useState, useEffect } from "react";
import axios from "axios";
import { useStateValue } from "../stateProvider";

export default function useAuth(code) {
  const [state, dispatch] = useStateValue();
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");
  const expiresIn = localStorage.getItem("expires_in");
  useEffect(async () => {
    if (code !== undefined) {
      try {
        const res = await fetch(
          "http://localhost:3999/login/spotify/callback",
          {
            method: "POST",
            body: code,
          }
        );

        console.log(res);
        // localStorage.setItem("access_token", res.data.accessToken);
        // localStorage.setItem("refresh_token", res.data.refreshToken);
        // localStorage.setItem("expires_in", res.data.expiresIn);
      } catch (error) {
        console.log(error);
      }

      // .then(() => window.location.assign("http://localhost:3000/discover"))
    }
  }, [code]);

  useEffect(async () => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:3999/users/refresh", {
          method: "POST",
          body: refreshToken,
        });
        console.log(res);

        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("expires_in", res.data.expiresIn);
      } catch (error) {
        console.log(error);
      }
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
