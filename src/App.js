import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import api from './api';

const DataTableBasicDemo = () => {

   const [ products, setProducts ] = useState([]);
   const [ nome, setNome ] = useState('');
   const [ sobrenome, setSobrenome ] = useState('');

   const produto = async() => {
       const response = await api.get('/lista');
       setProducts(response.data);
   }

    const adcionar = useCallback( 
        async(e)=> {
            e.preventDefault();
            const parms = {
                "nome": nome,
                "sobrenome": sobrenome
            }
            await api.post('/adcionar', parms);
            produto();
    },[nome,sobrenome])

   useEffect(() => {
       produto()
   },[products])


        function pegarProps( props) {
            deletar(props);
            console.log("id",props)
        }
        function edit(){
            return <Button icon="pi pi-pencil" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto"
            }}></Button>
        }
        const apagar = async(props) => {
            // const props = 7;
            await api.delete(`/deletar/${props}`);
            produto();
        }
        function deletar(rowData){ 
            return <Button onClick={()=>apagar()} icon="pi pi-trash" style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto"
            }}></Button>
        }
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "auto",
                width: 700,
                flexDirection: "column",
                marginTop: 120
                }}>
                <form onSubmit={adcionar} style={{marginBottom:50}}>
                    <div className="p-inputgroup">                        
                        <InputText placeholder="Nome" 
                        value={nome}
                        onChange={e => setNome(e.target.value)} 
                        />
                    </div>

                <div className="p-inputgroup">                        
                        <InputText placeholder="Sobrenome" 
                        value={sobrenome}
                        onChange={e => setSobrenome(e.target.value)} 
                        />
                    </div>

                <Button label="Adcionar" style={{width:172}}></Button>
                </form>
                <div className="card">
                    <DataTable value={products}>
                        <Column field="id" header="Id"></Column>
                        <Column field="nome" header="Nome"></Column>
                        <Column field="sobrenome" header="Sobrenome"></Column>
                        <Column header="Editar" body={edit} style={{width: 70}}></Column>
                        <Column header="Excluir" body={deletar} style={{width: 70}}></Column>
                    </DataTable>
                </div>
            </div>
        );
    }

export default DataTableBasicDemo;