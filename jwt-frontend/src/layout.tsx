import { Outlet } from "react-router";
import AppHeader from "./components/layout/app.header";
import { useEffect } from "react";
import { getAccountAPI } from "./services/api";
import { useAppContext } from "./context/app.provider";

const AppLayout = () => {
  const { setUserInfo } = useAppContext();
  const fetchAccount = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const res = await getAccountAPI(access_token!);
      if (res?.data?.data) {
        setUserInfo(res?.data?.data);
      }
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div>
      <AppHeader />
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
