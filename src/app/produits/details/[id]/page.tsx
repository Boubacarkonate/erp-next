"use client"

import { deleteProduct, getOneProduct } from "@/app/actions/product";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type Props = {
  params: { id: string };
};

export default function ProductDetails({ params }: Props) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null); // État pour stocker le produit
  const [loading, setLoading] = useState(true); // État pour gérer le chargement
  const [status, setStatus] = useState(""); // État pour gérer les messages d'état

  const { id } = params;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await getOneProduct(parseInt(id, 10));
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Erreur lors de la récupération du produit :", error);
        setStatus("Impossible de récupérer le produit.");
      } finally {
        setLoading(false); // Fin du chargement
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    if (!product) return; // Assure que le produit est chargé

    try {
      const result = await deleteProduct(product.id);

      if (result) {
        setStatus("Produit supprimé avec succès, vous allez être redirigé !");
        setTimeout(() => {
          router.push("/produits"); // Redirige vers la liste des produits
        }, 2000); // Délai optionnel pour affichage du message
      }
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setStatus("Une erreur est survenue lors de la suppression.");
    }
  };

  if (loading) {
    return <p>Chargement...</p>; // Affiche un message pendant le chargement
  }

  if (!product) {
    return <p>Produit introuvable.</p>; // Affiche un message si le produit n'existe pas
  }

  return (
    <>
      <h1>Détails du produit</h1>
      <p>Id : {product.id}</p>
      <p>Nom : {product.name}</p>
      <p>Description : {product.description}</p>
      <p>Prix : {product.price} €</p>

      <div className="flex m-2">
        <button className="m-1">
          <Link href={`/produits/details/${product.id}/formulaire`}>Modifier</Link>
        </button>
        <button onClick={handleDelete} className="m-1 bg-red-500 text-white px-4 py-2 rounded">
          Supprimer
        </button>
      </div>

      {status && <p>{status}</p>}
    </>
  );
}
