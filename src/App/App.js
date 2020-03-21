import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Landing from '../Landing/Landing';
import Footer from '../Footer/Footer';
import RecipeList from '../RecipeList/RecipeList';
import RecipeDetail from '../RecipeDetail/RecipeDetail';
import CreateRecipe from '../CreateRecipe/CreateRecipe';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import OnlyTastefulContext from '../OnlyTastefulContext';
import { Recipes, Users } from '../dummy-store';
import './App.css';

// TODO: Add create recipe functionality, convert to class component for state
// TODO: Add form validation for signin
// TODO: Add form validation for signup
// TODO: Add form validation for create recipe

/* ---- NOTES ----
  * When user signed in replace signin/signup links with create recipe link and signout
  * When user signed in show buttons for delete and modify on their own recipes
*/

class App extends Component {
  state = {
    recipes: [],
    users: [],
    currentUser: false,
  }

  componentDidMount() {
    this.setState({
      recipes: Recipes,
      users: Users,
    })
  }

  handleSignIn = () => {
    this.setState({
      currentUser: true,
    })
  }

  handleSignOut = () => {
    this.setState({
      currentUser: false,
    })
  }

  handleCreateRecipe = (newRecipe) => {
    console.log('created recipe', newRecipe);
  }

  render() {
    const value = {
      recipes: this.state.recipes,
      users: this.state.users,
      currentUser: this.state.currentUser,
      signIn: this.handleSignIn,
      signOut: this.handleSignOut,
      createRecipe: this.handleCreateRecipe,
    }
    return (
      <OnlyTastefulContext.Provider value={value}>
        <div className="App">
          <Nav />
          <Route exact path='/' component={Landing} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signin' component={SignIn} onSignIn={this.onSignIn}/>
          <Route exact path='/recipes' component={RecipeList} />
          <Route path='/recipes/:recipeId' component={RecipeDetail} />
          <Route path='/createrecipe' component={CreateRecipe} />
          <Footer />
        </div>
      </OnlyTastefulContext.Provider>
    )
  };
}

export default App;
