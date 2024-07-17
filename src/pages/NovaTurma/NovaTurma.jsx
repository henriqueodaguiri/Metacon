import Footer from "../../assets/Componentes/Footer"
import Header from "../../assets/Componentes/Header"

function NovaTurma(){
    return (
        <>
        <Header/>
        <main>
  <section class="py-5 text-center container">      
    <h1 class="fw-light">Criar Nova Turma</h1>
  </section>

  <div class="album py-5 bg-body-tertiary">
    <div class="row justify-content-center">
        <div class="card shadow-sm">
          <div class="card-body">
            <form action="/new-reading" method="post">
              <div class="mb-3">
                <label for="class-name" class="form-label">Nome da Turma</label>
                <input type="text" placeholder="Nome" class="form-control" id="class-name" name="class-name" required/>
              </div>
              <div class="mb-3">
                <label for="text" class="form-label">Participantes</label>
                <input type="text" placeholder="Insira o email ou nome do usuario do(s) participante(s)" class="form-control" id="text" name="Texto" required/>
              </div>
              <button type="submit" class="btn btn-bd-primary btn-primary w-100 text-white">Criar</button> 
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

export default NovaTurma