import React, { useState } from "react";
import "../Header/Header.css";
import { Link } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { fabClasses } from "@mui/material";
import { useStateValue } from "../../StateProvider/StateProvider";
import { Login } from "@mui/icons-material";
import KonkyLogo from "../../Assets/Konky-logo.png";
import { auth } from "../../firebase";

const Header = () => {
  // this is the mobile nav state
  const [mobile, setMobile] = useState(false);
  // this is the search bar state
  const [searchBar, setSearchBar] = useState(false);

  // profile icon display
  const [profile, setProfile] = useState(false);
  // item in the bsket
  const [{ basket }] = useStateValue();

  const [{ user }] = useStateValue();

  // set navbar to false
  const [navBar, setNavBar] = useState(false);

  // change navbar color on scroll
  // const changeBackground = () => {
  //   if (window.scrollY >= 100) {
  //     setNavBar(!navBar);
  //   } else {
  //     setNavBar(navBar);
  //   }
  // };

  // window.addEventListener("scroll", changeBackground);

  let handleClick = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <React.Fragment>
      <div class="header">
        <div className="header_info">
          <p className="header_infoLeft">Konky | Sale of Different Products!</p>
          <p className="header_infoCenter">
            Free shipping from 85$ in 3-5 days
          </p>
          <span>
            En <ExpandMoreIcon />
          </span>
        </div>

        <div className={navBar ? "header_nav active" : "header_nav"}>
          <div className="header_navLeft">
            <MenuIcon
              // when hamburgerIcon clicked show the navbar
              onClick={() => setMobile(!mobile)}
              className="header_Icon header_menuIcon"
            />

            <SearchIcon
              // when searchIcon clicked show the search
              onClick={() => setSearchBar(!searchBar)}
              className="header_Icon header_search"
            />
            {/** if searchBar is false show header_searchContainer and the search_active class otherwise the header_searchContainer   */}
            <div
              className={
                searchBar
                  ? "header_searchcontainer search_active"
                  : "header_searchcontainer"
              }
            >
              <p className="header_searchlogo">Wakanda</p>
              <div className="header_searchInput">
                <SearchIcon className="header_Icon header_search" />
                <input type="text" placeholder="Search.." />
              </div>
              <CloseIcon
                // when CloseIcon clicked close the search
                onClick={() => setSearchBar(!searchBar)}
                className="header_searchClose"
              />
            </div>
          </div>

          <p className="header_logo">
            <Link to={"/"}>
              {" "}
              <img src={KonkyLogo} alt="" />{" "}
            </Link>
          </p>

          {/** if mobile exist show the active otherwise show the header_menu class */}
          <ul className={mobile ? "header_menu active" : "header_menu"}>
            <CloseIcon
              // when CloseIcon clicked close the navbar
              onClick={() => setMobile(!mobile)}
              className={`header_closeIcon nav_close`}
            />
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/"}>Services</Link>
            </li>
            <li>
              <Link to={"/"}>Products</Link>
            </li>
            <li>
              <Link to={"/"}>About</Link>
            </li>
            <li>
              <Link to={"/"}>Contact</Link>
            </li>
            <li>
              <Link to={"/"}>Appliances</Link>
            </li>
          </ul>

          <div className="header_navRight">
            <div className="header_pro">
              <PersonIcon
                onClick={() => setProfile(!profile)}
                className="header_Icon header_person"
              />
              <div
                className={
                  profile ? "header_profile profile_active" : "header_profile"
                }
              >
                <p>
                  <PersonIcon className="profile_icon" />
                  <span>{user && "Hello, Guest"}</span>
                </p>
                <p>
                  <Login className="profile_icon" />
                  <Link onClick={handleClick} to={"/login"}>
                    <span>{user ? "Sign Out" : "Sign In"}</span>
                  </Link>
                </p>
              </div>
            </div>
            <span className="header_navBasket">
              <Link to={"/cart/checkout"}>
                <ShoppingCartIcon className="header_Icon header_cartIcon" />
                <span className="header_qty">{basket?.length}</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Header;
