import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Partner} from "../model/model";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class PartnerService {

  private apiBaseUrl = environment.apiBaseUrl + '/partner';

  constructor(private http: HttpClient,
              private token: TokenStorageService) {
  }

  public getAllPartners() : Observable<Partner[]> {
    return this.http.get<Partner[]>(this.apiBaseUrl, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken(),
      })
    });
  }

  public createPartner(partner: Partner) : Observable<Partner> {
    return this.http.post<Partner>(this.apiBaseUrl, partner, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken(),
      })
    });
  }

  public updatePartner(partner: Partner): Observable<Partner> {
    return this.http.put<Partner>(this.apiBaseUrl + '/' + partner.id, partner, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken(),
      })
    });
  }

  public deletePartner(id: number): Observable<HttpResponse<any>>{
    return this.http.delete<HttpResponse<any>>(this.apiBaseUrl + '/' + id, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken(),
      })
    });
  }

}
