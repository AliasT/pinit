const styles = {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%'
}

class Pinit extends React.Component {
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
      console.log(pageYOffset, offsetTop)
      
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


ReactDOM.render(<Pinit><div className="container">3</div></Pinit>, document.getElementById('root'))
