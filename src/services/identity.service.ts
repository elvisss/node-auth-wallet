import connection from '../common/persistence/mysql.persistence'
import { CreateUserDto } from '../dto/user.dto'
import SHA from 'sha.js'
import { config } from '../../config'
import { ApplicationException } from '../common/exception/application.exception'
import jwt from 'jsonwebtoken'

export class IdentityService {
  async authenticate(email: string, password: string): Promise<string> {
    password = SHA('sha256').update(password).digest('base64')

    const [rows]: any[] = await connection.execute(
      'SELECT * from auth_user WHERE email = ? AND password = ?',
      [email, password]
    )

    if (!config.jwtSecretKey) {
      throw new Error('Secret key is not defined')
    }

    if (rows.length) {
      return jwt.sign({
        id: rows[0].id,
        email: rows[0].email
      }, config.jwtSecretKey, { expiresIn: '7h' })
    }

    throw new ApplicationException('Invalid user credentials supplied')
  }

  async create(user: CreateUserDto): Promise<void> {
    user.password = SHA('sha256').update(user.password).digest('base64')

    await connection.execute(
      'INSERT INTO auth_user(email, password, created_at) VALUES (?, ?, ?)',
      [user.email, user.password, new Date()]
    )
  }
}
