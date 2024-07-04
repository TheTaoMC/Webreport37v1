import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useStore } from "../zustand/Store";

function ConfigLoader({ children }) {
  const initConfig = useStore((state) => state.initConfig);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `/config.js`;
    script.async = true;
    script.onload = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      initConfig();
      setIsLoaded(true);
    };
    document.body.appendChild(script);
  }, [initConfig]);

  if (!isLoaded) {
    return (
      <>
        <div className="flex justify-center items-center h-[80vh]">
          <ReactLoading type={"balls"} color={"#000"} height={50} width={50} />
        </div>
      </>
    );
  }

  return children;
}

export default ConfigLoader;
