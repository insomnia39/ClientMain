import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProfile } from '../model/IProfile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService{
  url = environment.url.profile;
  profile: IProfile = {}
  qProfile?: BehaviorSubject<IProfile> = new BehaviorSubject<IProfile>(this.profile);

  constructor(private http: HttpClient) {
    this.qProfile?.subscribe(p => this.profile = p);
    this.init();
  }

  init(){
    this.getLocalProfile();
    if(this.profile.id) return;
    let inputUsername = prompt("Input Username");
    while(!inputUsername) {
      inputUsername = prompt("Input Username");
      if(inputUsername) break;
      alert("Username must be filled!");
    }
    this.getProfile(inputUsername);
  }

  getProfile(username: string) {
    let params = new HttpParams().set("username", username);
    this.http.get<IProfile>(this.url + "profile", { params: params }).subscribe(p => {
      this.qProfile?.next(p);
      this.getPoint(p.id || "");
      this.setLocalProfile();
    });
  }

  getPoint(profileId: string) {

  }

  setProfilePicture() {

  }

  setLocalProfile() {
    localStorage.setItem("profile", JSON.stringify(this.profile));
  }

  getLocalProfile(){
    let localProfile = localStorage.getItem("profile");
    if(!localProfile) return;
    let nextProfile = <IProfile> JSON.parse(localProfile);
    this.qProfile?.next(nextProfile);
  }

  removeLocalProfile(){
    localStorage.removeItem("profile");
    this.profile.id = "";
  }
}
