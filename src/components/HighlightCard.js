import { NavLink } from "react-router-dom";
import styles from "./HighlightCard.module.scss";

const HighlightCard = ({
  figureSrc,
  title,
  desc,
  type,
  isRegistrationOpen,
  user,
  time,
  venue,
  id,
}) => (
  <NavLink to={`/events`} className={styles.cardLink}>
    {" "}
    {/* Wrap the entire card in a NavLink */}
    <article className={styles.card}>
      <figure>
        <img alt="" src={figureSrc} />
      </figure>
      <main>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.cardSubtitle}>
          <div className={styles.desc}>{desc}</div>
          {type === "Contest" && isRegistrationOpen ? (
            <div className={styles.type}>Registrations open</div>
          ) : (
            <div className={styles.type}>{type}</div>
          )}
        </div>
        <div className={styles.details}>
          {" "}
          {/* Display time and venue here */}
          <h4 className={styles.time}>{time}</h4>
          <h4 className={styles.venue}>{venue}</h4>
        </div>
      </main>
      {type === "Contest" &&
        isRegistrationOpen &&
        (user ? (
          <NavLink className={styles.link} to="/register">
            Register
          </NavLink>
        ) : (
          <NavLink className={styles.link} to="/signup">
            Register
          </NavLink>
        ))}
    </article>
  </NavLink>
);

export default HighlightCard;
