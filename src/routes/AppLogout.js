import { useEffect } from "react";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
  "keyup",
  "keydown",
  "mouseover",
  "mouseout",
  "mouseup",
];

export const AppLogout = ({ children }) => {
  let timer;

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      Object.values(events).forEach((item) => {
        window.removeEventListener(item, resetTimer);
      });
      logoutAction();
    }, 2 * 60 * 60 * 1000); // 2 * 60 * 60 * 1000
  };

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  useEffect(() => {
    Object.values(events).forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        handleLogoutTimer();
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // logs out user
  const logoutAction = () => {
    localStorage.clear();
    window.location.pathname = "/signin";
  };

  return children;
};
