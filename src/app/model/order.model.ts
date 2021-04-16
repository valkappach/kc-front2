import {Client} from './client.model';
import {RoomItem} from './room-item.model';

export class Order {
  public id: number;
  public client: Client = {name: '', address: '', phoneNumber: '', email: '', username: ''};
  public rooms: Array<RoomItem> = [];
  public totalAmount: number;
  public date: Date;
}
