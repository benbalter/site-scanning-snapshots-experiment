import core from '@actions/core';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { exit } from 'process';

const url = 'https://api.gsa.gov/technology/site-scanning/data/weekly-snapshot-all.json';

// Remove these keys from the response to avoid too much "churn" in the data
const ignoreKeys = ['scan_date', 'largest_contentful_paint', 'cumulative_layout_shift']

async function main() {
  let data = [];

  core.info(`Fetching data from ${url}`);

  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (error) {
    core.setFailed(error.message);
    return;
  }

  core.info(`Successfully fetched ${data.length} records`);

  const writePromises = data.map(async (record) => {
    core.info(`Processing record for ${record.initial_domain}`);

    // Remove keys that we don't care about
    ignoreKeys.forEach((key) => {
      delete record[key];
    });

    return fs.writeFile(`./data/${record.initial_domain}.json`, JSON.stringify(record, null, 2));
  });

  try { 
    await Promise.all(writePromises);
  } catch (error) {
    core.error(error.message);
    return;
  }

  core.info('All records have been written to disk');
}
 
main();