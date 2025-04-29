import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search as SearchIcon } from 'lucide-react';
import './Search.css';

export default function Search() {
    const navigate = useNavigate();
    const location = useLocation();
    const [keyword, setKeyword] = useState("");

    const searchHandler = (e) => {
        e.preventDefault();
        navigate(`/search/${keyword}`);
    }

    const clearKeyword = () => {
        setKeyword("");
    }

    useEffect(() => {
        if(location.pathname === '/') {
            clearKeyword();
        }
    }, [location])

    return (
        <form onSubmit={searchHandler} className="searchBar_container">
            <div className="searchBar_inputGroup">
                <input
                    type="text"
                    id="search_field"
                    className="searchBar_input"
                    placeholder="Search for products..."
                    onChange={(e) => setKeyword(e.target.value)}
                    value={keyword}
                />
                <button type="submit" className="searchBar_button">
                    <SearchIcon size={20} />
                </button>
            </div>
        </form>
    )
}