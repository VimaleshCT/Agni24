import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.scss";
import cx from "classnames";
import agniLogo from "../assets/agni.png";

const links = [
  { link: "/", name: "Home", onlyMobile: true },
  { link: "/events", name: "What's on" },
  { link: "/gallery", name: "Gallery" },
  { link: "/register", name: "Register", auth: true },
  { link: "/user", name: "Profile", auth: true },
];

const NavItem = ({ name, link, handleClick }) => (
  <div className={styles.navItemContainer}>
    <NavLink
      to={link}
      onClick={handleClick}
      className={(state) =>
        cx(styles["router-link"], "link", { [styles.active]: state.isActive })
      }
    >
      {name}
    </NavLink>
    <div className={styles.container}>
      <div className={styles.corpus}>
        <div className={styles["diamond-right"]}></div>
        <div
          className={
            styles.diamond +
            " " +
            styles["diamond-inner"] +
            " " +
            styles["diamond-left"]
          }
        ></div>
      </div>
    </div>
  </div>
);

const Navigation = ({ user }) => {
  const toggleMobileNav = () => {
    const mobileNav = document.querySelector(`.${styles.mobile}`);
    const mobileNavBtns = document.querySelectorAll(
      `.${styles["mobile-hamburger-btn"]}`
    );
    mobileNavBtns.forEach((btn) => {
      btn.classList.toggle(styles.active);
    });
    mobileNav.classList.toggle(styles.active);
    if (mobileNav.classList.contains(styles.active)) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <header>
      <nav className={styles.nav} id="nav">
        <div className={styles.logo}>
          <NavLink to="/">
            <img src={agniLogo} alt="Agni Logo" className={styles.logoImage} />{" "}
            {/* Add the logo image */}
          </NavLink>
        </div>
        <div className={cx(styles["router-links"], styles.desktop)}>
          {links
            .filter((link) => !link.onlyMobile && (!link.auth || user.user))
            .map((link) => (
              <NavItem key={link.name} {...link} />
            ))}
          {!user.user && <NavItem link="/signup" name="Register" />}
          {user.user && user.admin && <NavItem link="/admin" name="Admin" />}
        </div>
        <button
          aria-label="Menu"
          className={styles["mobile-hamburger-btn"]}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleMobileNav();
          }}
        >
          Close
        </button>
      </nav>
      <nav className={styles.mobile}>
        <button
          aria-label="Menu"
          className={styles["mobile-hamburger-btn"]}
          type="button"
          onClick={(e) => {
            e.preventDefault();
            toggleMobileNav();
          }}
        >
          Close
        </button>
        <ul className={styles["router-links"]}>
          {links
            .filter((link) => !link.auth || user.user)
            .map((link) => (
              <li key={link.name}>
                <NavItem handleClick={toggleMobileNav} {...link} />
              </li>
            ))}
          {!user.user && (
            <li key="noauth">
              <NavItem
                handleClick={toggleMobileNav}
                link="/signup"
                name="Register"
              />
            </li>
          )}
          {user.user && user.admin && (
            <li key="admin">
              <NavItem
                handleClick={toggleMobileNav}
                link="/admin"
                name="Admin"
              />
            </li>
          )}
        </ul>
        <div className={styles["nav-footer"]}>&copy;2023 Atulyam NITAP</div>
      </nav>
    </header>
  );
};

export default Navigation;
