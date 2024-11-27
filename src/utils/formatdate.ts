export const formatDate = (date: Date): string => {
  const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
    date
  );
  const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
    date
  );
  const dayNumber = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${day}, ${month} ${dayNumber}, ${year} at ${time}`;
};
