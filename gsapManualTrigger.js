let targets = gsap.utils.toArray(".heading-discover");

targets.forEach((obj) => {
  obj.anim = gsap.fromTo(
      obj,
      {
        opacity: 0,
        y: 200, // lehký posun nahoru
      },
      {
        opacity: 1,
        y: 0, // návrat na původní pozici
        // stagger: 0.05, // zrychlené zpoždění mezi písmeny
        duration: 2, // kratší trvání animace
        ease: 'power2.out', // jemný, ale rychlejší easing
        // delay: 2, // zpoždění celé animace
      }
  );
  obj.addEventListener("click", doCoolStuff);
});

function doCoolStuff() {
    console.log(this.anim.play())
    this.anim.play();
//   this.anim.reversed(!this.anim.reversed());
}