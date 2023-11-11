import { Box } from "@mui/material";
import Image from "next/image";
import { memo } from "react";
import { cdnLoader } from "src/utils/loaders/cdnLoader";

const PlayerPlaceholder = ({ poster, customPlaceholderStyles = {} }) => {
  return (
    <Box
      sx={{
        position: "relative",
        ...customPlaceholderStyles,
      }}
    >
      <Image
        src={poster}
        alt="Video"
        loading="eager"
        priority
        fetchpriority="high"
        layout="fill"
        loader={cdnLoader}
        decoding="sync"
      />
    </Box>
  );
};

export default memo(PlayerPlaceholder);
