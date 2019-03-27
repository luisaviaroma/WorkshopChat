import loginResponse from './loginResponse.json';

export default function createLoginResponse(overrides) {
  return { ...loginResponse, ...overrides };
}