import toast from "react-hot-toast";

export const toggledToastNotification = (
  isToggled: boolean,
  setToggler: (val: boolean) => void,
  toastText: string,
  duration: number,
  icon: string
) => {
  const nextVal = !isToggled;
  setToggler(nextVal);
  if (nextVal) {
    toast(toastText, {
      duration: duration,
      icon: `${icon}`,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  }
};

export const defaultToast = (toastText: string) => {
  toast(toastText, {
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

export const toastThemeNotification = (isDark: boolean, toggleMode: () => void) => {
  const nextVal = !isDark;
  toggleMode();
  if (nextVal) {
    toast("Dark Mode", {
      icon: "🌙",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } else {
    toast("Light Mode", {
      icon: "☀️",
      style: {
        borderRadius: "10px",
      },
    });
  }
};

export const successToast = (toastText: string, isDark: boolean, icon?: string) => {
  if (isDark) {
    toast.success(toastText, {
      icon: icon,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } else {
    toast.success(toastText, {
      icon: icon,
      style: {
        borderRadius: "10px",
      },
    });
  }
};

export const failureToast = (toastText: string, isDark: boolean, icon?: string) => {
  if (isDark) {
    toast.error(toastText, {
      icon: icon,
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  } else {
    toast.error(toastText, {
      icon: icon,
      style: {
        borderRadius: "10px",
      },
    });
  }
};

const darkModeToast = (toastText: string, icon: string) => {
  toast(toastText, {
    icon: icon,
    style: {
      borderRadius: "10px",
      background: "#333",
      color: "#fff",
    },
  });
};

const lightMOdeToast = (toastText: string, icon: string) => {
  toast(toastText, {
    icon: icon,
    style: {
      borderRadius: "10px",
    },
  });
};
