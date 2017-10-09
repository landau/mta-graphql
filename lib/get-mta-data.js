'use strict';

const fetch = require('node-fetch');
const xml2json = require('xml2json');
const moment = require('moment');
const decodeHtml = require('decode-html');

module.exports = getMtaData;

const LINES = [
  'MetroNorth',
  'subway',
  'bus',
  'LIRR',
  'BT'
];

async function getMtaData() {
  const url = 'http://web.mta.info/status/serviceStatus.txt';
  const res = await fetch(url);
  const { status } = res;

  if (status !== 200) {
    throw new Error(`Could not retrieve data. Statuscode: ${res.status}`);
  }

  const xml = await res.text();
  const { service } = JSON.parse(xml2json.toJson(xml));

  return LINES.reduce((acc, line) => {
    acc[line] = service[line].line.map(stop => {
      const { name, status } = stop;
      let text;
      let timestamp;

      if (typeof stop.text === 'string') {
        text = decodeHtml(stop.text);
        timestamp = moment(`${stop.Date} ${stop.Time}`, 'M/D/YYYY h:mmA').toISOString();
      }

      return { name, status, text, timestamp };
    });

    return acc;
  }, {});
}
