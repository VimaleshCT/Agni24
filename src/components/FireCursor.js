import React, { useEffect, useRef } from 'react';
import styles from './FireCursor.module.scss'; // Importing SCSS module

const FireCursor = () => {
  const circlesRef = useRef([]); // Reference for circles
  const coords = useRef({ x: 0, y: 0 }); // Use a ref to store coordinates

  useEffect(() => {
    const circles = circlesRef.current; // Get circles from the ref

    // Define colors for the circles
    const colors = [
      "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d", "#e36e5c",
      "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d", "#b22c5e", "#ac265e",
      "#9c155f", "#950f5f", "#830060", "#7c0060", "#680060", "#60005f", "#48005f", "#3d005e"
    ];

    // Initialize circles
    circles.forEach((circle, index) => {
      circle.x = 0;
      circle.y = 0;
      circle.style.backgroundColor = colors[index % colors.length]; // Set background color
      circle.style.position = 'absolute'; // Set absolute positioning
    });

    // Handle mouse movement
    const handleMouseMove = (e) => {
      coords.current.x = e.clientX; // Update coordinates
      coords.current.y = e.clientY + window.scrollY; // Adjust for scroll position
    };

    window.addEventListener('mousemove', handleMouseMove); // Event listener for mouse movement

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`; // Position the circle
        circle.style.top = `${y - 12}px`;
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`; // Scale the circle

        circle.x = x; // Update circle position
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0]; // Get the next circle
        x += (nextCircle.x - x) * 0.55; // Adjust x position
        y += (nextCircle.y - y) * 0.55; // Adjust y position
      });

      requestAnimationFrame(animateCircles); // Request next animation frame
    };


    animateCircles(); // Start the animation

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);


  return (
    <div className={styles.circlesContainer}>
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={styles.circle}
          ref={(el) => (circlesRef.current[index] = el)}
        />
      ))}
    </div>
  );
};

export default FireCursor;
