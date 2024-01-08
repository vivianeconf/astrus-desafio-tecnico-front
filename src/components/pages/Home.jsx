import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/UserContext";
import Products from "../table/Products";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { logout, authenticated } = useContext(Context);

  useEffect(()=>{
    if (!authenticated) navigate('/login')
  },[])

  return (
    <>
        <Products />
        <button style={{color:"white", backgroundColor:"red"}} onClick={()=>logout()}>Sair</button>
    </>
  );
}

export default Home;