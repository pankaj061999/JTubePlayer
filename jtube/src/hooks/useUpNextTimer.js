import { useCallback, useEffect, useState } from "react";

const useUpNextTimer = () => {
  const [count, setCount] = useState(0);

  const start = useCallback((time) => {
    setCount(time);
  }, []);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [count]);

  return { count, start };
};
export default useUpNextTimer;
