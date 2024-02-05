import ApiClient from './api.client'
import type { User } from './user-hub.api.types'

export class UserHubApi extends ApiClient {
  private static INSTANCE: UserHubApi

  private static BASE_URL = 'https://olimpogym.com.ar/api/user-hub'

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

  insertUser(user: User) {
    return this.client.post('/admin/user', user)
  }

  updateUser(user: User) {
    return this.client.put('/admin/user', user)
  }

  deleteUser(username: string) {
    return this.client.delete('/admin/user?username=' + username)
  }

  getAllUsers() {
    return this.client.get<User[]>('/admin/users')
  }

  getUserLogged() {
    return this.client.get<User>('/logged')
  }
}