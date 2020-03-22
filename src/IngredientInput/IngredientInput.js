import React from 'react';
import './IngredientInput.css';

export default function IngredientInput(props) {
  return (
    <div key={props.idx} className='IngredientInput' onChange={(e) => props.handleChange(e.target, props.idx)}>
      <p>Ingredient {props.idx + 1}</p>
      <label htmlFor={`ingredient${props.idx}`}>Name</label>
      <input type='text' name={`ingredient_name${props.idx}`} id={`ingredient_name${props.idx}`} value={props.data.name}/>
      <label htmlFor={`ingredient${props.idx}`}>Quantity</label>
      <input type='text' name={`ingredient_quantity${props.idx}`} id={`ingredient_quantity${props.idx}`} value={props.data.quantity}/>
      <label htmlFor={`ingredient${props.idx}`}>Unit</label>
      <input type='text' name={`ingredient_unit${props.idx}`} id={`ingredient_unit${props.idx}`} value={props.data.unit} />
      {/* {!!props.idx && ( */}
        <button type="button"
          onClick={(e) => props.onClick(e)}
        >Remove Ingredient</button>
      {/* )} */}
    </div>
  )
}