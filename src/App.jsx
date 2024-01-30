import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import ResetPass from "./pages/auth/reset";
import SignUp from "./pages/auth/signup";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/reset-pass" element={<ResetPass />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;
