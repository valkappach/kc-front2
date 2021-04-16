
import {Client} from './client.model';
import {RoomItem} from './room-item.model';

export class Caddy {
  constructor(name: string) {this.name = name; }
  public name: string;
  public items: Map<number, RoomItem> = new Map();
  public client: Client;
}
