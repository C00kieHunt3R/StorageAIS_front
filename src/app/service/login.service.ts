import {HttpClient, HttpHeaders} from "@angular/common/http"
import {Injectable} from "@angular/core"
import {Observable} from "rxjs"
import {environment} from "../../environments/environment";
import {JwtResponse} from "../auth-model/jwt-response";
import {EmployeeInformation} from "../model/model";



@Injectable()
export class LoginService {

  private loginUrl = environment.apiBaseUrl + '/auth/login';
  private registerUrl = environment.apiBaseUrl + '/auth/register';
  public isLoggedIn: boolean;

  constructor(private http: HttpClient) { }

  auth(employeeInformation: EmployeeInformation): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, employeeInformation);
  }

  register(employeeInformation: EmployeeInformation): Observable<string> {
    return this.http.post<string>(this.registerUrl, employeeInformation);
  }


}
