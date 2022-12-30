export const initialState = {
       
            user : null,
            basket: [ 
                     //   {
                     //         id : "gwD3K8",
                     //         name: "GG Logo Net Black Slide",
                     //         price : 16,
                     //         description: "Upgrade to a new phone by buying the Samsung Galaxy A04 that is available at the best prices Now. Launched on November 23, 2022 (Unofficial) in India, the mobile is available with striking features and adequate specifications",
                     //         rating: 5,
                     //         image : "https://www.ajebomarket.com/media/catalog/product/cache/61376d537388a894e3b8d4825ffa2133/1/_/1_5__4.jpg",
                     //   }
           
       ]
       
} 

// reduce function to add the amount of each product together
export const getBasketTotal = (basket) =>  
basket?.reduce((amount, item) => item?.price * item?.quantity  + amount, 0)

 

const reducer = (state, action) => { 
       switch(action.type){
              case 'ADD_TO_BASKET':
                     // logic for adding item to basket
                               // Check if the item has already been added to the basket
                                const tempBasket = state.basket.filter((item) => action.basket.id === item.id)

                                if(tempBasket.length > 0) {
                                 // if the tempBasket length is greater than zero then return to the default state
                                    return state
                                } else {
                                    // but if the tempBasket length is 0 then add item to basket
                                     return {
                                       ...state,
                                       basket : [...state.basket, action.basket]
                                     }
                                }

                           
                case 'INCREASE_QUANTITY': 
                  // first find if the product exist
                  const item = state.basket?.find((product) => product.id === action.basket.id)

                  if(item) {
                       return {
                          
                          ...state, // the initial state
                          // map through all the product
                          basket: state.basket.map((item) => item.id === action.basket.id 
                          ? {
                              ...item, // the inital item
                              quantity: item.quantity + 1 // add 1 for every item quantity increase
                          } 
                             : item // But if the item is not there, we return the item the way it is
                          )
                       }
                  }

                  return {
                     ...state,
                     basket : [...item, action.basket]
                   }

                  case 'DECREASE_QUANTITY': 
                   
                 // find all the products in the basket
                  const itemDecr = state.basket?.find((product) => product.id === action.basket.id)

                  if(itemDecr) { 
                       return {
                          
                          ...state, // the initial state
                          // map through all the product
                          basket: state.basket.map((item) => item.id === action.basket.id 
                          ? {
                              ...item, // the inital item
                              quantity: item.quantity === 1  ? 1 : item.quantity - 1  // add 1 for every item quantity increase
                          } 
                             : item // But if the item is not there, we return the item the way it is
                          )
                       }
                  }

                  return {
                     ...state,
                     basket : [...state.basket, action.basket]
                   }
                 
                case 'REMOVE_FROM_BASKET':
                     
                // logict for removing from basket

                // let newBasket be the old basket
                let newBasket = [...state.basket]

                // lets check if the if the product exists
                // go and check all the products if basketItem id exist and equals to the action id being dispatch
                let index = state.basket.findIndex((basketItem) => basketItem.id === action.id)
                            

                if(index >= 0) {
                     // if item exists in the basket remove it
                     newBasket.splice(index, 1)
                     // splice means to cut the items by 1
                } else {
                     // red console log to warn if id not in the basket
                     console.warn(
                            `Can't remove (id: ${action.id}) as its not in basket`
                            )
                }


                return{
                     ...state,
                     basket: newBasket
                }


                case "USER":

                   return {
                       ...state,
                       user: action.user
                   }

                 default:
                     return state

       
       }

       
           
}



export default reducer



