import React, { useContext } from "react";

import { AuthNavigation, UnAuthNavigation } from "./";
import AuthContext from "../context/AuthContext";

const AuthRender: React.FC = () => {
  const { user } = useContext(AuthContext);
  return user ? <UnAuthNavigation /> : <AuthNavigation />;
};

export default AuthRender;
