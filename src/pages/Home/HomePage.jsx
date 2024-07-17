import { useState } from 'react'
import { Button } from 'primereact/button';
import './App.css'
import Header from '../../assets/Componentes/Header';
import Footer from '../../assets/Componentes/Footer';

function HomePage() {
  const [count, setCount] = useState(0)

  function buscarUsuario() {
    db.query("SELECT * FROM usuario WHERE nome = 'Henrique' ", (err, res) => {
      if (err) {
        console.error("Erros executing query", err.stack);
      } else {
        let users = res.rows;
        console.log(users)
      }
    })
  }

  return (
    <>
      <Header/>
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col text-center">
            <div className="jumbotron shadow p-3 container">
              <h1 className="display-4">Aprimore suas habilidades de leitura</h1>
              <p className="lead">Metacom é um software desenvolvido para que todos possam aprender e melhorar sua habilidade de leitura.</p>
              <hr className="my-4"/>
              <p>Descubra mais sobre as funcionalidades e como pode ajudar você.</p>
              {console.log("teste")}
              <a className="btn btn-dark btn-lg btn-info" href="/login" role="button">Comece agora</a>
              <br></br>
              <a className="btn" href="/login" role="button">Já tem uma conta? Login</a>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default HomePage
