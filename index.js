// @flow
import React, { PropTypes } from 'react'

const styles = {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  'zIndex': 10000,
  height: 'auto'
}

export default class Pinit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      shouldPin: false,
      offsetTop: 0
    }
  }
  
  // 要固定的元素是否在viewport中出现
  pinEleIsInView () {
    return window.pageYOffset >= this.state.offsetTop
  }

  contentDidMoveout() {
    const { pinContainer } = this.refs

    return window.pageYOffset + window.innerHeight > pinContainer.offsetTop + pinContainer.scrollHeight
  }

  onWindowScroll(e) {
    const shouldPin = this.pinEleIsInView() && !this.contentDidMoveout()
    console.log(shouldPin)
    this.setState({
      shouldPin: shouldPin
    })
  }
  
  setUp() {
    const { pinContainer } = this.refs
    this.setState({
      offsetTop: pinContainer.offsetTop
    }, () => {
      window.onscroll = e => this.onWindowScroll(e)
    })
  }

  componentDidMount() {
    this.setUp()
  }
  
  render() {
    const style = this.state.shouldPin ? styles : {}
    return (
      <div ref="pinContainer" className={this.props.className}>
        <div style={style}>{this.props.header}</div>
        {this.props.children}
      </div>
    )
  }
}


