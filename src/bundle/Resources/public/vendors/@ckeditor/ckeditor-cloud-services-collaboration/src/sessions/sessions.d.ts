import SessionCollection from './sessioncollection.js';
import { IWebSocketGateway } from '../websocketgateway/websocketgateway.js';
/**
 * Abstracts requesting connected Sessions for services. Should not be used directly
 */
export default class Sessions {
    /**
     * Returns a Promise that resolves with read-only observable collection with EndUsers Sessions for given service instance.
     *
     *    const sessions = await wsGateway.getConnectedSessions( wsGateway, 'some-uuid', 'session-type' );
     */
    static getConnectedSessions(wsGateway: IWebSocketGateway, id: string, sessionType: number): Promise<SessionCollection>;
}
