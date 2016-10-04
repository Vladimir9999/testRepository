/*
 1. Создать класс Publication с полями название, содержание, а также методы для изменения данных
 2. Создать класс User c полями ФИО, публикации, а также методы для изменения\добавления данных
 3. Создать класс View для отображения данных о пользователях (имя, кол-во публикаций),
 отображение списка пользователей опционально должно принимать функцию сортировки
 4. Создать страницу на которой будут отображены пользователи
 5. Все последовательные этапы создания приложения должны быть зафиксированы в недавно созданном репозитории на гитхаб
 */
//noinspection JSAnnotator

'use strict';
class Publication {
    constructor(name, content) {
        this._name = name;
        this._content = content;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value;
    }
}

class User {

    constructor(FIO) {
        this._FIO = FIO;
        this.publications = [];
    }

    get FIO() {
        return this._FIO;
    }

    set FIO(value) {
        this._FIO = value;
    }

    get pulications() {
        return this.pulications;
    }

    addPublication(value)
    {

        this.publications.push(value);
    }

}

class View
{
    viewUser(user){
        document.getElementById("container").innerHTML += "ФИО: " + user.FIO + "";
        document.getElementById("container").innerHTML += " Кол-во публикаций:" + user.publications.length;
    }
}

let pub = new Publication("The name", "The content"),
    pub1 = new Publication("My public", "My content"),
    user1 = new User("Мороз Владимир Николаевич");
user1.addPublication(pub);
user1.addPublication(pub1);
let v = new View;
v.viewUser(user1);
