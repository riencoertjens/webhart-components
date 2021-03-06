import React from 'react'

import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { OutboundLink as AnalyticsOutboundLink } from 'gatsby-plugin-google-analytics'

import facepaint from 'facepaint'

import normalize from './normalize'

import {
  baseFontSize,
  lineHeight,
  spacing,
  DefaultPaddingX,
  DefaultPaddingY,
  BreakPoints,
  globalStyle as siteGlobalStyle,
  useTypography,
  responsiveFontSizes,
  fontFamilies as fonts,
} from '../../site/styles'

import { FaInstagram as InstagramIcon } from 'react-icons/fa'
import { FaTwitter as TwitterIcon } from 'react-icons/fa'
import { FaFacebookF as FacebookIcon } from 'react-icons/fa'

import { pxToRem, getFonts } from './functions'
export { pxToRem, getFonts }

export const OutboundLink = props => (
  <AnalyticsOutboundLink target="_blank" rel="noreferrer noopener" {...props} />
)

export const breakpoints = {
  narrow: ['100%', BreakPoints[0], BreakPoints[0], BreakPoints[0]],
  normal: [
    '100%',
    BreakPoints[0],
    BreakPoints[1],
    BreakPoints[2],
    BreakPoints[3],
  ],
  wide: ['100%', '100%', '100%', BreakPoints[2]],
  superWide: ['100%', '100%', '100%', '100%', BreakPoints[3]],
}

export const mediaQuery = BreakPoints.map(bp => `@media (min-width: ${bp})`)

export const mediaQueryGT = {
  mobile: `@media (min-width: ${BreakPoints[0]})`,
  tablet: `@media (min-width: ${BreakPoints[1]})`,
  desktop: `@media (min-width: ${BreakPoints[2]})`,
  wideScreen: `@media (min-width: ${BreakPoints[3]})`,
}
export const mediaQueryLT = {
  mobile: `@media (max-width: ${BreakPoints[0]})`,
  tablet: `@media (max-width: ${BreakPoints[1]})`,
  desktop: `@media (max-width: ${BreakPoints[2]})`,
  wideScreen: `@media (max-width: ${BreakPoints[3]})`,
}

export const mediaQueries = facepaint(
  BreakPoints.map((bp, i) => {
    return `@media (min-width: ${bp})`
  })
)

export const ContainerBreakPoints = props =>
  css(
    mediaQueries({
      width: props.width ? breakpoints[props.width] : breakpoints['normal'],
      padding: `${DefaultPaddingY} ${DefaultPaddingX}`,
      margin: '0 auto',
    })
  )

export const globalStyle = useTypography
  ? css`
      html {
        ${mediaQueries({
          fontSize: responsiveFontSizes,
        })}
      }
      ${siteGlobalStyle}
    `
  : css`
  ${normalize}
  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    
    box-sizing: border-box;
    font-size: ${(baseFontSize / 16) * 100}%; // 100% = 16px
    ${mediaQueries({
      fontSize: responsiveFontSizes,
    })}
    line-height: ${lineHeight}em;
    font-family: ${fonts.body}, sans-serif;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${fonts.title};
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: ${lineHeight};
    margin-top: 0;
    margin-bottom: ${spacing}rem;
  }

  ${siteGlobalStyle}
`

export const Section = styled.section`
  padding: 3rem 0;
  ${props => props.background && `background: ${props.background};`}
  ${props => props.textAlign && `text-align: ${props.textAlign};`}
`
export const Column = styled.div`
  padding: 0;
  margin: ${DefaultPaddingY} ${DefaultPaddingX};
  ${props => props.width && `flex-base: ${props.width}`};
`

export const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  ${Column} {
    flex: 1 1 ${props => props.columnWidth || '300px'};
  }
`

export const Container = styled.div`
  padding: ${DefaultPaddingY} ${DefaultPaddingX};
  ${ContainerBreakPoints}
  ${Columns} {
    margin-left: -${DefaultPaddingX};
    margin-right: -${DefaultPaddingX};
  }
`

export const Hero = styled(Section)`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  min-height: ${props => (props.height ? props.height : 100)}vh;
`

export const ScrollArrow = ({ label, style, color }) => {
  return (
    <div
      css={css`
        ${style && style}
        padding-bottom: 10px;
      `}
    >
      {label && <span>{label}</span>}
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight - 0,
            behavior: 'smooth',
          })
        }}
        aria-label="scroll down"
        css={css`
          display: block;
          /* position: absolute; */
          width: 20px;
          height: 20px;
          z-index: 2;
          /* bottom: 50px; */
          transform: rotate(45deg);
          cursor: pointer;
          border: solid ${color || 'black'};
          border-width: 0 2px 2px 0;
          background: transparent;
          transition: 0.2s;
          padding: 0;
          margin: 0 auto;
          &:hover {
            transform: translateY(5px) rotate(45deg);
          }
        `}
      />
    </div>
  )
}

export const SocialLinks = ({ instagram, facebook, twitter, style }) => (
  <>
    {instagram && (
      <OutboundLink
        aria-label="instagram"
        href={`https://instagram.com/${instagram}`}
        css={style}
      >
        <InstagramIcon />
      </OutboundLink>
    )}
    {twitter && (
      <OutboundLink
        aria-label="twitter"
        href={`https://twitter.com/${twitter}`}
      >
        <TwitterIcon />
      </OutboundLink>
    )}
    {facebook && (
      <OutboundLink
        aria-label="facebook"
        href={`https://facebook.com/${facebook}`}
      >
        <FacebookIcon />
      </OutboundLink>
    )}
  </>
)
