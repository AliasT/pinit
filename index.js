// @flow
import React, { PropTypes } from 'react'
import "./pinit.scss"

export default class Pinit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldPin: false,
      offsetTop: 0,
      headerOffsetTop: 0
    }
  }
  
  // 要固定的元素是否在viewport中出现
  pinEleIsInView () {
    return window.pageYOffset >= this.state.headerOffsetTop
  }

  contentDidMoveout() {
    const { pinContainer, header } = this.refs
    return window.pageYOffset + window.innerHeight > this.state.offsetTop + pinContainer.scrollHeight + header.offsetHeight
  }

  onWindowScroll(e) {
    const shouldPin = this.pinEleIsInView() && !this.contentDidMoveout()
    console.log(shouldPin)
    this.setState({
      shouldPin: shouldPin
    })
  }
  
  setUp() {
    const { pinContainer, header } = this.refs

    header.style.height = header.offsetHeight + 'px'
    debugger
    this.setState({
      offsetTop: pinContainer.getBoundingClientRect().top,
      headerOffsetTop: header.getBoundingClientRect().top
    }, () => {
      window.onscroll = e => this.onWindowScroll(e)
    })
  }

  componentDidMount() {
    console.log(3)
    this.setUp()
  }
  
  render() {
    let headerClassName = "pin-header"
    if(this.state.shouldPin) {
      headerClassName = headerClassName + ' ' + "pined"
    }
    return (
      <div ref="pinContainer" className={this.props.className}>
        <div className={headerClassName} ref="header">
          <div>{this.props.header}</div>
        </div>
        {this.props.children}
      </div>
    )
  }
}


