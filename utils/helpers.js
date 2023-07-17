export const formatDate = (date, options) =>
        date.toLocaleString("en-GB", { timeZone: "Europe/Berlin", ...options });