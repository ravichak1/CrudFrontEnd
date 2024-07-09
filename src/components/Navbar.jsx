import { useContext } from "react";
import { AuthContext } from "./../context/AuthContextWrapper";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);
  //   const users = user.user;
  return (
    <header className="flex">
      <h1 className="text-red-700">Fitness Freak</h1>
      <nav>
        <ul className="flex">
          <li>
            <NavLink to="/">HomePage</NavLink>
          </li>
          {!isLoggedIn ? (
            <>
              <li>
                <NavLink to={"/signup"}>Sign up</NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <button onClick={disconnect}>Logout</button>
              </li>
              <li>
                <p>Welcome back {user.user.name}</p>
              </li>
              <li>
                <NavLink to={"/create"}>Create activity</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
