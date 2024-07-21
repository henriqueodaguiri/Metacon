import Footer from "../../assets/Componentes/Footer"
import Formulario from "../../assets/Componentes/formulario";
import Header from "../../assets/Componentes/Header"

function NovoTexto(){
  const newReadingFields = [
    { name: 'title', label: 'Titulo', type: 'text', placeholder:'Titulo'},
    { name: 'text', label: 'Texto', type: 'text', placeholder:'Texto'},
    { name: 'question', label:'Pergunta', type:'text', placeholder:'Pergunta'},
    { name: 'thumbnail', label:'Inserir imagem', type:'file'}
  ];

  const handleSubmitnewReading = (formData) => {
    // Lógica de envio específica para a página de contato
    console.log('Dados do formulário de login:', formData);
  };  
  
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
            <Formulario fields={newReadingFields} onSubmit={handleSubmitnewReading}/>
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