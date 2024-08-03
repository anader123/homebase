export const fetchBasePaint = async () => {
  const response = await fetch("/api/basepaintproxy");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export const fetchYellowCollective = async () => {
  const response = await fetch("/api/yellowcollective");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export const fetchTrendingMints = async () => {
  const response = await fetch("/api/trendingmints");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};

export const fetchNetworkStats = async () => {
  const response = await fetch("/api/networkstats");

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};
