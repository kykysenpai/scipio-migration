import {InjectableRxStompConfig, StompConfig} from "@stomp/ng2-stompjs";
import {environment} from "../../environments/environment";

export const stompConfig: InjectableRxStompConfig = {
  brokerURL: environment.socketBaseUrl + '/socket',
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
  debug: (msg: string): void => {
    console.log(msg);
  }
};
