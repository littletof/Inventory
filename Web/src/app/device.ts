export class Device {
  description: string;
  id: number;
  name: string;

  static fromJSON(snap): any{
    let js = snap.payload.val();
    return {key: snap.payload.key, ...js};
  }
}
