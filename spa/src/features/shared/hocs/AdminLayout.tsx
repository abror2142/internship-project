import { Outlet } from "react-router-dom";
import AdminFooter from "../../authentication/components/AdminFooter";
import AdminHeader from "../../authentication/components/AdminHeader";
import AdminSidebar from "../../authentication/components/AdminSidebar";
import { useTheme } from "../hooks/useTheme";
import AuthProvider from "../providers/AuthProvider";

function AdminLayout () {
    const { isDarkMode } = useTheme();
    
    return (
        <AuthProvider>
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
        </AuthProvider>
    )
}

export default AdminLayout;