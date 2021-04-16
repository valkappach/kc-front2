export interface Room {
  id: number;
  title: string;
  roomNumber:string;
  description: string;
  currentPrice: number;
  promotion: boolean;
  selected: boolean;
  available: boolean;
  photoName: string;
  quantity: number;
  _links: {
    self: {
      href: string;
    },
    room: {
      href: string;
    },
    roomtype: {
      href: string
    }
  }
}
