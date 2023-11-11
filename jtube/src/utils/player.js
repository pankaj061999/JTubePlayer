import videojs from "video.js";

export const registerComponents = (config) => {
  config.forEach((item) => videojs.registerComponent(item.name, item.componentToRegister));
};

export const registerPlugins = (config) => {
  config.forEach((item) => videojs.registerPlugin(item.name, item.pluginToRegister));
};

export function createElement(tagName = "div", properties = {}, attributes = {}, content) {
  const el = document.createElement(tagName);

  Object.getOwnPropertyNames(properties).forEach(function (propName) {
    const val = properties[propName];

    // Handle textContent since it's not supported everywhere and we have a
    // method for it.
    if (propName === "textContent") {
      textContent(el, val);
    } else if (el[propName] !== val || propName === "tabIndex") {
      el[propName] = val;
    }
  });

  Object.getOwnPropertyNames(attributes).forEach(function (attrName) {
    el.setAttribute(attrName, attributes[attrName]);
  });

  if (content) {
    appendContent(el, content);
  }

  return el;
}

export function pauseAllPlayers(config = { except: [] }) {
  const playersObj = videojs.getPlayers();
  const allPlayers = [];
  Object.keys(playersObj).forEach((key) => {
    if (config.except.includes(key)) {
      return;
    }
    const player = playersObj[key];
    if (player) {
      allPlayers.push(player);
    }
  });

  allPlayers.map((player) => player.pause());
}

export function playAllPlayers() {
  const allPlayers = [];

  const playersObj = videojs.getPlayers();

  Object.keys(playersObj).forEach((key) => {
    const player = playersObj[key];
    if (player) {
      allPlayers.push(player);
    }
  });

  allPlayers.map((player) => {
    player.play();
  });
}

export function playPlayers(allPlayingPlayers) {
  allPlayingPlayers.map((player) => {
    player.play().catch((err) => {
      console.log("error while playing video");
    });
  });
}

export function getAllPlayingPlayers() {
  const playersObj = videojs.getPlayers();
  const allPlayers = [];

  Object.keys(playersObj).forEach((key) => {
    const player = playersObj[key];
    if (player && !player.paused()) {
      allPlayers.push(player);
    }
  });

  return allPlayers;
}

export function playPlayer(playerId) {
  if (playerId) {
    const player = videojs.getPlayer(playerId);

    if (player) {
      player.play().catch((err) => {
        console.log(`Error while playing video with id ${playerId}`, err);
      });
    }
  }
}

export function pausePlayer(playerId) {
  if (playerId) {
    const player = videojs.getPlayer(playerId);

    if (player) {
      player.pause();
    }
  }
}
