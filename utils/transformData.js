const transformData = (data) => {

  return data.map((row) => {

    const transformed = {};

    Object.keys(row).forEach((key) => {

      let value = row[key];

      // Convert Numbers
      if (!isNaN(value)) {

        value = Number(value);
      }

      // Convert Dates
      else if (
        !isNaN(Date.parse(value))
      ) {

        value =
          new Date(value)
          .toISOString();
      }

      transformed[key] = value;
    });

    return transformed;
  });
};

module.exports = transformData;