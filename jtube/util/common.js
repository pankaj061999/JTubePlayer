export const toggleBodyScroll = (startScroll = false) => {
  const body = document.getElementsByTagName("body")[0];
  if (body) {
    !startScroll && body.classList.add("no-scroll");
    startScroll && body.classList.remove("no-scroll");
  }
};

export const share = (data) => {
  window.location.href = "tel:+918069510565";
};
export const reachUs = () => {
  const url = "https://wa.me/+918527376969/?text=Hi, I have some queries.";
  const newWin = window.open(url, "_blank");
  if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
    return false;
  }
  return true;
};

export const reachUsforLandingPage = () => {
  const url = "https://wa.me/+918527375454/?text=Hi, I have some queries.";
  const newWin = window.open(url, "_blank");
  if (!newWin || newWin.closed || typeof newWin.closed === "undefined") {
    return false;
  }
  return true;
};

export const enquireNow = () => {
  window.location.href = "tel:+918069510565";
};
export const callNow = () => {
  window.location.href = "tel:+918069510565";
};

export const checkPercentage = (
  totalTokenAmount,
  balance,
  fantigerCoinValue,
  country_code,
  promoCode
) => {
  var total = totalTokenAmount;
  var bal = balance;
  var promoCodeValue = promoCode;
  var coin;
  if (country_code == "IN") {
    coin = Number(fantigerCoinValue / 100);
    total = totalTokenAmount * 80;
    bal = balance * 80;
    promoCodeValue = promoCode * 80;
  } else {
    coin = Number(fantigerCoinValue / 8000);
  }
  if (bal + coin + promoCodeValue < total) {
    const diff = parseFloat((total - (bal + coin)).toFixed(2));
    if (diff.toFixed(5) <= 0.00125 && country_code != "IN") {
      return true;
    } else if (diff.toFixed(2) <= 0.1 && country_code == "IN") {
      return true;
    } else {
      return false;
    }
  } else {
    return true;
  }
};

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
export const round = (value, decimals = 2) => {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
};

export const numFormatter = (num) => {
  if (num > 999 && num < 1000000) {
    return (num / 1000).toFixed(2) + " K"; // convert to K for number from > 1000 < 1 million
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + " Mn"; // convert to M for number from > 1 million
  } else if (num < 900) {
    return num; // if value < 1000, nothing to do
  }
};

export const numFormatter2 = (num) => {
  return num.toFixed(0);
};

export const getPercentage = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

export const coinToINR = (coin) => {
  return Math.round(coin / 100);
};
export const coinToUSD = (coin) => {
  return Math.round(coin / 8000);
};

export const INRToUSD = (coin) => {
  return "$" + (coin / 80).toFixed(4);
};

export function ConvertToKLacCr(value, country_code = "IN") {
  if (country_code == "IN") {
    var val = value;
    if (val <= 999) {
      val = "₹" + val.toFixed(0);
    } else if (val > 999 && val < 100000) {
      val = "₹" + (val / 1000).toFixed(0) + " K";
    } else if (val >= 100000 && val < 10000000) {
      val = "₹" + (val / 100000).toFixed(2) + " Lacs";
    } else if (val >= 10000000) {
      val = "₹" + (val / 10000000).toFixed(2) + " Cr";
    }
    return val;
  } else {
    var val = (value / 80).toFixed(2);
    if (val <= 999) {
      val = "$" + Math.round(val);
    } else if (val > 999 && val < 1000000) {
      val = "$" + (val / 1000).toFixed(0) + " K";
    } else if (val >= 1000000 && val < 1000000000) {
      val = "$" + (val / 1000000).toFixed(2) + "Mn";
    } else if (val >= 10000000000) {
      val = "$" + (val / 10000000).toFixed(2) + "Bn";
    }
    return val;
  }
}

