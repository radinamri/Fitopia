import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the data
interface UserData {
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
}

// Create a context with a default value
const UserDataContext = createContext<
  | {
      userData: UserData;
      setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    }
  | undefined
>(undefined);

// Create the UserDataProvider to wrap around components
export const UserDataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
  });

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

// Create a custom hook to use the UserData context
export const useUserData = () => {
  const context = useContext(UserDataContext);

  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }

  return context;
};
