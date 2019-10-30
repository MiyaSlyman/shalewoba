import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from "rxjs";
import {CustomHttpUrlEncodingCodec} from "./encoder";
@Injectable()
export class ShowService {
  private baseUrl: string = "/api";

  constructor(private http: HttpClient) {
  }

  getBuildingList(offset: number, limit: number): Observable<BuildingList> {
    let httpParams = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    httpParams = httpParams.set("limit", <any> limit);
    httpParams = httpParams.set("offset", <any> offset);
    return this.http.get<BuildingList>(this.baseUrl + '/buildingList', {
      params: httpParams
    });
  }

  getFloorList(name: string, offset: number, limit: number): Observable<FloorList> {
    let params = new HttpParams();
    params = params.set("limit", limit.toString());
    params = params.set("offset", offset.toString());
    params = params.set("name", name);
    return this.http.get<FloorList>(this.baseUrl + '/floorList', {
      params: params
    });
  }

  getRoomList(name: string, floor: number, offset: number, limit: number): Observable<RoomList> {
    let params = new HttpParams();
    params = params.set("limit", limit.toString());
    params = params.set("offset", offset.toString());
    params = params.set("name", name);
    params = params.set("floor", floor.toString());
    return this.http.get<RoomList>(this.baseUrl + '/roomList', {
      params: params
    });
  }

  getImage(name: string, floor: number, room: string): Observable<ImageUrl> {
    let params = new HttpParams();
    params = params.set("name", name);
    params = params.set("floor", floor.toString());
    params = params.set("room", room.toString());
    return this.http.get<ImageUrl>(this.baseUrl + '/imageUrl', {
      params: params
    });
  }

  getPointList(name: string, floor: number, room: string, offset: number, limit: number): Observable<PointList> {
    let params = new HttpParams();
    // params = params.set("limit", limit.toString());
    // params = params.set("offset", offset.toString());
    // params = params.set("name", name);
    // params = params.set("floor", floor.toString());
    // params = params.set("room", room.toString());
    return this.http.get<PointList>(this.baseUrl + '/getpoint', {
      params: params
    });
  }
}

export class BuildingList{
  buildingList:string[];
}

export class FloorList{
  floorList:number[];
}

export class RoomList{
  roomList:string[];
}
export class PointList{
  pointList:{x:number,y:number,time:number,uID:string}[];
}
export class ImageUrl{
  url:string[];
}
