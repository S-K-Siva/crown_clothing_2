export const getProducts = (state) => state.product.products;

// for redux-thunk, lets initialize the getError to know the error

export const getProductsError = (state) => state.product.error;