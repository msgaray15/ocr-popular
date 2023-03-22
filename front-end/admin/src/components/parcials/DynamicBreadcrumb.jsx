import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link } from 'react-router-dom';

//breadcrumb = [{route:"value",name:"value"}] 
const DynamicBreadcrumb = ({ breadcrumb }) => {
    if (breadcrumb === undefined || breadcrumb.length == 0 || !Array.isArray(breadcrumb)) return <p className="mt-2 mx-2">Error</p>;

    return (
        <Breadcrumb className="mt-2 mx-2">
            {breadcrumb?.map((item, index) => (index < (breadcrumb.length) - 1) ?
                <Breadcrumb.Item><Link to={item.route} className="text-success">{item.name}</Link></Breadcrumb.Item>
                :
                <Breadcrumb.Item active>{item.name}</Breadcrumb.Item>
            )}
        </Breadcrumb>
    );
}

export default DynamicBreadcrumb;
