import { useContext } from "react";
import { AuthContext } from "./../context/AuthContextWrapper";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);
  //   const users = user.user;
  return (
    <header className="flex justify-between px-4 h-[20%]">
      <h1 className="text-red-700 text-2xl">Fitness Freak</h1>
      <nav>
        <ul className="flex gap-4">
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
