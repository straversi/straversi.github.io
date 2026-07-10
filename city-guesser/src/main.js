const CONTINENTS = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
};
const EARTH_RADIUS_METERS = 6371000;
const ANSWER_ARC_MAX_PEAK_ALTITUDE_METERS = 375000;
const ANSWER_ARC_HEIGHT_DISTANCE_RATIO = 0.35;
const ANSWER_ARC_LOOP_DURATION_MS = 1800;
const ANSWER_ARC_TRAIL_FRACTION = 0.44;
const DESIRED_FIT_PADDING_PX = 300;
const MIN_FIT_VIEWPORT_PX = 120;
const MOBILE_FIT_WIDTH_PX = 860;
const MOBILE_FIT_PADDING_SCALE = 0.9;
const COUNTRY_OUTLINE_SOURCE_ID = "country-outline";
const COUNTRY_OUTLINE_HALO_LAYER_ID = "country-outline-halo";
const COUNTRY_OUTLINE_LAYER_ID = "country-outline";
const EMPTY_FEATURE_COLLECTION = {
  type: "FeatureCollection",
  features: [],
};

const loadingEl = document.querySelector("#loading");
const promptEl = document.querySelector("#prompt");
const countryPromptEl = document.querySelector("#countryPrompt");
const continentSelect = document.querySelector("#continentSelect");
const countrySelect = document.querySelector("#countrySelect");
const populationSelect = document.querySelector("#populationSelect");
const cityCountEl = document.querySelector("#cityCount");
const roundValueEl = document.querySelector("#roundValue");
const totalValueEl = document.querySelector("#totalValue");
const resultEl = document.querySelector("#result");
const roundScoreEl = document.querySelector("#roundScore");
const nextButton = document.querySelector("#nextButton");
const resetButton = document.querySelector("#resetButton");

let cities = [];
let countries = [];
let filteredCities = [];
let targetCity = null;
let canGuess = true;
let totalScore = 0;
let round = 1;
let currentScore = null;
let selectedCountryHistory = new Set();
let guessMarker = null;
let targetMarker = null;
let answerArc = null;
let countryBoundaryFeaturesByCode = new Map();

const map = new maplibregl.Map({
  container: "globe",
  style: {
    version: 8,
    projection: {
      type: "globe",
    },
    sources: {
      imagery: {
        type: "raster",
        tiles: [
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        ],
        tileSize: 256,
        maxzoom: 19,
        attribution:
          "Tiles &copy; Esri, Maxar, Earthstar Geographics, and the GIS User Community",
      },
      [COUNTRY_OUTLINE_SOURCE_ID]: {
        type: "geojson",
        data: EMPTY_FEATURE_COLLECTION,
      },
    },
    layers: [
      {
        id: "imagery",
        type: "raster",
        source: "imagery",
        paint: {
          "raster-fade-duration": 120,
        },
      },
      {
        id: COUNTRY_OUTLINE_HALO_LAYER_ID,
        type: "line",
        source: COUNTRY_OUTLINE_SOURCE_ID,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "rgba(0, 0, 0, 0.72)",
          "line-width": 6,
        },
      },
      {
        id: COUNTRY_OUTLINE_LAYER_ID,
        type: "line",
        source: COUNTRY_OUTLINE_SOURCE_ID,
        layout: {
          "line-cap": "round",
          "line-join": "round",
        },
        paint: {
          "line-color": "#ffffff",
          "line-width": 2.5,
        },
      },
    ],
  },
  center: [0, 18],
  zoom: 1.25,
  minZoom: 1,
  maxZoom: 17,
  attributionControl: false,
});

map.on("load", () => {
  if (typeof map.setProjection === "function") {
    map.setProjection({ type: "globe" });
  }
  loadingEl.classList.add("hidden");
});

map.on("click", handleGuess);
map.on("render", () => {
  if (answerArc) {
    updateAnswerArcPath(getAnswerArcProgress());
  }
});

loadData().then(() => {
  populateFilters();
  applyFilters();
  startRound();
});

