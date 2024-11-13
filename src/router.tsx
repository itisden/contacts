import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import GlobalLayout from "@/components/GlobalLayout";
import NotFound from "@/domains/not-found";
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
      errorElement={<NotFound />}
    >
      <Route errorElement={<NotFound />}>
        <Route index element={<ContactListPage />} />
        <Route path="/contact/:contactId?" element={<ContactPage />} />
        <Route path={routes.auth.login} element={<Login />} />
        <Route path={routes.auth.signup} element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Route>,
  ),
);

export default router;
