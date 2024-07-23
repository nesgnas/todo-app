import { injectable} from '@loopback/core';
import {Filter, repository} from '@loopback/repository';
import {UserRepository} from '../repositories';
import {User} from '../models';

@injectable()
export class UserService {
  constructor(
   @repository(UserRepository)
   public userRepository : UserRepository
  ) {}

  getUser(filter? : Filter<User>) {
    return this.userRepository.find(filter);
  }

  login(user: User) {
    return this.userRepository.create(user);
  }

  signup(user: User) {
    return this.userRepository.create(user);
  }
}