export default function themeFN() {
  const defaultTheme = window.localStorage.getItem("theme") ?? "light";
  const html: HTMLHtmlElement = document.querySelector(
    "html"
  ) as HTMLHtmlElement;
  if (defaultTheme === "light") {
    html.setAttribute("data-theme", "dark");
    window.localStorage.setItem("theme", "dark");
  } else {
    html.setAttribute("data-theme", "light");
    window.localStorage.setItem("theme", "light");
  }
  return defaultTheme;
}
