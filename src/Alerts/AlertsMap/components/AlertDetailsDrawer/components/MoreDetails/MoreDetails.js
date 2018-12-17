import React from 'react';
import { Collapse } from 'antd';
import MoreDetailsAlert from './components/MoreDetailsAlert';
import MoreDetailsInfo from './components/MoreDetailsInfo';
import MoreDetailsArea from './components/MoreDetailsArea';
import { alertPropTypes } from '../../../../../../common/lib/propTypesUtil';
import './styles.css';

const { Panel } = Collapse;

function MoreDetails({ alert }) {
  return (
    <div className="MoreDetails">
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header={<h3>Alert</h3>} key="1" className="Panel">
          <MoreDetailsAlert alert={alert} />
        </Panel>
      </Collapse>
      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel header={<h3>Information</h3>} key="1" className="Panel">
          <MoreDetailsInfo alert={alert} />
        </Panel>
      </Collapse>

      <Collapse bordered={false} defaultActiveKey={['1']}>
        <Panel
          header={<h3>Description of the Area</h3>}
          key="1"
          className="Panel"
        >
          <MoreDetailsArea alert={alert} />
        </Panel>
      </Collapse>
    </div>
  );
}

export default MoreDetails;

MoreDetails.propTypes = {
  alert: alertPropTypes,
};

MoreDetails.defaultProps = {
  alert: {},
};
