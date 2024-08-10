import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={`${styles.nav}`}>
      <div className={styles.logo}>
        <div className={styles.logo_img}></div>
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
