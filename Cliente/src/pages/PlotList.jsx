import {useEffect, useState} from 'react';
import apiClient from '../api/apiClient';

function PlotList(){
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        lat: '',
        lang: '',
        plantCultivation: '',
    });
    const [editId, setEditId] = useState(null);
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await apiClient.get('/plotLand'); 
            setItems(response.data);
          } catch (error) {
            console.error('Error al obtener los items:', error);
          }
        };
    fetchItems();
}, []);
    const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async () => {
    try {
      const response = await apiClient.post('/plotLand', {
        name: formData.name,
        location: { lat: parseFloat(formData.lat), lang: parseFloat(formData.lang) },
        plantCultivation: formData.plantCultivation,
      });
      setItems([...items, response.data]);
      setFormData({ name: '', lat: '', lang: '', plantCultivation: '' });
    } catch (error) {
      console.error('Error al añadir la parcela:', error);
    }
  };
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
      name: item.name,
      lat: item.location.lat,
      lang: item.location.lang,
      plantCultivation: item.plantCultivation,
    });
  };

  const handleUpdate = async () => {
    try {
      const updateResponse = await apiClient.put(`/plotLand/${editId}`, {
        name: formData.name,
        location: { lat: parseFloat(formData.lat), lang: parseFloat(formData.lang) },
        plantCultivation: formData.plantCultivation,
      });
  
      if (updateResponse.data && updateResponse.data.modifiedCount === 1) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === editId
              ? {
                  ...item,
                  name: formData.name,
                  location: { lat: parseFloat(formData.lat), lang: parseFloat(formData.lang) },
                  plantCultivation: formData.plantCultivation,
                }
              : item
          )
        );
  
        setEditId(null);
        setFormData({ name: '', lat: '', lang: '', plantCultivation: '' });
      } else {
        console.error('La actualización no modificó ningún registro:', updateResponse.data);
      }
    } catch (error) {
      console.error('Error al modificar la parcela:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/plotLand/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error al eliminar la parcela:', error);
    }
  };

return (
    <div>
      <h1>Gestión de Parcelas</h1>

      {/* Formulario */}
      <div>
        <h2>{editId ? 'Editar Parcela' : 'Añadir Parcela'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={formData.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lat"
          placeholder="Latitud"
          value={formData.lat}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lang"
          placeholder="Longitud"
          value={formData.lang}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="plantCultivation"
          placeholder="Cultivo"
          value={formData.plantCultivation}
          onChange={handleInputChange}
        />
        <button onClick={editId ? handleUpdate : handleAdd}>
          {editId ? 'Actualizar' : 'Añadir'}
        </button>
      </div>

      {/* Lista de parcelas */}
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>Nombre:</strong> {item.name} <br />
            <strong>Ubicación:</strong> Latitud {item.location.lat}, Longitud {item.location.lang} <br />
            <strong>Tipo de Cultivo:</strong> {item.plantCultivation} <br />
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );

}
export default PlotList;