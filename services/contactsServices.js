import * as fs from "node:fs/promises";
import path from "node:path";

const contactsPath = path.resolve("db", "contacts.json");

//! функції helpers
async function readContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}
//! функції helpers

//! функції для роботи з contacts
async function listContacts() {
  const contacts = await readContacts();
  return contacts;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  // 1. зчитуємо всі контакти
  const contacts = await readContacts();

  // 2. повертаємо елемент масиву, а якщо нічого не знайдено то undefined
  const contact = contacts.find((contact) => contact.id === contactId);

  // 3. якщо контакт не знайдено то повертаємо null (find повертає undefined)
  if (typeof contact === "undefined") {
    return null;
  }

  return contact;
}

// getContactById("05olLMgyVQdWRwgKfg5J6");

// ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
async function removeContact(contactId) {
  // 1. зчитуємо книжки
  const contacts = await readContacts();

  // 2. шукаємо індекс книжки, тієї яку ми передаємо аргументом
  const index = contacts.findIndex((contact) => contact.id === contactId);

  // 3. findIndex повертає або індекс або -1, якщо не знайшли повертаємо null
  if (index === 1) {
    return null;
  }

  const deletedContact = contacts[index];

  contacts.splice(index, 1);

  await writeContacts(contacts);
  return deletedContact;
}

// removeContact("rsKkOQUi80UsgVPCcLZZW");

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contacts = await readContacts();
  // 2. створюємо новий контакт, додаючи власний id
  const newContacts = { id: crypto.randomUUID(), name, email, phone };

  // 3. додаємо в кінець контакт до інших книжок
  contacts.push(newContacts);

  // 4. перезаписуємо контакт (перетворюючи в JSON формат)
  await writeContacts(contacts);
  // 5. повертаємо користувачеві нову створену книжку
  console.log(newContacts);
  return newContacts;
}

async function updateContact(contactId, contactData) {
  const contacts = await readContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const updatedContact = { id: contactId, ...contactData };

  //* варіант 2, мутація
  contacts[index] = updatedContact;

  await writeContacts(contacts);

  return updatedContact;
}

// addContact("Adolf", "adic@gmail.com", "(704) 398-7993");

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
