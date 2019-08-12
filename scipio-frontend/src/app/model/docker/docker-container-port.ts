import {DockerContainer} from "./docker-container";

export interface DockerContainerPort {
  id: number;
  portBinding: string;
  container: DockerContainer;
}
