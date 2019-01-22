import React, { Component } from 'react'

class NetlifyForm extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData(e.target)

    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    })
      .then(() => {
        this.props.success || alert('form sent')
      })
      .catch(error => {
        this.props.error || alert(error)
      })
  }

  render() {
    const {
      children,
      name,
      className,
      buttonComponent,
      buttonText,
    } = this.props
    const ButtonComponent = buttonComponent || <button />
    const formName = name || 'basic-form'
    return (
      <form
        name={formName}
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
        className={className}
      >
        <noscript>activate javascript to use this form</noscript>
        <input type="hidden" name="bot-field" />
        <input type="hidden" name="no-cache" />
        <input type="hidden" name="form-name" value={formName} />
        {children}
        <ButtonComponent>{buttonText || 'send'}</ButtonComponent>
      </form>
    )
  }
}

export default NetlifyForm
