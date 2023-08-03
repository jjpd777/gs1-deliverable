import React, { useState } from 'react';
import { Form, Dropdown, Input, Button, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import axios from 'axios';
import ReCaptcha from './Captcha';
import { API_URL } from './config/config';
import { items } from './sampleProducts';
import Syncfonia from './sync.png'

export default function SyncfoniaForm({ setCurrentProduct }) {
  const [loading, setLoading] = useState(false);
  const [displaySearch, setDisplaySearch] = useState(false);
  const [error, setErr] = useState(false);
  const [gtngln, setGtnGln] = useState({})

  const [form] = Form.useForm();

  const handleUpdateFields = (fields) => {
    form.setFieldsValue(fields);
  };

  const handleMenuClick = (e) => {
    console.log('click', items[e.key - 1].data);
    handleUpdateFields(items[e.key - 1].data);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  const onFinish = async (values) => {
    setLoading(true);
    const { GTIN, GLN } = values; // Destructure GTIN and GLN from the form values
    setGtnGln({GTIN, GLN});
    const response = await axios.post(API_URL, values);
    console.log(response.data, 'From the backend');
    if (response.data.syncfonia.product_images) {
      setCurrentProduct({ ...response.data, gtin_num: GTIN });
    } else {
      setErr(true);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '50%', margin: '0 auto' }}>
      <img style={{maxWidth:'80%', marginBottom:'-10%'}} src={Syncfonia} />
      <p style={{color:'grey'}}>Ingresa el GTIN del producto para el que deseas generar descripciones.</p>

      <Form form={form} onFinish={onFinish}>
        <br />
        <br />
        {error && <>
          <p>
            {`El producto con el GTIN ${gtngln.GTIN} y de la empresa con GLN ${gtngln.GLN} no existe en Syncfonia.`}
          </p>
          <p>{'\n Para poder usar este servicio requieres que tu producto esté en Syncfonia. Favor traerlo a SECODAT para iniciar el proceso de carga.'}
          </p>
          </>
        }

        <Form.Item label="GTIN" name="GTIN" rules={[{ required: true, message: 'Por favor ingrese el GTIN' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="GLN" name="GLN" rules={[{ required: true, message: 'Por favor ingrese el GLN' }]}>
          <Input />
        </Form.Item>
        <div style={{ textAlign: 'right' }}>
          <Form.Item style={{ alignSelf: 'right' }}>
            <Dropdown style={{}} menu={menuProps}>
              <Button>
                <Space>
                  Ejemplos
                  <DownOutlined />
                </Space>
              </Button>
            </Dropdown>
            {displaySearch && (
              <Button align="right" style={{ marginLeft: '10px', backgroundColor: '#ADD8E6', minWidth: '100px' }} htmlType="submit" loading={loading}>
                Buscar
              </Button>
            )}
            <div style={{ marginLeft:'-5%', margin: '0 auto', display: 'flex', flexDirection: 'row', marginTop: '20px', maxWidth: '80%' }}>
              <ReCaptcha setDisplaySearch={setDisplaySearch} />
            </div>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
