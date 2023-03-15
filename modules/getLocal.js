export function getLocalWallet() {
  const localData = localStorage.getItem("wallet");
  if (localData) return JSON.parse(localData);
}

export function getLocalWatchList() {
  const localData = localStorage.getItem("watchList");
  if (localData) return JSON.parse(localData);
}
