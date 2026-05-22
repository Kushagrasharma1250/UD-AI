const featureEngineering = (data) => {

  return data.map((row) => {

    const engineered = {
      ...row
    };

    // Salary Category
    if (row.salary) {

      engineered.salaryCategory =

        row.salary > 60000
          ? "High"
          : "Medium";
    }

    // Extract Month from Date
    Object.keys(row).forEach((key) => {

      if (
        typeof row[key] === "string" &&
        !isNaN(Date.parse(row[key]))
      ) {

        const date =
          new Date(row[key]);

        engineered[`${key}_month`] =
          date.getMonth() + 1;
      }
    });

    return engineered;
  });
};

module.exports = featureEngineering;