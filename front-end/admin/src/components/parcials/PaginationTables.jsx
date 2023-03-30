import { Pagination, Form } from 'react-bootstrap';
import { pageSize, defaultPageSize } from '../../service/tools';
import { useState, useEffect } from 'react';

const PaginationTables = ({ handleChange, pages, formPageSize }) => {
    const [pagintionItem, setPaginationItem] = useState([]);
    const [index, setIndex] = useState();

    useEffect(() => {
        setIndex(pages?.current);
        setPaginationItem(paginationCountItem());
    }, [formPageSize, pages]);

    const paginationCountItem = () => {
        const totalRecordsOndefaultPageSize = pages?.totalRecords / formPageSize;
        const integerPart = Math.trunc(totalRecordsOndefaultPageSize);
        const auxpages = (integerPart === 0) ? 1 : ((totalRecordsOndefaultPageSize - integerPart) === 0) ? integerPart : integerPart + 1;
        let arrayItem = Array();

        for (let i = 1; i <= auxpages; i++) arrayItem.push(i);

        return arrayItem;
    }

    const builderPaginationItem = () => {
        let auxBuilderIntem = [];
        let inicio = 0;

        if (2 - index < -1) {
            auxBuilderIntem.push(-1); //Indica el separador ... 
            inicio = index - 3;
        }

        for (let i = inicio; i < pagintionItem.length; i++) {
            if (i < (inicio + 5)) {
                auxBuilderIntem.push(pagintionItem[i]);
            } else {
                break;
            }
        }
        if (pagintionItem.length > (inicio + 5)) {
            auxBuilderIntem.push(-1); //Indica el separador ... 
        }
        return (
            auxBuilderIntem.map((item, i) => item === -1 ? <Pagination.Ellipsis key={i} disabled /> : <Pagination.Item key={i} active={item === index} onClick={() => onClickItemsPagination(item)} >{item}</Pagination.Item>)
        );
    }
    const onClickItemsPagination = (item) => {
        setIndex(item);
        handleChange({
            target: {
                name: "page",
                value: item
            }
        });
    }

    return (
        <div className='d-flex'>
            {pages?.totalRecords > 0 ?
                <Pagination className='m-0 pagination-sm'>
                    <Pagination.First className='text-success' disabled={pages?.last === 0} onClick={() => onClickItemsPagination(1)} />
                    <Pagination.Prev className='text-success' disabled={pages?.last === 0} onClick={() => onClickItemsPagination(index - 1)} />
                    {builderPaginationItem()}
                    <Pagination.Next className='text-success' disabled={pages?.next === 0} onClick={() => onClickItemsPagination(index + 1)} />
                    <Pagination.Last className='text-success' disabled={pages?.next === 0} onClick={() => onClickItemsPagination(pagintionItem[pagintionItem.length - 1])} />
                </Pagination>
                :
                ""
            }

            <Form.Select name='pageSize' onChange={handleChange} className=' ms-2' size='sm' >
                {pageSize?.map((item, i) => <option key={i} value={item} selected={item === formPageSize}>{item}</option>)}
            </Form.Select>
        </div>
    );
}

export default PaginationTables;
