// app/formulaire/page.tsx
import { addTest } from "@/app/actions/product";

export default function FormulaireTest() {
  return (
    <>
      <form action={addTest} >
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
    </>
  );
}
