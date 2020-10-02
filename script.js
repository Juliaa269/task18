const DELETE_BTN_CLASS = 'delete-btn';

const addContactForm = document.getElementById('addContactForm');
const contactNameInput = document.getElementById('contactNameInput');
const contactNumberInput = document.getElementById('contactNumberInput');
const contactEmailInput = document.getElementById('contactEmailInput');
const contactActionInput = document.getElementById('contactActionInput');
const contactList = document.getElementById('contactList');
const contactItemTemplate = document.getElementById('contactItemTemplate').innerHTML;

let addContactList = [];

addContactForm.addEventListener('submit', onAddContactFormSubmit);
contactList.addEventListener('click', onContactListCLick);

init();

function onAddContactFormSubmit(event) {
    event.preventDefault();

    submitForm();
}

function onContactListCLick(event) {
    if (event.target.classList.contains(DELETE_BTN_CLASS)) {
        deleteContact(event.target.parentElement);
    }
}

function init() {
    restoreData();
    renderList();
}

function submitForm() {
    const contactItem = {
        id: Date.now(),
        nameContact: contactNameInput.value,
        numberContact: contactNumberInput.value,
        emailContact: contactEmailInput.value,
        actionContact: contactActionInput.value,
    };

    addContact(contactItem);
    clearForm();
}

function addContact(contactItem) {
    addContactList.push(contactItem);

    saveData();

    renderTask(contactItem);
}

function clearForm(){
    contactNameInput.value = "";
    contactNumberInput.value = "";
    contactEmailInput.value = "";
    contactActionInput.value = "";
}

function renderList() {
    addContactList.forEach((contactItem) => renderTask(contactItem));
}

function renderTask(contactItem) {
    const html = contactItemTemplate
        .replace('{{id}}', contactItem.id)
        .replace('{{name}}', contactItem.nameContact)
        .replace('{{number}}', contactItem.numberContact)
        .replace('{{email}}', contactItem.emailContact)
        .replace('{{action}}', contactItem.actionContact)
    contactList.insertAdjacentHTML('beforeend', html);
}

function toggleContactState(el) {
    console.log(el.dataset.contactId);
    const contactId = el.dataset.contactId;
    const contact = addContactList.find((item) => item.id == contactId);

    saveData();
}

function deleteContact(el) {
    const contactId = +el.dataset.contactId;
    addContactList = addContactList.filter((item) => item.id !== contactId);

    saveData();

    el.remove();
}

function saveData() {
    localStorage.setItem('addContactList', JSON.stringify(addContactList));
}

function restoreData() {
    const data = localStorage.getItem('addContactList');
    addContactList = data ? JSON.parse(data) : [];
}