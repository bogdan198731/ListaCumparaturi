import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class TestAndroid {

    constructor(private http:HttpClient){

    }
    testBack(){
        return this.http.post<string>(`api/test`, "merge")
    }
  }