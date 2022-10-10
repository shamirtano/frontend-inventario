import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getInventarioPorId, editarInvetario } from '../../services/inventarioService';
import { getUsuarios } from '../../services/usuarioService';
import { getMarcas } from '../../services/marcaService';
import { getTiposEquipos } from '../../services/tipoEquipoService';
import { getEstadosEquipos } from '../../services/estadoEquipo';
import Swal from 'sweetalert2';

export const InventarioUpdate = () => {

    const { inventarioId } = useParams();
    const [inventario, setInventario] = useState({
        serial: "",
        modelo: "",
        descripcion: "",
        foto: "",
        color: "",
        fechaCompra: "",
        precio: 0,
        usuario: "",
        marca: "",
        tipoEquipo: "",
        estadoEquipo: ""
    });

    const [usuarios, setUsuarios] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [estadosEquipos, setEstadosEquipos] = useState([]);




    const listarUsuarios = async () => {
        try {
            const { data } = await getUsuarios();
            setUsuarios(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarUsuarios();
    }, []);

    const listarMarcas = async () => {
        try {
            const { data } = await getMarcas();
            setMarcas(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarMarcas();
    }, []);

    const listarEstadosEquipos = async () => {
        try {
            const { data } = await getEstadosEquipos();
            setEstadosEquipos(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarEstadosEquipos();
    }, []);


    const listarTiposEquipos = async () => {
        try {
            const { data } = await getTiposEquipos();
            setTipos(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        listarTiposEquipos();
    }, []);
    const getInventarioForm = async () => {
        const response = await getInventarioPorId(inventarioId);
        console.log(response.data);
        setInventario(response.data);
    }

    useEffect(() => {
        getInventarioForm();
    }, [inventarioId]);


    const handleOnChange = (event) => 
    {
        
        const { name, value } = event.target;
        setInventario({ ...inventario, [name]: value }); 
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        
        
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const  data = await editarInvetario(inventarioId, inventario);
            console.log(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            console.log(error.response.data)
            Swal.close();
            let mensaje;
            if (error && error.response && error.response.data) {
                mensaje = error.response.data;
            } else {
                mensaje = 'Ocurrió un error, intente de nuevo';
            }
            Swal.fire('Error', mensaje, 'error');
        }
    }

    return (
        <div className='container-fluid mt-3 mb-2'>
            <div className='card'>
                <div className='card-header'>
                    <h5 className='card-title'>Detalle activo</h5>
                </div>
                <div className='card-body'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <img src={inventario?.foto} className='img-fluid' alt='...' /> 
                        </div>
                        <div className='col-md-8'>
                            <form onSubmit={handleOnSubmit}>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Serial</label>
                                            <input type="text" name="serial"
                                                required
                                                value={inventario.serial}
                                                onChange={handleOnChange}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Modelo</label>
                                            <input type="text" name="modelo"
                                                required
                                                value={inventario.modelo}
                                                onChange={handleOnChange}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Descripción</label>
                                            <input type="text" name="descripcion"
                                                required
                                                value={inventario.descripcion}
                                                onChange={handleOnChange}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Color</label>
                                            <input type="text" name="color"
                                                required
                                                value={inventario.color}
                                                onChange={handleOnChange}
                                                className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Foto</label>
                                            <input type="url" name="foto"
                                                required
                                                value={inventario.foto}
                                                onChange={handleOnChange}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Fecha Compra</label>
                                            <input type="date" name="fechaCompra"
                                                required
                                                value={inventario.fechaCompra}
                                                onChange={handleOnChange}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Precio</label>
                                            <input type="number" name="precio"
                                                required
                                                value={inventario.precio}
                                                onChange={handleOnChange}
                                                className="form-control" />
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Usario</label>
                                            <select className="form-select"
                                                required
                                                onChange={handleOnChange}
                                                name="usuario"
                                                value={inventario.usuario}>
                                                <option value=""> --Seleccione--</option>
                                                {
                                                    usuarios.map(usuario =>(
                                                         <option key={usuario._id} value={usuario._id}>
                                                            {usuario.nombre}
                                                        </option>
                                                ))
                                                
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Marca</label>
                                            <select className="form-select"
                                                required
                                                onChange={handleOnChange}
                                                name="marca"
                                                value={inventario.marca}>
                                                <option value=""> --Seleccione--</option>
                                                {
                                                    marcas.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>
                                                            {nombre}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Tipo Equipo</label>
                                            <select className="form-select"
                                                required
                                                onChange={handleOnChange}
                                                name="tipoEquipo"
                                                value={inventario.tipoEquipo}>
                                                <option value=""> --Seleccione--</option>
                                                {
                                                    tipos.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>
                                                            {nombre}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="mb-3">
                                            <label className="form-label">Estado Equipo</label>
                                            <select className="form-select"
                                                required
                                                onChange={handleOnChange}
                                                name="estadoEquipo"
                                                value={inventario.estadoEquipo}>
                                                <option value=""> --Seleccione--</option>
                                                {
                                                    estadosEquipos.map(({ _id, nombre }) => {
                                                        return <option key={_id} value={_id}>
                                                            {nombre}
                                                        </option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <button className='btn btn-secondary'>Editar</button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    )
}