export function ConvertToKLacCr10K(value, country_code = "IN") {
  if (country_code == "IN") {
    var val = value;
    if (val < 10000) {
      val = "₹" + val.toFixed(0);
    } else if (val >= 10000 && val < 100000) {
      val = "₹" + (val / 1000).toFixed(1) + " K";
    } else if (val >= 100000 && val < 10000000) {
      val = "₹" + (val / 100000).toFixed(2) + " Lacs";
    } else if (val >= 10000000) {
      val = "₹" + (val / 10000000).toFixed(2) + " Cr";
    }
    return val;
  } else {
    var val = (value / 80).toFixed(2);
    if (val <= 999) {
      val = "$" + Math.round(val);
    } else if (val > 999 && val < 1000000) {
      val = "$" + (val / 1000).toFixed(0) + " K";
    } else if (val >= 1000000 && val < 1000000000) {
      val = "$" + (val / 1000000).toFixed(2) + "Mn";
    } else if (val >= 10000000000) {
      val = "$" + (val / 10000000).toFixed(2) + "Bn";
    }
    return val;
  }
}

export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

export const countryBasedPrice = (value, country_code = "IN") => {
  if (country_code == "IN") {
    return "₹" + round(value * 80);
  } else if (country_code == "OTHER") {
    return "$" + round(value);
  }
};

export const countryBasedPriceRounded = (value, country_code = "IN") => {
  if (country_code == "IN") {
    return "₹" + (Math.round(value * 80 * 100) / 100).toFixed(2);
  } else if (country_code == "OTHER") {
    return "$" + (Math.round(value * 100) / 100).toFixed(2);
  }
};

export const countryBasedPriceRoundedNotFixed = (
  value,
  country_code = "IN"
) => {
  if (country_code == "IN") {
    return "₹" + Math.round(value * 80);
  } else if (country_code == "OTHER") {
    return "$" + value;
  }
};

export const countryBasedPriceEPSILON = (value, country_code = "IN") => {
  if (country_code == "IN") {
    return "₹" + Math.round((value * 80 + Number.EPSILON) * 100) / 100;
  } else if (country_code == "OTHER") {
    return "$" + Math.round((value + Number.EPSILON) * 100) / 100;
  }
};

export function isWhatPercentOf(numA, numB) {
  return Math.round((numA / numB) * 100);
}

export const calculateProfileLoss = (currentPrice, salePrice) => {
  var percent = 0;
  var amount = 0;
  var returnType = "";
  if (currentPrice > salePrice) {
    amount = currentPrice - salePrice;
    percent = (amount / salePrice) * 100;
    returnType = "profit";
  }

  if (currentPrice < salePrice) {
    amount = currentPrice - salePrice;
    percent = Math.abs((amount / salePrice) * 100);
    returnType = "loss";
  }
  return {
    percent: percent.toFixed(2),
    amount: amount.toFixed(2),
    returnType: returnType,
  };
};
let param1 = `scrollbars=no,resizable=yes,status=no,location=no,toolbar=no,menubar=no,
width=800,height=800,left=100,top=100`;

export function openLinkInNewTab(url) {
  window?.open(url, "test", param1);
}

export const generateThumbnailUrl = (thumbnail, config) => {
  let { parentUrl, path } = thumbnail || {};

  if (!!parentUrl && parentUrl.includes("i.ytimg.com")) {
    if (config.ytDomain && config.ytDomain == "defaultImg") {
      parentUrl = parentUrl.replace("i.ytimg.com", "img.youtube.com");
    } else if (config.ytDomain) {
      parentUrl = parentUrl.replace(
        "i.ytimg.com",
        `${config.ytDomain}.ytimg.com`
      );
    }

    parentUrl = parentUrl.replace("/vi/", "/vi_webp/");
    if (config.type == "webp")
      path = path.replace("maxresdefault.jpg", "maxresdefault.webp");
  }

  return !!(parentUrl && path)
    ? `${parentUrl}${path}`
    : config.defaultUrl || "";
};

