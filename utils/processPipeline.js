const cleanData =
  require("./cleanData");

const transformData =
  require("./transformData");

const featureEngineering =
  require("./featureEngineering");

const detectColumns =
  require("./detectColumns");


const processPipeline = (data) => {

  // Step 1: Clean
  const cleaned =
    cleanData(data);

  // Step 2: Transform
  const transformed =
    transformData(cleaned);

  // Step 3: Feature Engineering
  const engineered =
    featureEngineering(
      transformed
    );

  // Step 4: Detect Columns
  const columnInfo =
    detectColumns(engineered);

  return {

    processedData: engineered,

    metadata: columnInfo
  };
};

module.exports = processPipeline;