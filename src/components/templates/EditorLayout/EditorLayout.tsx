import { type FC, type ReactNode } from 'react';
import styles from './EditorLayout.module.css';

export interface EditorLayoutProps {
  topBar: ReactNode;
  toolbar: ReactNode;
  canvas: ReactNode;
  colorPanel: ReactNode;
  timeline: ReactNode;
}

export const EditorLayout: FC<EditorLayoutProps> = ({
  topBar,
  toolbar,
  canvas,
  colorPanel,
  timeline,
}) => {
  return (
    <div className={styles.layout}>
      <header className={styles.topBar}>{topBar}</header>
      <div className={styles.main}>
        <aside className={styles.toolbar}>{toolbar}</aside>
        <main className={styles.canvas}>{canvas}</main>
        <aside className={styles.colorPanel}>{colorPanel}</aside>
      </div>
      <footer className={styles.timeline}>{timeline}</footer>
    </div>
  );
};
