import {Tab, Tabs} from 'react-bootstrap';
import DailyReport from './dailyReport/DailyReport';
import Historical from './historical/Historical';
import Search from './search/Search';

const Index = () => {
    return (
        <Tabs
            defaultActiveKey="dailyReport"
            id="uncontrolled-tab-example"
            className="mb-3"
        >
            <Tab eventKey="dailyReport" title="Reporte Diario">
                <DailyReport/>
            </Tab>
            <Tab eventKey="historical" title="Histórico">
                <Historical/>
            </Tab>
            <Tab eventKey="search" title="Busqueda" >
                <Search/>
            </Tab>
        </Tabs>
    );
}

export default Index;
