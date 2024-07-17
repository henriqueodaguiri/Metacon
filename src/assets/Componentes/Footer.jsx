import Theme from "./Theme"
import './bootstrap.min.css'
function Footer(){
    return (
        <>
            <Theme/>
            <footer className="text-body-secondary py-5">
                <div className="container">
                    <p className="float-end mb-1">
                    <a href="#">Voltar ao topo</a>
                    </p>
                    <p className="mb-0">Novo no Metacon? <a href="/">Visite nossa página</a> ou leia nosso <a href="../getting-started/introduction/">guia de início</a>.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer