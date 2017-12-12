import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { create } from './modules/documents/actions'

const Home = props => (
  <div>
    <h1>Home</h1>
    {console.log('...', props.documents)}
    { 
      Object.values(props.documents).map( doc => 
        <div key={doc.id}>
          <strong>{doc.title}</strong>
          <p>{doc.text}</p>
        </div>
      )
    }
    
    <p><button onClick={() => props.create()}>Create new doc</button></p>
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
)(Home)