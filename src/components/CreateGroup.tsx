import { useState } from "react";
import {
  IonModal,
  IonButton,
  IonHeader,
  IonLabel,
  IonItem,
  IonInput,
  IonText,
  IonToggle,
  IonIcon,
  IonSearchbar,
  IonAvatar,
  IonList,
  IonSkeletonText,
  IonCheckbox,
  IonContent,
  useIonToast,
} from "@ionic/react";
import { personAddOutline } from "ionicons/icons";
import "../theme/style.css";
import { Group } from "../types";
import { useStateValue } from "../contextApi/stateProvider";

interface modalProps {
  modalShow: boolean;
  setModalShow: (arg0: boolean) => void;
}
const CreateGroup = (props: modalProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [state, dispatch] = useStateValue();
  const [present, dismiss] = useIonToast();
  return (
    <IonContent>
      <IonModal
        isOpen={props.modalShow}
        cssClass="settings-modal"
        backdropDismiss={false}
      >
        <IonHeader>
          <IonText color="primary">
            <h1>‏‏‎ ‎‏‏‎ ‎‏‏‎ Create group</h1>
          </IonText>
        </IonHeader>
        <IonContent>
          <div className="modalContainer" style={{ width: "100%" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <IonItem>
                <IonInput placeholder="Group Name"></IonInput>
              </IonItem>
              <IonSearchbar
                // value={something}
                onIonChange={(e) => console.log(e.detail.value!)}
                showCancelButton="always"
              ></IonSearchbar>
              {state.user?.rooms ? (
                state.user?.rooms?.map((data: Group, i: number) => {
                  return (
                    // <IonContent
                    //   key={i}
                    //   style={{
                    //     position: "absolute",
                    //     top: "12vh",
                    //     height: "50vh",
                    //   }}
                    // >
                    <IonItem>
                      <IonAvatar slot="start">
                        <img src={data.groupPic} alt="pro-pic" />
                      </IonAvatar>
                      <IonLabel>
                        <h3>{data.name}</h3>
                        <p>{data.partecipants}</p>
                      </IonLabel>

                      <IonCheckbox
                        slot="end"
                        // value={isChecked}
                        checked={isChecked}
                      />
                    </IonItem>
                    // {/* </IonContent> */}
                  );
                })
              ) : (
                <IonList>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonAvatar slot="start">
                      <IonSkeletonText animated />
                    </IonAvatar>
                    <IonLabel>
                      <h3>
                        <IonSkeletonText animated style={{ width: "50%" }} />
                      </h3>
                      <p>
                        <IonSkeletonText animated style={{ width: "80%" }} />
                      </p>
                      <p>
                        <IonSkeletonText animated style={{ width: "60%" }} />
                      </p>
                    </IonLabel>
                  </IonItem>
                </IonList>
              )}
            </div>

            <div className="modalButtons">
              <IonButton
                color="tertiary"
                onClick={() =>
                  present({
                    position: "top",
                    mode: "ios",
                    color: "tertiary",
                    header: "Group",
                    buttons: [{ text: "hide", handler: () => dismiss() }],
                    message: "Group created",
                    onDidDismiss: () => console.log("dismissed"),
                    onWillDismiss: () => console.log("will dismiss"),
                  })
                }
              >
                Create
              </IonButton>
              <IonButton onClick={() => props.setModalShow(false)}>
                Close
              </IonButton>
            </div>
          </div>
        </IonContent>
      </IonModal>
    </IonContent>
  );
};

export default CreateGroup;
