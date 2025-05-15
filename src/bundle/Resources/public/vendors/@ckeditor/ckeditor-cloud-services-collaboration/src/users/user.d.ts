import { IWebSocketGateway } from '../websocketgateway/websocketgateway.js';
interface IUserData extends Record<string, unknown> {
    id?: string;
}
/**
 * Represents User entity.
 */
declare class User {
    static readonly _SERVICE: number;
    readonly id?: string;
    private readonly _attributes;
    /**
     * Creates User object. Passed attributes will be set on instance as a read-only attributes.
     * Passing undefined or empty object will create "Anonymous" object.
     */
    constructor(attributes?: IUserData);
    /**
     * Creates User from data object, ie. from token data.
     *
     *     const user = User.fromData( { id: '1234', name: 'Bob' } );
     *
     *     // Anonymous user will have no attributes.
     *     const anonymous = User.fromData();
     */
    static fromData(data: IUserData): User;
    /**
     * Returns existing User from server or create a User object.
     *
     *     const user = await User.get( wsGateway, '1234' );
     */
    static get(wsGateway: IWebSocketGateway, id: string): Promise<User>;
    /**
     * Returns existing Users from server or create a User objects.
     *
     *     const users = await User.getMany( wsGateway, ['1234', '5678'] );
     */
    static getMany(wsGateway: IWebSocketGateway, ids: string[]): Promise<User[]>;
}
declare interface User extends Record<string, unknown> {
}
export default User;
