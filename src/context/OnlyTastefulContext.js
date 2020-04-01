import React from 'react'

export default React.createContext({
  recipes: [],
  currentUser: null,
  signIn: () => {},
  signOut: () => {},
  createRecipe: () => {},
  addRecipe: () => {},
})
