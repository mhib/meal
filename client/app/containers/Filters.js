import { connect } from 'react-redux';
import FiltersList from '../components/FiltersList';
import { toggleFilter } from '../actions/filters';

const mapStateToProps = (state) => (
  {
    filters: state.filters
  }
);

const mapDispatchToProps = (dispatch) => (
  {
    onToggle: (name) => dispatch(toggleFilter(name))
  }
)

const Filters = connect(
  mapStateToProps,
  mapDispatchToProps
)(FiltersList);

export default Filters;
