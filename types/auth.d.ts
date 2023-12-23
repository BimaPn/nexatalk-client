interface AuthError {
  name ?: string,
  email ?: string,
  password ?: string,
  password_confirmation ?: string,
  message ?: string
}
interface AuthUser {
  id: string,
  name: string,
  username: string,
  email: string,
  bio: string,
  avatar: string,
}

interface SessionInfo {
  userAuth : AuthUser
}
