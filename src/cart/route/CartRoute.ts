
import { Router } from 'express';
import MongoRepository from '../../lib/repository/MongoRepository.js';
import { ICart, CartModel } from '../model/Cart.js';
import CartProvider from '../di/CartProvider.js';
import CartRepository from '../repository/CartRepository.js';

const CartRoute = Router();




// get cart by usere id 
CartRoute.get('/:ownerId', async (req, res) => {
    try {
        const ownerId = req.params.ownerId; // Get owner ID from URL parameters
        const CartRepository = CartProvider.provideCartRepository();
        const cart = await CartRepository.getCart(req.params.ownerId);
        const cartDetails = cart?.items.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity,
          name: item.productId.name, 
          price: item.productId.price, // Assuming Product has a 'price' field
          description: item.productId.description,
          img: item.productId.img,
        }));
        console.log(cartDetails);
        res.json(cartDetails || {items:[]});
    } catch (error) {
        res.status(500).json({ message: error});
    }
});
CartRoute.post('/add', async (req, res) => {
    const {owner, productId}=req.body;
    try {
        const CartRepository = CartProvider.provideCartRepository();
        const cart = await CartRepository.addToCart(owner, productId);
        res.json(cart); 
       
        
    } catch (error) {
        res.status(400).json({ message: error });
    }
});

CartRoute.put('/update', async (req, res) => {
    const { owner, productId, quantity } = req.body;
    try {
        const CartRepository = CartProvider.provideCartRepository();

      await CartRepository.updateCartItem(owner, productId, quantity);
      res.sendStatus(204);
      // No Content
    } catch (error) {
      res.status(500).json({ message: error });
    }
  });
  
  // Remove Item from Cart
  CartRoute.delete('/remove', async (req, res) => {
    const { owner, productId } = req.body;
    try {
        const CartRepository = CartProvider.provideCartRepository();

      await CartRepository.removeCart(owner, productId);
      res.sendStatus(204); // No Content
    } catch (error) {
      res.status(500).json({ message: error});
    }
  }
   


);

// Export the router
export default CartRoute;