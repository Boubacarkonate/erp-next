// // app/formulaire/page.tsx
// import { addTest, getOneProduct } from "@/app/actions/product";

// type Props = {
//     params: { id: string };
//   };

// export default async function Formulaire({ params }: Props) {

//     const { id } = params;
  
//     const un_product = await getOneProduct(parseInt(id, 10));


//   return (
//     <>
//       <form action={addTest} >
//         <label htmlFor="name">Nom : </label>
//         <input
//           type="text"
//           name="name"
//           placeholder="Nom du produit"
//           className="border border-neutral-950"
//           required
//         />
//         <br />
//         <br />
//         <label htmlFor="description">Description : </label>
//         <input
//           type="text"
//           name="description"
//           placeholder="Description du produit"
//           className="border border-neutral-950"
//           required
//         />
//         <br />
//         <br />
//         <label htmlFor="price">Prix : </label>
//         <input
//           type="number"
//           name="price"
//           placeholder="Prix du produit"
//           className="border border-neutral-950"
//           step="0.01"
//           required
//         />
//         <br />
//         <br />
//         <label htmlFor="stock">Stock : </label>
//         <input
//           type="number"
//           name="stock"
//           placeholder="Stock disponible"
//           className="border border-neutral-950"
//           required
//         />
//          <br />
//          <br />
//          <label htmlFor="stock">Utilisateur associé : </label>
//         <input
//           type="number"
//           name="userId"
//           placeholder="utilisateur associé"
//           className="border border-neutral-950"
//           required
//         />
//         <br />
//         <br />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//           Envoyer
//         </button>
//       </form>
//     </>
//   );
// }

// app/formulaire/page.tsx
import { addTest, getOneProduct } from "@/app/actions/product";

type Props = {
  params: { id?: string }; // `id` est optionnel pour la création
};

export default async function Formulaire({ params }: Props) {
  const { id } = params || {};

  // Préremplir les champs si un produit existe
  const un_product = id ? await getOneProduct(parseInt(id, 10)) : null;

  return (
    <>
      <form action={addTest}>
        {/* Champ ID caché, uniquement utilisé pour l'édition */}
        {id && (
          <input type="hidden" name="id" value={un_product?.id} />
        )}
        <label htmlFor="name">Nom : </label>
        <input
          type="text"
          name="name"
          placeholder="Nom du produit"
          defaultValue={un_product?.name || ""}
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
          defaultValue={un_product?.description || ""}
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
          defaultValue={un_product?.price || ""}
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
          defaultValue={un_product?.stock || ""}
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
          defaultValue={un_product?.userId || ""}
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
