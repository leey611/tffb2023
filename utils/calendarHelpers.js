export function pad(num) {
    if (num < 10) {
        return "0" + num;
    }
    return "" + num;
}
export function formatDate(dateString) {
    var dateTime = new Date(dateString);
    return [
        dateTime.getUTCFullYear(),
        pad(dateTime.getUTCMonth() + 1),
        pad(dateTime.getUTCDate()),
        "T",
        pad(dateTime.getUTCHours()),
        pad(dateTime.getUTCMinutes()) + "00Z"
    ].join("");
}
export function buildUrl(event, useDataURL, rawContent) {
    if (useDataURL === void 0) { useDataURL = false; }
    if (rawContent === void 0) { rawContent = ""; }
    var body = [];
    if (!event || !event.startTime || !event.title)
        throw Error("Both startTime and title fields are mandatory");
    body.push("DTSTART:" + formatDate(event.startTime));
    body.push("SUMMARY:" + event.title);
    event.url && body.push("URL:" + event.url);
    event.attendees &&
        event.attendees.forEach(function (attendee) {
            var regExp = /^([^<]+)\s*<(.+)>/;
            var matches = attendee.match(regExp);
            if (matches) {
                var name_1 = matches[1];
                var email = matches[2];
                body.push([
                    "ATTENDEE",
                    "CN=" + name_1,
                    "CUTYPE=INDIVIDUAL",
                    "PARTSTAT=NEEDS-ACTION",
                    "ROLE=REQ-PARTICIPANT",
                    "RSVP=TRUE:mailto:" + email
                ].join(";"));
            }
        });
    event.endTime && body.push("DTEND:" + formatDate(event.endTime));
    event.description && body.push("DESCRIPTION:" + event.description);
    event.location && body.push("LOCATION:" + event.location);
    rawContent && body.push(rawContent);
    var url = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "BEGIN:VEVENT",
        body.join("\n"),
        "END:VEVENT",
        "END:VCALENDAR"
    ].join("\n");
    if (useDataURL) {
        return encodeURI("data:text/calendar;charset=utf8," + url);
    }
    else {
        return url;
    }
}
export function downloadBlob(blob, filename) {
    var linkEl = document.createElement("a");
    linkEl.href = window.URL.createObjectURL(blob);
    linkEl.setAttribute("download", filename);
    document.body.appendChild(linkEl);
    linkEl.click();
    document.body.removeChild(linkEl);
}
export function isIOSSafari() {
    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    var webkit = !!ua.match(/WebKit/i);
    return iOS && webkit && !ua.match(/CriOS/i);
}
export function isIOSChrome() {
    var ua = window.navigator.userAgent;
    var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
    return iOS && !!ua.match(/CriOS/i);
}