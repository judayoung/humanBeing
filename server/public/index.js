import { compLoader } from './js/pageLoader.js';
import { getData } from './js/api.js';

compLoader('header', 'header.html');

async function getUsers() {
    const data = await getData('/users');
    console.log(data);

    // user_select에 option 태그를 추가
    const userSelect = document.getElementById('user_select');
    data.forEach((user) => {
        const option = document.createElement('option');
        option.value = user;
        option.text = user;

        if (user === 'judy') {
            option.selected = true;
        }
        userSelect.appendChild(option);
    });

    // selected 된 user의 데이터를 가져온다.
    const selectedUser = userSelect.options[userSelect.selectedIndex].value;
    const userData = await getData('/users/' + selectedUser);
    console.log(userData);
    // userData를 화면에 표시한다.
    document.getElementById('user_data').innerHTML = JSON.stringify(
        userData,
        null,
        2,
    );
}

getUsers();

document.getElementById('start').onclick = async function () {
    console.log('start clicked');

    const data = await getData('/songs');
    document.getElementById('data').innerHTML = JSON.stringify(data, null, 2);
};
