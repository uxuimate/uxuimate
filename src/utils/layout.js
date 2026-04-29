export const toggleDocumentAttribute = (attribute, value, tag = 'html', remove) => {
  if (document.body) {
    const element = document.getElementsByTagName(tag.toString())[0];
    const hasAttribute = element.getAttribute(attribute);
    if (remove && hasAttribute) {
      element.removeAttribute(attribute);
      return;
    }
    if (!hasAttribute) element.setAttribute(attribute, value);
  }
};