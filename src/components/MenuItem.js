import classnames from 'classnames'
import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart, removeLastCartItem } from '../actions';
import _ from 'lodash';
import Modal from 'react-modal';

class MenuItem extends Component {

  constructor (props) {
    super(props);
    this.state = {
      showModal: false,
      selectedModifiers: {}
    };
    this.noPointerEvents = {
      pointerEvents: 'none'
    };
  }

  showModal () {
    this.setState({showModal: true});
  }

  closeModal () {
    this.setState({showModal: false});
  }

  stopPropagation (evt) {
    evt.stopPropagation();
    return false;
  }

  removeModifierChoice (modifier) {
    var state = _.cloneDeep(this.state);
    delete state['selectedModifiers'][modifier['@id']];
    this.setState(state);
  }

  setModifierChoice (modifier, choice) {
    var state = _.cloneDeep(this.state);
    state['selectedModifiers'][modifier['@id']] = choice;
    this.setState(state);
  }

  onChange (evt, modifier, choice) {
    let input = evt.target.getElementsByTagName('input')[0];
    if (input.checked) {
      input.checked = false;
      this.removeModifierChoice (modifier);
    }
    else {
      input.checked = true;
      this.setModifierChoice(modifier, choice);
    }
  }

  onModalDone (e) {
    this.closeModal();
    this.props.onItemClick(this.props.item, this.state.selectedModifiers);
  }

  renderModifier (modifier, key) {
    return (
      <div key={ key }>
        <h4>{ modifier.name }{ modifier.calculusStrategy === 'ADD_MODIFIER_PRICE' ? <span> - { modifier.price }&euro;</span> : '' }</h4>
        <form>
          <ListGroup>
            { modifier.modifierChoices.map( ( choice, key ) => {
              return (
                <ListGroupItem key={key} onClick={ (evt) => this.onChange(evt, modifier, choice) }>
                  <input style={ this.noPointerEvents } value={ choice['@id'] } type="radio" id={ choice['@id'] } name={ modifier['@id'] } />
                  <label style={ this.noPointerEvents } htmlFor={ choice['@id'] }>{ choice.name }{ modifier.calculusStrategy === 'ADD_MENUITEM_PRICE' ? <span> - { choice.price }&euros;</span> : '' }</label>
                </ListGroupItem>
              )
            })}
          </ListGroup>
        </form>
      </div>
    )
  }

  render () {
    const { cartLastItem, item } = this.props
    const isActive = item['@id'] === (cartLastItem && cartLastItem['@id'])
    return (
      <ListGroupItem
        active={isActive}
      >
        <span className={classnames("add-icon", { 'add-icon--disabled': cartLastItem })}
          onClick={ item.modifiers.length > 0
          ? () => this.showModal()
          : () => !cartLastItem && this.props.onItemClick(item) }> + </span> { item.name } <span className="pull-right price"> { item.offers.price } €</span>
        { item.modifiers.length > 0 ?
          <Modal isOpen={ this.state.showModal } onHide={ () => this.closeModal() }>
            <div onClick={ (evt) => this.stopPropagation(evt) }>
              <div>
                <h3>{ item.name }</h3>
              </div>
              <div>
                { item.modifiers.map( (modifier, key) => this.renderModifier(modifier, key)) }
              </div>
              <div>
                <Button bsStyle="primary" bsSize="large" block onClick={ (evt) => this.onModalDone(evt) }>Ajouter</Button>
              </div>
            </div>
          </Modal>
          : ''
        }
      </ListGroupItem>
    );
  }

}



export default connect(
  ({ cartLastItem }) => ({ cartLastItem }),
  dispatch => {
    return {
      onItemClick: (item, modifiers = {}) => {
        dispatch(addToCart(item, modifiers))
        setTimeout(() => dispatch(removeLastCartItem()), 1000)
      }
    }
  }
)(MenuItem);
