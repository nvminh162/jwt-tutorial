import { createContext, useContext, useState } from "react";

// This is a simpler example, but you can imagine a more complex object here
interface IAppData {
  username: string;
  setUsername: (v: string) => void;
  userInfo: {
    isAuthenticated: boolean;
    id: number;
    username: string;
  };
  setUserInfo: (v: any) => void;
}
// The context is created with `null` in the type, to accurately reflect the default value.
const AppContext = createContext<IAppData | null>(null);

// The `null` will be removed via the check in the Hook.
export const useAppContext = () => {
  const object = useContext(AppContext);
  if (!object) {
    throw new Error("useAppContext must be used within a Provider");
  }
  return object;
};

interface IProps {
  children: React.ReactNode;
}

const AppProvider = (props: IProps) => {
  const [username, setUsername] = useState<string>("");
  const [userInfo, setUserInfo] = useState<{
    isAuthenticated: boolean;
    id: number;
    username: string;
  }>({
    isAuthenticated: false,
    id: 0,
    username: "",
  });

  const { children } = props;
  return (
    <AppContext value={{ username, setUsername, userInfo, setUserInfo }}>
      {children}
    </AppContext>
  );
};

export default AppProvider;
