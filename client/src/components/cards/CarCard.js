import { Card, Modal } from "antd";

import { useState } from "react";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import EditCarForm from "../forms/EditCarForm";

const someStyling = () => ({
    card: {
        marginTop: "16px"
    },

    ul: {
        textAlign: "initial",
        marginLeft: "-1em",
        marginBottom: 0
    },

    card_opened_wrapper: {
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 16px)",
        boxSizing: "border-box",
        flex: "1",
        marginTop: "16px"
    },

    card_opened_body: {
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign:"center"
    }
})


const CarCard = (props) => {
    const { id, year, make, model, price, personId } = props;

    const cardTitle = `🏎️ ${make} ${model} (${year})`;
    
    const price_formatted = `$${Number(price).toLocaleString()}`;

    const styles = someStyling();

    const [editMode, setEditMode] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const editClick = () => {
        setEditMode(!editMode);
        setIsModalOpen(true);
    }

    const deleteAction = () => {
        alert("delete?")
        // let result = window.confirm('Are you sure you want to delete this contact?')
        // if (result) {
        //     remove_contact({
        //         variables: {
        //             id
        //         }
        //     })
        // }
    }

    const saveChanges = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditMode(!editMode)
        },200)
        
    }

    const cancelModal = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setEditMode(!editMode)
        },200)
    }

    return (
        <>

            {/*------------------------*/}

            {/* if editMode, show the edit car form */}
            {editMode ? (
                <>
                    <Card
                        style={styles.card_opened_wrapper}
                        title={cardTitle}
                        bodyStyle={styles.card_opened_body}
                    >
                        Launching edit form...
                    </Card>

                    <Modal
                        title="Edit Car Information:"
                        open={isModalOpen}
                        okText="Save Changes"
                        onOk={saveChanges}
                        onCancel={cancelModal}
                        cancelText="Cancel"
                        centered="true"
                        footer={null}
                    >
                    <EditCarForm
                        onBtnClick={editClick}
                        id={id}
                        year={year}
                        make={make}
                        model={model}
                        price={price}
                        personId={personId}
                    />
                    </Modal>
                </>
            ) :
            
            // otherwise, just show the buttons meant to trigger the form
            (
                <Card
                    style={styles.card}
                    title={cardTitle}
                    actions={[
                        <EditOutlined key="edit" onClick={editClick}/>,
                        <DeleteOutlined key="delete" onClick={deleteAction} style={{ color: 'red' }} />
                    ]}
                >
                    <ul style={styles.ul}>
                        <li><b>Car ID:</b> {id}</li>
                        <li><b>Brand:</b> {make}</li>
                        <li><b>Model:</b> {model}</li>
                        <li><b>Price:</b> {price_formatted}</li>
                        {/* uncomment the following to confirm that they're reflecting accurately */}
                        {/* <li><b>Owned By:</b> {personId}</li> */}
                    </ul>
                </Card>
            )}
        </>
    )
}

export default CarCard