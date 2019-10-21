// Target elements 
const accordions = document.querySelectorAll('.accordion');
const contents = document.querySelectorAll('.accordion-content');
const arrows = document.querySelectorAll('.arrow');

// Show clicked content and hide others
active = (item, index) => {
    contents.forEach((content, i) => {
        if (i !== index) {
            content.style.height = 0;
        }
    })
    item.style.height = `${item.scrollHeight}px`;
  //Spin arrows
    arrows.forEach((arrow, i) => {
        arrow.style.transform = 'rotate(45deg)';
        if (i !== index) {
            arrow.style.transform = 'rotate(-135deg)';
        }
        
    })
}

// Add function to all accordion element buttons
accordions.forEach(
    (accordion, i) => {
        accordion.addEventListener("click", () => active(contents[i], i))
    });




