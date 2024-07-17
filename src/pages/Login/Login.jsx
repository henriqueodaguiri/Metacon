import { useState } from 'react'
import { Button } from 'primereact/button';
import '../Home/App.css'
import Header from '../../assets/Componentes/Header';
import Footer from '../../assets/Componentes/Footer';

function Login() {

  return (
    <>
      <Header/>
      <div className="container justify-content-center align-items-center mt-5 py-5">
        <div className="row justify-content-center">
            <div className="card shadow-sm">
              <h5 className="card-header bg-dark text-white">Entre em sua conta</h5> 
              <div className="card-body">
                <form action="/login" method="post">
                  <div className="mb-3"> 
                    <label for="email" className="form-label">Email ou usuário</label>
                    <input type="text" className="form-control" id="email" name="email" required/>
                  </div>
                  <div className="mb-3"> 
                    <label for="password" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="password" name="password" required/>
                  </div>
                  <button type="submit" className="btn btn-bd-primary btn-primary w-100 text-white">Log in</button> 
                  <div className="mt-4">
                    <a href="/esqueceu-senha" className="text-decoration-none">Esqueceu sua senha?</a> 
                  </div>
                  <div className="mt-2 text-center">
                    <a href="/register-page" className="text-decoration-none">Não tem conta? Registre-se</a>
                  </div>
                </form>
              </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Login
