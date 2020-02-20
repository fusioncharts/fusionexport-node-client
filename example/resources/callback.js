/**
 * make pink as a background, all the H1 tags
 */
const elements = document.getElementsByTagName("h1");
Object.keys(elements).forEach(key => {
  const element = elements[key];
  element.style.background = "pink";
});
