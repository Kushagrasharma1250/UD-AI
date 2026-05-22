const _ = require("lodash");

const cleanData = (data) => {

  // Remove Empty Rows
  let cleaned = data.filter((row) => {

    return Object.values(row)
      .some(value => value !== "");
  });

  // Remove Duplicates
  cleaned = _.uniqBy(
    cleaned,
    JSON.stringify
  );

  // Trim Spaces
  cleaned = cleaned.map((row) => {

    const cleanedRow = {};

    Object.keys(row).forEach((key) => {

      cleanedRow[key.trim()] =
        typeof row[key] === "string"
          ? row[key].trim()
          : row[key];
    });

    return cleanedRow;
  });

  return cleaned;
};

module.exports = cleanData;