import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppTimer = (navigateTitle) => {
  const [time, setTime] = useState(10); // 25 minutes in seconds
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;

    if (time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      navigate(navigateTitle);
    }

    return () => {
      clearInterval(interval);
    };
  }, [time, navigate, navigateTitle]);

  return time;
};

export default AppTimer;
