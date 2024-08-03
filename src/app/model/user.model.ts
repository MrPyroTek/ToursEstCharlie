// firebase-user.model.ts
export class FirebaseUserModel {
  key?: string;           // Add key property for user ID
  name: string;
  image: string;
  provider: string;
  trophies?: { [key: string]: boolean };  // Optional trophies property

  constructor(data: { key?: string; name?: string; image?: string; provider?: string; trophies?: { [key: string]: boolean } } = {}) {
    this.key = data.key;
    this.name = data.name || '';
    this.image = data.image || '';
    this.provider = data.provider || '';
    this.trophies = data.trophies;
  }
}
