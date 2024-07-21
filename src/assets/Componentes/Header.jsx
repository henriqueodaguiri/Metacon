import './bootstrap.min.css'
function Header(){
    return (
        <>
          <div className="navbar navbar-dark bg-dark shadow-sm">
            <div className="container">
                <a href="/" className="navbar-brand d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" aria-hidden="true" className="me-2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                <strong>Metacon</strong>
                </a>
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <ul className="nav col-12 col-lg-auto my-2 justify-content-center my-md-0 text-small">
                    <li>
                        <a href="/login" className="nav-link text-white">
                        Log in
                        </a>
                    </li>
                    <li>
                        <a href="/register" className="nav-link text-white">
                        Registrar
                        </a>
                    </li>
                    </ul>
                </div>
            </div>
          </div>
        </>
    )
}

export default Header