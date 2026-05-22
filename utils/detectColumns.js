const detectColumns = (data) => {

  if (!data.length) {
    return {};
  }

  const sample = data[0];

  const columns = Object.keys(sample);

  const numericColumns = [];

  const categoricalColumns = [];

  const dateColumns = [];

  columns.forEach((column) => {

    const value = sample[column];

    // Numeric Detection
    if (!isNaN(value)) {

      numericColumns.push(column);
    }

    // Date Detection
    else if (
      !isNaN(Date.parse(value))
    ) {

      dateColumns.push(column);
    }

    // Categorical Detection
    else {

      categoricalColumns.push(column);
    }
  });

  return {

    numericColumns,

    categoricalColumns,

    dateColumns
  };
};

module.exports = detectColumns;