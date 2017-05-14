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
  // propTypes
  props: {
    pinBar: React.Component   // 需要顶部固定的组件
  }

  constructor(props) {
    super(props)
    this.state = {
      shouldPin: false,
      pageYOffset: 0,
      offsetTop: 0
    }
  }
  
  // 要固定的元素是否在viewport中出现
  pinEleIsInView () {
    return window.pageYOffset >= this.state.offsetTop
  }

  contentDidMoveout() {
    const { contentEle } = this.refs
    return window.pageYOffset + window.innerHeight > contentEle.offsetTop + contentEle.offsetHeight
  }

  onWindowScroll(e) {
    const shouldPin = this.pinEleIsInView() && !this.contentDidMoveout()
    console.log(shouldPin)
    this.setState({
      shouldPin: shouldPin
    })
  }
  
  setUp() {
    this.setState({
      offsetTop: this.refs.pinBar.offsetTop
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
      <div>
        <div ref="pinBar" style={style}>{this.props.pinBar}</div>
        {/* 内容区 */}
        <div ref="contentEle">{this.props.children}</div>
      </div>
    )
  }
}


