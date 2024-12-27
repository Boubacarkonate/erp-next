import { getOneProduct } from "@/app/actions/product";
import Link from "next/link";

type Props = {
    params: { id: string };
  };
  
  export default async function ProductDetails({ params }: Props) {

    const { id } = params;

    const un_product = await getOneProduct(parseInt(id, 10));

    return(
<>
<p>id : {un_product.id}</p>
<p>nom : {un_product.name}</p>
<p>description : {un_product.description}</p>
<p>prix : {un_product.price} €</p>
<div className="flex m-2">
<button className="m-1">
<Link href={`/produits/details/${params.id}/formulaire`}>modifier</Link>
</button>
<button>
    supprimer
</button>
</div> 
</>
    );
  }