// Temporarily removed anime.js import due to compatibility issues
// import anime from 'animejs';

/**
 * Animate elements with a staggered entrance effect
 * @param {string} selector - CSS selector for target elements
 * @param {number} delay - Initial delay in milliseconds
 */
export const staggeredEntrance = (selector, delay = 0) => {
  anime({
    targets: selector,
    translateY: [50, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: (el, i) => delay + (i * 100)
  });
};

/**
 * Create a floating animation effect
 * @param {string} selector - CSS selector for target elements
 */
export const floatingAnimation = (selector) => {
  anime({
    targets: selector,
    translateY: ['-10px', '10px'],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    duration: 3000
  });
};

/**
 * Create a pulsing animation effect
 * @param {string} selector - CSS selector for target elements
 */
export const pulseAnimation = (selector) => {
  anime({
    targets: selector,
    scale: [1, 1.05],
    opacity: [0.9, 1],
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutQuad',
    duration: 1200
  });
};

/**
 * Create a wave animation for multiple elements
 * @param {string} selector - CSS selector for target elements
 */
export const waveAnimation = (selector) => {
  anime({
    targets: selector,
    translateY: function(el, i) {
      return -10 + (i * 2);
    },
    direction: 'alternate',
    loop: true,
    delay: function(el, i) {
      return i * 100;
    },
    easing: 'easeInOutSine',
    duration: 1500
  });
};

/**
 * Create a text reveal animation
 * @param {string} selector - CSS selector for target elements
 * @param {number} delay - Initial delay in milliseconds
 */
export const textRevealAnimation = (selector, delay = 0) => {
  anime.timeline({
    targets: selector,
    delay: delay
  })
  .add({
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 800,
    delay: (el, i) => 300 + (i * 100)
  });
};

/**
 * Create a counter animation
 * @param {string} selector - CSS selector for target elements
 * @param {number} target - Target number to count to
 * @param {number} duration - Duration in milliseconds
 */
export const counterAnimation = (selector, target, duration = 2000) => {
  anime({
    targets: selector,
    innerHTML: [0, target],
    round: 1,
    easing: 'easeInOutExpo',
    duration: duration
  });
};

/**
 * Create a gradient background animation
 * @param {string} selector - CSS selector for target elements
 */
export const gradientAnimation = (selector) => {
  anime({
    targets: selector,
    background: [
      'linear-gradient(45deg, #7c3aed, #8b5cf6)',
      'linear-gradient(45deg, #6d28d9, #7c3aed)',
      'linear-gradient(45deg, #8b5cf6, #6d28d9)'
    ],
    easing: 'easeInOutQuad',
    duration: 5000,
    direction: 'alternate',
    loop: true
  });
};

/**
 * Create a path drawing animation for SVG elements
 * @param {string} selector - CSS selector for target SVG path elements
 * @param {number} duration - Duration in milliseconds
 */
export const drawSVGAnimation = (selector, duration = 1500) => {
  anime({
    targets: selector,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: duration,
    delay: function(el, i) {
      return i * 250;
    }
  });
};

/**
 * Create a 3D rotation effect
 * @param {string} selector - CSS selector for target elements
 */
export const rotate3DAnimation = (selector) => {
  anime({
    targets: selector,
    rotateY: ['0deg', '360deg'],
    easing: 'easeInOutSine',
    duration: 3000,
    loop: true
  });
};

/**
 * Create a typing text animation
 * @param {string} selector - CSS selector for target elements
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in milliseconds per character
 */
export const typeTextAnimation = (selector, text, speed = 70) => {
  const element = document.querySelector(selector);
  if (!element) return;

  element.innerHTML = '';
  let i = 0;

  const typeChar = () => {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeChar, speed);
    }
  };

  typeChar();
};

export default {
  staggeredEntrance,
  floatingAnimation,
  pulseAnimation,
  waveAnimation,
  textRevealAnimation,
  counterAnimation,
  gradientAnimation,
  drawSVGAnimation,
  rotate3DAnimation,
  typeTextAnimation
};
