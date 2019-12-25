import React from 'react';

import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'

class BurgerBuilder extends React.Component{
    state = {
        ingredients: {
            salad: 0, 
            bacon: 0,
            cheese: 0,
            meat: 0
        }
    }

    addIngredientHandler =  (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;

    }
    removeIngredientHandler =  (type) =>{
        

    }

    render(){
        return(
            <div>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls/>
            </div>
        )
    }
}
export default BurgerBuilder;