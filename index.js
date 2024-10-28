// //Validate emails
// let upload = document.getElementById('upload');
// upload.addEventListener('change', () => {
//     let fr = new FileReader();
//     fr.readAsText(upload.files[0]);
//     fr.onload = function () {

//         let Arr = fr.result.split(/\r?\n|\n/).map(e => {
//             return e.split(',');
//         });
//         Window.valNo = 0;
//         let invalNo = 0;
//         Window.valMail = [];
//         Arr.forEach(e => {
//             let em = String(e);
//             let m = e.map(e => {
//                 return `<td>${e}</td>`; //table data
//             })
//             let creEle = document.createElement("tr"); //table row
//             creEle.innerHTML = m;
//             if (em != "") { // Blank row will not print and counted
//                 if (em.charAt(em.length - 4) == '.') {
//                     document.querySelector("table#val").appendChild(creEle);
//                     Window.valMail.push(em);
//                     Window.valNo = Window.valNo + 1;
//                     return false;
//                 }
//                 else if (em.charAt(em.length - 3) == '.') {
//                     document.querySelector("table#val").appendChild(creEle);
//                     Window.valMail.push(em);
//                     Window.valNo = Window.valNo + 1;
//                     return false;
//                 }
//                 else {
//                     document.querySelector("table#inval").appendChild(creEle);
//                     invalNo = invalNo + 1;
//                     // console.log(creEle);
//                     return false;
//                 }
//             }
//         });

//         document.querySelector('#valCount').innerHTML = Window.valNo;
//         document.querySelector('#invalCount').innnerHTML = invalNo;
//     };
// });
// //Send email 

// function sendEmail() {
//     Email.send({
//         Host: "smtp.elasticemail.com",
//         Username: "2010047@ritindia.edu",
//         Password: "password",
//         To: "2010047@ritindia.edu",
//         From: "2010047@ritindia.edu",
//         Subject: document.querySelector('#subject').value,
//         Body: document.getElementById('msg').value
//     }).then(
//         message => alert(Window.valNo + " mails has been sent successfully.")
//     );
//     console.log(document.getElementById('msg').value);
//     console.log(document.getElementById('msg').innerHTML);
//     console.log(document.getElementById('msg').innerText);
// }

const uploadForm = document.getElementById('upload-form');
const csvFileInput = document.getElementById('csv-file');
const uploadBtn = document.getElementById('upload-btn');
const invalidEmailsDiv = document.getElementById('invalid-emails');
const validEmailsDiv = document.getElementById('valid-emails');
const sendEmailBtn = document.getElementById('send-email-btn');

uploadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const csvFile = csvFileInput.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        const csvData = reader.result;
        const emails = csvData.split('\n');
        const invalidEmails = [];
        const validEmails = [];

        emails.forEach((email) => {
            if (!validateEmail(email)) {
                invalidEmails.push(email);
            } else {
                validEmails.push(email);
            }
        });

        displayInvalidEmails(invalidEmails);
        displayValidEmails(validEmails);
    };
    reader.readAsText(csvFile);
});

sendEmailBtn.addEventListener('click', () => {
    // Send mass email logic goes here
    console.log('Sending mass email...');
});

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function displayInvalidEmails(invalidEmails) {
    const invalidEmailList = document.getElementById('invalid-email-list');
    invalidEmailList.innerHTML = '';
    invalidEmails.forEach((email) => {
        const li = document.createElement('li');
        li.textContent = email;
        invalidEmailList.appendChild(li);
    });
}

function displayValidEmails(validEmails) {
    const validEmailList = document.getElementById('valid-email-list');
    validEmailList.innerHTML = '';
    validEmails.forEach((email) => {
        const li = document.createElement('li');
        li.textContent = email;
        validEmailList.appendChild(li);
    });
}