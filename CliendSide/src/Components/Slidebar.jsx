import React from "react";
import styles from "./Slidebar.module.css";
import slide1 from "/1.jpeg";
import slide2 from "/2.jpeg";
import slide3 from "/3.jpeg";
import slide4 from "/4.jpeg";
import slide5 from "/5.jpeg";
import slide6 from "/6.jpeg";
import slide7 from "/7.jpeg";

export const Slidebar = () => {
  const images = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];

  // Split images for variety (or just use the same set for both)
  const topRow = [...images]; 
  const bottomRow = [...images].reverse(); 

  const RenderTrack = (items, directionClass) => (
    <div className={styles.sliderRow}>
      <div className={`${styles.track} ${directionClass}`}>
        {/* We map twice to ensure a seamless infinite loop */}
        {[...items, ...items].map((img, i) => (
          <img key={i} src={img} alt="slide" className={styles.smallImage} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.dualContainer}>
      {RenderTrack(topRow, styles.moveLeft)}
      {RenderTrack(bottomRow, styles.moveRight)}
    </div>
  );
};