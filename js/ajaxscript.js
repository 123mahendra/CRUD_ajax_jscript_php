//Ajax  request for retrieving data
let tbody = document.getElementById("tbody");

function showdata() {
    tbody.innerHTML = "";
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "retrieve.php", true);
    xhr.responseType = "json";
    xhr.onload = () => {
        if (xhr.status === 200) {
            // console.log(xhr.response);
            if (xhr.response) {
                x = xhr.response;
            } else {
                x = "";
            }
            for (i = 0; i < x.length; i++) {
                tbody.innerHTML += "<tr><td>" + x[i].id + "</td><td>" + x[i].name + "</td><td>" + x[i].email + "</td><td> <button class=' btn-warning btn-sm btn-edit' data-sid=" + x[i].id + ">Edit</button> <button class=' btn-danger btn-sm btn-del' data-sid=" + x[i].id + ">Delete </button></td></tr>";
            }
        } else {
            console.log("Problem Occured");
        }
        delete_student();
        edit_student();
    };
    xhr.send();
}
showdata();

//Ajax Request For Insert OR Update Data

document.getElementById("btnadd").addEventListener("click", add_student);

function add_student(e) {
    e.preventDefault();
    console.log("Add Button Clicked");
    let stid = document.getElementById("stuid").value;
    let nm = document.getElementById("nameid").value;
    let em = document.getElementById("emailid").value;
    let pw = document.getElementById("passwordid").value;
    // console.log(nm);
    // console.log(em);
    // console.log(pw);

    //Creating XHR Object     ..const/let??
    let xhr = new XMLHttpRequest();

    //initilize
    xhr.open("POST", "insert.php", true);

    //set Request Header
    xhr.setRequestHeader("Content-Type", "application/json");

    //handle respose
    xhr.onload = () => {
        if (xhr.status === 200) {
            // console.log(xhr.responseText);
            //response handling code
            document.getElementById("msg").innerHTML = "<div class='alert-dark mt-3 text-center p-2' role='alert'>" + xhr.responseText + "</div>";
            document.getElementById("form").reset();
            showdata();
        } else {
            console.log("Problem Occured");
        }
    };
    //JavaScript Object
    let mydata = { id: stid, name: nm, email: em, password: pw };
    // console.log(mydata);

    //Converts Javascript Object to JSON string
    let data = JSON.stringify(mydata);
    // console.log(data);

    //send Request with Data
    xhr.send(data);

}

// Ajax call for Delete Record
function delete_student() {
    var x = document.getElementsByClassName("btn-del");
    // console.log(x);
    // console.log(x.length);  
    for (let i = 0; i < x.length; i++) {
        // console.log(x[i].getAttribute("data-sid"));
        x[i].addEventListener("click", function() {
            id = x[i].getAttribute("data-sid");
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "delete.php", true);
            xhr.setRequestHeader("content-Type", "application/json");
            xhr.onload = () => {
                if (xhr.status === 200) {
                    // console.log(xhr.response);
                    //response handling code
                    document.getElementById("msg").innerHTML = "<div class='alert-dark mt-3 text-center p-2' role='alert'>" + xhr.responseText + "</div>";
                    showdata();
                } else {
                    console.log("Problem Occured");
                }
            };
            let mydata = { sid: id };
            let data = JSON.stringify(mydata);
            xhr.send(data);
        });
    }
};

//Ajax call for EDit Record
function edit_student() {
    var x = document.getElementsByClassName("btn-edit");
    let stid = document.getElementById("stuid");
    let nm = document.getElementById("nameid");
    let em = document.getElementById("emailid");
    let pw = document.getElementById("passwordid");
    // console.log(x);
    // console.log(x.length);  

    for (let i = 0; i < x.length; i++) {
        // console.log(x[i].getAttribute("data-sid"));
        x[i].addEventListener("click", function() {
            id = x[i].getAttribute("data-sid");
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "edit.php", true);
            xhr.responseType = "json";
            xhr.setRequestHeader("content-Type", "application/json");
            xhr.onload = () => {
                if (xhr.status === 200) {
                    // console.log(xhr.response);
                    //response handling code
                    a = xhr.response;
                    stid.value = a.id;
                    nm.value = a.name;
                    em.value = a.email;
                    pw.value = a.password;
                } else {
                    console.log("Problem Occured");
                }
            };
            let mydata = { sid: id };
            let data = JSON.stringify(mydata);
            xhr.send(data);
        });
    }
};