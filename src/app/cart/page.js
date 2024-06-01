"use client";

import Image from "next/image";
import { listAllProducts } from "../lib/query";
import { price } from "../lib/format";
import { useEffect } from "react";

export default () => {
  let prods = listAllProducts();

  return (
    <section className="flex gap-16 p-8 pr-12">
      <CartItems prods={prods} />
      <Summary total={prods.reduce((a, b) => a + b.price, 0)} />
    </section>
  );
};

function CartItems({ prods }) {
  useEffect(() => {
    if (window.localStorage.getItem("cart") === null) {
      window.localStorage.setItem("cart", JSON.stringify([]));
    }
  }, []);

  return (
    <article className="flex-[3]">
      <h1 className="text-2xl font-semibold mb-8">Carrinho</h1>
      <table className="table-auto w-full text-left">
        <thead>
          <tr className="text-base border-b border-b-stone-300">
            <th className="h-10">Produto</th>
            <th>Quantidade</th>
            <th>Preço</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {prods.map((prod) => (
            <tr className="max-h-10 border-b border-b-stone-300 hover:bg-slate-100 transition-colors duration-300">
              <td className="flex gap-4 py-3 items-center ">
                <Image
                  src={prod.img}
                  alt={prod.name}
                  width={150}
                  height={100}
                  className="rounded-lg shadow-sm"
                />
                <div>
                  <h3>{prod.name}</h3>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <button className="text-stone-600 hover:text-stone-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <span>{prod.quantity}</span>
                </div>
              </td>
              <td>{price(prod.price)}</td>
              <td>{price(prod.price * prod.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}

function Summary({ total }) {
  const shipping = 5;
  const tax = 0;
  return (
    <article className="flex-1 mt-5">
    <h2 className="text-2xl pb-5">Resumo</h2>
    <ul className="border-y border-y-stone-300 py-8 flex flex-col gap-6">
      <li className="flex justify-between text-sm">
        <span>Subtotal:</span>
        <span>{price(total)}</span>
      </li>
      <li className="flex justify-between text-sm">
        <span>Frete:</span>
        <span>{price(shipping)}</span>
      </li>
      <li className="flex justify-between text-sm">
        <span>Impostos:</span>
        <span>{price(tax)}</span>
      </li>
    </ul>
    <div className="border-b border-b-stone-300 py-8 flex gap-6 justify-between">
      <span>Total:</span>
      <span>{price(total + shipping + tax)}</span>
    </div>
    <button className="action"><a href="/checkout">Finalizar compra</a></button>
  </article>
  )
}