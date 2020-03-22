import React from 'react';
import './IngredientInput.css';

export default function IngredientInput(props) {
  return (
    <div key={props.idx} className='IngredientInput' onChange={(e) => props.handleChange(e.target, props.idx)}>
      <p>Ingredient {props.idx + 1}</p>
      <label htmlFor={`ingredient${props.idx}`}>Name</label>
      <input type='text' name={`ingredient_name${props.idx}`} id={`ingredient_name${props.idx}`} />
      <label htmlFor={`ingredient${props.idx}`}>Unit</label>
      <input type='text' name={`ingredient_unit${props.idx}`} id={`ingredient_unit${props.idx}`} />
      <label htmlFor={`ingredient${props.idx}`}>Quantity</label>
      <input type='text' name={`ingredient_quantity${props.idx}`} id={`ingredient_quantity${props.idx}`} />
      {!!props.idx && (
        <button type="button"
          onClick={(e) => props.onClick(e)}
        >Remove Ingredient</button>
      )}
    </div>
  )
}

// onChange={e => props.handleChange(e.target)} 
// on each input doesn't separate values into their keys correctly