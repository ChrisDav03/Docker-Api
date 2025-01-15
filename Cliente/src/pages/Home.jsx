import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Bienvenido a la App de agricultura</h1>
      <p>Usa las opciones del menú para interactuar con la API.</p>
      <div>
        <Link to="/plotLand">
          <button>Ir a Gestión de Parcelas</button>
        </Link>
      </div>
      <div>
        <Link to="/agronomicActivity">
          <button>Ir a Gestión de Actividades</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;