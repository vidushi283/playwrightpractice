import { standardUser } from '../test-data/users';

export function getCredentials(): { username: string; password: string } {
  const username = process.env.SAUCE_USERNAME;
  const password = process.env.SAUCE_PASSWORD;
  if (username && password) {
    return { username, password };
  }
  return standardUser;
}
