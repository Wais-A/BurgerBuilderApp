import * as actionTypes from './actionsTypes';
import axios from '../../axios-orders';
export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};



export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientFailed = () => {
    return {
            type: actionTypes.FETCH_INGREDIENT_FAILED
    }
};

export const initIngredients = () => {

    return dispatch => {
        axios.get( 'https://burgerbuilder-7586f.firebaseio.com/ingredients.json' )
            .then( response =>
            {
             dispatch(setIngredients(response.data))
            } )
            .catch( error =>
            {
                dispatch(fetchIngredientFailed())
            } );
    }
};