import { User } from '../../../models/user.model';

export interface AuthResponse {
  username: string;
  token: string;
}
