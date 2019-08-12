import {DockerContainer} from "./docker-container";

export interface DockerContainerEnvironment {
  id: number;
  env: string;
  container: DockerContainer;
}
