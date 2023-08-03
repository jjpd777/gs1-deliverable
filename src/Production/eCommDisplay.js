import React, { useState, useEffect } from 'react';
import { Card, Button, Tag, Divider, Carousel, Popconfirm, message, Modal} from 'antd';
import { ReloadOutlined, LikeTwoTone, EditOutlined, DislikeTwoTone, CopyTwoTone } from '@ant-design/icons';
import {PhotoSlider } from './config/utils';
import EditTextGeneration from './EditGen';

function AttributeCard(attribute) {
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


function truncateString(str) {
    const truncate = 60;
    if (str.length > truncate) {
        return str.slice(0, truncate) + '...';
    }
    return str;
}

export default function CardEcommerce({ currentProduct,setCurrentProduct }) {

    const [textEdit, setTextEdit] = useState('');
    function copyDescription(copyfield){
        navigator.clipboard.writeText(copyfield)

    }
    const confirm = (e) => {
        console.log(e);
        message.success('Calificación copiada');
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Calificación Descartada');
    };

    function rating_buttons (copyfield){ return <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

        <Popconfirm
            title="Copiar descripción"
            style={{ maxWidth: '50px' }}
            description={<><p>Has copiado exitosamente el mensaje.</p> <p> Esta bitácora no retiene la información, así que asegurate que guardar tu descripción.</p></>}
            onConfirm={confirm}
            okText="O.K."
        >
            <Button onClick={()=> copyDescription(copyfield)} style={{ color: 'green', marginLeft: '2px' }} icon={<CopyTwoTone />}>
            </Button>
        </Popconfirm>

    </div>
    }
    function approve_dispprove (fieldName, copyfield) {return <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {rating_buttons(copyfield)}
        <EditTextGeneration currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} inputValue={textEdit} setInputValue={setTextEdit} fieldName={fieldName} />
    </div>}

    const productImages = currentProduct?.syncfonia?.product_images?.images;
    const product_tags = currentProduct?.prod_tags?.map(t => <Tag style={{  marginRight:'3px', marginTop:'5px', backgroundColor: 'aliceblue', }}> {t}</Tag>)
    const product_attributes = [

        {
            key: 'Proveedor',
            val: <p >{currentProduct?.syncfonia?.providerGS1_info?.PartyName}</p>,
        },
        {
            key: 'Nombre',
            val: currentProduct?.syncfonia?.product_description?.trade_item_description
        },
        {
            key: 'Beneficios',
            val: <>{currentProduct?.bulletpoints}<br /><br />{!!currentProduct?.bulletpoints && approve_dispprove('Beneficios', currentProduct?.bulletpoints)}</>
        },

        {
            key: 'Descripción',
            val: <>{currentProduct?.description} <br /><br /> {!!currentProduct?.bulletpoints && approve_dispprove('Descripción', currentProduct?.description)}</>
        },

        {
            key: 'Palabras Clave',
            val: <>
             {product_tags} 
             <br/><br />
             {/* {!!currentProduct?.bulletpoints && approve_dispprove('Palabras Clave')} */}
             </>
        },

    ];

    return (
        <div>
            <Card>
                <PhotoSlider photos={productImages} />
                <b style={{ color: "lightcoral" }}>Producto </b>
                <p > {truncateString(product_attributes[1].val)}</p>
                <b style={{ color: "lightcoral" }}>Proveedor </b>
                <p >{product_attributes[0].val}</p>
                <b style={{ color: "lightcoral" }}>GTIN </b>
                <p >{currentProduct.gtin_num}</p>
                <Divider />

                {currentProduct?.bulletpoints?.length > 0 && product_attributes.map((attribute, i) => i > 1 && AttributeCard(attribute))}

            </Card>
        </div>
    )
}