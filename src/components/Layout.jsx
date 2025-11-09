import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AppMenu from "./AppMenu";
import { ClearStorage, FromStorage } from "../library";
import { setUser } from "../store";
import http from "../http";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent } from "./Loading";

const Layout = () => {
  const user = useSelector((state) => state.user.value);

  const [Loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    if (!user) {
      const token = FromStorage("adminToken");

      if (token) {
        http
          .get("/api/users/profile")
          .then(({ data }) => dispatch(setUser(data.user)))
          .catch(() => {})
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [user]);

  return Loading ? (
    <LoadingComponent />
  ) : (
    <>
      <AppMenu />
      <Outlet />
    </>
  );
};

export default Layout;
