import {UserStatus} from './type/UserStatus';

export class User {
  id?: number = null;
  googleId?: string;
  nickName: string;
  // status?: UserStatus;
  snils?: string;
  surname: string;
  name: string;
  patronymic: string;
  phone: string;
  postcode?: number;
  money?: number;

  constructor(id?: number, googleId?: string, nickName: string = '',
              snils?: string, surname: string = '', name: string = '', patronymic: string = '', phone: string = '',
              postcode?: number, money?: number) {
    if (id == undefined) {
      this.id = null;
    } else {
      this.id = id;
    }

    if (googleId == undefined) {
      this.googleId = null;
    } else {
      this.googleId = googleId;
    }



    if (postcode == undefined) {
      this.postcode = null;
    } else {
      this.postcode = postcode;
    }

    if (money == undefined) {
      this.money = null;
    } else {
      this.money = money;
    }

    if (snils == undefined) {
      this.snils = null;
    } else {
      this.snils = snils;
    }



    this.nickName = nickName;
    this.surname = surname;
    this.name = name;
    this.patronymic = patronymic;
    this.phone = phone;
  }

  static getInstance(obj: User): User {
    if (obj == null) {
      return new User();
    }

    const newObj: User = new User(
      obj.id,
      obj.googleId,
      obj.nickName,
      obj.snils,
      obj.surname,
      obj.name,
      obj.patronymic,
      obj.phone,
      obj.postcode,
      obj.money
    );
    return newObj;
  }

}


