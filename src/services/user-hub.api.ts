import ApiClient from './api.client'

export class UserHubApi extends ApiClient {
  private static INSTANCE: UserHubApi

  private static BASE_URL = 'https://dev.carmind.com.ar/api/user-hub'

  private constructor() {
    super(UserHubApi.BASE_URL)
  }

  static GET(): UserHubApi {
    if (!UserHubApi.INSTANCE) {
      UserHubApi.INSTANCE = new UserHubApi()
    }
    return UserHubApi.INSTANCE
  }

  login(credentials: { username: string; password: string }) {
    return this.client.post('/login', credentials)
  }

  logout() {
    return this.client.post('/logout')
  }

  validateCookie() {
    return this.client.post('/validate')
  }

  sendRecoverPassword(email: string) {
    return this.client.post('/pw/recover?email=' + email)
  }

  validateResetPasswordCode(code: string, email: string) {
    return this.client.post('/pw/validateToken', { token: code, email })
  }

  resetPassword(code: string, email: string, newPassword: string) {
    return this.client.post('/pw/reset', { token: code, email, newPassword })
  }
}