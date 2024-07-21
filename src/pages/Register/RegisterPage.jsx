import { useState } from 'react'
import { Button } from 'primereact/button';
import '../Home/App.css'
import Header from '../../assets/Componentes/Header';
import Footer from '../../assets/Componentes/Footer';
import Formulario from '../../assets/Componentes/formulario';

function RegisterPage() {
  const registerFields = [
    { name: 'email', label: 'Email', type: 'email', placeholder:'Email'},
    { name: 'password', label: 'Senha', type: 'password', placeholder:'Senha'},
    { name: 'confirmation', label:'Confirmar senha', type:'password', placeholder:'Confirme sua senha'}
  ];

  const handleSubmitRegister = (formData) => {
    // Lógica de envio específica para a página de contato
    console.log('Dados do formulário de login:', formData);
  };


  return (
    <>
      <Header/>
      <div className="container justify-content-center align-items-center mt-5 py-5">
        <div className="row justify-content-center">
            <div className="card shadow-sm">
              <h5 className="card-header bg-dark text-white">Crie sua Conta</h5> 
              <div className="card-body">
                <Formulario fields={registerFields} onSubmit={handleSubmitRegister}/>
              </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default RegisterPage
