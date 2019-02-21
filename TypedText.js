import React, { Component } from 'react'
import { keyframes, css } from '@emotion/core'

export const animations = {
  /* The typing effect */
  typing: keyframes`
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    `,
  /* The typewriter cursor effect */
  blinkCaret: ({ color }) => keyframes`
      from,
      to {
        border-color: transparent;
      }
      50% {
        border-color: ${color};
      }
    `,
}

class TypedText extends Component {
  constructor(props) {
    super(props)
    this.state = { currentItemIndex: 0, currentItemText: '', deleting: false }
    this.timeOut = null
  }

  componentDidMount() {
    this.type()
  }

  type() {
    const { currentItemText } = this.state
    let { deleting, currentItemIndex } = this.state
    const { children } = this.props
    let currentItem = children[currentItemIndex]
    let newCurrentItemText
    let delay = 150
    if (deleting) {
      newCurrentItemText = currentItem.substr(0, currentItemText.length - 1)
      delay = 50
    } else {
      newCurrentItemText = currentItem.substr(0, currentItemText.length + 1)
    }

    if (currentItemText === newCurrentItemText) {
      deleting = true
      delay = 1000
    }

    if (deleting && currentItemText.length === 0) {
      currentItemIndex =
        currentItemIndex + 1 === children.length ? 0 : currentItemIndex + 1
      delay = 500
      currentItem = children[currentItemIndex]
      deleting = false
    }

    this.timeOut = setTimeout(() => {
      this.setState({
        currentItemText: newCurrentItemText,
        deleting: deleting,
        currentItemIndex: currentItemIndex,
      })
      this.type()
    }, delay)
  }

  componentWillUnmount() {
    clearTimeout(this.timeOut)
  }
  render() {
    return (
      <span
        css={css`
          color: ${this.props.color};
          border-right: 1px solid ${this.props.color};
          animation: ${animations.blinkCaret({ color: this.props.color })} 0.75s
            step-end infinite;
          margin-right: 0;
        `}
      >
        {this.state.currentItemText}
      </span>
    )
  }
}

export default TypedText