continentSelect.addEventListener("change", () => {
  populateCountries();
  applyFilters();
  restartForFilterChange();
});
countrySelect.addEventListener("change", () => {
  applyFilters();
  restartForFilterChange();
});
populationSelect.addEventListener("change", () => {
  applyFilters();
  restartForFilterChange();
});
nextButton.addEventListener("click", () => {
  round += 1;
  startRound();
});
if (resetButton) {
  resetButton.addEventListener("click", () => {
    totalScore = 0;
    round = 1;
    currentScore = null;
    resetCountryHistory();
    updateScoreboard();
    startRound();
  });
}

async function loadData() {
  const [cityResponse, countryResponse, countryBoundaryResponse] = await Promise.all([
    fetch("./public/cities.json"),
    fetch("./public/countries.json"),
    fetch("./public/country-boundaries.geojson"),
  ]);

  cities = await cityResponse.json();
  countries = await countryResponse.json();
  countryBoundaryFeaturesByCode = getCountryBoundaryFeaturesByCode(
    await countryBoundaryResponse.json(),
  );
}

function populateFilters() {
  for (const [code, label] of Object.entries(CONTINENTS)) {
    const option = document.createElement("option");
    option.value = code;
    option.textContent = label;
    continentSelect.append(option);
  }

  populateCountries();
}

function populateCountries() {
  const selectedContinent = continentSelect.value;
  const previousCountry = countrySelect.value;
  const availableCountries = countries.filter((country) => {
    return selectedContinent === "all" || country.continent === selectedContinent;
  });

  countrySelect.replaceChildren(new Option("All countries", "all"));

  for (const country of availableCountries) {
    const option = new Option(country.name, country.iso);
    countrySelect.append(option);
  }

  if (availableCountries.some((country) => country.iso === previousCountry)) {
    countrySelect.value = previousCountry;
  }
}

function applyFilters() {
  const continent = continentSelect.value;
  const country = countrySelect.value;
  const minPopulation = Number(populationSelect.value);

  filteredCities = cities.filter((city) => {
    return (
      city.population >= minPopulation &&
      (continent === "all" || city.continent === continent) &&
      (country === "all" || city.country === country)
    );
  });

  cityCountEl.textContent = filteredCities.length.toLocaleString();
}

function restartForFilterChange() {
  round = 1;
  totalScore = 0;
  currentScore = null;
  resetCountryHistory();
  updateScoreboard();
  startRound();
}

function startRound() {
  clearMarkers();
  canGuess = true;
  currentScore = null;
  setNextButtonVisible(false);
  setRoundScoreVisible(false);

  if (!filteredCities.length) {
    targetCity = null;
    promptEl.textContent = "No cities match";
    countryPromptEl.textContent = "";
    showInstruction("Relax the filters to start a round.");
    return;
  }

  targetCity = getRandomCityFromRandomCountry(filteredCities);
  promptEl.textContent = targetCity.name;
  countryPromptEl.textContent = targetCity.countryName;
  showInstruction("Rotate the globe and tap where you think the city is.");
  updateScoreboard();
}

function getRandomCityFromRandomCountry(cityOptions) {
  const citiesByCountry = new Map();
  for (const city of cityOptions) {
    if (!citiesByCountry.has(city.country)) {
      citiesByCountry.set(city.country, []);
    }
    citiesByCountry.get(city.country).push(city);
  }

  let eligibleCountries = [...citiesByCountry.keys()].filter((country) => {
    return !selectedCountryHistory.has(country);
  });

  if (!eligibleCountries.length) {
    resetCountryHistory();
    eligibleCountries = [...citiesByCountry.keys()];
  }

  const country = getRandomItem(eligibleCountries);
  selectedCountryHistory.add(country);
  const countryCities = citiesByCountry.get(country);

  return getRandomItem(countryCities);
}

function resetCountryHistory() {
  selectedCountryHistory = new Set();
}

function getRandomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function handleGuess(event) {
  if (!canGuess || !targetCity) return;

  const guess = {
    lat: event.lngLat.lat,
    lng: event.lngLat.lng,
  };
  const distanceKm = haversineKm(guess.lat, guess.lng, targetCity.lat, targetCity.lng);
  const score = scoreDistance(distanceKm);
  currentScore = score;
  totalScore += score;
  canGuess = false;
  setNextButtonVisible(true);

  guessMarker = addMarker(
    guess.lat,
    guess.lng,
    "guess-marker",
    `your guess\n${Math.round(distanceKm).toLocaleString()} km away`,
  );
  targetMarker = addMarker(
    targetCity.lat,
    targetCity.lng,
    "target-marker",
    `${targetCity.name}\nPop: ${targetCity.population.toLocaleString()}`,
  );
  showCountryOutline(targetCity.country);
  drawAnswerArc(guess, targetCity);
  fitGuessAndTarget(guess, targetCity);

  hideInstruction();
  setRoundScoreVisible(true, score, distanceKm);
  updateScoreboard();
}

function updateScoreboard() {
  if (roundValueEl) {
    roundValueEl.textContent = currentScore === null ? "-" : currentScore.toLocaleString();
  }

  if (totalValueEl) {
    totalValueEl.textContent = totalScore.toLocaleString();
  }
}

function setNextButtonVisible(isVisible) {
  nextButton.hidden = !isVisible;
  nextButton.disabled = !isVisible;
}

function setRoundScoreVisible(isVisible, score = 0, distanceKm = 0) {
  roundScoreEl.hidden = !isVisible;
  roundScoreEl.textContent = isVisible
    ? `${score.toLocaleString()} points (${Math.round(distanceKm).toLocaleString()} km away)`
    : "";
}

function showInstruction(message) {
  resultEl.textContent = message;
  resultEl.hidden = false;
}

function hideInstruction() {
  resultEl.hidden = true;
}

function addMarker(lat, lng, className, label = "") {
  const markerEl = document.createElement("div");
  markerEl.className = "map-marker";

  const dotEl = document.createElement("div");
  dotEl.className = className;
  markerEl.append(dotEl);

  if (label) {
    const labelEl = document.createElement("div");
    labelEl.className = "marker-label";
    labelEl.textContent = label;
    markerEl.append(labelEl);
  }

  return new maplibregl.Marker({
    element: markerEl,
    anchor: "center",
  })
    .setLngLat([lng, lat])
    .addTo(map);
}

function showCountryOutline(countryCode) {
  const source = map.getSource(COUNTRY_OUTLINE_SOURCE_ID);
  const country = countries.find((item) => item.iso === countryCode);
  const features =
    countryBoundaryFeaturesByCode.get(countryCode) ||
    countryBoundaryFeaturesByCode.get(country?.iso3);

  if (!source || !features?.length) return;

  source.setData({
    type: "FeatureCollection",
    features,
  });
}

function clearCountryOutline() {
  const source = map.getSource(COUNTRY_OUTLINE_SOURCE_ID);

  if (source) {
    source.setData(EMPTY_FEATURE_COLLECTION);
  }
}

function getCountryBoundaryFeaturesByCode(featureCollection) {
  const featuresByCode = new Map();

  for (const feature of featureCollection.features) {
    addCountryBoundaryFeatureCodes(featuresByCode, feature);
  }

  return new Map([...featuresByCode.entries()].map(([code, item]) => [code, item.features]));
}

function addCountryBoundaryFeatureCodes(featuresByCode, feature) {
  const properties = feature.properties || {};
  const codeGroups = [
    ["ISO_A2", "ISO_A2_EH", "WB_A2"],
    ["ISO_A3", "ISO_A3_EH", "ADM0_A3", "ADM0_ISO", "WB_A3"],
    ["POSTAL"],
  ];

  codeGroups.forEach((keys, priority) => {
    for (const key of keys) {
      const code = normalizeBoundaryCode(properties[key]);

      if (!code) continue;

      const current = featuresByCode.get(code);
      if (!current || priority < current.priority) {
        featuresByCode.set(code, { features: [feature], priority });
      } else if (priority === current.priority && !current.features.includes(feature)) {
        current.features.push(feature);
      }
    }
  });
}

function normalizeBoundaryCode(value) {
  if (!value || value === -99 || value === "-99") return null;

  return String(value).toUpperCase();
}

