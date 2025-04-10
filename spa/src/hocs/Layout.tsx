import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";
import { useTheme } from "../hooks/useTheme";

function Layout () {
    const { isDarkMode } = useTheme();

    return (
        <div className={`flex flex-col ${isDarkMode && 'dark'} dark:bg-dark-bg h-screen`}>
            <header className="dark:bg-dark-bg-contrast dark:text-dark-text">
                <Header />
            </header>

            <main className="grow flex flex-col overflow-hidden">
                <Outlet />
            </main>

            {/* <footer className="dark:bg-dark-blue dark:text-dark-text">
                <Footer />
            </footer> */}
        </div>
    )
}

export default Layout;