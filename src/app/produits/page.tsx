import Link from "next/link";
import { getAllProducts } from "../actions/product";

const List_produits = async () => {
    const listProducts = await getAllProducts();
  return (
    <>
    <div>Liste des produits</div>
    
        {listProducts.map((products) => 
        <ul  key={products.id}>
        <li>ID du produit : {products.id}</li>
        <li>Nom du produit : {products.name}</li>
        <li>Description : {products.description}</li>
        <li>Prix : {products.price} €</li>
        <li>Stock : {products.stock}</li>
        <li>utilisateur associé : {products.userId}</li>
        <button>
            <Link href={`/produits/details/${products.id}`}> Voir le détails</Link>
        </button>
    </ul>
        )}
    </>
  )
}

export default List_produits