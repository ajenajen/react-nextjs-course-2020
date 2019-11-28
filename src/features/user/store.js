import { observable, action, runInAction } from 'mobx'
import * as UserService from '@features/user/services'

export default class UserStore {
  @observable
  profile = null

  @action
  getUserProfile({ token }) {
    UserService.getUserProfile({ token }).then(data => {
      runInAction(() => {
        this.profile = data
      })
    })
  }
}
