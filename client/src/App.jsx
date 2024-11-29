import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/authContext";
import TaskPages from "./pages/TaskPages";
import HomePage from "./pages/HomePage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoutes from "./ProtectedRoutes";

export const App = () => {
  return (
   <AuthProvider>
     <BrowserRouter>
      <Routes>

      {/* RUTAS PUBLICAS */}
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

      {/* RUTAS PROTEGIDAS */}
      <Route element={<ProtectedRoutes/>}>
        <Route path="/tasks" element={<TaskPages/>} />
        <Route path="/add-task" element={<TaskFormPage/>} />
        <Route path="/tasks/:id" element={<TaskFormPage/>} />
        <Route path="/profile" element={<ProfilePage/>} />
      </Route>

      </Routes>
    </BrowserRouter>
   </AuthProvider>
  )
}
