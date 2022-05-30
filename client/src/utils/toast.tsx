import toast from "react-hot-toast";

export const toggledToasNotification = (
  isToggled: boolean,
  setToggler: any,
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

export const toastThemeNotification = (isDark: boolean, toggleMode: any) => {
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
