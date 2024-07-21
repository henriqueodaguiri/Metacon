import Footer from "../../assets/Componentes/Footer"
import Formulario from "../../assets/Componentes/formulario"
import Header from "../../assets/Componentes/Header"

function NovaTurma(){
  const newClassFields = [
    { name: 'nameClass', label: 'Nome da Turma', type: 'text' , placeholder:'Nome'},
    { name: 'participants', label: 'Participantes', type: 'text', placeholder:'Email dos participantes' }
  ];

  const handleSubmitNewClass = (formData) => {
    // Lógica de envio específica para a página de contato
    console.log('Dados do formulário de login:', formData);
  };  
  
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
            <Formulario fields={newClassFields} onSubmit={handleSubmitNewClass}/>
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