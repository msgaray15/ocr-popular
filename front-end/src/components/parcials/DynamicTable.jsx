import { Table } from 'react-bootstrap';
import Loading from '../Loading';

const DynamicTable = ({ tableData }) => {
    console.log("tableData", tableData);

    if (tableData === undefined) return <Loading />

    return (
        <Table striped size="sm">
            <thead>
                <tr>
                    {tableData.columns.map((item, index) =>
                        <th key={index}>
                            {item}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {tableData.rows.map((item, index) =>
                    <tr key={index}>
                        {item.map((item_2, index_2) =>
                            <td key={index_2}>
                                {item_2}
                            </td>)}
                    </tr>
                )}
            </tbody>
        </Table>
    );
}

export default DynamicTable;
