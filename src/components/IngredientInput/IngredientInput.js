import React from 'react';
import './IngredientInput.css';

export default function IngredientInput(props) {
  return (
    <div
      key={props.idx}
      className="IngredientInput"
      onChange={(e) => props.handleChange(e.target, props.idx)}
    >
      <p>Ingredient {props.idx + 1}</p>
      <label htmlFor={`ingredient${props.idx}`}>Ingredient Name</label>
      <input
        type="text"
        name={`ingredient_name${props.idx}`}
        id={`ingredient_name${props.idx}`}
        onChange={(e) => props.handleChange(e.target, props.idx)}
        defaultValue={props.data.ingredient_name}
        required maxLength={30}
      />
      <label htmlFor={`ingredient${props.idx}`}>Quantity</label>
      <input
        type="text"
        name={`ingredient_quantity${props.idx}`}
        id={`ingredient_quantity${props.idx}`}
        onChange={(e) => props.handleChange(e.target, props.idx)}
        defaultValue={props.data.quantity}
        required maxLength={5}
      />
      <label htmlFor={`ingredient${props.idx}`}>Measurement Unit</label>
      <input
        type="text"
        name={`measurement${props.idx}`}
        id={`measurement${props.idx}`}
        onChange={(e) => props.handleChange(e.target, props.idx)}
        defaultValue={props.data.measurement}
        maxLength={10}
      />
      {props.arrLength > 1 ? (
        <button type="button" onClick={(e) => props.onClick(e)}>
          Remove Ingredient
        </button>
      ) : null}
    </div>
  );
}

IngredientInput.defaultProps = {
  idx: 1,
  data: {
    name: '',
    quantity: '',
    measurement_name: '',
  },
};
