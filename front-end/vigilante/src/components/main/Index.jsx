import { Tab, Tabs } from 'react-bootstrap';
import NewVehicle from './vehicle/NewVehicle';
import Recogniton from './vehicle/AuthenticateVehicle';


const Index = () => {
    
    return (
        <Tabs
            defaultActiveKey="Recogniton"
            className="mb-3"
        >
            <Tab eventKey="NewVehicle" title="Nuevo vehiculo">
                <NewVehicle />
            </Tab>
            <Tab eventKey="Recogniton" title="Reconocimiento de placa">
                <Recogniton />
            </Tab>
        </Tabs>
    );
}

export default Index;
