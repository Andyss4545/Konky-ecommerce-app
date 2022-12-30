import axios from "axios"

// Restful fake api from https://fakestoreapi.com/products
class ProductServie {
    // get all products
      static ProductList() {
           let serverUrl = "https://fakestoreapi.com/products"
           return axios.get(serverUrl)
      }


      // get single Products
       static Product(ProductId) {
          // https://fakestoreapi.com/products/id
         let serverUrl = `https://fakestoreapi.com/products/${ProductId}`
         return axios.get(serverUrl)
     }
    
}


export default ProductServie
     
