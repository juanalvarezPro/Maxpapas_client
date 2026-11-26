import React from "react";
import { FaCalculator } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ButtonPayOrden = ({ onClick }) => {
  return (
    <Link to={'/admin/calculadora-billetes'} onClick={onClick}>
    <div
      className="btn-primary py-2.5 text-sm shadow-none"
      
    >
      <FaCalculator />
      Pagar pedido
    </div>
    </Link>
    
  );
};

export default ButtonPayOrden;
