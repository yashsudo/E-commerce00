const express = require("express");
const route = express.Router();

//importing product schema
const Cart = require("../../Database/Schemas/cart");


//routes
route.post("/addcart", async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.userId });

    if (userCart) { //cart already exists

      //updating the existing cart
      userCart.items = req.body.items.map(({ item, quantity }) => ({ item, quantity }))

      await userCart.save()

      res.status(200).json({ message: "Cart is updated", success: true, cart: userCart, })

    } else { //new cart will be created

      //adding data to the cart
      const newCart = await Cart.create({
        userId: req.userId,
        items: req.body.items.map(({ item, quantity }) => ({ item, quantity })),
      })

      res.status(200).json({ message: "Products Added to the Cart", success: true, cart: newCart, });

    }
  } catch (err) {

    console.log("Error generated while adding cart" + err);
    res.status(404).json({ message: "Error while adding cart", success: false });

  }
});

route.get('/getcart', async (req, res) => {

  try {

    console.log(req.userId);
    const userCart = await Cart.findOne({ userId: req.userId })

    if (userCart) {
      await userCart.populate('items.item')
      res.status(200).json({ message: "Successfully received cart", success: true, cart: userCart })
      console.log(userCart);

      return
    }

    res.status(200).json({ message: "Your Cart is Empty!", success: true, empty: true })

  } catch (err) {

    console.log("Error generated while getting cart")
    res.status(500).json({ message: "Error while getting cart or else cart is empty!", success: false })

  }

})

module.exports = route;