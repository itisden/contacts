import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthGuard from "@/components/AuthGuard";
import GlobalLayout from "@/components/GlobalLayout";
import NotFoundPage from "@/domains/not-found";
import ErrorPage from "@/domains/error";
import ContactListPage from "@/domains/contacts/ContactListPage";
import ContactPage from "@/domains/contacts/ContactPage";
import Login from "@/domains/auth/LoginPage";
import SignUp from "@/domains/auth/SignUpPage";

export const routes = {
  home: "/",
  contact: (id?: string) => (id ? `/contact/${id}` : "/contact"),
  auth: {
    login: "/login",
    signup: "/signup",
  },
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={routes.home}
      element={<GlobalLayout />}
      errorElement={<ErrorPage />}
    >
      <Route errorElement={<ErrorPage />}>
        <Route element={<AuthGuard guardType="guest" />}>
          <Route path={routes.auth.login} element={<Login />} />
          <Route path={routes.auth.signup} element={<SignUp />} />
        </Route>
        <Route element={<AuthGuard guardType="auth" />}>
          <Route index element={<ContactListPage />} />
          <Route path="/contact/:contactId?" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Route>,
  ),
);

export default router;
