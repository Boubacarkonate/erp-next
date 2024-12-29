'use client'
import { addTest } from "@/app/actions/product";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FormulaireTest() {
  const router = useRouter();
  const [status, setStatus] = useState("");

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
      <form onSubmit={handleSubmit} >
        <label htmlFor="name">Nom : </label>
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
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
          className="border border-neutral-950"
          required
        />
        <input
          type="number"
          name="userId"
          placeholder="utilisateur associé"
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
}
