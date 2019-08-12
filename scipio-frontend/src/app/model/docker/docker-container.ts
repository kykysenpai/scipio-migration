import {DockerContainerVolume} from "./docker-container-volume";
import {DockerContainerPort} from "./docker-container-port";
import {DockerContainerEnvironment} from "./docker-container-environment";

export interface DockerContainer {
  id: number;
  image: string;
  alias: string;
  entrypoint: string;
  workingDir: string;
  stdinOpen: string;
  cmd: string;
  volumes: DockerContainerVolume[];
  ports: DockerContainerPort[];
  envs: DockerContainerEnvironment[];
}
