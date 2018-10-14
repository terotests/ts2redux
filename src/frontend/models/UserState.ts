

/**
 * @redux true
 */
class UserState {

  logged:boolean = false
  username: string = 'anonymous'
  firstName: string
  lastName: string

  async login(loginInfo:{username:string, password:string}) {

  }
}
