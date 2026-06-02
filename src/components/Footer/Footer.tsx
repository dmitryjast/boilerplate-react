import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.svg";

import "./Footer.scss";

export default function Footer() {
    return(
        <footer className="footer">
            <div className="container">
                <div className="footer-inner">
                    <div className="row-top">
                        <div className="column">
                            <Link to="/" className="logo">
                                <img src={logo} alt="Logo" />
                            </Link>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className="column">
                            
                        </div>
                        <div className="column">
                            
                        </div>
                    </div>
                    <div className="row-bottom">
                        <div className="column">
                            <p>© {new Date().getFullYear()} React Boilerplate. All Rights Reserved.</p>
                        </div>
                        <div className="column">
                            <div className="legal-pages-menu">
                                <ul>
                                    <li>
                                        <Link to="/privacy-policy">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/cookies-policy">Cookies Policy</Link>
                                    </li>
                                    <li>
                                        <Link to="/terms-and-conditions">Terms and Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}