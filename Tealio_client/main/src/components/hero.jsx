import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from "react-feather";
import api from '../API/cart.api';
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import { useNavigate} from 'react-router-dom';
import { useCart } from './CartContext';

const Hero = () => {

    const navigate = useNavigate();

    // Slider images
    const slides = [img1, img2, img3];
    const [current, setCurrent] = useState(0);
    const prev = () => setCurrent((current) => (current === 0 ? slides.length - 1 : current - 1));
    const next = () => setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));

    // Product details and state
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(999);
    const [size, setSize] = useState();
    const [activeButton, setActiveButton] = useState(0);
    const [productid, setProductid] = useState();
    const [variety_id, setVarietyId] = useState();
    const [product_name, setProductName] = useState('Tealio Tea');

    // Cart context functions
    const { toggleCart, addToCart } = useCart();
    

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
                console.log(response.data);

                // Initialize state with details of first product variety
                if (response.data.length > 0) {
                    const firstProduct = response.data[0]; // Assuming first product
                    const firstVariety = firstProduct.product_details.find(detail => detail.variety_id === 1); // Assuming variety_id 1 exists
                    if (firstVariety) {
                        setQuantity(1); // Initial quantity
                        setPrice(firstVariety.price); // Initial price
                        setSize(firstVariety.size_name); // Initial size
                        setProductid(firstProduct.product_id); // Initial productid
                        setVarietyId(firstVariety.variety_id); // Initial variety_id
                        setProductName(firstProduct.product_name); // Initial product_name
                    }
                }
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();
    }, []); // empty dependency array ensures useEffect runs only once
  
    // Function to handle changing price, size, and variety_id
    const changePriceAndSize = (id, variety_id, price, size, index, product_name) => {
        setActiveButton(index);
        setPrice(price);
        setSize(size);
        setProductid(id);
        setVarietyId(variety_id);
        setProductName(product_name);
        console.log(variety_id);
    };

    // Generate orderno on component mount
    const [orderno, setOrderno] = useState(null);

    useEffect(() => {
      let storedOrderno = sessionStorage.getItem('orderno');
      if (!storedOrderno) {
        storedOrderno = Date.now().toString();
        sessionStorage.setItem('orderno', storedOrderno);
      }
      setOrderno(storedOrderno);
    }, []); // empty dependency array ensures useEffect runs only once
  
    // Function to handle adding item to cart
    const handleAddToCart = () => {
        const item = {
            orderno: orderno,
            product_name,
            productid,
            variety_id,
            size,
            quantity,
            price,
        };
        addToCart(item);
        toggleCart();
    };

    // Function to handle Buy Now button click
    const handleBuyNow = () => {
        const totalCartPrice = price * quantity;

        // Prepare cart items in the correct format
        const cartItems = [{
          orderno,
          productdetails: [{
            product_name,
            productid,
            variety_id,
            size,
            quantity,
            price
          }]
        }];
        
        console.log(totalCartPrice, cartItems,orderno);
        
        // Assuming `navigate` function is from a routing library (e.g., React Router)
        navigate('/form', { state: { totalCartPrice, cartItems,orderno } });
        
    }

    return (
        <div className={`flex flex-col md:flex-row p-10 bg-bgcolor text-txtgreen`}>
            <div className='p-10 md:px-40 '>
                <div className="max-w-[520px] max-h-[550px] min-w-[250px] flex justify-center bg-white shadow rounded-xl ">
                    <div className="overflow-hidden relative max-w-full max-h-full rounded-xl">
                        <div className="flex transition-transform ease-out duration-500 max-w-full max-h-full"
                            style={{ transform: `translateX(-${current * 100}%)` }}>
                            {slides.map((s, index) => (
                                <img src={s} alt={`Slide ${index + 1}`} className="object-cover object-center" key={index} />
                            ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-between p-3">
                            <button onClick={prev} className="p-1 rounded-full shadow bg-white/30 text-txtgreen hover:bg-white">
                                <ChevronLeft size={30} />
                            </button>
                            <button onClick={next} className="p-1 rounded-full shadow bg-white/30 text-txtgreen hover:bg-white">
                                <ChevronRight size={30} />
                            </button>
                        </div>

                        <div className="absolute bottom-4 right-0 left-0">
                            <div className="flex items-center justify-center gap-2">
                                {slides.map((_, i) => (
                                    <div key={i} className={`
                                        transition-all w-3 h-3 bg-white rounded-full
                                        ${current === i ? "p-2" : "bg-opacity-50"}
                                    `} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="md:w-1/2 p-10">
                {products.map((product) => (
                    <div key={product.product_id}>
                        <h1 className="font-serif text-6xl font-bold mb-4" >{product.product_name}</h1>
                        <div>
                            <p className="font-quicksand text-lg font-medium tracking-normal text-justify py-4">
                                {product.product_description}
                            </p>
                        </div>
                        <div className="mb-4 pt-4">
                            <div className="font-quicksand text-lg font-medium flex flex-col mb-2">Size</div>
                            <div className="flex w-full">
                                {product.product_details.map((detail, index) => {
                                // Determine the display text based on the size value
                                let displaySize = detail.size_name === 1000 ? `${detail.size_name / 1000}kg` : `${detail.size_name}g`;

                                return (
                                        <button
                                        key={detail.variety_id}
                                        onClick={() => { changePriceAndSize(product.product_id, detail.variety_id, detail.price, detail.size_name, index, product.product_name) }}
                                        className={`flex-1 font-quicksand text-base font-medium border border-bdgreen px-2 py-2 mx-2 rounded
                                        ${activeButton === index ? 'bg-btgreen text-bgcolor' : 'text-txtgreen hover:bg-hvgreen'}`}
                                        >
                                        {displaySize}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <div className="font-quicksand text-base font-medium">Price</div>
                            <div className="font-quicksand text-lg font-semibold">₹{price}
                                <span className="font-quicksand font-medium text-xs ml-2">(Tax Included)</span>
                            </div>
                        </div>
                        <div className="mt-4">
                            <div className="font-quicksand text-base font-medium flex flex-col mb-2">Quantity</div>
                            <div className="flex items-center">
                                <button onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)} className="border rounded-lg px-4 py-2 bg-btgreen text-bgcolor">-</button>
                                <span className="font-quicksand text-base font-medium px-4">{quantity}</span>
                                <button onClick={() => setQuantity(prev => prev + 1)} className="border rounded-lg px-4 py-2 bg-btgreen text-bgcolor">+</button>
                            </div>
                        </div>
                        <div className="flex w-full mt-4">
                            <button onClick={handleBuyNow} className="flex-1 bg-btgreen text-bgcolor hover:bg-hvdarkgreen w-full p-4 rounded">Buy Now</button>
                            <button onClick={handleAddToCart} className="flex-1 border border-bdgreen text-txtgreen hover:bg-hvgreen p-4 rounded ml-2">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
