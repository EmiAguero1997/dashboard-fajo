
'use client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './clients.css';
import { FormEvent, useEffect, useState } from "react";
import axios from 'axios';


export default function Clients() {


  const [dataApi, setDataApi] = useState<any>([]);
  const [dataApiBackup, setDataApiBackup] = useState<any>([]);
  useEffect(() => {
    getData();
  }, []);



  const getData = () => {
    try {
      axios.get('http://localhost:5199/api/clients').then((response: any) => {
        setDataApi(response.data);
        setDataApiBackup(response.data);
        console.log(dataApi);
        console.log(response);
      }).catch((error: any) => {
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }


  }

  const filter = (event:any)=>{
    const searchText = event.target.value.toLowerCase();
    let result = dataApiBackup.filter((x:any)=>
    x.firstName.toLowerCase().includes(searchText.toLowerCase()) || x.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
    x.email.toLowerCase().includes(searchText.toLowerCase()) || x.companyName.toLowerCase().includes(searchText.toLowerCase())||x.cellPhone.includes(searchText));
    setDataApi((prevData:any) => {
      if (event.target.value === '') {
        return dataApiBackup;
      } else {
        return result;
      }
    });
  }




  return (

    
      <div className="container justify-content-center">
        <input type="text" placeholder='Buscar' onChange={filter}/>
        {
          dataApi && dataApi.length > 0 ? (
              
              <div className='table-responsive'>
                <table className="table align-middle">
              <thead>
                <tr>
                  <th scope="col" className='hidden-sm'>#</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Compañía</th>
                  <th scope="col" className='hidden-sm'>Email</th>
                  <th scope="col" className='hidden-sm'>Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {

                  dataApi.map((client: any, index:number) => (
                    <tr key="index">
                      <th scope="row" className='hidden-sm'>{client.id}</th>
                      <td>{client.firstName}</td>
                      <td>{client.lastName}</td>
                      <td>{client.companyName}</td>
                      <td className='hidden-sm'>{client.email}</td>
                      <td className='hidden-sm'>{client.cellPhone}</td>
                    </tr>
                  ))

                }
              </tbody>
            </table>
              </div>
              
              
            
          ) : (
            <div className="d-flex justify-content-center">
              <strong>Cargando...</strong>
            </div>

          )
        }

      </div>

    

  );

}