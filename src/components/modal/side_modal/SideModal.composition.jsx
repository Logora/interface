import React from "react";
import { SideModal } from "./SideModal";
import { IntlProvider } from "react-intl";
import { ModalProvider } from "@logora/debate.dialog.modal";
import { IconProvider } from '@logora/debate.icons.icon_provider';
import * as regularIcons from '@logora/debate.icons.regular_icons';

const debateName = "Example Debate";
const debatePositions = [
  { id: 1, name: "Position A" },
  { id: 2, name: "Position B" },
  { id: 3, name: "Position C" },
];

export const SideModalExample = () => {
  const disabledPositions = [];

  const handleChooseSide = (positionId) => {
    console.log(`Selected position: ${positionId}`);
  };

  return (
    <div style={{ width: "400px", height: "100px" }}>
      <ModalProvider>
        <IconProvider library={regularIcons}>
          <IntlProvider locale="en">
            <SideModal
              modalTitle={"Choose your side"}
              title={debateName}
              positions={debatePositions}
              disabledPositions={disabledPositions}
              onChooseSide={handleChooseSide}
              isNeutral={false}
            />
          </IntlProvider>
        </IconProvider>
      </ModalProvider>
    </div>
  );
};

export const SideModalWithNeutralPosition = () => {
  const disabledPositions = [];

  const handleChooseSide = (positionId) => {
    console.log(`Selected position: ${positionId}`);
  };

  return (
    <div style={{ width: "400px", height: "100px" }}>
      <ModalProvider>
        <IconProvider library={regularIcons}>
          <IntlProvider locale="en">
            <SideModal
              modalTitle={"Choose your side"}
              title={debateName}
              positions={debatePositions}
              disabledPositions={disabledPositions}
              onChooseSide={handleChooseSide}
              isNeutral={true}
            />
          </IntlProvider>
        </IconProvider>
      </ModalProvider>
    </div>
  );
};


export const SideModalWithDisabledPositions = () => {
  const disabledPositions = [{ id: 2, name: "Position B" }];

  const handleChooseSide = (positionId) => {
    console.log(`Selected position: ${positionId}`);
  };

  return (
    <div style={{ width: "400px", height: "100px" }}>
      <ModalProvider>
        <IconProvider library={regularIcons}>
          <IntlProvider locale="en">
            <SideModal
              modalTitle={"Choose your side"}
              title={debateName}
              positions={debatePositions}
              disabledPositions={disabledPositions}
              onChooseSide={handleChooseSide}
              isNeutral={false}
            />
          </IntlProvider>
        </IconProvider>
      </ModalProvider>
    </div>
  );
};

