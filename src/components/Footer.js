"use client";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Meridian{" • "}Group 4{" • "}
      <a href="https://github.com/bloodleafpuddle" target="_blank" rel="noopener noreferrer">
        Autumn
      </a>
      {" & "}
      <a href="https://github.com/AbeerRashid" target="_blank" rel="noopener noreferrer">
        Abeer
      </a>
      {" • "}CPAN 144{" • "}2026
    </footer>
  );
}