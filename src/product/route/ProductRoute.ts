// // routes/resourceRoutes.ts
// import { Router } from 'express';
// import MongoRepository from '../../lib/repository/MongoRepository.js'; // Adjust the import path as necessary
// import { IProduct, ProductModel } from '../model/Product.js'; // Adjust based on your resource model
// import ProductProvider from '../di/ProductProvider.js';
// const ProductRoute = Router();

// // Create a new product
// ProductRoute.post('/pro', async (req, res) => {
//     try {
//         const productData: IProduct = req.body;
//         const ProductRepository = ProductProvider.provideProductRepository();
//         await ProductRepository.createData(productData);
//         res.status(201).json({ message: 'Product created successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error});
//     }
// });

// // Read a product by ID
// ProductRoute.get('/see', async (req: any, res: any) => {
//     try {
//         const productId = req.body.id;
//         console.log(productId);
//         const ProductRepository = ProductProvider.provideProductRepository();
//         const product = await ProductRepository.readData(productId);
//         console.log(product);
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.json(product);
//     } catch (error) {
//         res.status(500).json({ message: error});
//     }
// });

// // Update a product by ID
// ProductRoute.put('/:id', async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const updatedProductData: IProduct = req.body;
//         console.log(updatedProductData);
//         const ProductRepository = ProductProvider.provideProductRepository();
//         await ProductRepository.updateData(productId, updatedProductData);
//         res.json({ message: `Product updated successfully ${productId}` , });
//     } catch (error) {
//         res.status(500).json({ message: error});
//     }
// });

// // Delete a product by ID
// ProductRoute.delete('/:id', async (req, res) => {
//     try {
//         const productId = req.params.id;
//         const ProductRepository = ProductProvider.provideProductRepository();
//         await ProductRepository.deleteData(productId);
//         res.json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error});
//     }
// });

// // Export the router
// export default ProductRoute;
import { Router } from 'express';
import MongoRepository from '../../lib/repository/MongoRepository.js';
import { IProduct, ProductModel } from '../model/Product.js';
import ProductProvider from '../di/ProductProvider.js';
import { Request, Response } from 'express';
import { title } from 'process';
const ProductRoute = Router();

// Create a new product
ProductRoute.post('/pro',  async (req: Request, res: Response) => {
    try {
        const productData: IProduct = req.body;
        const ProductRepository = ProductProvider.provideProductRepository();
        await ProductRepository.createData(productData);
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
        console.log(res.json);
    }
});

// Read a product by ID
ProductRoute.get('/see/:id',  async (req: Request, res: Response) => {
    try {
        const productId = req.params.id;
        const ProductRepository = ProductProvider.provideProductRepository();
        const product = await ProductRepository.readData(productId);
      
       
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error});
    }
});


// CartRoute.get('/:ownerId', async (req, res) => {
//     try {
      
//         const cartDetails = cart?.items.map(item => ({
//           productId: item.productId._id,
//           quantity: item.quantity,
//           name: item.productId.name, 
//           price: item.productId.price, // Assuming Product has a 'price' field
//           description: item.productId.description,
//           img: item.productId.img,
//         }));
//         console.log(cartDetails);
//         res.json(cartDetails || {items:[]});
//     } catch (error) {
//         res.status(500).json({ message: error});
//     }
// });
ProductRoute.get('/allProducts', async (req, res) => {
    try {
        const ProductRepository = ProductProvider.provideProductRepository();

        const products = await ProductRepository.getAllProducts();
        const cartDetails = products.map(item => ({
            productId: item._id,
            name: item.name, 
            price: item.price,  
            
            description: item.description,
           img: item.img,
           owner:item.owner,
         }));
         console.log(cartDetails);
        res.json(cartDetails || {items:[]});
res.json(products);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

ProductRoute.get('/ownerProducts/:ownerId', async (req, res) => {
    try {
        const ownerId = req.params.ownerId; // Get owner ID from URL parameters
        const ProductRepository = ProductProvider.provideProductRepository();
        const products = await ProductRepository.readDataByOwner(ownerId);
        // if (!Array.isArray(products)) {
        //     return res.status(400).json({ message: "Expected an array of products" });
        // }
        const cartDetails = products.map(item => ({
                       productId: item._id,
                       title: item.name, 
                       price: item.price,  
                       category:item.category,
                       description: item.description,
                      img: item.img,
                    }));
                    console.log(cartDetails);
                   res.json(cartDetails || {items:[]});
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});


ProductRoute.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category; // Get category from URL parameters
        
        const ProductRepository = ProductProvider.provideProductRepository();
        const products = await ProductRepository.readDataByCategory(category);
        // if (!Array.isArray(products)) {
        //     return res.status(400).json({ message: "Expected an array of products" });
        // }

        // Optionally, you can map the products to ensure they have the right structure
        const formattedProducts = products.map(product => ({
            productId: product.id,          // Adjust these keys based on your data structure
            name: product.name,
            price: product.price,
            description: product.description,
            category: product.category
        }));
       console.log(formattedProducts);
        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ message: error});
    }
});
// ProductRoute.get('/category/:category', async (req, res) => {
//     try {
//         const category = req.params.category; // Get category from URL parameters
        
//         const ProductRepository = ProductProvider.provideProductRepository();
//         const products = await ProductRepository.readDataByCategory(category);
        
//         // Ensure products is in the correct format
//         if (!Array.isArray(products)) {
//             return res.status(400).json({ message: "Expected an array of products" });
//         }

//         // Optionally, you can map the products to ensure they have the right structure
//         const formattedProducts = products.map(product => ({
//             productId: product.id,          // Adjust these keys based on your data structure
//             name: product.name,
//             price: product.price,
//             description: product.description,
//             category: product.category
//         }));

//         res.json(formattedProducts); // Send formatted products as JSON
//     } catch (error) {
//         console.error('Error fetching products:', error); // Log error details for debugging
//         res.status(500).json({ message: error.message || "Internal Server Error" });
//     }
// });

// Update a product by ID
ProductRoute.put('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProductData= req.body; // Use Partial to allow partial updates
        const ProductRepository = ProductProvider.provideProductRepository();
        const updatedProduct = await ProductRepository.updateData(productId, updatedProductData);
        res.json({ message: `Product updated successfully`, product: updatedProduct });
        
    } catch (error) {
        res.status(500).json({ message: error});
    }
});

// Delete a product by ID
ProductRoute.delete('/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const ProductRepository = ProductProvider.provideProductRepository();
        await ProductRepository.deleteData(productId);
        // res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

// Export the router
export default ProductRoute;