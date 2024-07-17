import Footer from "../../assets/Componentes/Footer"
import Header from "../../assets/Componentes/Header"

function NovoTexto(){
    return (
      <>
      <Header/>
        <main>
  <section className="py-5 text-center container">      
    <h1 className="fw-light">Criar Nova Leitura</h1>
  </section>

  <div className="album py-5 bg-body-tertiary">
    <div className="row justify-content-center">
        <div className="card shadow-sm">
          <div className="card-body">
            <form action="/new-reading" method="post">
              <div className="mb-3">
                <label for="title" className="form-label">Titulo</label>
                <input type="text" placeholder="Titulo" className="form-control" id="title" name="Titulo" required/>
              </div>
              <div className="mb-3">
                <label for="text" className="form-label">Texto</label>
                <input type="text" placeholder="Texto" className="form-control" id="text" name="Texto" required/>
              </div>
              <div className="mb-3">
                <label for="new-question" className="form-label">Pergunta</label>
                <input type="text" placeholder="Nova Pergunta" className="form-control" id="new-question" name="new-question" required/>
              </div>
              <div className="mb-3">
                <label for="thumbnail" className="form-label">Inserir Imagem</label><br></br>
                <input type="file" className="btn btn-sucess" id="thumbnail" name="Thumbnail" required multiple/>
              </div>
              <button type="submit" className="btn btn-bd-primary btn-primary w-100 text-white">Criar</button> 
            </form>
          </div>
        </div>
    </div>
  </div>

</main>
<Footer/>
</>
    )
}

export default NovoTexto