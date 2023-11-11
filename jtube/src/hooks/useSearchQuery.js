import { useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { FANTV_API_URL } from "src/constant/appConstants";
import fetcher from "src/dataProvider";

const useSearchQuery = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:768px)");
  const { q } = router.query;

  const { mutate: trackSearchQuery } = useMutation(({ order, id }) =>
    fetcher.post(`${FANTV_API_URL}/v1/video/${id}/track-events`, {
      searchKeyWord: q,
      order: order + 1,
      platform: isMobile ? "m-web" : "web",
    })
  );

  return [trackSearchQuery];
};

export default useSearchQuery;
