import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

const useCsr = () => {
  const router = useRouter();
  const ref = useRef(false);

  const { pathname } = new URL(`https://fantiger.com/${router.asPath}`);

  useEffect(() => {
    ref.current = pathname;
  }, [pathname]);

  const checkForCsr = () => {
    if (ref.current === false) {
      return false;
    } else if (pathname === ref.current) {
      return false;
    } else {
      return true;
    }
  };

  return { isCsr: checkForCsr() };
};

export default useCsr;
