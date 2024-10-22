import { createBrowserRouter } from "react-router-dom";
import GlobalLayout from "@/components/GlobalLayout";
import NotFound from "@/domains/not-found";
import ContactListPage from "@/domains/contacts/ContactListPage";
import ContactPage from "@/domains/contacts/ContactPage";

export const routes = {
  home: "/",
  contact: (id?: string) => (id ? `/contact/${id}` : "/contact"),
};

const router = createBrowserRouter([
  {
    path: routes.home,
    element: <GlobalLayout />,
    errorElement: <NotFound />,
    children: [
      {
        errorElement: <NotFound />,
        children: [
          {
            index: true,
            element: <ContactListPage />,
          },
          {
            path: "/contact/:contactId?",
            element: <ContactPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
