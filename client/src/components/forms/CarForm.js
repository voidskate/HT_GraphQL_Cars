import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button } from 'antd'

const CarForm = () => {
    const [id] = useState(uuidv4());

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate()
    }, [])

    return (
        <Form
            form={form}
            name="add-car-form"
            layout="inline"
            size="large"
            style={{marginBottom: "40px"}}
        >
            {/*----- INPUT: FIRST NAME -----*/}
            <Form.Item
                name="firstName"
                rules={[{ required: true, message: "First name field is required." }]}
            >
                <Input placeholder="e.g. Elon"/>
            </Form.Item>

            {/*----- INPUT: LAST NAME -----*/}
            <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Last name field is required." }]}
            >
                <Input placeholder="e.g. Musk"/>
            </Form.Item>

            {/*----- BUTTON: SUBMIT -----*/}
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >Add Car</Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default CarForm