function fitGuessAndTarget(guess, target) {
  const westEast = getShortestLngSpan(guess.lng, target.lng);
  const bounds = [
    [westEast.west, Math.min(guess.lat, target.lat)],
    [westEast.east, Math.max(guess.lat, target.lat)],
  ];

  map.fitBounds(bounds, {
    padding: getFitBoundsPadding(),
    duration: 1400,
    maxZoom: 3.25,
    essential: true,
  });
}

function getFitBoundsPadding() {
  const container = map.getContainer();
  const isMobileViewport = container.clientWidth <= MOBILE_FIT_WIDTH_PX;
  const horizontalPadding = getAxisFitPadding(container.clientWidth, isMobileViewport);
  const verticalPadding = getAxisFitPadding(container.clientHeight, isMobileViewport);

  return {
    top: verticalPadding,
    bottom: verticalPadding,
    left: horizontalPadding,
    right: horizontalPadding,
  };
}

function getAxisFitPadding(axisLength, isMobileViewport) {
  const maxPadding = Math.max(0, Math.floor((axisLength - MIN_FIT_VIEWPORT_PX) / 2));
  const padding = Math.min(DESIRED_FIT_PADDING_PX, maxPadding);

  return isMobileViewport ? Math.floor(padding * MOBILE_FIT_PADDING_SCALE) : padding;
}

function getShortestLngSpan(lngA, lngB) {
  if (Math.abs(lngA - lngB) <= 180) {
    return {
      west: Math.min(lngA, lngB),
      east: Math.max(lngA, lngB),
    };
  }

  const wrappedA = lngA < 0 ? lngA + 360 : lngA;
  const wrappedB = lngB < 0 ? lngB + 360 : lngB;

  return {
    west: Math.min(wrappedA, wrappedB),
    east: Math.max(wrappedA, wrappedB),
  };
}

function drawAnswerArc(guess, target) {
  clearAnswerArc();

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  svg.classList.add("answer-arc-svg");
  path.classList.add("answer-arc-path");
  svg.append(path);
  map.getContainer().append(svg);

  answerArc = {
    svg,
    path,
    points: getArcCoordinates(guess, target),
    startTime: performance.now(),
    duration: ANSWER_ARC_LOOP_DURATION_MS,
    animationFrameId: null,
    pathLength: 0,
  };
  updateAnswerArcPath(0);

  animateAnswerArc();
}

function animateAnswerArc() {
  if (!answerArc) return;

  const progress = getAnswerArcProgress();
  updateAnswerArcPath(progress);
  answerArc.animationFrameId = requestAnimationFrame(animateAnswerArc);
}

function getAnswerArcProgress() {
  if (!answerArc) return 0;

  const elapsed = performance.now() - answerArc.startTime;
  return (elapsed % answerArc.duration) / answerArc.duration;
}

function updateAnswerArcPath(progress) {
  if (!answerArc) return;

  answerArc.path.setAttribute("d", getAnswerArcPath(answerArc.points));
  answerArc.pathLength = answerArc.path.getTotalLength();
  const trailLength = answerArc.pathLength * ANSWER_ARC_TRAIL_FRACTION;
  const travelLength = answerArc.pathLength + trailLength;
  const headPosition = progress * travelLength;
  const tailPosition = headPosition - trailLength;
  const visibleStart = Math.max(0, tailPosition);
  const visibleEnd = Math.min(answerArc.pathLength, headPosition);
  const visibleLength = Math.max(0, visibleEnd - visibleStart);

  answerArc.path.style.strokeDasharray = `${visibleLength} ${answerArc.pathLength}`;
  answerArc.path.style.strokeDashoffset = -visibleStart;
}

