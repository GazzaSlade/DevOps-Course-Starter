function makeEditable(elem) {

    index = trackIndex(elem);
    const originalElem = elem;
    var node;
    elemType = elem.getAttribute('data-type');
    elemValue = elem.innerHTML;

    switch(elemType) {
        case "select":
            if (elem.querySelectorAll("select").length !== 0) {
                break;
            } else {
                elem.innerHTML = "";
                node = document.createElement("select");
                for (var i = 0; i < options.length; i++) {
                    let tmp = document.createElement("option");
                    tmp.text = options[i];
                    if (elemValue == tmp.text) {
                        tmp.setAttribute("selected", "true");
                    }
                    node.add(tmp);
                }
                addFocusOutListener(elem);
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
                addFocusOutListener(elem);
                break;
            }

        default:
            console.log("Other element")
            break;
    };

    function addFocusOutListener(elem) {
        elem.appendChild(node).focus();

        elem.addEventListener("focusout", function(event) {
            deselectElement(elem);
        });
    }
};

function trackIndex(elem) {    
    const index = Array.from(elem.parentElement.children).indexOf(elem);

    return index;
}

function deselectElement(elem) {
    var newInnerHTML = elem.children[0].value;

    elem.innerHTML = newInnerHTML;
};

window.onload = function() {

    let elems = document.querySelectorAll(".editable");

    for (var i=0; i < elems.length; i++) {
        elems[i].addEventListener("click", function(){makeEditable(this)});
        elems[i].addEventListener("keydown", function(event){
            if( (event.keyCode == 13) ) {
                event.preventDefault();
                return false;
            }
        });
    };
};