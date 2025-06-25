function headingReset() {
  const headings = document.querySelectorAll('[data-split="heading"]');
  headings.forEach(heading => {
    let lineList = heading.querySelectorAll('.split-line');
    let newContent = ''
    for(let i = 0; i < lineList.length; i++) {
      newContent += lineList[i].innerHTML;
    }
    console.log(newContent)
    heading.innerHTML = newContent;
  })
}

window.addEventListener("resize", () => {
  if(ScrollTrigger) ScrollTrigger.update()
})