import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Product} from "../model/model";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class ProductService {

  private apiBaseUrl = environment.apiBaseUrl + '/product';

  constructor(private http: HttpClient,
              private token: TokenStorageService) {
  }

  public getAllProducts() : Observable<Product[]> {
    return this.http.get<Product[]>(this.apiBaseUrl, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }

  public createProduct(product: Product) : Observable<Product> {
    return this.http.post<Product>(this.apiBaseUrl, product, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.apiBaseUrl + '/' + product.id, product, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.apiBaseUrl + '/' + id, {
      headers: new HttpHeaders({
        GimmeTheJobPlz: this.token.getToken()
      })
    });
  }

}
