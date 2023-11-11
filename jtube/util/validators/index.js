import { isMuiElement } from "@mui/material";
import isEmpty from "lodash/isEmpty";

const verifyMobile = (mobile) => {
  const mobileRegexp = /^(\+\d{1,3}[- ]?)?\d{10}$/;
  if (!mobileRegexp.test(mobile)) {
    return false;
  } else {
    return true;
  }
};

const verifyEmail = (email) => {
  const emailRegexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegexp.test(email)) {
    return false;
  } else {
    return true;
    ``;
  }
};

const verifyUrl = (url) => {
  const urlRegexp =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  if (!urlRegexp.test(url)) {
    return false;
  } else {
    return true;
  }
};

const veriftYoutubeUrl = (url) => {
  var p =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  if (url.match(p)) {
    return url.match(p)[1];
  }
  return false;
};

const verifyIFSC = (ifsc) => {
  if (!isEmpty(ifsc) && ifsc.length == 11) {
    return true;
  } else {
    return false;
  }
};
function validateNumber(e) {
  console.log("data", e.key);
  const pattern = /^[0-9]$/;
  return pattern.test(e.key);
}

export { verifyEmail, verifyMobile, verifyUrl, veriftYoutubeUrl, verifyIFSC, validateNumber };
