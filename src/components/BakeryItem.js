import './BakeryItem.css';
export default function BakeryItem(props){
    return(
        <div className="item">
        <img className="images" src={props.image} alt={props.name}/>
        <h2>{props.name}</h2>
        <p>{props.desc}</p>
        <p>{props.price}</p>
        <button onClick={() => {
            props.addToCart(props.name, props.price, props.id)
        }}>Add to Cart</button>
        <button onClick={() => {
            props.remove(props.id, props.price)
        }}>Remove From Cart</button>
        </div>
    )
}
