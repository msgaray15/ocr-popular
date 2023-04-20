import { Tab, Tabs } from 'react-bootstrap';
import DailyReport from './indexTabs/dailyReport/DailyReport';
import Historical from './indexTabs/historical/Historical';
import Search from './indexTabs/search/Search';

const Index = () => {
    
    return (
        <Tabs
            defaultActiveKey="dailyReport"
            className="mb-3"
        >
            <Tab eventKey="dailyReport" title="Reporte Diario">
                <DailyReport />
            </Tab>
            <Tab eventKey="historical" title="Histórico">
                <Historical />
            </Tab>
            <Tab eventKey="search" title="Search" >
                <Search />
            </Tab>
        </Tabs>
    );
}

export default Index;
