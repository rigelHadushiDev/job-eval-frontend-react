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
import CRMLayout from "./layouts/CRMLayout";
import AddJobPostingPage from "./pages/AddJobPostingPage";
import Dashboard from "./pages/Dashboard";
import AddEmployeePage from "./pages/AddEmployeePage";
import ApplicantsPage from "./pages/ApplicantsPage";
import ApplicantProfilePage from "./pages/ApplicantsProfilePage";
import PersistLogin from "./components/PersistLogin";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* PUBLIC AUTH ROUTES */}
        <Route path="/sign-up" element={<RegisterPage />} />
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* USER-FACING AREA (public pages + protected pages) */}
        <Route
          path="/"
          element={
            <PersistLogin>
              <UserLayout />
            </PersistLogin>
          }
        >
          {/* public pages */}
          <Route index element={<HomePage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="job/:id" element={<JobPage />} loader={jobLoader} />

          {/* protected: any logged-in role */}
          <Route
            element={
              <RequiredAuth allowedRoles={["USER", "RECRUITER", "ADMIN"]} />
            }
          >
            <Route
              path="personal-details"
              element={<PersonalDetails isUser={true} />}
            />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>

          {/* protected: USER only */}
          <Route element={<RequiredAuth allowedRoles={["USER"]} />}>
            <Route path="user-data" element={<UserDataPage />} />
            <Route path="my-applications" element={<MyApplicationsPage />} />
          </Route>
        </Route>

        {/* CRM AREA (RECRUITER / ADMIN) */}
        <Route
          path="/crm"
          element={
            <PersistLogin>
              <CRMLayout />
            </PersistLogin>
          }
        >
          {/* protected: RECRUITER and ADMIN */}
          <Route
            element={<RequiredAuth allowedRoles={["ADMIN", "RECRUITER"]} />}
          >
            <Route index element={<Dashboard />} />
            <Route path="jobposting" element={<AddJobPostingPage />} />
            <Route
              path="personal-details"
              element={<PersonalDetails isUser={false} />}
            />
            <Route path="applicants" element={<ApplicantsPage />} />
            <Route
              path="applicants/:userId/:jobApplicationId"
              element={<ApplicantProfilePage />}
            />
          </Route>

          {/* protected: ADMIN only */}
          <Route element={<RequiredAuth allowedRoles={["ADMIN"]} />}>
            <Route path="add-employee" element={<AddEmployeePage />} />
          </Route>
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
