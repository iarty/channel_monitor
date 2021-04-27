import React from "react";

const CrudIcon = ({ iconClass, tooltip, action }) => {
  return (
    <>
      <i className={[iconClass, "icon-wrapper"].join(" ")} onClick={action} />
    </>
  );
};

export default CrudIcon;
