import { Api } from './api';
import { loginFixture } from './fixtures';
import { apiUri } from '../config';
// docs for jest-fetch-mock https://www.npmjs.com/package/jest-fetch-mock

describe('should correclty call', () => {
  let api = null;
  beforeEach(() => {
    api = new Api();
    fetch.resetMocks();
  });
  
  it('login', async () => {
    fetch.mockResponse(JSON.stringify(loginFixture({ status: 'success' })))
    const response = await api.login({ user: 'vergingetorige', password: 'secret' });

    expect(fetch.mock.calls.length).toEqual(1)
  });

  it('fetchUserInfo', async () => {
    const response = loginFixture({ status: 'success' });
    fetch.once(JSON.stringify(response))
        .once(JSON.stringify({ user_info: { bla: 1 } }))

    const loginResponse = await api.login({ user: 'vergingetorige', password: 'secret' });
    api.setAuthToken(loginResponse.data.authToken);
    expect(api.authToken).toEqual(loginResponse.data.authToken);
    const userInfo = await api.fetchUserInfo({ userId: loginResponse.data.userId });
    expect(fetch.mock.calls.length).toEqual(2)
  });
})
