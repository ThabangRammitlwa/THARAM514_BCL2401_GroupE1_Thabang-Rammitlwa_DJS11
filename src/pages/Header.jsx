import { Link } from "react-router-dom";
import GenreNavigation from './GenreNavigation'



const Header = () => {
    return (
        <header className="header">
            <Link to="/">Home</Link>
            
            <GenreNavigation />
            
                
            
        </header>
        )
}

export default Header;