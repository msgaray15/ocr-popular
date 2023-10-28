import { Stack, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PaginationTables from './PaginationTables';

const StackHeaderTableWithSearchFormSelect = ({ title, pages, router, setBreadcrumb, handleChange, formPageSize, buttonSearch, dataFormSelect }) => {

    const buttonReturn = () => {
        handleChange({
            target: {
                name: "typeSearch",
                value: ""
            }
        });
    }

    return (
        <Stack direction="horizontal" gap={2} className='m-2'>
            <div><i class="fa-sharp fa-solid fa-arrow-left fa-beat me-2 text-success" onClick={()=>buttonReturn()}></i></div>
            <div>
                <Form.Select name='textSearch' onChange={handleChange} size='sm'>
                    {dataFormSelect?.map((item, i) => <option key={i} value={item.key}>{item.value}</option>)}
                </Form.Select>
            </div>
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

export default StackHeaderTableWithSearchFormSelect;
