import api from "../../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Products() {
    const [products, setProducts] = useState([]); 
    const navigate = useNavigate();
    console.log(products)
    useEffect(() => {
        api.get("/products").then((response) => {
            setProducts(response.data.products);
        });
    }, []);

    const delete_product = (id) => {
        const data = api.delete(`/products/${id}`).then((response) => {
            return response.data;
        })

        setProducts(products.filter(product=>product.id !== id))
    };

  return (
    <>
        <button style={{marginBottom:30, backgroundColor:"green", color:"white"}} onClick={()=>{navigate('/products/create')}}>Novo Produto</button>

        <table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Editar</th>
                    <th>Excluir</th>
                </tr>
                {
                    products.length > 0 && 
                    products.map((element) => (
                        <tr key={element.id}> 
                            <th>{element.id}</th>
                            <th>{element.name}</th>
                            <th>{element.price}</th>
                            <th>{element.quantidad}</th>
                            <th><button style={{color:"green"}} onClick={()=>{
                                navigate(`/products/update/${element.id}`)
                            }}>Editar</button></th>
                            <th><button style={{color:"red"}} onClick={()=>{
                                delete_product(element.id)
                            }}>Excluir</button></th>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </>
  );
}

export default Products;