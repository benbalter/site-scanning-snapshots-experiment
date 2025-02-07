import core from '@actions/core';
import fetch from 'node-fetch';
import { promises as fs } from 'fs';
import { exit } from 'process';

const url = 'https://api.gsa.gov/technology/site-scanning/data/weekly-snapshot-all.json';

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
    fs.writeFile(`./data/${record.initial_domain}.json`, JSON.stringify(record, null, 2));
  });

  await Promise.all(writePromises);

  core.info('All records have been written to disk');
}
 
main();