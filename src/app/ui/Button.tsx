// components/Button.js

'use client'

import { useRouter } from "next/navigation";
import { deleteProduct } from "../actions/product";

const ButtonProps = ({ label, redirect }) => {
const router = useRouter();
const action = () ={

}
  return (
    <button
      onClick={deleteProduct(id)}
      className="btn"
    >
      {label}
    </button>
  );
};


export default ButtonProps;
