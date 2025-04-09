import { Outlet } from "react-router-dom";
import AdminFooter from "../components/admin/AdminFooter";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useTheme } from "../hooks/useTheme";

function AdminLayout () {
    const { isDarkMode } = useTheme();
    
    return (
        <div className={`flex flex-col min-h-screen ${isDarkMode && 'dark'} dark:bg-dark-bg`} >
            <header className="px-8 py-3 bg-indigo-50 w-full dark:bg-dark-blue dark:text-dark-text">
                <AdminHeader />
            </header>
 
            <main className="flex gap-4 grow-1 dark:text-dark-text">
                <AdminSidebar />
                <Outlet />
            </main>

            <footer>
                <AdminFooter />
            </footer>
        </div>
    )
}

export default AdminLayout;