document.querySelectorAll('.copy-btn').forEach(button => {
      button.addEventListener('click', function () {
        const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
        const message = this.getAttribute('data-message');

        // Disable all buttons
        document.querySelectorAll('.copy-btn').forEach(btn => btn.setAttribute('disabled', 'true'));

        // Create alert element
        const alert = document.createElement('div');
        alert.className = 'alert alert-success d-flex align-items-center mt-3';
        alert.role = 'alert';
        alert.innerHTML = `
  <svg class="bi flex-shrink-0 me-2" role="img" aria-label="Success:" style="width: 10px; height: 20px;">
    <use xlink:href="#check-circle-fill"></use>
  </svg>
  <div style="font-size: 14px;">${message}</div>
`;


        // Add alert to the placeholder
        alertPlaceholder.append(alert);

        // Automatically dismiss the alert and re-enable buttons after 3 seconds
        setTimeout(() => {
          alert.remove();
          document.querySelectorAll('.copy-btn').forEach(btn => btn.removeAttribute('disabled'));
        }, 3000);
      });
    });
	
	
	