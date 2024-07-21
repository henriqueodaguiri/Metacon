import Header from '../../assets/Componentes/Header';
import Footer from '../../assets/Componentes/Footer';
import Formulario from '../../assets/Componentes/formulario';

function Login() {
  const loginFields = [
    { name: 'email', label: 'Email', type: 'email' , placeholder:'Email'},
    { name: 'password', label: 'Senha', type: 'password', placeholder:'Senha' }
  ];

  const handleSubmitLogin = (formData) => {
    // Lógica de envio específica para a página de contato
    console.log('Dados do formulário de login:', formData);
  };

  return (
    <>
      <Header/>
      <div className="container justify-content-center align-items-center mt-5 py-5">
        <div className="row justify-content-center">
            <div className="card shadow-sm">
              <h5 className="card-header bg-dark text-white">Entre em sua conta</h5> 
              <div className="card-body">
                <Formulario fields={loginFields} onSubmit={handleSubmitLogin}/>
                  <div className="mt-4">
                    <a href="/esqueceu-senha" className="text-decoration-none">Esqueceu sua senha?</a> 
                  </div>
                  <div className="mt-2 text-center">
                    <a href="/register-page" className="text-decoration-none">Não tem conta? Registre-se</a>
                  </div>
              </div>
            </div>
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Login
