import { Stack, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PaginationTables from './PaginationTables';

const StackHeaderTable = ({ title, pages, router, setBreadcrumb, handleChange, formPageSize, listTypeSearch, buttonSearch }) => {
    return (
        <Stack direction="horizontal" gap={2} className='m-2'>
            <div>
                <Form.Select name='typeSearch' onChange={handleChange} size='sm'>
                    {listTypeSearch?.map((item, i) => <option key={i} value={item.key}>{item.value}</option>)}
                </Form.Select>
            </div>
            <div><Form.Control type="text" placeholder="Buscar" name='textSearch' onChange={handleChange} size='sm'/></div>
            <div><Button variant="success" size='sm' onClick={buttonSearch}><i class="fa-solid fa-magnifying-glass"></i></Button></div>
            <div className="ms-auto "><PaginationTables handleChange={handleChange} pages={pages} formPageSize={formPageSize} /></div>
            {
                router !== undefined ?
                <div><Link to={router + "/new"} onClick={() => setBreadcrumb([{ route: router, name: title }, { route: "/new", name: "Nuevo" }])}><i className="fa-solid fa-plus ms-3 text-success"></i></Link></div>
                :
                ""
            }
            
        </Stack>
    );
}

export default StackHeaderTable;
