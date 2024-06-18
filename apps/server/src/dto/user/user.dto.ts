import { ApiProperty } from '@nestjs/swagger';
export class CreateUser {
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class SignInUser {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}
