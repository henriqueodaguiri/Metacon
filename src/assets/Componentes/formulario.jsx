import React, { useState } from 'react';

const Formulario = ({ fields, onSubmit }) => {
    const initialFormData = {};
    fields.forEach(field => {
      initialFormData[field.name] = '';
    });
  
  const [formData, setFormData] = useState(initialFormData);
  const [enviado, setEnviado] = useState(false); // Estado para controlar se o formulário foi enviado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados do formulário para um servidor, por exemplo
    console.log(formData);
    setTimeout(() => {
        setEnviado(true); // Marca o formulário como enviado após 1 segundo (simulação)
      }, 1000);
  };

  return (
    <div>
    {enviado ? (
        <div>
          <h2>Sucesso!</h2>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
        {fields.map(field => (
          <div key={field.name}>
            <label>
              {field.label}:
              <input
                  type={field.type || 'password'}
                  name={field.name}
                  className='form-control'
                  value={formData[field.name]}
                  placeholder={field.placeholder}
                  onChange={handleChange}
                  required
              />
            </label>
            <br />
          </div>
        ))}
        <br />
        <button type="submit">Enviar</button>
      </form>
      )}
    </div>
  );
};

export default Formulario;