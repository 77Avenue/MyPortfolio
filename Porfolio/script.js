/* "Home page karaoke reading effect"*/
const spans = document.querySelectorAll('.box span');


    document.querySelector('.box').addEventListener('mouseenter', () => {
        spans.forEach((span, index) => {
            setTimeout(() => {
                span.classList.add('highlight-active');
            }, index * 300); // Delay highlighting by 300 milliseconds for each word
        });
    });

    document.querySelector('.box').addEventListener('mouseleave', () => {
        spans.forEach((span) => {
            span.classList.remove('highlight-active');
        });
    });


// Contact form submission alert 
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send alert message (can be replaced with real email functionality)
    alert(`Thank you ${name}! Your message has been sent successfully.`);

    // Send form data to designated email (requires backend or EmailJS)
    
    

    document.getElementById('contact-form').reset();
    //document.getElementById('cancel-button').addEventListener('click', function() {
       // document.getElementById('cancel-button').reset();
    
    });
