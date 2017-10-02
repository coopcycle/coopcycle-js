import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavItem, Breadcrumb } from 'react-bootstrap';
import _ from 'lodash'
import moment from 'moment'
import { setDeliveryDate } from '../actions'

moment.locale('fr')

class DatePicker extends Component {

  constructor (props) {
    super(props);

    const { availabilities } = this.props;
    const days = _.groupBy(availabilities, date => moment(date).format('YYYY-MM-DD'));
    const dates = _.keys(days);
    const availableTimes = days[_.first(dates)].map(date => moment(date).format('HH:mm'));

    this.state = {
      'availableTimes': availableTimes
    };
  }

  onChangeDate(event, days) {
    const { time } = this.props;
    this.setState({ 'availableTimes': days[event.target.value].map(date => moment(date).format('HH:mm'))});
    this.props.actions.setDeliveryDate(event.target.value + ' ' + time + ':00')
  }

  onChangeTime(event) {
    const { date } = this.props;
    this.props.actions.setDeliveryDate(date + ' ' + event.target.value + ':00')
  }

  render() {

    const { availabilities } = this.props;
    const days = _.groupBy(availabilities, date => moment(date).format('YYYY-MM-DD'));
    const dates = _.keys(days);

    return (
      <div className="row">
        <div className="col-sm-6">
          <select value={ this.props.date } className="form-control" onChange={ (evt) => this.onChangeDate(evt, days) }>
            { dates.map(date =>
              <option key={ date } value={ date }>{ moment(date).format('dddd DD MMM') }</option>
            ) }
          </select>
        </div>
        <div className="col-sm-6">
          <select value={ this.props.time } className="form-control" onChange={ (evt) => this.onChangeTime(evt) }>
            { this.state.availableTimes.map(time =>
              <option key={ time }>{ time }</option>
            ) }
          </select>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {

  let date, time;
  if (!state.deliveryDate) {
    const first = _.first(state.restaurant.availabilities);
    date = moment(first).format('YYYY-MM-DD')
    time = moment(first).format('HH:mm')
  } else {
    date = moment(state.deliveryDate).format('YYYY-MM-DD')
    time = moment(state.deliveryDate).format('HH:mm')
  }

  return {
    availabilities: state.restaurant.availabilities,
    date,
    time,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ setDeliveryDate }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatePicker))
