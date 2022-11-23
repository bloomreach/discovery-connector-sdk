const { BloomreachApiClient } = require('../../../../../../../../../../../../../../../../../../../../../dist/index.umd');

const client = new BloomreachApiClient({
  tracking_cookie: 'uid=2025810525749:v=11.8:ts=1551223400881:hc=876',
  url: 'www.borngroup.com',
  ref_url: 'www.borngroup.com',
  account_id: 6511,
  auth_key: '3ggj32eqbeqaahsa',
  domain_key: 'sandbox_bornconnector',
});

// eslint-disable-next-line no-console
client.getAutosuggestData({ q: 'wom' }).then(console.log);
