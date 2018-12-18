import React from 'react';
import PropTypes from 'prop-types';
import { Drawer } from 'antd';

import AlertForm from '../AlertForm';
import { geometry } from '../../../../common/lib/propTypesUtil';

function NewAlert({ visible, onClose, onClickSave, area }) {
  return (
    <div>
      <Drawer
        title="Create a new Alert"
        width={720}
        onClose={onClose}
        visible={visible}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px',
        }}
      >
        <AlertForm onClickSave={onClickSave} onCancel={onClose} area={area} />
      </Drawer>
    </div>
  );
}

export default NewAlert;

NewAlert.propTypes = {
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  onClickSave: PropTypes.func,
  area: geometry,
};

NewAlert.defaultProps = {
  visible: false,
  onClose: () => {},
  onClickSave: () => {},
  area: {},
};
