const form = document.getElementById('connectForm');
const usersList = document.getElementById('users');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  if (username) {
    const li = document.createElement('li');
    li.textContent = username;
    usersList.appendChild(li);
    document.getElementById('username').value = '';
  }
});
