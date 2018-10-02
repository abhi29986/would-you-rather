const localDateAndTimeFormatter = timestamp => {
  const dateTime = new Date(timestamp).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return dateTime;
};

export default localDateAndTimeFormatter;