export const getPosterUrl = (posterUrl, config = { type: "webp" }) => {
  if (
    !!posterUrl &&
    posterUrl.includes("i.ytimg.com") &&
    config.type == "webp"
  ) {
    if (config.ytDomain && config.ytDomain == "defaultImg") {
      posterUrl = posterUrl.replace("i.ytimg.com", "img.youtube.com");
    } else if (config.ytDomain) {
      posterUrl = posterUrl.replace(
        "i.ytimg.com",
        `${config.ytDomain}.ytimg.com`
      );
    }

    posterUrl = posterUrl.replace("/vi/", "/vi_webp/");
    posterUrl = posterUrl.replace("maxresdefault.jpg", "maxresdefault.webp");
  }

  return posterUrl;
};

export const getThumbnailUrlHome = (thumbnails, config = { type: "webp" }) => {
  const [thumbnailConfig] = thumbnails ?? [];

  let { parentUrl, path } = thumbnailConfig ?? [];

  if (!!parentUrl && parentUrl.includes("i.ytimg.com")) {
    if (config.ytDomain && config.ytDomain == "defaultImg") {
      parentUrl = parentUrl.replace("i.ytimg.com", "img.youtube.com");
    } else if (config.ytDomain) {
      parentUrl = parentUrl.replace(
        "i.ytimg.com",
        `${config.ytDomain}.ytimg.com`
      );
    }

    parentUrl = parentUrl.replace("/vi/", "/vi_webp/");

    if (config.type == "webp")
      path = path.replace("maxresdefault.jpg", "maxresdefault.webp");
  }
  return parentUrl && path ? `${parentUrl}${path}` : "";
};

export const getVideoUrl = (videoObj) => {
  const { parentUrl, hls } = videoObj.cdnLocation;
  return `${parentUrl}${hls}`;
};

export const getVideoUrlHome = (cdnLocation) => {
  const { parentUrl, hls } = cdnLocation ?? {};

  return `${parentUrl}${hls}`;
};

export function formatStreams(total_streams) {
  let value = "";
  if (total_streams >= 1000000)
    value = Math.abs(Number(total_streams) / 1.0e6).toFixed(0) + " Mn+";
  else value = Math.abs(Number(total_streams) / 1.0e3).toFixed(0) + " K+";
  return value;
}

export const slippageWithPercent = (num, percent) => {
  let temp = num * round(percent / 100) + num;
  return round(temp);
};

export const timeSince = (date) => {
  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  let seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 0) seconds = 2;
  const interval = intervals.find((i) => i?.seconds < seconds);
  const count = Math.floor(seconds / interval?.seconds);
  return `${count} ${interval?.label}${count !== 1 ? "s" : ""} ago`;
};
export const getViews = (views, digits = 1, config) => {
  const viewsLookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "B" },
  ];

  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;

  const item = viewsLookup
    .slice()
    .reverse()
    .find((item) => views >= item.value);

  if (config?.extras) {
    return {
      value: item
        ? (views / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
        : "0",
      extras: !item ? false : views % item.value === 0 ? false : true,
    };
  }

  return item
    ? (views / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
};

// it will fix decimal value without round of, take default  2
// 12.456=> 12.45
// 12.453=> 12.45
export const toFixedWithoutRound = (num, fixed = 2) => {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
};

// In case of upper limit - round off till 2 decimals to lower value
export const percentHigh = (num, percent) => {
  let temp = num * round(percent / 100) + num;
  let value = (Math.floor(temp * 100) / 100).toFixed(2);
  return value;
};
// In case of lower limit - round off till 2 decimals to higher value
export const percentLow = (num, percent) => {
  let temp = num - num * round(percent / 100);
  return round(temp);
};

export const finalUserMobilenuber = (mobile, countryCode = "91") => {
  if (mobile?.length > 10) {
    let countryCodeNo = countryCode;

    var onlyMobileno = mobile.slice(countryCodeNo.length + 1);
  } else {
    return (onlyMobileno = mobile);
  }
  return onlyMobileno;
};

export function addCommasToNumber(number) {
  const numberStr = number.toString();
  return numberStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
