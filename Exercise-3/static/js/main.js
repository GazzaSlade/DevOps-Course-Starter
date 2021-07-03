function makeEditable(elem) {

    index = trackIndex(elem);
    const originalElem = elem;
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
            console.log("Other element")
            break;
    };

    function addFocusOutListener(elem) {
        elem.addEventListener("focusout", function (event) {
            event.preventDefault();
            deselectElement(this);
        });
    }
};

function trackIndex(elem) {
    const index = Array.from(elem.parentElement.children).indexOf(elem);

    return index;
}

function deselectElement(elem) {
    var newInnerHTML = elem.value;
    console.log("Element first child value is: " + newInnerHTML);

    elem.parentNode.innerHTML = newInnerHTML;
};

window.onload = function () {

    let elems = document.querySelectorAll(".editable");

    for (var i = 0; i < elems.length; i++) {
        elems[i].addEventListener("click", function () { makeEditable(this) });
        elems[i].addEventListener("keydown", function (event) {
            if ((event.keyCode == 13)) {
                event.preventDefault();
                deselectElement(this.children[0]);
                return false;
            }
        });
    };
};