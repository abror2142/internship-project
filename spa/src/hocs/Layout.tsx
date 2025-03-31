import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout () {
    return (
        <>
            <header className="dark:bg-dark-bg-contrast dark:text-dark-text">
                <Header />
            </header>

            <main >
                <Outlet />
            </main>

            <footer className="dark:bg-dark-blue dark:text-dark-text">
                <Footer />
            </footer>
        </>
    )
}

export default Layout;