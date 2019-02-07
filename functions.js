export const getFonts = fonts => {
  let fontFamilies = {}
  Object.keys(fonts).map(key => {
    fontFamilies[key] = fonts[key].join(', ')
  })
  return fontFamilies
}

export const pxToRem = size => {
  return `${size / 16}rem`
}
