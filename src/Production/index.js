import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Card, Menu, Dropdown, Input, Divider } from 'antd';
import { BulbOutlined, SettingOutlined, CameraOutlined, ClockCircleOutlined } from '@ant-design/icons';
import SyncfoniaForm from './inputForm';
import CardEcommerce from './eCommDisplay';
import { fetchFullDescriptions } from './fetchDescriptions';
import InstructionsCard from './instructions';


export default function WidgetGS1() {
    const [currentProduct, setCurrentProduct] = useState(null);
    const [instVisible, setInstVisible] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(currentProduct, 'currentProduct');

    useEffect(() => {
        if (!currentProduct) return;
        const prod_desc = currentProduct.prompt_select;
        setInputValue(prod_desc);
    
      },
        [currentProduct]);

    async function handleDescriptionRequest() {
        setLoading(true);
        console.log("loool");
        console.log(currentProduct, "Here examinig current product");

        try {
            await fetchFullDescriptions(currentProduct, inputValue, setCurrentProduct);
            setLoading(false)
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }



    return (
        <div style={{
            background: '#FF5900', display: 'flex', flexDirection: 'column', height: '100vh',
            margin: '0 auto', backgroundColor: 'aliceblue'
        }}>
            <div style={{ width: '95%', maxWidth: '600px', margin: '0 auto', marginTop: '10hv', }}>
                <Card style={{
                    margin: '0 auto', marginTop: '5%', maxHeight: '650px', // set the maximum height of the div
                    overflowY: 'auto'
                }}>
                    { (currentProduct=== null)  && <SyncfoniaForm setCurrentProduct={setCurrentProduct} /> }
                    {!!currentProduct && <CardEcommerce currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} />}
                </Card>
                {!!currentProduct && 
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop:'20px'}}>
                    {/* <InstructionsCard inputValue={inputValue} setInputValue={setInputValue}/> */}

                    <Button
                    icon={!loading ? <BulbOutlined style={{ color: 'white' }} /> : <ClockCircleOutlined style={{ color: 'white'}} />}
                    onClick={() => {
                        handleDescriptionRequest()

                    }}
                    style={{
                        marginRight: '5px', backgroundColor: 'lightcoral',
                       borderColor: 'lightcoral', width: '200px', color:'white',
                    }}>
                    {loading ? 'Generando...' : `Generar descripción`}
                </Button>

                </div>}
            </div>
        </div>
    )
}