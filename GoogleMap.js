import React from 'react'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.onScriptLoad = this.onScriptLoad.bind(this)
  }

  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id || 'map'),
      this.props.options
    )

    // var marker = new window.google.maps.Marker({
    //   position: { lat: 41.0082, lng: 28.9784 },
    //   map: map,
    //   title: 'Hello Istanbul!',
    // })
  }

  componentDidMount() {
    if (!window.google) {
      var s = document.createElement('script')
      s.type = 'text/javascript'
      s.src = `https://maps.google.com/maps/api/js?key=${this.props.apiKey}`
      var x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
      // Below is important.
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      })
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return <div css={this.props.className} id={this.props.id || 'map'} />
  }
}

export default Map
