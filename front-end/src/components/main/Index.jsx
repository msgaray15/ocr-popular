import {Tab, Tabs} from 'react-bootstrap';
import DailyReport from './dailyReport/DailyReport';
import Historical from './historical/Historical';
import Search from './search/Search';
import RegisterVehicle from '../parcials/RegisterVehicle';
import AuthenticateVehicle from '../parcials/AuthenticateVehicle';

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
            <Tab eventKey="search" title="Search" >
                <Search/>
            </Tab>
            <Tab eventKey="registerVehicle" title="Register Vehicle" >
                <RegisterVehicle/>
            </Tab>
            <Tab eventKey="authenticateVehicle" title="Authenticate Vehicle ">
                <AuthenticateVehicle/>
            </Tab>
        </Tabs>
    );
}

export default Index;
