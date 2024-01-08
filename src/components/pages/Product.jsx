import api from "../../utils/api";

import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "../form/Input";
import { useNavigate } from "react-router-dom";

function Product() {
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  function priceChange(e)
  {
    const price = e.target.value
    const new_price = price.replace(/,/g, '.');
    setProduct({...product, price:new_price})
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = api.post("/products", product).then((response) => {
        return response.data;
    });
    console.log(data)
    console.log(product)
    navigate('/')
  }

  const options = [
    { value: 'Mercearia', name: 'Mercearia'},
    { value: 'Hortifrúti', name: 'Hortifrúti' },
    { value: 'Bebidas', name: 'Bebidas' },
    { value: 'Açougue', name: 'Açougue' },
  ];

  return (
    <section>
      <h1>Produto</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text="Nome"
          type="text"
          name="name"
          handleOnChange={handleChange}
        ></Input>
        <Input
          text="Preço"
          type="text"
          name="price"
          handleOnChange={priceChange}
        ></Input>
        <Input
          text="Descrição"
          type="text"
          name="description"
          handleOnChange={handleChange}
        ></Input>
        <Input
          text="Quantidade"
          type="number"
          name="quantidad"
          handleOnChange={handleChange}
        ></Input>
        <label htmlFor="">Categoria:</label>
        <select value={product.category} name="category" onChange={handleChange}>
            <option value="">Selecione uma opção</option>
            {options.map((options) => (
                <option key={options.value} value={options.value}>
                    {options.name}
                </option>
            ))}
        </select>
        <br />
        <input type="submit" value="Cadastrar" />
      </form>
    </section>
  );
}

export default Product;