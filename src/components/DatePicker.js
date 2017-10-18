import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Navbar, Nav, NavItem, Breadcrumb } from 'react-bootstrap'
import _ from 'lodash'
import moment from 'moment'
import { setDeliveryDate } from '../actions'

moment.locale('fr')

class DatePicker extends Component {

  constructor (props) {
    super(props)

    const { availabilities } = this.props
    const days = _.groupBy(availabilities, date => moment(date).format('YYYY-MM-DD'))
    const dates = _.keys(days)
    const availableTimes = days[_.first(dates)].map(date => moment(date).format('HH:mm'))

    this.state = {
      'availableTimes': availableTimes,
      date: null,
      time: null
    }
  }

  onChangeDate(event, days) {
    const { time } = this.state
    this.setState({ 'availableTimes': days[event.target.value].map(date => moment(date).format('HH:mm'))})
    this.props.setDeliveryDate(event.target.value + ' ' + time + ':00')
  }

  onChangeTime(event) {
    const { date } = this.state
    this.props.setDeliveryDate(date + ' ' + event.target.value + ':00')
  }

  handleSetDateAndTime (props) {
    let date, time
    if (!props.deliveryDate) {
      const first = _.first(props.availabilities)
      date = moment(first).format('YYYY-MM-DD')
      time = moment(first).format('HH:mm')
    } else {
      date = moment(props.deliveryDate).format('YYYY-MM-DD')
      time = moment(props.deliveryDate).format('HH:mm')
    }
    this.setState({ date, time })
  }

  componentWillMount () {
    this.props.setDeliveryDate(this.props.date + ' ' + this.props.time + ':00')
    this.handleSetDateAndTime(this.props)
  }

  componentWillReceiveProps (nextProps) {
    // no need to compute if actually the component updates
    // for restaurant.availabilities changes
    if (nextProps.deliveryDate !== this.props.deliveryDate) {
      this.handleSetDateAndTime(nextProps)
    }
  }

  render() {

    const { availabilities } = this.props
    const days = _.groupBy(availabilities, date => moment(date).format('YYYY-MM-DD'))
    const dates = _.keys(days)

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

export default compose(
  withRouter,
  connect(({ deliveryDate, restaurant: { availabilities } }) =>
    ({ availabilities, deliveryDate }),
  { setDeliveryDate })
)(DatePicker)
