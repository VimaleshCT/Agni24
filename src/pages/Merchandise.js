import styles from "../styles/Gallery.module.scss";
import cx from "classnames";
import "react-html5video/dist/styles.css";
import { motion } from "framer-motion";
import image from '../assets/merch.png';

const Merchandise = ({ user }) => {
  return (
    <motion.div
      className={cx(styles.events, "page-transition", "container")}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <header className={cx("page-header", styles["page-header"])}>
        <div className={cx("subtitle", styles["header-subtitle"])}>
          <h3 className="heading">
            <span style={{ fontSize: '12vw' }}>Merchandise</span>
          </h3>
        </div>
      </header>
      <main className={cx(styles["main-content"])}>
        <div className={cx(styles["gallery"])}>
          {/* Merchandise Intro Section */}
          <div className={cx(styles["merch-item"])}>
            <img
              src={image} // Replace with actual image path
              alt="Merchandise"
              className={styles["merch-image"]}
            />
            <div className={styles["merch-description"]}>
              <h2>Wear the spirit of festivity at concert night!</h2>
              <h6 style={{ fontWeight: "normal" }}>
                Buy <b>one</b> T-shirt <b style={{ color: "#0f6fbeec", fontSize: '2rem' }}>@Rs 149/-</b> <br />
                For bulk of <b style={{  fontSize: '2rem' }}>5</b> T-shirts <b style={{ color: "#0f6fbeec", fontSize: '2rem' }}>@Rs 699/- </b>
              </h6>
              <a
                href="https://forms.gle/4D2iDxLyZyMdPwSd6"
                target="_blank"
                rel="noopener noreferrer"
                className={styles["buy-button"]}
              >
                Buy Now
              </a>

              <h6 style={{fontWeight: "normal", fontSize: '1rem'}}>
                Last Date for Registration: <b style={{ color: "#0f6fbeec", fontSize: '1.2rem' }}>Oct 31st 2024</b><br/><br></br>
              </h6>
            </div>
          </div>
        </div>
        <br />
      </main>
    </motion.div>
  );
};

export default Merchandise;
