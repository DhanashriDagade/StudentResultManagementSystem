import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import LoginPage from './pages/LoginPage';
import './App.css';

import AppNavbar from './components/sidebars/AppNavbar';
import AdminSidebar from './components/sidebars/AdminSidebar';
import BaseLayout from './components/sidebars/BaseLayout';
import ProtectedRoute from './components/ProtectedRoute';

import RegisterStudentPage from './pages/admin/RegisterStudentPage';
import ViewStudents from './pages/admin/ViewStudents';
import RegisterTeacherPage from './pages/admin/RegisterTeacherPage';
import ViewTeachers from './pages/admin/ViewTeachers';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import ViewSubjects from './pages/admin/ViewSubjects';
import AddSubjectPage from './pages/admin/AddSubjectPage';
import ViewAllResults from './pages/admin/ViewAllResults';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherSidebar from './components/sidebars/TeacherSidebar';
import AssignResultPage from './pages/teacher/AssignResultPage';
import ViewAndEditResultsPage from './pages/teacher/ViewAndEditResultsPage';
import StudentDashboard from './pages/student/StudentDashboard';
import StudentSidebar from './components/sidebars/StudentSidebar';
import ViewMyResultsPage from './pages/student/ViewMyResultsPage';
import StudentResultSummaryPage from './pages/student/StudentResultSummaryPage';
import StudentProfile from './pages/student/StudentProfile';


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Pages */}
        <Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={AdminSidebar}>
        <AdminDashboardPage />
      </BaseLayout>
    </ProtectedRoute>
  }
/>

        <Route
          path="/admin/register-student"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <BaseLayout Navbar={AppNavbar} Sidebar={AdminSidebar}>
                <RegisterStudentPage />
              </BaseLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/view-students"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <BaseLayout Navbar={AppNavbar} Sidebar={AdminSidebar}>
                <ViewStudents />
              </BaseLayout>
            </ProtectedRoute>
          }
        />
<Route path="/admin/register-teacher" element={
  <ProtectedRoute allowedRoles={["Admin"]}>
    <BaseLayout Navbar={AppNavbar} Sidebar={AdminSidebar}>
      <RegisterTeacherPage />
    </BaseLayout>
  </ProtectedRoute>
} />

<Route path="/admin/view-teachers" element={
  <ProtectedRoute allowedRoles={["Admin"]}>
    <BaseLayout Navbar={AppNavbar} Sidebar={AdminSidebar}>
      <ViewTeachers />
    </BaseLayout>
  </ProtectedRoute>
} />
<Route
  path="/admin/add-subject"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={AdminSidebar}>
        <AddSubjectPage/>
      </BaseLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/view-subjects"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={AdminSidebar}>
        <ViewSubjects />
      </BaseLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/admin/view-results"
  element={
    <ProtectedRoute allowedRoles={["Admin"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={AdminSidebar}>
        <ViewAllResults />
      </BaseLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/teacher/dashboard"
  element={
    <ProtectedRoute allowedRoles={["Teacher"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={TeacherSidebar}>
        <TeacherDashboard />
      </BaseLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/teacher/assign-result"
  element={
    <ProtectedRoute allowedRoles={["Teacher"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={TeacherSidebar}>
        <AssignResultPage />
      </BaseLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/teacher/view-results"
  element={
    <ProtectedRoute allowedRoles={["Teacher"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={TeacherSidebar}>
        <ViewAndEditResultsPage/>
      </BaseLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/student/dashboard"
  element={
    <ProtectedRoute allowedRoles={["Student"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={StudentSidebar}>
        <StudentDashboard />
      </BaseLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/student/view-results"
  element={
    <ProtectedRoute allowedRoles={["Student"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={StudentSidebar}>
        <ViewMyResultsPage />
      </BaseLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/student/result-summary"
  element={
    <ProtectedRoute allowedRoles={["Student"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={StudentSidebar}>
        <StudentResultSummaryPage />
      </BaseLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/student/profile"
  element={
    <ProtectedRoute allowedRoles={["Student"]}>
      <BaseLayout Navbar={AppNavbar} Sidebar={StudentSidebar}>
        <StudentProfile />
      </BaseLayout>
    </ProtectedRoute>
  }
/>


      </Routes>

      
      
    </Router>
  );
}
