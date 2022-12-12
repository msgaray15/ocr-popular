import { Button, Form, FormControl, FormGroup} from "react-bootstrap";
import '../../assets/css/index.css'

const RegisterVehicle = () => {
    

    return (
        <div className="row m-3">
             
            <div className="col-center">
               
                <Form>
                <h3>Register Vehicle</h3>
                <br></br>
                    <Form.Label className="ms-3">Identification</Form.Label>
                    <Form.Group className="ms-4">
                        <Form.Control type="text" placeholder="Enter identification" className="w-auto min-vw-50 d-inline" />
                        <Button className="ms-3 align-top bg-success"  >Submit</Button>
                       
                    </Form.Group>
                    <FormGroup className="ms-4">
                        <Form.Label>verification code email </Form.Label>
                        <FormControl type="text" placeholder="Enter code"  />
                    </FormGroup>
                    <Form.Group className="ms-4">
                    <Form.Label>Type vehicle</Form.Label>
                        <Form.Select >
                            <option>first type</option>
                       </Form.Select>
                    </Form.Group>
                    <FormGroup className="ms-4">
                        <Form.Label>License plate</Form.Label>
                        <FormControl type="text" placeholder="Enter license plate"  />
                    </FormGroup>
                    <br></br>
                    <Button className="ms-3 align-top bg-success"  type="submit">
                            Register Vehicle
                    </Button>
                    <Button className="ms-3 align-top" variant="danger" type="submit">
                            Cancel
                    </Button>

                </Form>
              
            </div>
        </div>
    );
}

export default RegisterVehicle;
