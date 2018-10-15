

/**
 * @redux true
 */
class UserState {

  logged:boolean = false
  username: string = 'anonymous'
  firstName: string
  lastName: string
  lastLogin: number 
  async login(loginInfo:{username:string, password:string}) {
    
  }
  async logout() {

  }
  fakeLogin() {
    this.username = 'Fake Login'
  }
}
