import { AuthContextProvider } from "./context/AuthContext";
import AuthRender from "./navigation/AuthRender";

export default function App() {
  return (
    <AuthContextProvider>
      <AuthRender />
    </AuthContextProvider>
  );
}
