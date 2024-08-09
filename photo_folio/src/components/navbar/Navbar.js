import styles from "./Navbar.module.css";

export default function Navbar({ isBlur }) {
  return (
    <div className={`${styles.nav}`}>
      <div className={styles.logo}>
        <div className={styles.logo_img}>
          {/* <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRAO1pVp0wJHG2Sv6snO35g2hH2jLIIgfmw&s"
            alt=""
          /> */}
        </div>
        <div className={styles.logo_text}>
          <p>PhotoFolio</p>
        </div>
      </div>
      <div>
        <ul className={styles.nav_links}></ul>
      </div>
    </div>
  );
}
