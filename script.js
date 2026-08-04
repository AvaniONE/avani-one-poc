(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';

  if (!hasGSAP || reducedMotion) {
    document.querySelectorAll('.reveal').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    document.querySelectorAll('.flow-card, .hub, .scene-message').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = el.classList.contains('hub-left') || el.classList.contains('hub-center') || el.classList.contains('hub-right')
        ? 'translate(-50%, -50%)'
        : 'none';
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

  gsap.from('.hero-eyebrow', {
    opacity: 0,
    y: 18,
    duration: .7,
    ease: 'power2.out'
  });

  gsap.from('.hero-title > span', {
    opacity: 0,
    yPercent: 70,
    filter: 'blur(10px)',
    duration: .9,
    stagger: .11,
    ease: 'power3.out',
    delay: .12
  });

  gsap.from('.hero-lead, .hero .button', {
    opacity: 0,
    y: 22,
    duration: .75,
    stagger: .12,
    ease: 'power2.out',
    delay: .55
  });

  gsap.from('.hero-node-core', {
    opacity: 0,
    scale: .5,
    filter: 'blur(18px)',
    duration: 1.2,
    ease: 'back.out(1.5)',
    delay: .25
  });

  gsap.from('.hero-chip', {
    opacity: 0,
    scale: .82,
    y: 16,
    duration: .65,
    stagger: .09,
    ease: 'power2.out',
    delay: .75
  });

  gsap.to('.hero-ring-one', {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: 'none'
  });
  gsap.to('.hero-ring-two', {
    rotation: -360,
    duration: 42,
    repeat: -1,
    ease: 'none'
  });
  gsap.to('.hero-chip', {
    y: (i) => i % 2 === 0 ? -8 : 8,
    duration: 2.4,
    repeat: -1,
    yoyo: true,
    stagger: .18,
    ease: 'sine.inOut'
  });

  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 86%',
        once: true
      }
    });
  });

  const pathElements = gsap.utils.toArray('.paths path');
  pathElements.forEach((path) => {
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
  });

  const scene = document.querySelector('.flow-scene');
  const story = document.querySelector('.flow-story');

  if (scene && story && window.innerWidth > 860) {
    gsap.set('.pain, .win, .hub, .scene-message', { opacity: 0 });
    gsap.set('.pain', { scale: .78, y: 18, filter: 'blur(8px)' });
    gsap.set('.win', { scale: .78, y: 18, filter: 'blur(8px)' });
    gsap.set('.hub-left, .hub-center, .hub-right', { scale: .62, filter: 'blur(12px)' });
    gsap.set('.scene-message', { y: 16 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: story,
        start: 'top top+=72',
        end: 'bottom bottom',
        scrub: 1.1,
        invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set('.story-progress span', { width: `${self.progress * 100}%` })
      }
    });

    tl
      .to('.hub-left', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: .8,
        ease: 'back.out(1.4)'
      })
      .to('.pain', {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        stagger: .08,
        ease: 'power3.out'
      }, '-=.25')
      .to('.paths-left path', {
        strokeDashoffset: 0,
        duration: 1.4,
        stagger: .06,
        ease: 'power2.inOut'
      }, '-=.35')
      .to('.hub-left', {
        boxShadow: '0 0 0 10px rgba(23,105,255,.07), 0 22px 70px rgba(16,41,74,.2)',
        duration: .45
      })
      .to('.pain', {
        opacity: .36,
        scale: .94,
        duration: .8,
        stagger: .035
      })
      .to('.hub-center', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'back.out(1.6)'
      }, '-=.2')
      .to('.scene-message', {
        opacity: 1,
        y: 0,
        duration: .65,
        ease: 'power2.out'
      }, '-=.25')
      .to('.paths-right path', {
        strokeDashoffset: 0,
        duration: 1.35,
        stagger: .08,
        ease: 'power2.inOut'
      })
      .to('.hub-right', {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: .9,
        ease: 'back.out(1.5)'
      }, '-=.45')
      .to('.win', {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: .1,
        ease: 'power3.out'
      }, '-=.3')
      .to('.hub-right, .win', {
        boxShadow: '0 18px 62px rgba(23,105,255,.2)',
        duration: .7
      })
      .to({}, { duration: .7 });

    const movingSignals = [
      ['.signal-left-a', '#leftPath2', 2.8, 0],
      ['.signal-left-b', '#leftPath6', 3.2, .9],
      ['.signal-left-c', '#leftTrunk', 2.2, .4],
      ['.signal-right-a', '#rightPath1', 2.6, .2],
      ['.signal-right-b', '#rightPath3', 3.1, 1],
      ['.signal-right-c', '#rightPath5', 3.4, .55]
    ];

    movingSignals.forEach(([target, path, duration, delay]) => {
      gsap.to(target, {
        motionPath: { path, align: path, alignOrigin: [.5, .5], autoRotate: false },
        duration,
        delay,
        repeat: -1,
        ease: 'none'
      });
    });
  } else {
    gsap.set('.flow-card, .hub, .scene-message', { opacity: 1, scale: 1, filter: 'none' });
  }

  gsap.utils.toArray('.family-card').forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: .75,
        delay: index % 3 * .08,
        ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 88%', once: true }
      }
    );
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
