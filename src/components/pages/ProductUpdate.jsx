import api from "../../utils/api";

import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import Input from "../form/Input";
import { useNavigate } from "react-router-dom";

function ProductUpdate() {
  const id = useParams().id;
  const [product, setProduct] = useState({});
  const navigate = useNavigate();

  useEffect(()=>{
    api.get(`/products/${id}`).then((response) => {
        setProduct(response.data.product);
    });
  },[]);

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
    const data = api.put(`/products/${id}`, product).then((response) => {
        return response.data;
    });
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
          value={product.name}
        ></Input>
        <Input
          text="Preço"
          type="text"
          name="price"
          handleOnChange={priceChange}
          value={product.price}
        ></Input>
        <Input
          text="Descrição"
          type="text"
          name="description"
          handleOnChange={handleChange}
          value={product.description}
        ></Input>
        <Input
          text="Quantidade"
          type="number"
          name="quantidad"
          handleOnChange={handleChange}
          value={product.quantidad}
        ></Input>
        <label htmlFor="">Categoria:</label>
        <select value={product.category} name="category" defaultValue={product.category} onChange={handleChange}>
            <option value="">Selecione uma opção</option>
            {options.map((options) => (
                <option key={options.value} value={options.value}>
                    {options.name}
                </option>
            ))}
        </select>
        <br />
        <br />
        <input type="submit" value="Cadastrar" style={{color:"white",backgroundColor:"green"}}/>
      </form>
      <br />
      <button style={{color:"white", backgroundColor:"gray"}} onClick={()=>{navigate('/')}}>Voltar</button>
    </section>
  );
}

export default ProductUpdate;