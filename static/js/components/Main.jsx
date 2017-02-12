import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions';
import AdvancedTech from './AdvancedTech';

function mapStateToProps(state) {
  return {
    users: state["users"]
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(AdvancedTech);

export default Main;
