function openEmail() {
    var email = 'davidcailiang9@gmail.com';
    var subject = 'Question';
    var stuff = 'Hello,\n\nI have a question:';
    window.location.href = 'mailto:' + email + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(stuff);
}
