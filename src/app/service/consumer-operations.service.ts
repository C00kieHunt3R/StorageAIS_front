import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ConsumerOperation} from "../model/model";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class ConsumerOperationsService {

  private apiBaseUrl = environment.apiBaseUrl + '/consumer-operation';

  constructor(private http: HttpClient,
              private token: TokenStorageService) {}

  public getAllConsumerOperations() :Observable<ConsumerOperation[]> {
    return this.http.get<ConsumerOperation[]>(this.apiBaseUrl, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }

  public createConsumerOperation(consumerOperation: ConsumerOperation): Observable<ConsumerOperation> {
    return this.http.post<ConsumerOperation>(this.apiBaseUrl, consumerOperation, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }
  public updateConsumerOperation(consumerOperation: ConsumerOperation): Observable<ConsumerOperation> {
    return this.http.put<ConsumerOperation>(this.apiBaseUrl + '/' + consumerOperation.id, consumerOperation, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }

  public deleteConsumerOperation(id: number) {
    return this.http.delete(this.apiBaseUrl + '/' + id, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }
}
