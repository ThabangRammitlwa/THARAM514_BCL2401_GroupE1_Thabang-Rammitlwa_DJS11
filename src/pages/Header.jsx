import { Link } from "react-router-dom";
import GenreNavigation from './GenreNavigation'


const Header = () => {
    return (
        <header className="header">
            <nav className="nav">
                <ul className="nav-list">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <GenreNavigation />
                    </li>
                </ul>
            </nav>
        </header>
        )
}

export default Header;