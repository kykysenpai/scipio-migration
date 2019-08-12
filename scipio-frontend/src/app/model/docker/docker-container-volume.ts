import {DockerContainer} from "./docker-container";

export interface DockerContainerVolume {
  id: number;
  volumePath: string;
  container: DockerContainer;
}
