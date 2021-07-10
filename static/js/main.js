var originalValue;

function makeEditable(elem) {

    if (elem.children[0] == undefined) {
        index = trackIndex(elem);
        originalValue = elem.innerHTML;
        var node;
        elemType = elem.getAttribute('data-type');
        elemValue = elem.innerHTML;

        switch (elemType) {
            case "select":
                if (elem.querySelectorAll("select").length !== 0) {
                    break;
                } else {
                    node = document.createElement("select");
                    for (var i = 0; i < options.length; i++) {
                        let tmp = document.createElement("option");
                        tmp.text = options[i];
                        if (elemValue == tmp.text) {
                            tmp.setAttribute("selected", "true");
                        }
                        node.add(tmp);
                    }
                    elem.innerHTML = "";
                    elem.appendChild(node).focus();
                    addFocusOutListener(node);
                    break;
                }

            case "text":
                if (elem.querySelectorAll("input").length !== 0) {
                    break;
                } else {
                    node = document.createElement("input");
                    node.setAttribute("type", "text");
                    node.setAttribute("value", elemValue);
                    elem.innerHTML = "";
                    elem.appendChild(node).focus();
                    addFocusOutListener(node);
                    break;
                }

            default:
                break;
        };
    };

    function addFocusOutListener(elem) {
        elem.addEventListener("keydown", function (event) {
            if ((event.keyCode == 13)) {
                event.preventDefault();
                this.blur();
            }
        });
        elem.addEventListener("blur", function (event) {
            deselectElement(this);
        });
    }
};

function trackIndex(elem) {
    const index = Array.from(elem.parentElement.children).indexOf(elem);

    return index;
};

function deselectElement(elem) {
    var originalHTML = originalValue;
    var newInnerHTML = elem.value;
    if (originalHTML != newInnerHTML) {
        updateField(elem);
    } else {
        console.log("Element unchanged, not updating...");
        elem.parentNode.innerHTML = originalHTML;
        return false;
    };

    elem.parentNode.innerHTML = newInnerHTML;
    return false;
};

function updateField(elem) {
    let itemId = elem.parentElement.parentElement.children[0].querySelector("input[name='id']").value;
    let dataId = elem.parentElement.getAttribute("data-id");
    let title = elem.parentElement.parentElement.querySelector("td[data-id='title']").innerHTML;
    let status = elem.parentElement.parentElement.querySelector("td[data-id='status']").innerHTML;
    let description = elem.parentElement.parentElement.querySelector("td[data-id='description']").innerHTML;

    if (dataId == "title") {
        title = elem.parentElement.parentElement.querySelector("td[data-id='title'] > input[type='text']").value;
    } else if (dataId == "description") {
        description = elem.parentElement.parentElement.querySelector("td[data-id='description'] > input[type='text']").value;
    } else if (dataId == "status") {
        console.log("ORIGINAL ELEM: " + elem);
        elem = document.querySelector("td[data-id='status']").innerHTML;
        console.log("NEW ELEM: " + elem);
        title = elem.parentElement.parentElement.querySelector("td[data-id='title']").innerHTML;
        description = elem.parentElement.parentElement.querySelector("td[data-id='description']").innerHTML;
        console.log("New Status: " + status);
    }

    fetch('/update_item', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'itemId': itemId, 'itemTitle': title, 'dataId': dataId, 'description': description })
    }).then(function (response) {
        console.log(response);
    });
};

window.onload = function () {

    let elems = document.querySelectorAll(".editable");

    for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener("click", function () {
            makeEditable(this);
        });
    };
};