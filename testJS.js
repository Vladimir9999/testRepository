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
        if (arguments.length > 1)
        {
            for(let i = 1; i < arguments.length; i++)
                this.publications.push(arguments[i])
        }
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

    static viewUser(container,user,sortFunction){
        let usersCopy = users.slice();
        console.log(usersCopy[0].FIO);
        container.innerHTML = "";
        if (sortFunction != undefined)
            usersCopy.sort(sortFunction);
        for (let i = 0; i < usersCopy.length; i++)
        {
            let count_pub = usersCopy[i].publications.length;
            container.innerHTML += "User: " + usersCopy[i].FIO + ";";
            container.innerHTML += " Count publication: " + count_pub;
            container.innerHTML += ";<br>";
        }
    }
}

// Функция сортировки
let sort_up = function (a, b){
    console.log(a.FIO);
    return a.FIO.localeCompare(b.FIO);
}
let sort_down = function (a, b){
    return b.FIO.localeCompare(a.FIO);
}

let users = [],
    pub1 = new Publication("The name", "The content"),
    pub2 = new Publication("My pub", "My content");
/*for (let i = 6, j = 0; i >= 0; i--, j++)
    users[j] = new User("user"+i, pub1, pub2);*/

    users[0] = new User("User5", pub1);
    users[1] = new User("User1", pub1, pub1, pub1);
    users[2] = new User("User0", pub1, pub2);
    users[3] = new User("User3", pub2, pub1);
    users[4] = new User("User7");
    users[5] = new User("User4", pub1);
    users[6] = new User("User2", pub1, pub2, pub2);



let container = document.getElementById("container");
//View.viewUser(container,users);
View.viewUser(container,users, sort_up);



