import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing elements
    containerRef.current.innerHTML = '';

    // Create animated elements
    const numElements = 20;
    for (let i = 0; i < numElements; i++) {
      const element = document.createElement('div');
      element.className = 'animated-element';
      
      // Randomize size
      const size = Math.floor(Math.random() * 60) + 20;
      element.style.width = `${size}px`;
      element.style.height = `${size}px`;
      
      // Randomize position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      
      // Randomize opacity
      element.style.opacity = (Math.random() * 0.5 + 0.1).toString();
      
      // Randomize color
      const colors = [
        'rgba(124, 58, 237, 0.2)',  // primary-600
        'rgba(139, 92, 246, 0.2)',  // primary-500
        'rgba(167, 139, 250, 0.2)', // primary-400
        'rgba(196, 181, 253, 0.2)'  // primary-300
      ];
      element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Add to container
      containerRef.current.appendChild(element);
    }

    // Animate elements
    anime({
      targets: '.animated-element',
      translateX: function() {
        return anime.random(-100, 100) + 'px';
      },
      translateY: function() {
        return anime.random(-100, 100) + 'px';
      },
      scale: function() {
        return anime.random(0.8, 1.5);
      },
      rotate: function() {
        return anime.random(-180, 180);
      },
      opacity: function() {
        return anime.random(0.1, 0.5);
      },
      duration: function() {
        return anime.random(5000, 15000);
      },
      delay: function() {
        return anime.random(0, 1000);
      },
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad'
    });

    return () => {
      // Cleanup animation when component unmounts
      anime.remove('.animated-element');
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="animated-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default AnimatedBackground;
