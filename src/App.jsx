import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/auth/signin";
import ResetPass from "./pages/auth/reset";
import SignUp from "./pages/auth/signup";
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
import MainAppeals from "./pages/appeals/main";
import CreateAppeals from "./pages/appeals/create";
import HistoryAppeals from "./pages/appeals/history";
import AdminLayout from "./components/layout-admin";
import Servers from "./pages/admin/settings/servers";
import Account from "./pages/admin/settings/account";
import DocumentsAdmin from "./pages/admin/settings/document";
import LangAdmin from "./pages/admin/settings/lang";
import PaymentsAdmin from "./pages/admin/settings/payments";
import AppealAdmin from "./pages/admin/appeal";
import LangEdit from "./pages/admin/settings/lang-edit";
import OfficeAdmin from "./pages/admin/settings/office";
import MethodAdmin from "./pages/admin/settings/method";
import EmailList from "./pages/admin/services/email";
import Course from "./pages/admin/services/course";

const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/reset-pass" element={<ResetPass />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Profile />} />

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

        <Route path="appeals" element={<MainAppeals />} />
        <Route path="appeals/create" element={<CreateAppeals />} />
        <Route path="appeals/history" element={<HistoryAppeals />} />
      </Route>

      <Route path="/admin/" element={<AdminLayout />}>
        <Route index element={<Profile />} />

        <Route path="appeal" element={<AppealAdmin />} />

        <Route path="setting/servers" element={<Servers />} />
        <Route path="setting/account" element={<Account />} />
        <Route path="setting/documents" element={<DocumentsAdmin />} />
        <Route path="setting/lang" element={<LangAdmin />} />
        <Route path="setting/lang/edit" element={<LangEdit />} />
        <Route path="setting/payments" element={<PaymentsAdmin />} />
        <Route path="setting/office" element={<OfficeAdmin />} />
        <Route path="setting/method" element={<MethodAdmin />} />

        <Route path="services/email" element={<EmailList />} />
        <Route path="services/course" element={<Course />} />
      </Route>
    </Routes>
  );
};

export default App;
