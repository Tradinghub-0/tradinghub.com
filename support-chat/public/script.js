
      // Elements
      const chatBox = document.getElementById('chat-box');
      const userInput = document.getElementById('user-input');
      const sendButton = document.getElementById('send-button');

      // Function to display messages in the chat box
      function displayMessage(sender, text) {
          const messageElement = document.createElement('div');
          messageElement.classList.add('message', sender);
          messageElement.innerHTML = `<div class="message">${text}</div>`;
          chatBox.appendChild(messageElement);
          chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
      }

      // Function to simulate AI response (mock AI)
      function getMockBotResponse(userMessage) {
          const responses = {
              "i cannot withdraw my cash": "I understand how important it is to access your money. Have you tried checking if there are any restrictions to your account?",
              "hi": "Hello! How can I assist you today?",
              "hey": "Hello! How can I assist you today?",
              "how are you": "I'm just a bot, but I'm doing great! How about you?",
              "who are you?": "I'm your AI Assistant, here to help you with anything!",
              "bye": "Goodbye! Have a great day!",
          };

          // Check if the user's message matches a predefined response
          const messageLower = userMessage.toLowerCase().trim();
          return responses[messageLower] || "Hey! Sorry, we're busy at the moment. Leave us your email, and we'll contact you as soon as possible.";
      }

      // Event listener for when the user clicks the send button
      sendButton.addEventListener('click', async () => {
          const userMessage = userInput.value.trim();
          if (userMessage === '') return;

          // Display user's message
          displayMessage('user', userMessage);

          // Get and display bot's response
          userInput.value = ''; // Clear the input field
          const botResponse = getMockBotResponse(userMessage);
          displayMessage('support', botResponse);
      });

      // Optional: Allow the user to hit Enter to send the message
      userInput.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
              sendButton.click();
          }
      });
	  
	  
	  function openSidebar() {
    document.getElementById('sidebarMenu').classList.add('open');
  }

  function closeSidebar() {
    document.getElementById('sidebarMenu').classList.remove('open');
  }

      // Function to send the message to the backend (for email delivery)
      sendButton.addEventListener('click', async () => {
          const userMessage = userInput.value.trim();
          if (userMessage === '') return;

          // Display user's message
          displayMessage('user', userMessage);

          // Send the message to the backend for email delivery
          try {
              const response = await fetch('/send-message', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ message: userMessage }),
              });

              if (response.ok) {
                  displayMessage('support', 'Your message has been sent to Support. Thank you!');
              } else {
                  displayMessage('support', 'There was an error sending your message. Please try again later.');
              }
          } catch (error) {
              displayMessage('support', 'Network error. Please try again later.');
          }

          userInput.value = ''; // Clear input field
      });
