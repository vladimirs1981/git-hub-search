function toggleDark() {
    var element = document.body;
    if (element.classList.contains('dark-mode')) {
        element.classList.remove('dark-mode');
        document.getElementById('dark').textContent = 'Dark';
    } else {
        element.classList.add('dark-mode');
        document.getElementById('dark').textContent = 'Light';
    }
}
