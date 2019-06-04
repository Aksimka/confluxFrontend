export default class UserData {
    constructor(id, name, mail, password, lastVisit, avatar, friends, dialogs){
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.password = password;
        this.lastVisit = lastVisit;
        this.avatar = avatar;
        this.friends = friends;
        this.dialogs = dialogs;
    }
}