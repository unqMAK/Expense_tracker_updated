import anime from 'animejs';

/**
 * Page transition animation
 * @param {HTMLElement} container - The container element
 */
export const pageEnterAnimation = (container) => {
  const elements = container.querySelectorAll('.animate-item');

  anime.timeline({
    easing: 'easeOutExpo',
  })
  .add({
    targets: container,
    opacity: [0, 1],
    duration: 800,
  })
  .add({
    targets: elements,
    translateY: [20, 0],
    opacity: [0, 1],
    delay: anime.stagger(100),
    duration: 800,
  }, '-=600');
};

/**
 * Staggered entrance animation for multiple elements
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
 * Create a button hover animation
 * @param {HTMLElement} button - The button element
 */
export const buttonHoverAnimation = (button) => {
  button.addEventListener('mouseenter', () => {
    anime({
      targets: button,
      scale: 1.05,
      duration: 300,
      easing: 'easeOutQuad'
    });
  });

  button.addEventListener('mouseleave', () => {
    anime({
      targets: button,
      scale: 1,
      duration: 300,
      easing: 'easeOutQuad'
    });
  });
};

/**
 * Create a ripple effect animation
 * @param {HTMLElement} element - The element to apply the ripple effect to
 */
export const rippleEffect = (element) => {
  element.addEventListener('click', (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.classList.add('ripple-effect');
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    element.appendChild(ripple);

    anime({
      targets: ripple,
      scale: [0, 3],
      opacity: [1, 0],
      easing: 'easeOutExpo',
      duration: 900,
      complete: () => {
        element.removeChild(ripple);
      }
    });
  });
};

/**
 * Create a progress bar animation
 * @param {string} selector - CSS selector for target elements
 * @param {number} percentage - Percentage to fill (0-100)
 */
export const progressBarAnimation = (selector, percentage) => {
  anime({
    targets: selector,
    width: `${percentage}%`,
    easing: 'easeInOutQuart',
    duration: 1200
  });
};

/**
 * Create a shake animation for error feedback
 * @param {string} selector - CSS selector for target elements
 */
export const shakeAnimation = (selector) => {
  anime({
    targets: selector,
    translateX: [0, -10, 10, -10, 10, 0],
    easing: 'easeInOutSine',
    duration: 500
  });
};

/**
 * Create a success checkmark animation
 * @param {string} selector - CSS selector for target SVG path
 */
export const checkmarkAnimation = (selector) => {
  anime({
    targets: selector,
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeOutExpo',
    duration: 700,
    delay: 300
  });
};

/**
 * Create a particle explosion effect
 * @param {HTMLElement} container - Container element for particles
 * @param {number} particleCount - Number of particles to create
 */
export const particleExplosion = (container, particleCount = 30) => {
  // Clear any existing particles
  container.innerHTML = '';

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    container.appendChild(particle);
  }

  // Animate particles
  anime({
    targets: container.querySelectorAll('.particle'),
    translateX: () => anime.random(-100, 100),
    translateY: () => anime.random(-100, 100),
    scale: () => anime.random(0.1, 0.5),
    opacity: [1, 0],
    easing: 'easeOutExpo',
    duration: 1000,
    delay: anime.stagger(10),
    complete: () => {
      container.innerHTML = '';
    }
  });
};

/**
 * Create a typing text animation
 * @param {HTMLElement} element - The element to animate
 * @param {string} text - The text to type
 * @param {number} speed - Typing speed in milliseconds
 */
export const typeText = (element, text, speed = 70) => {
  element.textContent = '';
  let i = 0;

  const typing = setInterval(() => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
    } else {
      clearInterval(typing);
    }
  }, speed);
};

/**
 * Initialize all button animations on a page
 */
export const initializeButtonAnimations = () => {
  document.querySelectorAll('.anime-btn').forEach(button => {
    buttonHoverAnimation(button);
    rippleEffect(button);
  });
};

/**
 * Create a staggered card entrance animation
 * @param {string} selector - CSS selector for card elements
 */
export const cardEntranceAnimation = (selector) => {
  anime({
    targets: selector,
    scale: [0.9, 1],
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutExpo',
    duration: 1200,
    delay: anime.stagger(150)
  });
};

/**
 * Create a notification popup animation
 * @param {HTMLElement} element - The notification element
 */
export const notificationAnimation = (element) => {
  anime.timeline({
    targets: element,
    easing: 'easeOutExpo'
  })
  .add({
    translateX: [100, 0],
    opacity: [0, 1],
    duration: 800
  })
  .add({
    delay: 3000
  })
  .add({
    translateX: [0, 100],
    opacity: [1, 0],
    duration: 800
  });
};

export default {
  pageEnterAnimation,
  staggeredEntrance,
  floatingAnimation,
  pulseAnimation,
  waveAnimation,
  textRevealAnimation,
  counterAnimation,
  gradientAnimation,
  drawSVGAnimation,
  rotate3DAnimation,
  buttonHoverAnimation,
  rippleEffect,
  progressBarAnimation,
  shakeAnimation,
  checkmarkAnimation,
  particleExplosion,
  typeText,
  initializeButtonAnimations,
  cardEntranceAnimation,
  notificationAnimation
};
