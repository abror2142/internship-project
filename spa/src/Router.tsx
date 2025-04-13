import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Layout from "./features/shared/hocs/Layout";
import AdminLayout from "./features/shared/hocs/AdminLayout";
import Dashboard from "./features/dashboard/containers/Dashboard";
import Users, {loader as UsersLoader} from "./features/dashboard/containers/Users";
import Tags from "./features/dashboard/containers/Tags";
import Settings from "./features/dashboard/containers/Settings";
import Logs from "./features/dashboard/containers/Logs";
import Login from "./features/authentication/containers/Login";
import Register from "./features/authentication/containers/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Performance from "./features/dashboard/containers/Performance";
import FileDetail, {loader as FileDetailLoader} from "./features/file/containers/FileDetail";
import FileUpdate, {loader as FileUpdateLoader} from "./features/file/containers/FileUpdate";
import FileView, {loader as FileViewLoader} from "./features/file/components/FileView";

const routes = createRoutesFromElements(
    <Route>
        {/* Admin Routes */}
        <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
            </ProtectedRoute>
        }>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} loader={UsersLoader}/>
            <Route path="tags" element={<Tags />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logs" element={<Logs />} />
            <Route path="performance" element={<Performance />} />
        </Route>

        {/* User Routes */}
        <Route path="/" element={<Layout />} >
            <Route index element={<FileView />} loader={FileViewLoader} />
            <Route path="file/:id" element={<FileDetail />} loader={FileDetailLoader} />
            <Route path="file/:id/update" element={<FileUpdate />} loader={FileUpdateLoader} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
        </Route>
    </Route>
)

export const router = createBrowserRouter(routes);