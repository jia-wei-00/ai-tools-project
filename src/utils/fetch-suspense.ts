interface CacheMap {
  [key: string]: any;
}

const cacheMap: CacheMap = {};

export function fetchWithSuspense(url: string): any {
  // Check if the data is already in the cache
  if (cacheMap[url]) return cacheMap[url];

  // Create a new promise for fetching data
  const promise = fetch(url)
    .then((response: Response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data: any) => {
      cacheMap[url] = data;
      return data;
    });

  // Throw the promise to handle it using suspense or async boundaries
  throw promise;
}
