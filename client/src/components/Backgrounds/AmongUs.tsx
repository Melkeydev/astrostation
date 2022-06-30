import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const options = {
  autoPlay: true,
  background: {
    color: {
      value: "#000000",
    },
    image: "",
    position: "50% 50%",
    repeat: "no-repeat",
    size: "cover",
    opacity: 1,
  },
  backgroundMask: {
    composite: "destination-out",
    cover: {
      color: {
        value: "#fff",
      },
      opacity: 1,
    },
    enable: false,
  },
  fullScreen: {
    enable: true,
    zIndex: 0,
  },
  detectRetina: true,
  duration: 0,
  fpsLimit: 120,
  interactivity: {
    detectsOn: "window",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onDiv: {
        selectors: [],
        enable: false,
        mode: [],
        type: "circle",
      },
      onHover: {
        enable: false,
        mode: "repulse",
        parallax: {
          enable: false,
          force: 2,
          smooth: 10,
        },
      },
      resize: true,
    },
    modes: {
      attract: {
        distance: 200,
        duration: 0.4,
        easing: "ease-out-quad",
        factor: 1,
        maxSpeed: 50,
        speed: 1,
      },
      bounce: {
        distance: 200,
      },
      bubble: {
        distance: 400,
        duration: 2,
        mix: false,
        opacity: 0.8,
        size: 40,
        divs: {
          distance: 200,
          duration: 0.4,
          mix: false,
          selectors: [],
        },
      },
      connect: {
        distance: 80,
        links: {
          opacity: 0.5,
        },
        radius: 60,
      },
      grab: {
        distance: 400,
        links: {
          blink: false,
          consent: false,
          opacity: 1,
        },
      },
      light: {
        area: {
          gradient: {
            start: {
              value: "#ffffff",
            },
            stop: {
              value: "#000000",
            },
          },
          radius: 1000,
        },
        shadow: {
          color: {
            value: "#000000",
          },
          length: 2000,
        },
      },
      push: {
        default: true,
        groups: ["z5000", "z7500", "z2500", "z1000"],
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
        factor: 100,
        speed: 1,
        maxSpeed: 50,
        easing: "ease-out-quad",
        divs: {
          distance: 200,
          duration: 0.4,
          factor: 100,
          speed: 1,
          maxSpeed: 50,
          easing: "ease-out-quad",
          selectors: [],
        },
      },
      slow: {
        factor: 3,
        radius: 200,
      },
      trail: {
        delay: 1,
        pauseOnStop: false,
        quantity: 1,
      },
    },
  },
  manualParticles: [],
  motion: {
    disable: false,
    reduce: {
      factor: 4,
      value: true,
    },
  },
  particles: {
    bounce: {
      horizontal: {
        random: {
          enable: false,
          minimumValue: 0.1,
        },
        value: 1,
      },
      vertical: {
        random: {
          enable: false,
          minimumValue: 0.1,
        },
        value: 1,
      },
    },
    collisions: {
      bounce: {
        horizontal: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
        vertical: {
          random: {
            enable: false,
            minimumValue: 0.1,
          },
          value: 1,
        },
      },
      enable: false,
      mode: "bounce",
      overlap: {
        enable: true,
        retries: 0,
      },
    },
    color: {
      value: "#fff",
      animation: {
        h: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 20,
          decay: 0,
          sync: true,
        },
        s: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 1,
          decay: 0,
          sync: true,
        },
        l: {
          count: 0,
          enable: false,
          offset: 0,
          speed: 1,
          decay: 0,
          sync: true,
        },
      },
    },
    destroy: {
      mode: "none",
      split: {
        count: 1,
        factor: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 3,
        },
        rate: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: {
            min: 4,
            max: 9,
          },
        },
        sizeOffset: true,
      },
    },
    gradient: [],
    groups: {
      z5000: {
        number: {
          value: 70,
        },
        zIndex: {
          value: 50,
        },
      },
      z7500: {
        number: {
          value: 30,
        },
        zIndex: {
          value: 75,
        },
      },
      z2500: {
        number: {
          value: 50,
        },
        zIndex: {
          value: 25,
        },
      },
      z1000: {
        number: {
          value: 40,
        },
        zIndex: {
          value: 10,
        },
      },
    },
    links: {
      blink: false,
      color: {
        value: "#ffffff",
      },
      consent: false,
      distance: 100,
      enable: false,
      frequency: 1,
      opacity: 0.4,
      shadow: {
        blur: 5,
        color: {
          value: "#000",
        },
        enable: false,
      },
      triangles: {
        enable: false,
        frequency: 1,
      },
      width: 1,
      warp: false,
    },
    move: {
      angle: {
        offset: 0,
        value: 10,
      },
      attract: {
        distance: 200,
        enable: false,
        rotate: {
          x: 600,
          y: 1200,
        },
      },
      center: {
        x: 50,
        y: 50,
        radius: 0,
      },
      decay: 0,
      distance: {},
      direction: "right",
      drift: 0,
      enable: true,
      gravity: {
        acceleration: 9.81,
        enable: false,
        inverse: false,
        maxSpeed: 50,
      },
      path: {
        clamp: true,
        delay: {
          random: {
            enable: false,
            minimumValue: 0,
          },
          value: 0,
        },
        enable: false,
        options: {},
      },
      outModes: {
        default: "out",
        bottom: "out",
        left: "out",
        right: "out",
        top: "out",
      },
      random: false,
      size: false,
      speed: 5,
      spin: {
        acceleration: 0,
        enable: false,
      },
      straight: false,
      trail: {
        enable: false,
        length: 10,
        fillColor: {
          value: "#000000",
        },
      },
      vibrate: false,
      warp: false,
    },
    number: {
      density: {
        enable: false,
        area: 800,
        factor: 1000,
      },
      limit: 0,
      value: 200,
    },
    opacity: {
      random: {
        enable: false,
        minimumValue: 0.1,
      },
      value: 1,
      animation: {
        count: 0,
        enable: false,
        speed: 3,
        decay: 0,
        sync: false,
        destroy: "none",
        startValue: "random",
        minimumValue: 0.1,
      },
    },
    reduceDuplicates: false,
    repulse: {
      random: {
        enable: false,
        minimumValue: 0,
      },
      value: 0,
      enabled: false,
      distance: 1,
      duration: 1,
      factor: 1,
      speed: 1,
    },
    rotate: {
      random: {
        enable: false,
        minimumValue: 0,
      },
      value: 0,
      animation: {
        enable: false,
        speed: 0,
        decay: 0,
        sync: false,
      },
      direction: "clockwise",
      path: false,
    },
    shadow: {
      blur: 0,
      color: {
        value: "#000",
      },
      enable: false,
      offset: {
        x: 0,
        y: 0,
      },
    },
    shape: {
      options: {},
      type: "circle",
    },
    size: {
      random: {
        enable: false,
        minimumValue: 1,
      },
      value: 3,
      animation: {
        count: 0,
        enable: false,
        speed: 5,
        decay: 0,
        sync: false,
        destroy: "none",
        startValue: "random",
      },
    },
    stroke: {
      width: 0,
    },
    zIndex: {
      random: {
        enable: false,
        minimumValue: 0,
      },
      value: 5,
      opacityRate: 0.5,
      sizeRate: 1,
      velocityRate: 1,
    },
  },
  pauseOnBlur: true,
  pauseOnOutsideViewport: true,
  responsive: [],
  style: {},
  themes: [],
  zLayers: 100,
  emitters: {
    autoPlay: true,
    fill: true,
    life: {
      wait: false,
    },
    rate: {
      quantity: 1,
      delay: 7,
    },
    shape: "square",
    startCount: 0,
    size: {
      mode: "percent",
      height: 0,
      width: 0,
    },
    particles: {
      shape: {
        type: "images",
        options: {
          images: {
            src: "https://particles.js.org/images/cyan_amongus.png",
            width: 500,
            height: 634,
          },
        },
      },
      size: {
        value: 40,
      },
      move: {
        speed: 10,
        outModes: {
          default: "none",
          right: "destroy",
        },
        straight: true,
      },
      zIndex: {
        value: 0,
      },
      rotate: {
        value: {
          min: 0,
          max: 360,
        },
        animation: {
          enable: true,
          speed: 10,
          sync: true,
        },
      },
    },
    position: {
      x: -5,
      y: 55,
    },
  },
};

export const AmongUs = () => {
  const particlesInit = async (main) => {
    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = (container) => {};
  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      //@ts-ignore
      loaded={particlesLoaded}
      options={options}
    />
  );
};
