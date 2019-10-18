import React, { useState } from "react";

import {
  Modal  
} from "antd";


import "./index.css";


const MapRolePlayParametersModal = props => {


    return (
        <div>
            <Modal
              title="Map Parameters"
              visible={props.visible}
              onCancel={props.onCancel}
              destroyOnClose={true}
              footer={false}
            >

            </Modal>
        </div>
    )
};

export default MapRolePlayParametersModal;