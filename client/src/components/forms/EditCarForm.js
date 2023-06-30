import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button, Select } from 'antd'

const someStyling = () => ({
    form: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridGap: "14px 22px"
    },

    formItem: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        marginBottom: 0
    },

    submitBtn: {
        gridArea: "4 / 1 / 5 / 3",
        marginBottom: "4px",
        marginTop: "10px"
    }
})

const CarForm = () => {
    const [id] = useState(uuidv4());

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    useEffect(() => {
        forceUpdate()
    }, [])

    const styles = someStyling();

    return (
        <Form
            form={form}
            name="edit-car-form"
            layout="vertical"
            size="large"
            style={styles.form}
        >
            {/*----- INPUT: BRAND (MAKE) -----*/}
            <Form.Item
                style={styles.formItem}
                label="Brand:"
                name="make"
                rules={[{ required: true, message: "Car brand must not be empty" }]}
            >
                <Input placeholder="Brand"/>
            </Form.Item>

            {/*----- INPUT: MODEL -----*/}
            <Form.Item
                style={styles.formItem}
                label="Model:"
                name="model"
                rules={[{ required: true, message: "Model variant must not be empty." }]}
            >
                <Input placeholder="Model"/>
            </Form.Item>

            {/*----- INPUT: YEAR -----*/}
            <Form.Item
                style={styles.formItem}
                label="Year:"
                name="year"
                rules={[{ required: true, message: "Year field must not be empty." }]}
            >
                <Input placeholder="Year"/>
            </Form.Item>

            {/*----- INPUT: PRICE -----*/}
            <Form.Item
                style={styles.formItem}
                label="Price:"
                name="price"
                rules={[{ required: true, message: "Price field must not be empty." }]}
            >
                <Input placeholder="Price" addonBefore="$"/>
            </Form.Item>

            <Form.Item
                style={styles.formItem}
                label="Owner:"
                name="owner"
                rules={[{ required: true, message: "Car must have an owner."}]}
            >
                <Select
                    defaultValue="Person A"
                    options={[
                        { label: "Person A", value: "personA" },
                        { label: "Person B", value: "personB" },
                        { label: "Person C", value: "personC" }
                    ]}
                />
            </Form.Item>

            {/*----- BUTTON: SUBMIT -----*/}
            <Form.Item
                shouldUpdate={true}
                style={styles.submitBtn}
            >
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