// Wait for DOM to load before setting up animations
document.addEventListener("DOMContentLoaded", () => {
    // Initial entry animations using GSAP
    gsap.set("#mascot-img", { transformOrigin: "bottom center" });

    gsap.from(".card", {
        duration: 0.8,
        y: 40,
        opacity: 0,
        ease: "power3.out"
    });

    gsap.from("#mascot-img", {
        duration: 1,
        y: 120,
        scale: 0.5,
        opacity: 0,
        delay: 0.2,
        ease: "back.out(1.7)"
    });

    gsap.from("#speech-bubble", {
        duration: 0.7,
        scale: 0,
        opacity: 0,
        delay: 0.8,
        ease: "back.out(1.4)"
    });
});

function formatowanie() {
    // Read input values inside the function to get the actual user input
    let imie = document.getElementById("input_imie").value.trim();
    let nazwisko = document.getElementById("input_nazwisko").value.trim();

    const bubble = document.getElementById("speech-bubble");
    const speechText = document.getElementById("speech-text");
    const mascot = document.getElementById("mascot-img");

    // Check if both fields are non-empty
    if (imie !== "" && nazwisko !== "") {
        // Format the names: first letter capital, rest lowercase
        let imie_format = imie.charAt(0).toUpperCase() + imie.slice(1).toLowerCase();
        let nazwisko_format = nazwisko.charAt(0).toUpperCase() + nazwisko.slice(1).toLowerCase();

        let sformatowane_imie = imie_format + " " + nazwisko_format;

        // Apply success classes to speech bubble
        bubble.className = "speech-bubble success";
        speechText.textContent = `Wspaniale! Twoje imię po sformatowaniu to: ${sformatowane_imie}! ✨`;

        // Write to semantic wynik output
        document.getElementById("wynik").textContent = sformatowane_imie;

        // Success animation: Mascot does a happy hop and spin
        let tl = gsap.timeline();
        tl.to(mascot, { duration: 0.15, scaleY: 0.8, scaleX: 1.2, ease: "power1.out" }) // prepare for jump
            .to(mascot, { duration: 0.3, y: -60, scaleY: 1.1, scaleX: 0.9, rotation: 360, ease: "power2.out" }) // jump and spin
            .to(mascot, { duration: 0.15, y: 0, scaleY: 0.85, scaleX: 1.15, ease: "power1.in" }) // land
            .to(mascot, { duration: 0.2, scaleY: 1, scaleX: 1, ease: "back.out(1.5)" }); // recover

        // Bubble pulse
        gsap.fromTo(bubble,
            { scale: 0.95 },
            { scale: 1.05, duration: 0.15, yoyo: true, repeat: 1, ease: "power1.inOut" }
        );

    } else {
        // Apply warning classes to speech bubble
        bubble.className = "speech-bubble warning";
        document.getElementById("warning").textContent = "Hej! Wpisz zarówno imię, jak i nazwisko! 🦉";
        document.getElementById("wynik").textContent = "";


        // Failure animation: Mascot shakes head/body and speech bubble shakes
        gsap.fromTo(mascot,
            { x: 0 },
            { x: 12, duration: 0.08, repeat: 5, yoyo: true, ease: "sine.inOut", onComplete: () => { gsap.set(mascot, { x: 0 }); } }
        );

        // Tilt mascot in disappointment
        gsap.timeline()
            .to(mascot, { duration: 0.1, rotation: -8, ease: "power1.out" })
            .to(mascot, { duration: 0.1, rotation: 8, ease: "power1.inOut" })
            .to(mascot, { duration: 0.1, rotation: 0, ease: "power1.in" });

        // Shake bubble
        gsap.fromTo(bubble,
            { x: 0 },
            { x: -10, duration: 0.08, repeat: 5, yoyo: true, ease: "sine.inOut", onComplete: () => { gsap.set(bubble, { x: 0 }); } }
        );
    }
}
