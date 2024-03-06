
import axios from 'axios';
import { Carousel, Divider, Card} from 'antd';
import { API_URL } from './config';

export async function callBackendCompletion(prompt_design) {
    const response = await axios.post('https://6fab6f8e-7d8e-4e6c-8072-6d971b547e78-00-a3vo3tlornmv.picard.replit.dev/api/ask', {
      prompt_request: prompt_design,
      origin: 'gs1-production',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response)
    return response.response;
  };

export function PhotoSlider({ photos }) {
    if (!photos) return <div>No fotos</div>;
    const p = photos.filter(photo => !!photo)
    return (
        <Carousel autoplay style={{ maxWidth: '200px', margin: '0 auto' }}>
            {p.map((photo, index) => (

                <div key={index}>
                    <img src={photo} alt={`Photo ${index}`} style={{ width: '200px', height: 'auto' }} />
                    <Divider></Divider>
                </div>
            ))}
        </Carousel>
    );
};

export function AttributeCard(attribute) {
    return (
        <Card style={{ marginTop: '2px' }}>
            <div style={{
                display: 'flex', justifyContent: 'flex-start', marginBottom: '5px',
                fontSize: '1rem', color: 'white', backgroundColor: '#4169E1', padding: '5px', fontWeight: '500',
            }}>
                {attribute.key}
            </div>
            <br />
            <div>
                {attribute.val}
            </div>
        </Card>
    )

}
