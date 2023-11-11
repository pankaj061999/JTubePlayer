import { useEffect, useState } from "react";

const useLoadResource = (resources, config) => {
  const [resourceToLoad, setResourceToLoad] = useState({});
  useEffect(() => {
    const resourceNames = Object.keys(resources);

    const resourceLoadStatus = resourceNames.reduce((acc, name) => {
      let data = {};

      if (config.isMobile == true && resources[name]?.platform.includes("mobile")) {
        data = { ...data, [`is${name}`]: true };
      } else if (config.isMobile == true && resources[name]?.platform.includes("desktop")) {
        data = { ...data, [`is${name}`]: false };
      } else if (config.isMobile == false && resources[name]?.platform.includes("desktop")) {
        data = { ...data, [`is${name}`]: true };
      } else {
        data = { ...data, [`is${name}`]: false };
      }

      return { ...acc, ...data };
    }, {});

    setResourceToLoad({ ...resourceLoadStatus });
  }, [config.isMobile]);

  return resourceToLoad;
};

export default useLoadResource;
