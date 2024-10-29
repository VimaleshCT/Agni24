import React from "react";
import styles from "../styles/Sponsor.module.scss";
import videoBg from "../assets/autumn-tree-cloudy-sky-sunset-moewalls-com.mp4";

const Sponsor = () => (
  <div className={styles.container}>
    {/* Background Video Section */}
    <div className={styles["video-background"]}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles["background-video"]}
      >
        <source src={videoBg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <h1 className={styles["coming-soon"]}>Our Sponsors</h1>
    <p className={styles.message}>
      We're gathering an incredible lineup of sponsors for you. Stay tuned!
    </p>
    <div className={styles["animated-coming-soon"]}>
      <span className={styles.coming}>Coming</span>
      <span className={styles.soon}>Soon</span>
    </div>
  </div>
);

export default Sponsor;
