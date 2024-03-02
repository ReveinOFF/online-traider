import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import ResetPass from "./pages/auth/reset";
import SignUp from "./pages/auth/signup";
import Layout from "./components/layout";
import Profile from "./pages/profile";
import MyAccount from "./pages/trade/my";
import OpenAccount from "./pages/trade/open";
import HistoryAccount from "./pages/trade/history";
import TransactionsAccount from "./pages/trade/transactions";
import DocumentsAccount from "./pages/documents";
import MyPayments from "./pages/payments/my";
import Conclusion from "./pages/payments/conclusion";
import Transfer from "./pages/payments/transfer";
import Check from "./pages/payments/check";
import MainAppeals from "./pages/appeals/main";
import CreateAppeals from "./pages/appeals/create";
import HistoryAppeals from "./pages/appeals/history";
import { useAuth } from "./components/isAuth";
import Output from "./pages/payments/output";
import Withdrawal from "./pages/payments/withdrawal";

const App = () => {
  const { isAuth } = useAuth();

  return (
    <Routes>
      <Route
        path="/signin"
        element={!isAuth ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/reset-pass"
        element={!isAuth ? <ResetPass /> : <Navigate to="/" />}
      />
      <Route
        path="/signup"
        element={!isAuth ? <SignUp /> : <Navigate to="/" />}
      />

      <Route path="/" element={isAuth ? <Layout /> : <Navigate to="/signin" />}>
        <Route index element={<Profile />} />

        <Route path="trade/my" element={<MyAccount />} />
        <Route path="trade/open" element={<OpenAccount />} />
        <Route path="trade/history" element={<HistoryAccount />} />
        <Route path="trade/transactions" element={<TransactionsAccount />} />

        <Route path="documents" element={<DocumentsAccount />} />

        <Route path="payment/my" element={<MyPayments />} />
        <Route path="payment/conclusion" element={<Conclusion />} />
        <Route path="payment/output" element={<Output />} />
        <Route path="payment/withdrawal" element={<Withdrawal />} />
        <Route path="payment/transfer" element={<Transfer />} />
        <Route path="payment/check" element={<Check />} />

        <Route path="appeals" element={<MainAppeals />} />
        <Route path="appeals/create" element={<CreateAppeals />} />
        <Route path="appeals/tickets" element={<HistoryAppeals />} />
      </Route>
    </Routes>
  );
};

export default App;
