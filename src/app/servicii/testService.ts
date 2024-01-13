import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
  })
  export class TestAndroid {

    test:string = "";
    constructor(private http:HttpClient){

    }

    testBack(){
      console.log("test back")
        return this.http.post<string>(`api/test`, "merge")
    }
  }