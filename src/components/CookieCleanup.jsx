import { useEffect } from "react";

const CookieCleanup = () => {
  /*      useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Check if the event is closing the window or refreshing
      if (event.clientX < 0 && event.clientY < 0) {
        // Delete the cookie only if the window is closing
        document.cookie =
          "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);  */

  return null;
};

export default CookieCleanup;
