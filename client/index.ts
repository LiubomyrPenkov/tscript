(function (): void {
    const getAllUsersBtn: Node = document.getElementById('users');
    const findUsersForm: Node = document.getElementById('findForm');
    const addUserFrom: Node = document.getElementById('addForm');
    const content: Node = document.getElementById('content');

    getAllUsersBtn.addEventListener('click', getAllUsers);
    findUsersForm.addEventListener('submit', findUsers);
    addUserFrom.addEventListener('submit', addUser);
    content.addEventListener('click', deleteUser);

    function getAllUsers(): void {
        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('GET', '/users');
        xhr.send();

        xhr.onload = function (): void {
            const response = JSON.parse(xhr.response);
            createTable(response);
        };
    }

    function findUsers(e) {
        e.preventDefault();
        const params: {name: String, age: String, sex: String} = {
            name: e.target.name.value,
            age: e.target.age.value,
            sex: e.target.sex.value
        };
        this.reset();
        const query: URLSearchParams = new URLSearchParams();
        Object.keys(params).forEach((item)=>{
            if (params[item]) {
                query.append(item, params[item]);
            } 
        });

        const url = '/users?' + query;

        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();

        xhr.onload = function (): void {
            const response = JSON.parse(xhr.response);
            createTable(response);
        };
    }

    function addUser(e): void {
        e.preventDefault();
        const body: {name: String, age: String, sex: String} = {
            name: e.target.name.value,
            age: e.target.age.value,
            sex: e.target.sex.value
        };
        this.reset();

        const xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open('POST', '/users');
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(JSON.stringify(body));

        xhr.onload = function () {
            const response = JSON.parse(xhr.response);
            createTable(response);
            console.log(response.message);
        };
    }

    function deleteUser(e) {
        if (e.target.nodeName === 'BUTTON') {
            e.currentTarget.removeChild(e.target.closest('p'));

            const xhr = new XMLHttpRequest();
            xhr.open('DELETE', `/users/${e.target.dataset.id}`);
            xhr.send();
            xhr.onload = function () {
                const response = JSON.parse(xhr.response);
                console.log(response.message);
            };
        }
    }

    function createTable(data) {
        const listOfUsers = document.getElementById('content');
        listOfUsers.innerHTML = '';
        if (Array.isArray(data)) {
            const newList = document.createDocumentFragment();
            data.forEach((item, i) => {
                const person = document.createElement('p');
                const btn = document.createElement('button');
                const span = document.createElement('span');
                span.style.paddingLeft = '10px';
                btn.innerText = 'x';
                btn.dataset.id = item._id;
                span.innerText = `${item.name[0].toUpperCase() + item.name.slice(1)}(${item.sex}) - ${item.age}.`;
                person.appendChild(btn);
                person.appendChild(span);
                newList.appendChild(person);
            });
            listOfUsers.appendChild(newList);
        } else {
            listOfUsers.innerHTML = `<p>${data.message }</p>`;
        }
    }
})();
