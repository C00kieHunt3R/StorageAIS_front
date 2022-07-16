import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {SupplierOperation} from "../model/model";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class SupplierOperationsService {

  private apiBaseUrl = environment.apiBaseUrl + '/supplier-operation';

  constructor(private http: HttpClient,
              private token: TokenStorageService) {}

  public getAllSupplierOperations() :Observable<SupplierOperation[]> {
    return this.http.get<SupplierOperation[]>(this.apiBaseUrl, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }

  public createSupplierOperation(supplierOperation: SupplierOperation): Observable<SupplierOperation> {
    return this.http.post<SupplierOperation>(this.apiBaseUrl, supplierOperation, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }
  public updateSupplierOperation(supplierOperation: SupplierOperation): Observable<SupplierOperation> {
    return this.http.put<SupplierOperation>(this.apiBaseUrl + '/' + supplierOperation.id, supplierOperation, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }

  public deleteSupplierOperation(id: number) {
    return this.http.delete(this.apiBaseUrl + '/' + id, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }
}
