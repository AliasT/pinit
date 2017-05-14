import React from 'react'

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
      isInView: false,
      pageYOffset: 0,
      offsetTop: 0
    }
  }
  
  onWindowScroll(e) {
    this.setState({
      pageYOffset: window.pageYOffset
    }, () => {
      const { offsetTop, pageYOffset } = this.state
      
      let isInView = pageYOffset >= offsetTop ? true : false
      this.setState({
        isInView: isInView
      })
    })
  }
  
  setUp() {
    window.onscroll = e => this.onWindowScroll(e)
  }
  
  componentDidMount() {
    const { pinit } =  this.refs
    const { offsetTop } = pinit
    
    this.setState({
      offsetTop: offsetTop
    }, this.setUp)
  }
  
  render() {
    const style = this.state.isInView ? styles : {}
    return <div ref="pinit" style={style}>{this.props.children}</div>
  }
}


