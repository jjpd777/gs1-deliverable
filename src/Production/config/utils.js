
import axios from 'axios';
import { Carousel, Divider, Card} from 'antd';

export async function callBackendCompletion(prompt_design) {
    const response = await axios.post('https://openai-juan.herokuapp.com/api/chrome_request', {
      prompt_request: prompt_design,
      origin: 'gs1-production',
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response;
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
