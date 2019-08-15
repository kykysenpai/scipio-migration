import {StompConfig, StompService} from "@stomp/ng2-stompjs";

export function stompServiceFactory(stompConfig: StompConfig): StompService {
  return new StompService(stompConfig);
}
