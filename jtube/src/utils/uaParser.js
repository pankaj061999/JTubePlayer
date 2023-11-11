import UAParser from "ua-parser-js";

export const getDeviceParsedInfo = (ua) => {
  const parser = new UAParser(ua);

  const device = parser.getDevice();

  return {
    device: {
      // ...device,
      type: device.type === undefined ? "laptop" : device.type,
      isMobile: device.type === undefined ? false : true,
    },
  };
};
