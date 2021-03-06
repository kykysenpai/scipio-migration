import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DockerContainer} from "../../model/docker/docker-container";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DockerService {

  constructor(private http: HttpClient) {
  }

  getAllSavedContainers(): Observable<DockerContainer[]> {
    return this.http.get<DockerContainer[]>(environment.apiBaseUrl + "/api/docker/saved-containers");
  }

  getSavedContainer(alias: string): Observable<DockerContainer> {
    return this.http.get<DockerContainer>(environment.apiBaseUrl + "/api/docker/saved-containers/" + alias);
  }

  deleteContainer(savedContainer: DockerContainer): Observable<void> {
    return this.http.delete<void>(environment.apiBaseUrl + "/api/docker/saved-containers/" + savedContainer.id);
  }

  createOrUpdateContainer(savedContainer: DockerContainer): Observable<DockerContainer> {
    return this.http.post<DockerContainer>(environment.apiBaseUrl + "/api/docker/saved-containers", savedContainer);
  }


}
