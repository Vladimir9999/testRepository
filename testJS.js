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
    static viewUser(container, user){
        for (let i = 0; i < count_users; i++)
        {
            let count_pub = user[i].publications.length;
            container.innerHTML += "User: " + user[i].FIO + ";";
            container.innerHTML += " Count publication: " + count_pub;
            container.innerHTML += ";<br>";
        }
    }
}

// Функция сортировки
function sortFunction(a, b){
    return a.FIO.localeCompare(b.FIO);
}

let create_user = function(name)
{
    users[count_users] = new User(name);
    for(let i = 0; i < arguments.length-1; i++)
    users[count_users].addPublication(arguments[i]);
    count_users++;
}
let users = [],
    count_users = 0,
    pub1 = new Publication("The name", "The content"),
    pub2 = new Publication("My pub", "My content");
for (let i = 6; i >= 0; i--)
    create_user("user"+i, pub1, pub2);

users.sort(sortFunction);

let container = document.getElementById("container");
View.viewUser(container, users);

