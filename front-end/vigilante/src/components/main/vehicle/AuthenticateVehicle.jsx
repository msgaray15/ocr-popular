import Alert from 'react-bootstrap/Alert';
import danger from '../../../assets/img/danger.jpg';
import warning from '../../../assets/img/warning.jpg';
import success from '../../../assets/img/success.jpg';

function AuthenticateVehicle() {
  const message=[
    'The vehicle to enter does not belong to the campus!',
    'The vehicle to enter does not belong to the campus, but has already entered before!',
    'The vehicle to enter if it belongs to the campus'

  ];
  const trafficLights=[
    'danger',
    'warning',
    'success'

  ]
  return (
    <>
           
      <div className="container-fluid">
        <div className="text-center mb-4" >
            <div className="card-body d-flex align-items-center justify-content-center" Style={'height:75vh'}>
                <div>
                    <img className="card-img " Style={'max-width:80px;margin:auto'} src={danger} />
                 
                </div>
                  <Alert key="danger" variant="danger">
                  The vehicle to enter if it belongs to the campus!
                </Alert>
                
            </div>
            
        </div>
        
    </div>
     
    </>
  );
}

export default AuthenticateVehicle;