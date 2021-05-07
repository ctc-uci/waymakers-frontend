import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CSVLink } from 'react-csv';

import { WMKBackend } from '../../../common/utils';

import './CSVDownloadButton.css';

const { Parser } = require('json2csv');

const json2csvParser = new Parser();

const CSVDownloadLink = ({ divisions }) => {
  // TODO: Add backend route that can support multiple divisions/warehouses
  // divisions: array of division ids to download
  // warehouses: array of warehouse ids to download
  // console.log(divisions, warehouses);
  const [CSVData, setCSVData] = useState([]);

  async function getData() {
    try {
      const promises = await Promise.all(divisions.map(async (division) => {
        const { data } = await WMKBackend.get('/inventory', {
          params: {
            division: division.value,
          },
        });
        return data;
      }));

      const asyncRes = await Promise.all(promises);
      const reduced = asyncRes.reduce((acc, cur) => {
        acc.push(...cur);
        return acc;
      });

      setCSVData(json2csvParser.parse(reduced));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, [divisions]);

  return (
    <CSVLink
      className="csv-link"
      data={CSVData}
      filename="inventory_csv.csv"
    >
      <p className="medium">Download</p>
    </CSVLink>
  );
};

/* eslint-disable react/forbid-prop-types */
CSVDownloadLink.propTypes = {
  divisions: PropTypes.array.isRequired,
};

export default CSVDownloadLink;
