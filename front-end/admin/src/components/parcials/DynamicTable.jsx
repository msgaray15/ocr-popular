import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const DynamicTable = ({ tableStructure, data, router, title, setBreadcrumb, backRouter }) => {
    /*
    const tableStructure ={
        thead:["Nombre","Cedula","Tipo de Documento","Correo","Dirección","Telefono","Rol"],
        tbody:[["person","name"],["person","identification"],["person","identificacionType","abbreviation"],"email",["person","address"],["person","phone"],["rol","name"]]
    }
    */

    const builderHeaderTable = () => {
        let headers = tableStructure?.thead?.map((item, i) => <th key={i + 1}>{item}</th>);
        if (router) {
            headers.push(<th key={0}>Acciones</th>);
        }
        return headers;
    }

    const builderBodyTable = () => data?.map((itemData, i) => <tr key={i}>{builderBodyTableFila(itemData, i + 1)}</tr>);

    const builderBodyTableFila = (itemData, index) => {
        let fila = tableStructure?.tbody?.map((itemTableStructure, iTableStructure) => {
            return (
                <td key={iTableStructure + 1}>
                    {
                        !Array.isArray(itemTableStructure) ? itemData[itemTableStructure] : extractData(itemTableStructure, itemData)
                    }
                </td>
            );
        }
        );
        if (router) {
            fila.push(
                <th key={tableStructure?.tbody?.length} className='table_column_actions'>
                    <Link to={router + "/edit?id=" + itemData.id} onClick={() => setBreadcrumb([{ route: router, name: title }, { route: "/edit", name: "Editar" }])}><i className="fa-solid fa-pen-to-square ms-3 text-success"></i></Link>
                    <Link to={"/delete?id=" + itemData.id + "&entity=" + title + "&router=" + router + "&backRouter=" + backRouter}><i className="fa-solid fa-trash ms-3 text-success"></i></Link>
                </th>);
        }
        fila.unshift(<td key={0}>{index}</td>);
        return fila;
    }
    //Mirar como mejorar  dado que ahora no permite hasta el tercer hijo
    const extractData = (itemTableStructure, itemData) => itemTableStructure.length === 2 ? itemData[itemTableStructure[0]][itemTableStructure[1]] : itemData[itemTableStructure[0]][itemTableStructure[1]][itemTableStructure[2]];

    return (

        <Table striped className='mt-3'>
            <thead>
                <tr>
                    <th>#</th>
                    {builderHeaderTable()}
                </tr>
            </thead>
            <tbody className='table-group-divider'>
                {builderBodyTable()}
            </tbody>
        </Table>
    );
}

export default DynamicTable;
