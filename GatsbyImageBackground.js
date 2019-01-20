import React from 'react'
import Image from 'gatsby-image'

class GatsbyImageBackground extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      image: false,
    }
  }

  loadBGImage(e) {
    // let src = typeof e.target.currentSrc !== 'undefined' ? e.target.currentSrc : e.target.src;
    let src = this.props.fluid.src

    if (this.state.image !== src) {
      this.setState({
        image: src,
      })
    }
  }

  componentDidMount() {}

  render() {
    return (
      <this.props.component
        {...this.props.componentProps}
        style={{
          backgroundImage: this.state.image
            ? `url(${this.state.image})`
            : 'none',
        }}
      >
        <Image
          fluid={this.props.fluid}
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            zIndex: -10,
          }}
          onLoad={this.loadBGImage.bind(this)}
        />
        {this.props.children}
      </this.props.component>
    )
  }
}

export default GatsbyImageBackground
