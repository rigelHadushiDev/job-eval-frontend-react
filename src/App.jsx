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
import JobPage, { jobLoader } from "./pages/JobPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import Unauthorized from "./components/Unauthorized";
import RequiredAuth from "./components/RequireAuth";
import ChangePassword from "./components/ChangePassword";
import ForgetPassword from "./components/ForgotPassword";
import PersonalDetails from "./pages/PersonalDetailsPage";
import UserDataPage from "./pages/UserDataPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyApplicationsPage from "./pages/MyApplicationsPage";

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
          <Route
            element={
              <RequiredAuth allowedRoles={["USER", "RECRUITER", "ADMIN"]} />
            }
          >
            <Route path="/personal-details" element={<PersonalDetails />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={["USER"]} />}>
            <Route path="/user-data" element={<UserDataPage />} />
          </Route>
          <Route element={<RequiredAuth allowedRoles={["USER"]} />}>
            <Route path="/my-applications" element={<MyApplicationsPage />} />
          </Route>
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

  return (
    <>
      <ToastContainer
        autoClose={3000}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
