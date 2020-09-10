import React, { Component } from 'react';
import { BudgetConsumer } from '../../utils/BudgetContext';

class BudgetInput extends Component {
  state = {
    budget: '',
  };

  handleInput = (e) => {
    this.setState({ budget: e.target.value });
  };

  handleSubmit = (dispatch, e) => {
    e.preventDefault();
    dispatch({
      type: 'budget+',
      budget: this.state.budget,
    });
  };

  render() {
    return (
      <BudgetConsumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className='card card-body mb-3'>
              <label>Budget</label>
              <form className='form-inline'>
                <input
                  onChange={this.handleInput}
                  value={this.state.budget}
                  className='form-control mr-2'
                  type='number'
                />
                <button
                  onClick={this.handleSubmit.bind(this, dispatch)}
                  className='btn btn-dark btn-block'
                >
                  submit
                </button>
              </form>
            </div>
          );
        }}
      </BudgetConsumer>
      // <div className="card card-body mb-3">
      //     <label>Budget</label>
      //     <form className="form-inline">
      //         <input className="form-control mr-2" type="number" />
      //         <button className="btn btn-dark btn-block">submit</button>

      //     </form>
      // </div>
    );
  }
}
export default BudgetInput;
