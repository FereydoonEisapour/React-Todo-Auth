import { auth } from "../../data/firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserEmail,
  selectUserAvatar,
  setUserLogOutState,
} from "../../features/userSlics";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import userAvatarSvg from "../../assets/images/userAvatar.svg";
import useDarkMode from "../../hooks/DarkMode";
const Header = () => {
  const [theme, toggleTheme] = useDarkMode()
  console.log(theme)
  const dispath = useDispatch();
  const userEmail = useSelector(selectUserEmail);
  const userAvatar = useSelector(selectUserAvatar);


  const handelSignOut = () => {
    auth
      .signOut()
      .then((result) => {
        document.cookie = null;
        dispath(setUserLogOutState({}));
      })
      .cath((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <header>
      <nav className="d-flex justify-content-between align-items-center">
        <Link to="/" className="col-6 m-2 p-0  text-logo text-color">
          React Todos
        </Link>
        <div className="d-flex m-2 align-items-center">
          <button type="button" onClick={toggleTheme} className="border border-0 dark-switch">
            <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
              strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
              <defs></defs>
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
            </svg>
          </button>
          <div>
            {userEmail ? (
              <Dropdown className="col-2 border-fucus-white ">
                <Dropdown.Toggle variant="" id="dropdown-basic-button" className="">
                <img
                    src={userAvatar ? userAvatar : userAvatarSvg}
                    alt="avatar"
                    width="32"
                    height="32"
                    className="ml-5 rounded-circle"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="main-container ">
                  <div className="mx-3 ">
                    <Link to="/user" style={{ textDecoration: "none" }} className="text-color">
                      Profile
                    </Link>
                  </div>
                  <Dropdown.Item onClick={handelSignOut} className="text-color  ">
                    Log out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              ""
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
