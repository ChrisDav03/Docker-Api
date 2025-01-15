import {useEffect, useState} from 'react';
import apiClient from '../api/apiClient';

function PlotList(){
    const [items, setItems] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        activityType: '',
        supplies: '',
        duration: '',
    });
    const [editId, setEditId] = useState(null);
    useEffect(() => {
        const fetchItems = async () => {
          try {
            const response = await apiClient.get('/agronomicActivity'); 
            setItems(response.data);
          } catch (error) {
            console.error('Error al obtener las actividades:', error);
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
      const response = await apiClient.post('/agronomicActivity', {
        date: formData.date,
        activityType: formData.activityType,
        supplies: formData.supplies,
        duration: parseFloat(formData.duration),

      });
      setItems([...items, response.data]);
      setFormData({ date: '', activityType: '', supplies: '', duration: '' });
    } catch (error) {
      console.error('Error al añadir la parcela:', error);
    }
  };
  const handleEdit = (item) => {
    setEditId(item._id);
    setFormData({
        date: formData.date,
        activityType: formData.activityType,
        supplies: formData.supplies,
        duration: parseFloat(formData.duration),
    });
  };

  const handleUpdate = async () => {
    try {
      const updateResponse = await apiClient.put(`/agronomicActivity/${editId}`, {
        date: formData.date,
        activityType: formData.activityType,
        supplies: formData.supplies,
        duration: parseFloat(formData.duration),
      });
  
      if (updateResponse.data && updateResponse.data.modifiedCount === 1) {
        setItems((prevItems) =>
          prevItems.map((item) =>
            item._id === editId
              ? {
                  ...item,
                    date: formData.date,
                    activityType: formData.activityType,
                    supplies: formData.supplies,
                    duration: parseFloat(formData.duration),
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
      console.error('Error al modificar la actividad:', error);
    }
  };
  

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/agronomicActivity/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error al eliminar la actividad:', error);
    }
  };

return (
    <div>
      <h1>Gestión de Actividades Agronomicas</h1>

      <div>
        <h2>{editId ? 'Editar Actividad' : 'Añadir Actividad'}</h2>
        <input
          type="date"
          name="date"
          placeholder="Fecha"
          value={formData.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="activityType"
          placeholder="Tipo Actividad"
          value={formData.activityType}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="supplies"
          placeholder="Insumos"
          value={formData.supplies}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="duration"
          placeholder="Duracion"
          value={formData.duration}
          onChange={handleInputChange}
        />
        <button onClick={editId ? handleUpdate : handleAdd}>
          {editId ? 'Actualizar' : 'Añadir'}
        </button>
      </div>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <strong>Fecha:</strong> {item.date} <br />
            <strong>Tipo Actividad:</strong> {item.activityType}<br />
            <strong>Insumos:</strong> {item.supplies} <br />
            <strong>Duración:</strong> {item.duration} Minutos <br />
            <button onClick={() => handleEdit(item)}>Editar</button>
            <button onClick={() => handleDelete(item._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );

}
export default PlotList;