const DELETE_BTN_CLASS = 'delete-btn';
const UPDATE_BTN_CLASS = 'update-btn';
const CONTACTS_URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/contacts/';

const addContactForm = document.getElementById('addContactForm');
const contactNameInput = document.getElementById('contactNameInput');
const contactSurnameInput = document.getElementById('contactSurnameInput');
const contactPhoneInput = document.getElementById('contactPhoneInput');
const contactList = document.getElementById('contactList');
const contactItemTemplate = document.getElementById('contactItemTemplate').innerHTML;

let listAddedContacts = [];

addContactForm.addEventListener('submit', onAddContactFormSubmit);
contactList.addEventListener('click', onContactListCLick);

init();

function onAddContactFormSubmit(e) {
    e.preventDefault();

    submitForm();
}

function onContactListCLick(e) {
    switch(true) {
        case e.target.classList.contains(DELETE_BTN_CLASS):
            deleteContact(e.target.parentElement.dataset.id);
            break;
        case e.target.classList.contains(UPDATE_BTN_CLASS):
            updateContact(e.target.parentElement.dataset.id);
            break;
    }
}

function init() {
    getList();
}

function getList() {
    return fetch(CONTACTS_URL)
        .then((res) => res.json())
        .then((data) => (listAddedContacts = data))
        .then(renderList);
}

function renderList(list) {
    contactList.innerHTML = list
        .map((contact) =>  
        {
            return contactItemTemplate 
                .replace('{{id}}', contact.id)
                .replace('{{name}}', contact.name)
                .replace('{{surname}}', contact.surname)
                .replace('{{phone}}', contact.phone)
        })
        .join('');
}

function submitForm() {
    if (isFormValid()){
        const contactItem = {
            id: Date.now(),
            name: contactNameInput.value,
            surname: contactSurnameInput.value,
            phone: contactPhoneInput.value,
        };

        addContact(contactItem).then(getList);
        clearForm();
    } else {
        alert('Неверные данные. Введите заново')
    }
}

function isFormValid(){
    return contactNameInput.value !== '' && contactSurnameInput.value !== '' && contactPhoneInput.value !== '';
}

function addContact(contact) {
    return fetch(CONTACTS_URL, {
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

function deleteContact(id){
    fetch(CONTACTS_URL + id, {
        method: 'DELETE',
    }).then(getList); 
}

function clearForm(){
    contactNameInput.value = "";
    contactSurnameInput.value = "";
    contactPhoneInput.value = "";
}

// function updateContact(id, contactItem) {
//     fetch(CONTACTS_URL + id, {
//         method: 'PUT',
//         body: JSON.stringify(contactItem),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }).then(getList); 
// }
