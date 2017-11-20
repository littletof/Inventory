export class Device {
  description: string;
  name: string;

  quantity_available: number;
  quantity_total: number;
  tags = {};
  image : string;

  constructor(_name: string, _qt: number, _desc: string, _tags: {}, _img: string){
    this.name = _name;
    this.quantity_available = _qt;
    this.quantity_total = _qt;
    this.description = _desc;
    this.tags = _tags;
    this.image = _img;
  }

  static fromJSON(snap): any{
    let js = snap.payload.val();
    return {key: snap.payload.key, ...js};
  }
}
