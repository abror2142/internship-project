import { Outlet } from "react-router-dom";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";

function Layout () {
    return (
        <>
            <header className="dark:bg-dark-bg-contrast dark:text-dark-text">
                <Header />
            </header>

            <main className="grow-1">
                <Outlet />
            </main>

            <footer className="dark:bg-dark-blue dark:text-dark-text">
                <Footer />
            </footer>
        </>
    )
}

export default Layout;