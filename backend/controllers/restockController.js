import Product from '../models/productModel.js';
import { RestockHistory } from '../models/restockHistoryModel.js';
import asyncHandler from '../middlewares/asyncHandler.js';

export const restockProduct = async (req, res) => {
  const { productId, quantity, vendorId } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Update 
    product.stock += Number(quantity);
    await product.save();

    // Log the restock history
    const history = new RestockHistory({ product: productId, vendor: vendorId, quantity });
    await history.save();

    res.status(200).json({ message: 'Product restocked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Restocking failed', error });
  }
};

// Get restock history by vendor
export const getRestockHistoryByVendor = async (req, res) => {
  const vendorId = req.params.vendorId;
  try {
    // Fetch restock history for the specified vendor
    const history = await RestockHistory.find({ vendor: vendorId })
      .populate('product', 'name image purchasePrice')  
      .populate('vendor', 'username'); 

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching history' });
  }
};

// Get all restock history
export const getAllRestockHistory = async (req, res) => {
  try {
    const history = await RestockHistory.find()
      .populate('product', 'name image purchasePrice')  
      .populate('vendor', 'username'); 

    console.log('Restock history:', JSON.stringify(history, null, 2)); 

    res.status(200).json(history);
  } catch (error) {
    console.error('Error fetching restock history:', error);
    res.status(500).json({ message: 'Error fetching all restock history' });
  }
};

export const updateRestock = asyncHandler(async (req, res) => {
  const { quantity } = req.body;
  const restock = await RestockHistory.findById(req.params.id); 

  if (!restock) {
    res.status(404);
    throw new Error('Restock entry not found');
  }

  const product = await Product.findById(restock.product);
  if (!product) {
    res.status(404);
    throw new Error('Associated product not found');
  }

  product.stock = product.stock - restock.quantity + quantity;
  restock.quantity = quantity;
  await product.save();
  await restock.save();

  res.json({ message: 'Restock entry updated', restock });
});


export const deleteRestock = async (req, res) => {
  const { id } = req.params;

  try {
    const restockHistory = await RestockHistory.findByIdAndDelete(id);

    if (!restockHistory) {
      return res.status(404).json({ message: 'Restock history not found' });
    }

    

    res.status(200).json({ message: 'Restock history deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting restock history' });
  }
};
