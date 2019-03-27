import { Api } from './api';
import { loginFixture } from './fixtures';
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
    // api.setAuthToken('123456');
    fetch.mockResponse(JSON.stringify({ access_token: '12345' }))
    const response = await api.fetchUserInfo({ userId: '1234567' });
    
    expect(fetch.mock.calls.length).toEqual(1)
  });
})
