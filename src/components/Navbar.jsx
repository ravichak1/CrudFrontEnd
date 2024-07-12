import { useContext, useState } from "react";
import { AuthContext } from "./../context/AuthContextWrapper";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const { user, isLoggedIn, disconnect } = useContext(AuthContext);
  const [hamBurger, setHamBurger] = useState(false);
  //   const users = user.user;
  const handleClick = (e) => {
    e.preventDefault();
    setHamBurger((prev) => {
      const newState = !prev;
      console.log(newState); // This logs the updated state
      return newState;
    });
  };
  return (
    <header className="flex justify-between items-center px-4 h-[10vh]">
      <h1 className="text-red-700 text-2xl">
        <NavLink to={"/"}>Fitness Freak</NavLink>
      </h1>
      <nav>
        <section
          className={`md:block md:justify-end mt-4 ${
            hamBurger ? "sm:block" : "sm:hidden"
          }`}
        >
          <ul className="flex gap-[10px] text-xl sm:flex-col sm:absolute sm:right-0 sm:top-[0]  sm:p-4 sm:w-[100%] md:flex-row sm:mb-[5%] md:relative sm:bg-white sm:z-10">
            {!isLoggedIn ? (
              <>
                <li className=" md:hover:bg-none rounded">
                  <NavLink
                    to={"/signup"}
                    onClick={() => setHamBurger((isYes) => !isYes)}
                  >
                    Sign up
                  </NavLink>
                </li>
                <li className=" md:hover:bg-none rounded">
                  <NavLink
                    to={"/login"}
                    onClick={() => setHamBurger((isYes) => !isYes)}
                  >
                    Login
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li className=" md:hover:bg-none rounded">
                  <NavLink
                    to="/"
                    onClick={() => setHamBurger((isYes) => !isYes)}
                  >
                    HomePage
                  </NavLink>
                </li>
                <li className=" md:hover:bg-none rounded">
                  <NavLink
                    to={"/create"}
                    onClick={() => setHamBurger((isYes) => !isYes)}
                  >
                    Create activity
                  </NavLink>
                </li>
                <li
                  className=" md:hover:bg-none rounded"
                  onClick={() => setHamBurger((isYes) => !isYes)}
                >
                  <button onClick={disconnect}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </section>
      </nav>
      <button
        className="sm:block md:hidden lg:hidden xl:hidden 2xl:hidden"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faBars} size="2x" className="" />
      </button>
    </header>
  );
}

export default Navbar;
