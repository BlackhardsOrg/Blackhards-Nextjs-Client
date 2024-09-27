export function timeAgo(dateString: string): string {
  const units: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [30, "day"],
    [12, "month"],
    [Number.MAX_SAFE_INTEGER, "year"],
  ];

  const date = new Date(dateString);
  const now = new Date();
  let seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  for (const [unit, name] of units) {
    if (seconds < unit) {
      return `${seconds} ${name}${seconds !== 1 ? "s" : ""} ago`;
    }
    seconds = Math.floor(seconds / unit);
  }

  return "just now";
}

// Example usage:
const isoDate = "2024-07-18T19:45:10.460Z";

export const shortenEmail = (email: string) => {
  const result = email.split("@");
  let namePart = result[0];
  let companyPart = result[1];
  return `${namePart.slice(0, 4)}...@${companyPart}`;
};


export const capitalize = (text: string) => {

  return text.charAt(0).toUpperCase() + text.slice(1);
}