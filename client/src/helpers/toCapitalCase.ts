export default function toCapitalCase(str: string) {
  const capitalLetter = str.split("")[0].toUpperCase();
  const rest = str.split("").slice(1).join("");
  return capitalLetter.concat(rest);
}
