export interface DockerContainer {
  id: number;
  image: string;
  alias: string;
  entrypoint: string;
  workingDir: string;
  stdinOpen: string;
  cmd: string;
  volumes: string;
  ports: string;
  envs: string;
}
