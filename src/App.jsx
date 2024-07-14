import { useState } from 'react'
import { Button } from 'primereact/button';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
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
      <div className="container mt-5">
        <div className="row mt-5">
          <div className="col text-center">
            <div className="jumbotron shadow p-3 container">
              <h1 className="display-4">Aprimore suas habilidades de leitura</h1>
              <p className="lead">Metacom é um software desenvolvido para que todos possam aprender e melhorar sua habilidade de leitura.</p>
              <hr className="my-4"/>
              <p>Descubra mais sobre as funcionalidades e como pode ajudar você.</p>
              {console.log("teste")}
              <Button label="Comece agora" link onClick={() => buscarUsuario()}/>
              <br></br>
              <a className="btn btn-primary btn-lg btn-info" href="https://primereact.org/button/" role="button">Já tem uma conta? Login</a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
