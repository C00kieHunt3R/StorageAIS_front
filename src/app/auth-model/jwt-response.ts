export class JwtResponse {

  token: string;
  username: string;
  employeeType: string;

  constructor(token: string, username: string, employeeType: string) {
    this.token = token;
    this.username = username;
    this.employeeType = employeeType;
  }
}
