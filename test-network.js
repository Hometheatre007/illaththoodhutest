const https = require('https');

function checkConnection(url) {
  return new Promise((resolve) => {
    console.log(`Checking connection to ${url}...`);
    const req = https.get(url, (res) => {
      console.log(`[${url}] Status: ${res.statusCode}`);
      resolve(true);
    });

    req.on('error', (e) => {
      console.error(`[${url}] Error: ${e.message}`);
      resolve(false);
    });

    req.setTimeout(5000, () => {
      console.error(`[${url}] Timeout after 5s`);
      req.destroy();
      resolve(false);
    });
  });
}

(async () => {
  await checkConnection('https://generativelanguage.googleapis.com');
  await checkConnection('https://cdn.sanity.io');
  await checkConnection('https://www.google.com');
})();
