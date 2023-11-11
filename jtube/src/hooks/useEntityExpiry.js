import { useEffect, useState } from "react";
import { idbGet, idbSet } from "src/utils/storage/idb";

const useEntityExpiry = (config) => {
  const [isExpired, setIsExpired] = useState(() => {
    return Object.keys(config.items).reduce((acc, cur) => {
      return { ...acc, [cur]: config.items[cur]?.status };
    }, {});
  });

  const [expiryCb, setExpiryCb] = useState({});

  const checkForOnceInDays = async (name, key, every = 1) => {
    const expiry = (await idbGet("expiry", key)) || 0;
    if (new Date().getTime() > expiry) {
      setIsExpired((prev) => ({ ...prev, [name]: true }));
      const expiry = every * 24 * 60 * 60 * 1000;
      await idbSet("expiry", key, new Date().getTime() + expiry);
    }
  };

  const checkForOncePerSession = async (name, key, every = 1, count = 1) => {
    const expiry = await idbGet("expiry", key);

    const currentDate = new Date().getTime();

    if (!expiry) {
      setIsExpired((prev) => ({ ...prev, [name]: true }));

      await idbSet("expiry", key, {
        sessionCount: 1,
        lastDisplayedDate: currentDate + every * 24 * 60 * 60 * 1000,
        sessionDuration: every,
      });
      return true;
    } else {
      if (expiry.lastDisplayedDate >= currentDate) {
        // setIsExpired((prev) => ({ ...prev, [name]: false }));
        return false;
      } else {
        if (expiry.sessionCount < count) {
          setIsExpired((prev) => ({ ...prev, [name]: true }));
          await idbSet("expiry", key, {
            sessionCount: expiry.sessionCount + 1,
            lastDisplayedDate: currentDate + every * 24 * 60 * 60 * 1000,
            sessionDuration: every,
          });
          return true;
        } else {
          // setIsExpired((prev) => ({ ...prev, [name]: false }));
          return false;
        }
      }
    }
  };

  const checkForEntities = () => {
    const entities = Object.keys(config.items);

    const cbs = {};
    entities.map((name) => {
      if (config.items[name]?.variant === "checkForOnceInDays") {
        const { key, every, manual } = config.items[name];
        if (manual) {
          cbs[name] = () => checkForOnceInDays(name, key || name, every);
        } else {
          checkForOnceInDays(name, key || name, every);
        }
      }

      if (config.items[name]?.variant === "checkForOncePerSession") {
        const { key, every, count, manual } = config.items[name];
        if (manual) {
          cbs[name] = () => checkForOncePerSession(name, key || name, every, count);
        } else {
          checkForOncePerSession(name, key || name, every, count);
        }
      }
    });

    if (Object.keys(cbs).length) {
      setExpiryCb(cbs);
    }
  };

  useEffect(() => {
    checkForEntities();
  }, []);

  return { data: { ...isExpired }, cb: expiryCb };
};

export default useEntityExpiry;
