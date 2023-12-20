interface AuthError {
  name ?: string,
  email ?: string,
  password ?: string,
  password_confirmation ?: string,
  message ?: string
}
interface AuthUser {
  name: string,
  username: string,
  email: string,
  bio: string,
  avatar: string,
}

interface SessionInfo {
  accessToken : string,
  userAuth : AuthUser
}
