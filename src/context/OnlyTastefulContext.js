import React from 'react'

export default React.createContext({
  recipes: [],
  users: [],
  currentUser: null,
  signIn: () => {},
  signOut: () => {},
  createRecipe: () => {},
})
