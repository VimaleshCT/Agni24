import { NavLink } from "react-router-dom";
import styles from "../styles/Events.module.scss";
import cx from "classnames";
import { events } from "../data/data";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SupportLink from "../components/SupportLink";
import { ReactComponent as LinkIcon } from "../media/icons/link.svg";
import videoBg from "../assets/sword-in-forest-moewalls-com.mp4";

const timeCompare = (a, b) => {
  if (events[a].time < events[b].time) {
    return -1;
  } else if (events[a].time === events[b].time) {
    return 0;
  } else {
    return 1;
  }
};

const Events = ({ user }) => {
  const eventFigureWrapper = useRef(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [activeEventId, setActiveEventId] = useState(null);

  // State for popup
  const [popupEvent, setPopupEvent] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  const handleEventClick = (eventData) => {
    setPopupEvent(eventData);
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
    setPopupEvent(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    const wrapper = eventFigureWrapper.current;
    const figures = document.querySelectorAll(`.${styles["current-figure"]}`);

    const stickEventFigure = () => {
      const stickFigure = (el, figure) => {
        if (
          el.getBoundingClientRect().top >
          window.innerHeight - figure.getBoundingClientRect().width
        ) {
          figure.style.position = "absolute";
          figure.style.top = "0";
        } else if (el.getBoundingClientRect().bottom > window.innerHeight) {
          figure.style.position = "fixed";
          figure.style.bottom = "0";
          figure.style.top = "unset";
        } else {
          figure.style.position = "absolute";
          figure.style.bottom = "0";
          figure.style.top = "unset";
        }
      };

      figures.forEach((figure) => {
        stickFigure(wrapper, figure);
      });
    };

    window.addEventListener("scroll", stickEventFigure);

    return () => {
      window.removeEventListener("scroll", stickEventFigure);
    };
  }, [currentDay]);

  // Filtered events based on the search query and selected day
  const filteredEvents = Object.keys(events)
    .filter(
      (id) =>
        events[id].day === currentDay &&
        events[id].title.toLowerCase().includes(searchQuery)
    )
    .sort(timeCompare);

  return (
    <motion.div
      className={cx(styles.events, "page-transition", "container")}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      exit={{ scaleX: 0 }}
    >
      <header
        className={cx("page-header", styles["page-header"])}
        style={{ display: "block" }}
      >
        <h1 className="heading title">
          <span>Event</span>
          <span>Schedule</span>
        </h1>
        <div className={cx(styles["header-btn-wrapper"])}>
          <NavLink
            to="/merchandise"
            className={cx("btn", styles["intro-header-btn"])}
            style={{ backgroundColor: "#007782c7" }}
          >
            <span className={cx("btn-subtitle", styles["intro-btn-subtitle"])}>
              AGNI'24 in reels
            </span>
            <span className={cx("btn-text", styles["intro-btn-text"])}>
              Merchandise
            </span>
            <LinkIcon />
          </NavLink>
        </div>
        <div className={cx("subtitle", styles["header-subtitle"])}>
          <h2>Nov 8-10</h2>
          <div>2024</div>
        </div>
      </header>

      <div className={styles["search-bar"]}>
        <span className={styles["search-icon"]}>🔍</span>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className={styles["search-input"]}
        />
      </div>

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

      <main className={cx(styles["main-content"])}>
        <nav className={styles["schedule-nav"]}>
          <ul className={styles.tabs}>
            {["Fri.", "Sat.", "Sun."].map((day, i) => (
              <ScheduleNavBtn
                key={day}
                currentDay={currentDay}
                day={i}
                label={day}
                handleDayChange={setCurrentDay}
              />
            ))}
          </ul>
        </nav>
        <section
          ref={eventFigureWrapper}
          className={styles["event-list-wrapper"]}
        >
          <ul className={styles["event-list"]}>
            {filteredEvents.map((id) => (
              <EventLI
                key={id}
                {...events[id]}
                handleHover={setActiveEventId}
                handleEventClick={handleEventClick} // Pass click handler
              />
            ))}
          </ul>
          <div className={styles["event-figures"]}>
            <div className={styles.figures}>
              {filteredEvents.map((id) => (
                <EventFigure
                  key={id}
                  {...events[id]}
                  isActive={activeEventId === id}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <div className="container">
        <SupportLink />
      </div>

      {isPopupVisible && <Popup event={popupEvent} onClose={closePopup} />}
    </motion.div>
  );
};

const ScheduleNavBtn = ({ day, currentDay, handleDayChange, label }) => (
  <li className={cx(styles.tab, { [styles.active]: currentDay === day })}>
    <button
      onClick={(e) => {
        e.preventDefault();
        handleDayChange(day);
      }}
      className={styles["tab-btn"]}
      type="button"
    >
      {label}
    </button>
  </li>
);

const EventLI = ({
  id,
  title,
  type,
  isRegistrationOpen,
  venue,
  time,
  handleHover,
  handleEventClick, // New prop for click handler
  desc, // Assume events have a description property
}) => {
  return (
    <li className={cx(styles["event-li"])}>
      <article
        className={styles["event-li-inner"]}
        onMouseOut={() => handleHover(null)}
        onMouseOver={() => handleHover(id)}
        onClick={() => handleEventClick({ id, title, type, venue, time, desc })} // Pass event data
      >
        <div className={styles.title}>
          {type === "Contest" ? (
            <p className={cx({ [styles.closed]: !isRegistrationOpen })}>
              {isRegistrationOpen
                ? "Registrations open!"
                : "Registrations closed!"}
            </p>
          ) : (
            <p>{type} </p>
          )}
          <h4>{title}</h4>
        </div>
        <div className={styles.venue}>
          <p>{venue}</p>
        </div>
        <div className={styles.time}>
          <p>{time}</p>
        </div>
      </article>
    </li>
  );
};

const EventFigure = ({ id, title, figureSrc, isActive = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    figureSrc && (
      <article
        key={id}
        className={cx(styles["current-figure"], {
          [styles.active]: isActive || isHovered,
        })}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <figure className={styles["img-wrapper"]}>
          <img alt={title} src={figureSrc} />
        </figure>
      </article>
    )
  );
};

const Popup = ({ event, onClose }) => {
  return (
    <div className={styles["popup-overlay"]} onClick={onClose}>
      <div
        className={styles["popup-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles["close-button"]} onClick={onClose}>
          &times;
        </button>
        <h3>{event.title}</h3>
        <p>
          <strong>Type:</strong> {event.type}
        </p>
        <p>
          <strong>Venue:</strong> {event.venue}
        </p>
        <p>
          <strong>Time:</strong> {event.time}
        </p>
        {event.desc && (
          <p>
            <strong>
              Description
              <br />
            </strong>
            {/* {event.desc} */}
            <div dangerouslySetInnerHTML={{ __html: event.desc }} />
          </p>
        )}
      </div>
    </div>
  );
};

export default Events;
