import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const AddToPlaylistButton = ({ player }) => {
  const [isAddedToPlaylist, setIsAddedToPlaylist] = useState(false);

  return (
    <>
      <Box
        id="button_rewind"
        component="img"
        src="/images/thumbs/controls/add-to-playlist.svg"
        // onClick={toggleLoop}
      />
    </>
  );
};

export default AddToPlaylistButton;
