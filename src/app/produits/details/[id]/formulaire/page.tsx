'use client';

import { addTest, getOneProduct } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PropsData = {
  id?: number;
  name: string;
  description: string;
  price: string; // Utilisé comme string pour liaison avec inputs
  stock: string;
  userId: string;

}

type Props = {
  params: { id?: string }; // `id` est optionnel pour la création
};

const Formulaire = ({ params }: Props) => {
    const router = useRouter();
  
  const [status, setStatus] = useState("");

  const { id } = params || {};

  const [data, setData] = useState<PropsData>({
    name: '',
    description: '',
    price: '',
    stock: '',
    userId: '',
  });

  const [loading, setLoading] = useState(true); // Gestion du chargement des données

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const un_product = await getOneProduct(parseInt(id, 10));
        setData({
          name: un_product?.name || '',
          description: un_product?.description || '',
          price: un_product?.price.toString() || '',
          stock: un_product?.stock.toString() || '',
          userId: un_product?.userId.toString() || '',
        });
      }
      setLoading(false); // Fin du chargement
    };

    fetchData();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (loading) {
    return <p>Chargement...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    const formData = new FormData(e.target); // Récupère les données du formulaire

    try {
      const result = await addTest(formData); // Appelle l'action serveur

      if (result.success) {
        setStatus("Produit enregistré avec succès, vous être rediriger vers la page des produits !");
        setTimeout(() => {
          router.push("/produits"); // Redirige vers la liste des produits après succès
        }, 2000); // Délai optionnel
      }
    } catch (error) {
      console.error("Erreur :", error);
      setStatus("Une erreur est survenue lors de l'enregistrement.");
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* Champ ID caché, uniquement utilisé pour l'édition */}
        {id && <input type="hidden" name="id" value={id} />}

        <label htmlFor="name">Nom : </label>
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          value={data.name}
          onChange={handleChange}
          className="border border-neutral-950"
          required
        />
        <br />
        <br />

        <label htmlFor="description">Description : </label>
        <input
          type="text"
          name="description"
          placeholder="Description du produit"
          value={data.description}
          onChange={handleChange}
          className="border border-neutral-950"
          required
        />
        <br />
        <br />

        <label htmlFor="price">Prix : </label>
        <input
          type="number"
          name="price"
          placeholder="Prix du produit"
          value={data.price}
          onChange={handleChange}
          className="border border-neutral-950"
          step="0.01"
          required
        />
        <br />
        <br />

        <label htmlFor="stock">Stock : </label>
        <input
          type="number"
          name="stock"
          placeholder="Stock disponible"
          value={data.stock}
          onChange={handleChange}
          className="border border-neutral-950"
          required
        />
        <br />
        <br />

        <label htmlFor="userId">Utilisateur associé : </label>
        <input
          type="number"
          name="userId"
          placeholder="Utilisateur associé"
          value={data.userId}
          onChange={handleChange}
          className="border border-neutral-950"
          required
        />
        <br />
        <br />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Envoyer
        </button>
      </form>
      {status && <p>{status}</p>}
    </>
  );
};

export default Formulaire;
