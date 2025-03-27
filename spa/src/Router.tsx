import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./hocs/Layout";
import Home from "./containers/Home";
import AdminLayout from "./hocs/AdminLayout";
import Dashboard from "./containers/admin/Dashboard";
import Users from "./containers/admin/Users";
import Tags from "./containers/admin/Tags";
import Settings from "./containers/admin/Settings";
import Logs from "./containers/admin/Logs";
import Login from "./containers/Login";
import Register from "./containers/Register";

const routes = createRoutesFromElements(
    <Route>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />} >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="tags" element={<Tags />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logs" element={<Logs />} />
        </Route>

        {/* User Routes */}
        <Route path="/" element={<Layout />} >
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            
        </Route>
    </Route>
)

export const router = createBrowserRouter(routes);