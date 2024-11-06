import React from "react";
import styles from "../styles/Sponsor.module.scss";
import videoBg from "../assets/autumn-tree-cloudy-sky-sunset-moewalls-com.mp4";
import kraftonLogo from "../assets/sponsor/krafton.png";
import rajamsLogo from "../assets/sponsor/rajams.png";
import agsLogo from "../assets/sponsor/ags.png";
import viralLogo from "../assets/sponsor/viral.png";

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
      We are proud to present our incredible lineup of sponsors!
    </p>
    Sponsors Section
    <div className={styles.sponsors}>
      <div className={styles.sponsorCard}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <img src={agsLogo} alt="AGS Logo" className={styles.logo} />
            <div className={styles.sponsorInfo}>
              <h2>Official Multiplex Partner</h2>
              <p>AGS Cinemas</p>
            </div>
          </div>
          <div className={styles.cardBack}>
            <h2>Thank you, AGS Cinemas!</h2>
            <p>For being our Official Multiplex Partner</p>
          </div>
        </div>
      </div>

      <div className={styles.sponsorCard}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <img src={viralLogo} alt="vf Logo" className={styles.logo} />
            <div className={styles.sponsorInfo}>
              <h2>Refreshment Partner</h2>
              <p>Viral Fission</p>
            </div>
          </div>
          <div className={styles.cardBack}>
            <h2>Thank you, Viral Fission!</h2>
            <p>For being our Refreshment Partner</p>
          </div>
        </div>
      </div>

      {/* <div className={styles.sponsorCard}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <img src={kraftonLogo} alt="Krafton Logo" className={styles.logo} />
            <div className={styles.sponsorInfo}>
              <h2>Signature Events Sponsor</h2>
              <p>Krafton</p>
            </div>
          </div>
          <div className={styles.cardBack}>
            <h2>Thank you, Krafton!</h2>
            <p>For being our Signature Events Sponsor</p>
          </div>
        </div>
      </div> */}

      <div className={styles.sponsorCard}>
        <div className={styles.cardInner}>
          <div className={styles.cardFront}>
            <img src={rajamsLogo} alt="Rajams Logo" className={styles.logo} />
            <div className={styles.sponsorInfo}>
              <h2>Printing Partner</h2>
              <p>Rajams</p>
            </div>
          </div>
          <div className={styles.cardBack}>
            <h2>Thank you, Rajams!</h2>
            <p>For being our Printing Partner</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Sponsor;

// import React from "react";
// import styles from "../styles/Sponsor.module.scss";
// import videoBg from "../assets/autumn-tree-cloudy-sky-sunset-moewalls-com.mp4";

// const Sponsor = () => (
//   <div className={styles.container}>
//     {/* Background Video Section */}
//     <div className={styles["video-background"]}>
//       <video
//         autoPlay
//         loop
//         muted
//         playsInline
//         className={styles["background-video"]}
//       >
//         <source src={videoBg} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>
//     </div>

//     <h1 className={styles["coming-soon"]}>Our Sponsors</h1>
//     <p className={styles.message}>
//       We're gathering an incredible lineup of sponsors for you. Stay tuned!
//     </p>
//     <div className={styles["animated-coming-soon"]}>
//       <span className={styles.coming}>Coming</span>
//       <span className={styles.soon}>Soon</span>
//     </div>
//   </div>
// );

// export default Sponsor;
