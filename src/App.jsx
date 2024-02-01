import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import ResetPass from "./pages/auth/reset";
import SignUp from "./pages/auth/signup";
import Home from "./pages/home";
import Layout from "./components/layout";
import Profile from "./pages/profile";
import MyAccount from "./pages/trade/my";
import OpenAccount from "./pages/trade/open";
import ConnectAccount from "./pages/trade/connect";
import HistoryAccount from "./pages/trade/history";
import TransactionsAccount from "./pages/trade/transactions";
import DocumentsAccount from "./pages/documents";
import MyPayments from "./pages/payments/my";
import Conclusion from "./pages/payments/conclusion";
import Transfer from "./pages/payments/transfer";
import Check from "./pages/payments/check";

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/reset-pass" element={<ResetPass />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />

        <Route path="trade/my" element={<MyAccount />} />
        <Route path="trade/open" element={<OpenAccount />} />
        <Route path="trade/connect" element={<ConnectAccount />} />
        <Route path="trade/history" element={<HistoryAccount />} />
        <Route path="trade/transactions" element={<TransactionsAccount />} />
        <Route path="trade/documents" element={<DocumentsAccount />} />

        <Route path="payment/my" element={<MyPayments />} />
        <Route path="payment/conclusion" element={<Conclusion />} />
        <Route path="payment/transfer" element={<Transfer />} />
        <Route path="payment/check" element={<Check />} />
      </Route>
    </Routes>
  );
};

export default App;
