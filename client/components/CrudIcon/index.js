import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const CrudIcon = ({ iconClass, tooltip, action }) => {
  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip id={`tooltip-${iconClass}`}>{tooltip}</Tooltip>}
      >
        <i className={[iconClass, "icon-wrapper"].join(" ")} onClick={action} />
      </OverlayTrigger>
    </>
  );
};

export default CrudIcon;
