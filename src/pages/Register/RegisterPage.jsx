import { useState } from 'react'
import { Button } from 'primereact/button';
import '../Home/App.css'
import Header from '../Componentes/Header';
import Footer from '../Componentes/Footer';

function RegisterPage() {

  return (
    <>
      <Header/>
      <div className="container justify-content-center align-items-center mt-5 py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card shadow-sm">
              <h5 className="card-header bg-dark text-white">Crie sua Conta</h5> 
              <div className="card-body">
                <form action="/register" method="post"> 
                  <div className="mb-3">
                    <label for="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" required/> 
                  </div>
                  <div className="mb-3">
                    <label for="password" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="password" name="password" required/>
                  </div>
                  <div className="mb-3">
                    <label for="password-confirmation" className="form-label">Confirme sua Senha</label>
                    <input type="password" className="form-control" id="password-confirmation" name="password-confirmation" required/>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-bd-primary btn-block btn-primary w-100 text-white">Registrar</button>
                  </div>   
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default RegisterPage
