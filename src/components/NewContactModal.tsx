import { useState, useEffect } from "react";
import {
  IonModal,
  IonButton,
  IonHeader,
  IonLabel,
  IonItem,
  IonInput,
  IonText,
  useIonToast,
  IonContent,
} from "@ionic/react";

import axios from "axios";

interface ModalProps {
  modalShow: boolean;
  setModalShow: (arg0: boolean) => void;
}
const NewContactModal = (props: ModalProps) => {
  const [contactsNumber, setContactsNumber] = useState("");
  const [username, setUsername] = useState("");
  const [present, dismiss] = useIonToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:3999/contacts",
      { name: username },
      { withCredentials: true }
    );
    await axios.get(`http://localhost:3999/contacts`, {
      withCredentials: true,
    });
    props.setModalShow(false);
  };

  useEffect(() => {
    console.log(contactsNumber);
  }, [contactsNumber]);

  return (
    <IonModal
      isOpen={props.modalShow}
      cssClass="add-contact-modal"
      backdropDismiss={false}
    >
      <IonContent style={{ backgroundColor: "white" }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <IonHeader>
            <IonText color="primary">
              <h1>‏‏‎‏‏‎‏‏‏‏‎‎‎‎‎ ‎‏‏‎ ‎‏‏‎ Add a new contact</h1>
            </IonText>
          </IonHeader>
          <div className="modalContainer" style={{ width: "100%" }}>
            <IonItem
              style={{
                borderRadius: "10px",
                marginBottom: "5px",
                marginRight: "10px",
                marginLeft: "10px",
              }}
            >
              <IonLabel>Username: </IonLabel>
              <IonInput
                value={username}
                onIonChange={(e: any) => setUsername(e.target.value)}
                type="text"
              ></IonInput>
            </IonItem>
            <div className="modalButtons">
              <IonButton
                type="submit"
                onClick={(e) => {
                  return (
                    handleSubmit(e),
                    present({
                      position: "top",
                      mode: "ios",
                      color: "warning",

                      buttons: [{ text: "hide", handler: () => dismiss() }],
                      message: "Contact added successfully",
                      onDidDismiss: () => console.log("dismissed"),
                      onWillDismiss: () => console.log("will dismiss"),
                    })
                  );
                }}
              >
                Add contact
              </IonButton>
              <IonButton onClick={() => props.setModalShow(false)}>
                Close
              </IonButton>
            </div>
          </div>
        </form>
      </IonContent>
    </IonModal>
  );
};

export default NewContactModal;
