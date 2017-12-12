import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { create } from './modules/documents/actions'

const About = () => (
  <div>
    <h1>Create new doc</h1>
    
  </div>
)

const mapStateToProps = state => ({
  documents: state
})

const mapDispatchToProps = dispatch => bindActionCreators({
  create,
  changePage: () => push('/about-us')
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(About)