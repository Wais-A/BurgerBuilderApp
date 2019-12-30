import React from 'react';
import axios from '../../axios.orders'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner.js'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'




const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}
class BurgerBuilder extends React.Component{
    state = {
        ingredients:  null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false

    }


    componentDidMount(){
        axios.get('https://burgerbuilder-7586f.firebaseio.com/ingredients.json').then(res => {
            this.setState({ingredients: res.data})
        })
    }

    updatePurchaseState (ingredients) {
        
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el)=>{
            return sum + el;
        }, 0)
        this.setState({purchasable: sum > 0})
    }

    addIngredientHandler =  (type) =>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }
    removeIngredientHandler =  (type) =>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction
        this.setState({ totalPrice: newPrice, ingredients: updatedIngredients })
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
       // alert('You Continue!');
       this.setState({loading: true});
       const order = {
           ingredients: this.state.ingredients,
           price: this.state.totalPrice,
           customer: {
               name: 'Wais',
               address: {
                   street: 'test street',
                   zipCode: '12345',
                   country: 'USA'
               },
               email: 'test@test.com',
           },
           deliveryMethod: 'fastest'
       }
        axios.post('/orders.json', order)
        .then(res => {
            this.setState( { loading: false, purchasing: false})


        }).catch(err => {
            this.setState( { loading: false, purchasing: false } )
        });

    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0
        }

        let orderSummary = null;

      
       
        let burger = <Spinner/>
        if(this.state.ingredients){
             burger = (
                <div className="Aux">
                    <Burger ingredients={ this.state.ingredients } />
                    <BuildControls
                        ingredientAdded={ this.addIngredientHandler }
                        ingredientRemoved={ this.removeIngredientHandler }
                        disabled={ disabledInfo }
                        price={ this.state.totalPrice }
                        purchasable={ this.state.purchasable }
                        ordered={ this.purchaseHandler }
                    />
                </div>)
            orderSummary = <OrderSummary
                ingredients={ this.state.ingredients }
                purchaseCancelled={ this.purchaseCancelHandler }
                purchaseContinued={ this.purchaseContinueHandler }
                price={ this.state.totalPrice }
            />
            if ( this.state.loading )
            {

                orderSummary = <Spinner />;
            }
        }
        


        return(
            <div className='Aux'>
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler} >
                {orderSummary}
            </Modal>
                {burger}
            </div>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios);