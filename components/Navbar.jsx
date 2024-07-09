import { useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);
  const users = user.user;
  return (
    <nav>
      <ul>
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
              <p>Welcome back {users.name}</p>
            </li>
            <li>
              <NavLink to={"/create"}>Create activity</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
