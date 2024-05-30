const userModel = require("../models/userModel");

//add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1
        } else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartData })
        res.json({ success: true, message: "Added To Cart" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}


//reomve items from user cart
const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Fetch user data
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData;

        // Ensure cartData is an object (or array if that is the structure)
        if (!cartData || typeof cartData !== 'object') {
            return res.json({ success: false, message: "Invalid cart data" });
        }

        // Check if the item exists in the cart
        if (cartData[itemId] && cartData[itemId] > 0) {
            // Decrement the item quantity
            cartData[itemId] -= 1;

            // If the item quantity becomes 0, remove the item from the cart
            if (cartData[itemId] === 0) {
                delete cartData[itemId];
            }
        } else {
            return res.json({ success: false, message: "Item not found in cart or already zero quantity" });
        }

        // Update the user's cart data in the database
        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Removed from cart" });
    } catch (error) {
        console.log("Error removing item from cart:", error);
        res.json({ success: false, message: "Internal server error" });
    }
};


//ferch user cart data
const getCart = async (req, res) => {
    try {
        let userData= await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true, cartData})
    
    } catch (error) {
        res.json({ success: false, message: "error" })
    }
}

module.exports = { addToCart, removeFromCart, getCart }