import { useEffect, useState } from 'react';
import logo from '../assets/Images/logo.png';
import { Link } from 'react-router-dom';
import { Search, Bell, User, ChevronDown } from 'lucide-react';
import styles from './Header.module.css';

function Header() {

    const [isSearchOpen, setSearchOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    // for blur
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
            <div className={styles.container}>

                {/* logo */}
                <img className={styles.logo} src={logo} alt="" />

                {/* nav links */}
                <nav className={styles.nav}>
                    <Link className={styles.navLink} to="/">Home</Link>
                    <Link className={styles.navLink} to="/tv-shows">TV Shows</Link>
                    <Link className={styles.navLink} to="/movies">Movies</Link>
                    <Link className={styles.navLink} to="/popular">New & Popular</Link>
                    <Link className={styles.navLink} to="/my-list">My List</Link>
                    <Link className={styles.navLink} to="/browse">Browse by Language</Link>
                </nav>

                {/* right side section */}
                <div className={styles.rightSection}>

                    {/* search */}
                    <div className={styles.SearchContainer}>
                        <button
                            onClick={() => setSearchOpen(!isSearchOpen)}
                            className={styles.SearchButton}
                        >
                            <Search size={20} />
                        </button>

                        {isSearchOpen && (
                            <input
                                type="text"
                                placeholder="Search movie title"
                                className={styles.searchInput}
                            />
                        )}
                    </div>

                    {/* notification */}
                    <button className={styles.iconButton}>
                        <Bell size={20} />
                        <span className={styles.notificationBadge}>3</span>
                    </button>

                    {/* profile */}
                    <div className={styles.profileContainer}>
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className={styles.profilebutton}
                        >
                            <div className={styles.profileAvatar}>
                                <User size={20} />
                            </div>

                            <ChevronDown size={20} />
                        </button>

                        {isProfileOpen && (
                            <div className={styles.profileMenu}>
                                <Link
                                    className={styles.profileMenuItem}
                                    to="/account"
                                >
                                    Account
                                </Link>

                                <Link
                                    className={styles.profileMenuItem}
                                    to="/help"
                                >
                                    Help Center
                                </Link>

                                <hr className={styles.profileMenuDivider} />

                                <button className={styles.profileMenuItem}>
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
}

export default Header;