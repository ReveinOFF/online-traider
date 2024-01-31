import { Route, Routes } from "react-router-dom";
// import SignIn from "./pages/auth/signin";
// import ResetPass from "./pages/auth/reset";
import SignUp from "./pages/auth/signup";
import Home from "./pages/home";
import Layout from "./components/layout";
import Profile from "./pages/profile";

const App = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<SignIn />} />
      <Route path="/reset-pass" element={<ResetPass />} /> */}
      <Route path="/signup" element={<SignUp />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default App;
