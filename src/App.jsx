import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./components/Unauthorized";
import RequiredAuth from "./components/RequireAuth";
import Users from "./components/Users";
import ChangePassword from "./components/ChangePassword";
import ForgetPassword from "./components/ForgotPassword";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/" element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/job/:id" element={<JobPage />} loader={jobLoader} />
          <Route path="/change-password" element={<ChangePassword />} />

          {/* <Route
            element={<RequiredAuth allowedRoles={["ADMIN", "RECRUITER"]} />}
          >
            <Route path="/users" element={<Users />} />
          </Route>
          <Route
            path="/jobs/:id"
            element={<JobPage deleteJob={deleteJob} />}
            loader={jobLoader}
          />
          <Route
            path="/edit-job/:id"
            element={<EditJobPage updateJobSubmit={editJob} />}
            loader={jobLoader}
          />
          <Route path="*" element={<NotFoundPage />} />

          <Route
            path="/add-job"
            element={
              <RequiredAuth allowedRoles={["ADMIN", "RECRUITER"]}>
                <AddJobPage addJobSubmit={addJob} />
              </RequiredAuth>
            }
          /> */}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
