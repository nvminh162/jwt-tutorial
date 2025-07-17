import { Outlet } from "react-router";
import AppHeader from "./components/layout/app.header";
import { useEffect } from "react";
import { getAccountAPI } from "./services/api";
import { useAppContext } from "./context/app.provider";
import { Spin } from "antd";
import AppFooter from "./components/layout/app.footer";

const AppLayout = () => {
  const { userInfo, setUserInfo } = useAppContext();
  const fetchAccount = async () => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const res = await getAccountAPI(access_token!);
      if (res?.data?.data) {
        setUserInfo({
          id: res?.data?.data?.id,
          username: res?.data?.data?.username,
          isAuthenticated: true,
          isLoading: true,
        });
      }
    } else {
      setUserInfo({
        id: 0,
        username: "",
        isAuthenticated: false,
        isLoading: true,
      });
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  return (
    <div>
      {userInfo.isLoading ? (
        <>
          <AppHeader />
          <div className="app-content">
            <Outlet />
          </div>
          <AppFooter />
        </>
      ) : (
        <div className="popup">
          <Spin />
        </div>
      )}
    </div>
  );
};

export default AppLayout;
