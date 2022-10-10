import { axiosInstance } from '../helpers/axios-confit';

const getInventarios =() => {
    return axiosInstance.get('inventario', {
       
        headers: {
            'content-type': 'aplicacion/json; charset=utf-8'

        }
    });
}

const crearInventario = async (data) => {
    return axiosInstance.post('inventario', data, {

        headers: {
            'content-type': "aplicacion/json; charset=utf-8"
        }
    });
}

const editarInvetario =  async (inventarioId, data) => {
    return axiosInstance.put(`inventario/${inventarioId}`, data, {
        headers: {
            'content-type': "aplicacion/json; charset=utf-8"
        }
    });
}

const getInventarioPorId =(inventarioId) => {
    return axiosInstance.get(`inventario/${inventarioId}`, {
       
        headers: {
            'content-type': 'aplicacion/json; charset=utf-8'

        }
    });
}

export {
    getInventarios, crearInventario, editarInvetario, getInventarioPorId
}