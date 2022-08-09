document.addEventListener('DOMContentLoaded', () => {
    let googleBtn = document.querySelector('.get-btn');
    let googleResult = document.querySelector('.my-google-tables');

    let googleMessBtn = document.querySelector('.get-message');
    let googleMessage = document.querySelector('.my-google-message');

    let form = document.querySelector('.main-form');
    let submit = document.querySelector('.btn-get');



    let allData = [];
    let allRowsArr = [];
    let mainArr = [];

    class TableRow {
        constructor(name, age, phone, message) {
            this.name = name;
            this.age = age;
            this.phone = phone;
            this.message = message;
        }
    }

    class Data{
        constructor(status, data) {
            this.status = status;
            this.data = data;
        }
    }

    googleBtn.addEventListener('click', () => {
        fetch('https://docs.google.com/spreadsheets/d/1zBYWv9tV6ySjO-pxHZAL-EAuiLf2flu2fGbI5XAxrAU/gviz/tq?tqx=out:html&tq=select+A,B,C,D')
            .then(resp => resp.text())
            .then(resp => {
                let parser = new DOMParser();
                let doc = parser.parseFromString(resp, "text/html");
                let table = doc.querySelector('table');

                tableStyle(table);
                getMainArr(getRows(table));
            })
    });

    function tableStyle(table) {
        table.classList.add('my-table');
        googleResult.innerHTML = '';
        googleResult.append(table);
    }

    function getRows(table) {
        for (let i = 1; i < table.rows.length; i++) {
            for (let j = 0; j < 4; j++) {
                allRowsArr.push(table.rows.item(i).cells[j].textContent);
            }
            allRowsArr.push('/*/');
        }
        return allRowsArr.toString();
    }

    function getMainArr(str) {
        allData = str.split('/*/');
        if (allData[0] === '') allData.shift();
        if (allData[allData.length - 1] === '') allData.pop();

        for (let i = 0; i < allData.length; i++){
            let a = allData[i];
            let b = a.split(',');
            if (b[0] === '') b.shift();
            if (b[b.length - 1] === '') b.pop();

            let name = b[0];
            let age = b[1];
            let phone = b[2];
            let message = b[3];

            let obj = new TableRow(name,age,phone,message);
            mainArr.push(obj);
        }
    }

    googleMessBtn.addEventListener('click', () => {

        let fullResult = new Data('result', mainArr);
        JSON.stringify(fullResult);
        console.log(fullResult);

    })

    submit.addEventListener('click', () => {
        form.submit();
        alert('hello')
        window.open('https://stanislav-gupalyuk.github.io/index.html');


    })
    console.log(mainArr);
});