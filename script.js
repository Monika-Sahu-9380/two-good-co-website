function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function scrollTriggerAnimation() {
  // Navbar animation
  gsap.to("nav #part-1 svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      // This part links the animation to scrolling.
      trigger: "#part-1", // This sets what element should "trigger" the animation as you scroll.
      scroller: "#main",
      markers: false, // shows green (animation start) and red (animation end) lines on the page.
      start: "top 0", // When the top of #part-1 reaches the top of the viewport, start the animation.
      end: "top -5%", // When the top of #part-1 goes above the top of the viewport by 5%, end the animation.
      scrub: true, // make the animation match the scrolling fluidly.
    },
  });
  gsap.to("nav #part-2 #links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#part-1",
      scroller: "#main",
      start: "top 0",
      end: "top -5%",
      scrub: true,
    },
  });
}
scrollTriggerAnimation();

function playCursorFunction() {
  var videoContainer = document.getElementById("video-container");
  var playCursor = document.getElementById("play-cursor");

  videoContainer.addEventListener("mouseenter", function () {
    gsap.to(playCursor, {
      scale: 1,
      opacity: 1,
    });
  });

  videoContainer.addEventListener("mouseleave", function () {
    gsap.to(playCursor, {
      scale: 0,
      opacity: 0,
    });
  });

  videoContainer.addEventListener("mousemove", function (dets) {
    gsap.to(playCursor, {
      left: dets.x - 30,
      top: dets.y - 30,
    });
  });
}
playCursorFunction();

function loadingAnimation() {
  gsap.from("#page-1 h1", {
    y: 100,
    opacity: 0,
    delay: 0.5, // this sets a pause before the animation begins
    duration: 0.9, // defines how many seconds the animation will run
    stagger: 0.3, // each h1 starts 0.2s after the previous one
  });

  gsap.from("#page-1 #video-container", {
    scale: 0.9,
    opacity: 0,
    delay: 1.6,
    duration: 0.3,
  });
}
loadingAnimation();

function ImgCursorAnimation() {
  var allImgs = document.querySelectorAll(".child img");
  allImgs.forEach((ele) => {
    ele.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(1)",
      });
    });
    ele.addEventListener("mousemove", function (dets) {
      gsap.to("#cursor", {
        left: dets.x,
        top: dets.y,
      });
    });
    ele.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%, -50%) scale(0)",
      });
    });
  });
}
ImgCursorAnimation();

function revealSections() {
  document.querySelectorAll(".hidden").forEach((section) => {
    gsap.from(section, {
      opacity: 0,
      y: 100,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: section,
        scroller: "#main",
        start: "top 80%", // When top of section hits 80% of viewport
        end: "top 60%",
        scrub: true,
      },
    });
  });
}

function addScrollAnimations() {
  revealSections();
  gsap.from("#page-3 #wrapper #heading h2", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#page-3",
      scroller: "#main",
      start: "top 80%",
    },
  });

  gsap.from("#page-3 #wrapper #content p, #page-3 #wrapper #content a", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#page-3",
      scroller: "#main",
      start: "top 80%",
    },
  });
  gsap.from("#page-4 .child", {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    stagger: 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: "#page-4",
      scroller: "#main",
      start: "top 85%",
    },
  });
  gsap.from("#page-6 .impact-images img", {
    opacity: 0,
    x: 100,
    duration: 1.2,
    stagger: 0.3,
    scrollTrigger: {
      trigger: "#page-6",
      scroller: "#main",
      start: "top 75%",
    },
  });
  gsap.from("#page-5 #review h1, #send-msg-btn, #impact-quote", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: "#page-5",
      scroller: "#main",
      start: "top 80%",
    },
  });
}
addScrollAnimations();

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('img:not(#logo1):not(#logo2)').forEach(img => {
    img.setAttribute('loading', 'lazy'); // Don’t load this image right away — wait until it’s about to appear on screen
  });
});