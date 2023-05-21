import CartCard from '../components/CartCard'
import TitleBar from '../components/TitleBar'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'



const CartPage = () => {

    const cartProducts = useSelector(state => state.cart)
    const allProducts = useSelector(state => state.products)

    const updateServerCart = async () => {

        const toSendProducts = cartProducts.map(
            (product) => {
                return { item: product.id, quantity: product.count }
            }
        )
        console.log(toSendProducts);

        const response = await fetch("/cart/addcart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                items: toSendProducts
            }),
        });

        const data = await response.json();

        console.log(data);
    }

    const extractedProducts = cartProducts.map(
        (cartProduct) => {
            return ({ ...(allProducts.find(product => cartProduct.id === product.id)), count: cartProduct.count })
        }
    )

    const total = extractedProducts.reduce((total, product) => {
        return total += ((product.amount) * (1 - (product.discount / 100)) * product.count)
    }, 0)

    useEffect(() => {
        return () => { updateServerCart() }
    }, [])

    return (
        <div id='card_page'>
            <TitleBar title="Your Cart" />
            <div className="container">

                <div className='cart-left'>
                    {/* <div className="list_heading_sorting">
                        <div className="product_name">My Shopping Bag(3 items)</div>
                        <div className="sort_box">
                            <div className="small_alert">Total price: 3000</div>
                        </div>
                    </div> */}

                    {
                        extractedProducts.length !== 0 ? (
                            <div className='cart_cards'>
                                {
                                    extractedProducts.map(
                                        (product) => {
                                            return (<CartCard key={product.id} product={product} />)
                                        }
                                    )
                                }
                            </div>
                        ) : (
                            <img src='/images/cart-empty.gif'></img>
                        )
                    }
                </div>

                <div className='cart-right'>
                    <div className='summ_item summary_title'>
                        Order Summary
                    </div>

                    <div className='summ_item'>
                        <div className='summ_row'>
                            <h4>Subtotal</h4>
                            <h4>{total}</h4>
                        </div>
                        <div className='summ_row'>
                            <h4>Shipping</h4>
                            <h4>Free</h4>
                        </div>
                    </div>

                    <div className='summ_item'>
                        <div className='summ_row'>
                            <h3>Total</h3>
                            <h4>{total}</h4>
                        </div>
                    </div>
                    <button className='general_button'>Place Order</button>
                </div>

            </div>
        </div>
    )
}

export default CartPage