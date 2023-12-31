import React, { useContext, useEffect } from 'react'
import './Login.css'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { login } from "../../utils/config";
import Swal from "sweetalert2";
import { useAcessoContext } from "../../context/AcessoContext";
const Login = ({ handleFunc }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    acesso,
    updateAcesso,
  } = useContext(useAcessoContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email,
      password
    }
    setLoading(true);
    const result = await login(loginData);
    if (result.auth == false) {
      setError(result.message)
    } else {
      handleFunc(true);
    }
    setLoading(false);
      setTimeout(() => {
        setError('');
      }, 3000);
  }
useEffect(() => {
  if(!acesso) {
    Swal.fire({
      title: "Verificação de Idade",
      text: "Você tem mais de 18 anos?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      customClass: {
        popup: "custom-swal-popup",
        confirmButton: "custom-swal-confirm-button",
        cancelButton: "custom-swal-cancel-button",
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Registro Não Permitido",
          text: "Você deve ter pelo menos 18 anos para entrar ou se registrar.",
          icon: "warning",
          customClass: {
            popup: "custom-swal-popup",
            confirmButton: "custom-swal-confirm-button",
          },
        });
      }
      updateAcesso(true);
    });
  }
})
  return (
    <div className="login-page">
          <h1 className="my-favorite-videos-title"><Link to="/" className='text-style-none'>My Favorite<span> Videos</span></Link></h1>
          <form className="container login-page-box" onSubmit={handleLogin}>
            <div className="row">
              <div className='col-md-12'>
                <h1 className='mb-5'>Entrar</h1>
                {/* {error && error.map((e,i) => <p key={i} className='text-danger' >{e}</p>)} */}
                {error && <h3 className='text-danger py-2' >{error}</h3>}
                <label>Email</label>
                <input required className="form-control form-control-lg mt-3" type="email" name="email" placeholder="Seu Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <label className='mt-4'>Password</label>
                <input required className="form-control form-control-lg mt-3" type="password" placeholder="Senha" onChange={(e) => setPassword(e.target.value)} value={password} />
                {/* <button type="submit" className="btn btn-entrar mt-4">Entrar</button> */}
            <button type="submit" className={`btn btn-entrar mt-4 ${loading ? 'disabled-link' : ''}`}>{loading ? 'Carregando...' : 'Entrar' }</button>
                <div className="text-center mt-4 mb-4 ou-border">
                    <div></div>
                    <span>ou</span>
                    <div></div>
                </div>
                <Link to="/registrar" className="btn btn-registrar text-center"><span>Registre-se</span></Link>    
              </div>
            </div>
      </form>
    </div>
  )
}

export default Login