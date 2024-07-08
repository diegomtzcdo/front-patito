import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart } from 'react-feather';

export default function Header() {

    const { logout } = useAuth();

    return (
        <header className="flex bg-white-secondary w-full p-3 shadow-sm align-middle items-center gap-3 justify-between">
            <div className="flex gap-3 align-middle items-center">
                <Link to="/productos">
                    <div className="flex gap-2 align-middle items-center justify-between">
                        <img src='/pato.webp' alt={'Logo'} width={24} height={24} />
                        <h3 className="text-primary">Patito Industry</h3>
                    </div>
                </Link>
                <nav>
                    <ul className="flex justify-center align-middle items-center gap-3">
                        <li>
                            <Link to="/productos">Productos</Link>
                        </li>
                        <li>
                            <Link to="/pedidos">Pedidos</Link>
                        </li>
                        <li>
                            <Link to="/me">{/*auth.getUser()?.username ?? ""*/""}</Link>
                        </li>
                        {/*<li>
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            </li>*/}
                    </ul>
                </nav>
            </div>
            <div>
                <nav>
                    <ul className="flex justify-center align-middle items-center gap-3">
                        <li>
                            <Link to="/resumen"><ShoppingCart color="black" size={24}/></Link>
                        </li>
                        <li>
                            <Link to="/" onClick={logout}>Logout</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
