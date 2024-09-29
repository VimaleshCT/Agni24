import { NavLink } from "react-router-dom";
import cx from "classnames";
import styles from "../styles/Home.module.scss";
import WaterImage from "../media/oscar-keys-10sTDZAj5sA-unsplash.jpg";

import { ReactComponent as ScheduleIcon } from "../media/icons/schedule.svg";
import { ReactComponent as LinkIcon } from "../media/icons/link.svg";
import Carousel from "../components/Carousel";
import HighlightCard from "../components/HighlightCard";

import {
  events,
  highlights,
  mainCoordinators,
  coordinators,
} from "../data/data";

import Hero from "../components/Hero";
import { motion } from "framer-motion";

const tags = [
  "cosplay",
  "fun",
  "poetry",
  "face painting",
  "solo song",
  "dance",
  "essay",
  "sketching",
  "concert",
  "flash mob",
  "film making",
  "joy",
  "concert",
  "dj",
  "poetry slam",
];

const Home = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <section className={cx(styles["intro-section"], styles["home-section"])}>
        <div className={styles["intro-bg"]}></div>
        <header
          className={cx(styles.introContent, styles.sectionHeader, "container")}
        >
          <h2 className={styles.heading}>
            <span style={{ marginRight: "3ch", marginLeft: "2ch" }}>Agni</span>
            <span className={styles._ar}>2024</span>
          </h2>
          <p className={styles.subtitle}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className={styles["header-btn-wrapper"]}>
            <NavLink
              to="/gallery"
              className={cx("btn", styles["intro-header-btn"])}
            >
              <span
                className={cx("btn-subtitle", styles["intro-btn-subtitle"])}
              >
                Agni'24 in reels
              </span>
              <span className={cx("btn-text", styles["intro-btn-text"])}>
                Gallery
              </span>
              <LinkIcon />
            </NavLink>
          </div>
        </header>
      </section>

      {/* Highlights Section */}
      <section
        className={cx(styles["home-section"], "container", styles.highlights)}
      >
        <header className={styles.sectionHeader}>
          <h2 className={styles.heading}>
            <span>Highlights</span>
          </h2>
        </header>
        <main>
          <div className={styles.hlgallery}>
            {(highlights || []).map((id) => (
              <HighlightCard user={user} key={id} {...events[id]} />
            ))}
            <div className={styles["btn-wrapper"]}>
              <NavLink to="/events" className="btn">
                <span className="btn-subtitle">Events</span>
                <span className="btn-text">
                  Full Event
                  <br />
                  Schedule
                </span>
                <ScheduleIcon />
              </NavLink>
            </div>
          </div>
        </main>
      </section>

      {/* Coordinators Section */}
      <section className={cx(styles["home-section"], styles.coordinators)}>
        <header className={cx(styles.sectionHeader, "container")}>
          <h2 className={styles.heading}>
            <span style={{ marginRight: "3ch" }}>Our</span>
            <span className={styles._ar}>Team</span>
          </h2>
          <div
            className={cx(styles.subtitle, "container")}
            id="coordinatorsList"
          >
            <ul>
              {(coordinators || []).slice(0, 23).map((val, i) => (
                <li key={i}>{val.name}</li>
              ))}
              {(coordinators || []).slice(23).map((val, i) => (
                <li key={i + 23}>{val.name}</li>
              ))}
            </ul>
          </div>
        </header>
        <main>
          <Carousel cardsList={mainCoordinators || []} />
        </main>
      </section>
    </motion.div>
  );
};

export default Home;
