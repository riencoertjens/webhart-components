export const getFonts = fonts => {
  let fontFamilies = {}
  Object.keys(fonts).forEach(font => {
    fontFamilies[font] = fonts[font].join(', ')
  })
  return fontFamilies
}

export const pxToRem = size => {
  return `${size / 16}rem`
}