function getAnswerArcPath(points) {
  return points
    .map((arcPoint, index) => {
      const point = projectAnswerArcPoint(arcPoint);
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ");
}

function projectAnswerArcPoint({ lat, lng, altitudeMeters }) {
  const globeTransform = map.transform.currentTransform;

  if (typeof globeTransform?._projectSurfacePointToScreen === "function") {
    const altitudeScale = 1 + altitudeMeters / EARTH_RADIUS_METERS;
    const point = getMapLibreGlobeVector(lat, lng);

    return globeTransform._projectSurfacePointToScreen([
      point.x * altitudeScale,
      point.y * altitudeScale,
      point.z * altitudeScale,
    ]);
  }

  return map.project([lng, lat]);
}

function getArcCoordinates(guess, target) {
  const start = getUnitVector(guess.lat, guess.lng);
  const end = getUnitVector(target.lat, target.lng);
  const dot = Math.max(-1, Math.min(1, dotProduct(start, end)));
  const angle = Math.acos(dot);
  const peakAltitudeMeters = getArcPeakAltitude(angle * EARTH_RADIUS_METERS);
  const points = [];
  const steps = 80;

  for (let i = 0; i <= steps; i += 1) {
    const progress = i / steps;
    points.push({
      ...getSphericalPoint(start, end, angle, progress),
      altitudeMeters: getArcAltitude(progress, peakAltitudeMeters),
    });
  }

  return points;
}

function getArcPeakAltitude(distanceMeters) {
  return Math.min(
    ANSWER_ARC_MAX_PEAK_ALTITUDE_METERS,
    distanceMeters * ANSWER_ARC_HEIGHT_DISTANCE_RATIO,
  );
}

function getArcAltitude(progress, peakAltitudeMeters) {
  return 4 * progress * (1 - progress) * peakAltitudeMeters;
}

function getSphericalPoint(start, end, angle, progress) {
  if (angle < 0.000001) {
    return getLngLatFromVector(start);
  }

  const sinAngle = Math.sin(angle);
  const startScale = Math.sin((1 - progress) * angle) / sinAngle;
  const endScale = Math.sin(progress * angle) / sinAngle;

  return getLngLatFromVector({
    x: start.x * startScale + end.x * endScale,
    y: start.y * startScale + end.y * endScale,
    z: start.z * startScale + end.z * endScale,
  });
}

function getUnitVector(lat, lng) {
  const latRadians = degreesToRadians(lat);
  const lngRadians = degreesToRadians(lng);
  const cosLat = Math.cos(latRadians);

  return {
    x: cosLat * Math.cos(lngRadians),
    y: cosLat * Math.sin(lngRadians),
    z: Math.sin(latRadians),
  };
}

function getLngLatFromVector(vector) {
  const length = Math.hypot(vector.x, vector.y, vector.z);
  const normalized = {
    x: vector.x / length,
    y: vector.y / length,
    z: vector.z / length,
  };

  return {
    lng: (Math.atan2(normalized.y, normalized.x) * 180) / Math.PI,
    lat: (Math.asin(normalized.z) * 180) / Math.PI,
  };
}

function getMapLibreGlobeVector(lat, lng) {
  const latRadians = degreesToRadians(lat);
  const lngRadians = degreesToRadians(lng);
  const cosLat = Math.cos(latRadians);

  return {
    x: Math.sin(lngRadians) * cosLat,
    y: Math.sin(latRadians),
    z: Math.cos(lngRadians) * cosLat,
  };
}

function dotProduct(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function clearAnswerArc() {
  if (!answerArc) return;

  cancelAnimationFrame(answerArc.animationFrameId);
  answerArc.svg.remove();
  answerArc = null;
}

function clearMarkers() {
  clearAnswerArc();
  clearCountryOutline();
  if (guessMarker) guessMarker.remove();
  if (targetMarker) targetMarker.remove();
  guessMarker = null;
  targetMarker = null;
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const earthRadiusKm = 6371;
  const dLat = degreesToRadians(lat2 - lat1);
  const dLng = degreesToRadians(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLng / 2) ** 2;

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function degreesToRadians(value) {
  return (value * Math.PI) / 180;
}

function scoreDistance(distanceKm) {
  const perfectDistanceKm = 50;
  const antipodeDistanceKm = Math.PI * 6371;

  if (distanceKm <= perfectDistanceKm) return 100;

  const progress = Math.min(
    1,
    (distanceKm - perfectDistanceKm) / (antipodeDistanceKm - perfectDistanceKm),
  );

  return Math.round(100 * (1 - progress) ** 4);
}
