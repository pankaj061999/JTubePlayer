import { useCallback } from "react";
import { generateThumbnailUrl } from "util/common";
import useIsMobile from "./useIsMobile";

const useVideoUtils = (config) => {
  const isMobile = useIsMobile(config?.isMobile);

  const getThumbnailUrl = useCallback(
    (videoObj, config = { type: "webp", defaultUrl: "", size: "" }) => {
      const thumbnailOptions = videoObj?.newThumbnails;

      if (thumbnailOptions) {
        const { small, large } = thumbnailOptions;
        let thumbnail = "";
        if (!!config.size) {
          thumbnail = config.size == "small" ? small : large;
        } else {
          thumbnail = isMobile ? small : large;
        }

        return generateThumbnailUrl(thumbnail, config);
      }

      return config.defaultUrl || "";
    },
    [isMobile]
  );

  return { getThumbnailUrl };
};

export default useVideoUtils;
