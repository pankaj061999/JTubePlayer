const getCoords = async () => {
  try {
    const pos = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    return {
      long: pos.coords.longitude,
      lat: pos.coords.latitude,
    };
  } catch (err) {
    console.log("error occurred while getting location permission");
    return;
  }
};

export const getPlayerEventInfo = (player, config = { data: {} }) => {
  //   deviceIp
  //mode

  //videoPlaySource

  let { category, name, playerType, mode, currentTime, muted, volume, watchId, videoId, userId } =
    config.data;

  volume = volume || player.volume();
  currentTime = currentTime || player.currentTime();
  muted = muted || player.muted();

  const videoDuration = player.duration();

  const currentResolution = `${player.videoWidth()}X${player.videoHeight()}`;

  const networkType = navigator.connection?.effectiveType;
  const dataSaver = navigator.connection?.saveData;
  const dataSpeed = navigator.connection?.downlink;
  const userAgent = navigator.userAgent;

  return {
    type: category,
    name,
    playerType,
    mode: "normal",
    volume,
    muted,
    videoTimeStamp: currentTime,
    videoDuration,
    resolution: currentResolution,
    videoPlaySource: "",
    userId: userId || "",
    userAgent,
    watchId,
    videoId,
    networkType: networkType ? { string: networkType } : null,
    dataSpeed: dataSpeed ? { int: dataSpeed } : null,
    dataSaver: dataSaver ? { boolean: dataSaver } : null,
    timeStamp: Date.now(),
    deviceIp: false ? { string: "" } : null,
  };
};

export const getKafkaSchema = (events, key) => {
  const kafkaSchema = {
    value_schema_id: 45,
    key_schema_id: 1,
    records: [
      {
        key,
        value: {
          ...events[0],
        },
      },
    ],
  };

  return kafkaSchema;
};
