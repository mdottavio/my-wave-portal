const getWaveHumanDate = (aDate, short = false) =>
  short
    ? aDate.toLocaleDateString("en-US")
    : aDate.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });

export { getWaveHumanDate };
