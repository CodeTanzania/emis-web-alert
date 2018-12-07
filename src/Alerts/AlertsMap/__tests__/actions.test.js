import * as Actions from '../../actions';

// sample  alert object
import { alert, alerts } from '../../../common/lib/testData';

describe('Alerts:Actions', () => {
  it('should return alerts get start action', () => {
    expect(Actions.alertsGetStart()).toEqual({
      type: Actions.ALERTS_GET_START,
    });
  });

  it('should return alert get start action when id is not supplied', () => {
    expect(Actions.alertGetStart()).toEqual({
      type: Actions.ALERT_GET_START,
      payload: {
        data: null,
      },
    });
  });

  it('should return alert get start action when id is supplied', () => {
    expect(Actions.alertGetStart(1)).toEqual({
      type: Actions.ALERT_GET_START,
      payload: {
        data: 1,
      },
    });
  });

  it('should return alert store action', () => {
    expect(Actions.alertStore(alert)).toEqual({
      type: Actions.ALERT_STORE,
      payload: {
        data: alert,
      },
    });
  });

  it('should return alerts store action', () => {
    expect(Actions.alertsStore(alerts)).toEqual({
      type: Actions.ALERTS_STORE,
      payload: {
        data: alerts,
      },
    });
  });
});
