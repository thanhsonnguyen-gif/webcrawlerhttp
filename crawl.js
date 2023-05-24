function normalizeUrl(urlString) {
  const URLObj = new URL(urlString);
  const hostPath = `${URLObj.hostname}${URLObj.pathname}`;
  if (hostPath.length > 0 && hostPath.slice(-1) === "/") {
    return hostPath.slice(0, -1);
  }
  return hostPath;
}

module.exports = {
  normalizeUrl,
};
