"use client";
import WatchList from "../../components/WatchList";
import styles from "./page.module.css";

export default function WatchlistPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Watch List</h1>
      <WatchList />
    </main>
  );
}