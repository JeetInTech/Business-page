class CustomerCareBot {
            constructor() {
                this.chatButton = document.getElementById('chatButton');
                this.chatWidget = document.getElementById('chatWidget');
                this.closeBtn = document.getElementById('closeBtn');
                this.messageInput = document.getElementById('messageInput');
                this.sendBtn = document.getElementById('sendBtn');
                this.chatMessages = document.getElementById('chatMessages');
                this.quickReplies = document.getElementById('quickReplies');
                
                this.isOpen = false;
               this.responses = {
                'tell me about your services': 'We provide expert AI-driven solutions including machine learning, computer vision, voice-enabled assistants, and social media automation. Our consulting and 24/7 support ensure complete technical coverage.',
                'our services': 'We offer full-stack AI solutions, real-time computer vision systems, intelligent automation, and custom voice assistant development. Technical consulting and continuous support are also available.',
    
                'i need technical support': 'Our support team is available 24/7 to resolve technical issues. Email us at jeeth.enterprises108@gmail.com or call +91 90######37 for immediate assistance.',
                'tech support': 'We provide round-the-clock technical support. Reach out via jeeth.enterprises108@gmail.com or call +91 90######37 for help.',
    
                'pricing information': 'Pricing depends on the complexity and scope of your project. Contact us at jeeth.enterprises108@gmail.com to get a custom quote tailored to your goals.',
                'pricing': 'We offer flexible pricing based on your project’s needs. Drop us a message at jeeth.enterprises108@gmail.com for a detailed estimate.',
    
                'contact information': 'You can reach us via:\n📧 jeeth.enterprises108@gmail.com \n📞 +91 90######37\n🔗 linkedin.com/company/jeet-enterprises',
                'contact': 'You can reach us via:\n📧 jeeth.enterprises108@gmail.com \n📞 +91 90######37\n🔗 linkedin.com/company/jeet-enterprises',
    
                'hello': 'Hello! Welcome to Jeet Enterprises. I’m here to help you explore our innovations and services.',
                'hi': 'Hi there! Ask me anything about our services, support, or projects.',
                'help': 'I can assist you with our services, support options, pricing, or innovations. Just type a keyword like “AI” or “support”.',
    
                'projects': 'We build AI-powered applications including Jeet Voice Assistant, hand-tracking systems, and social media automation tools. Want to know more about a specific one?',
    
                'ai': 'Our AI solutions include machine learning models for automation, data-driven predictions, and intelligent assistant systems—all designed for real-world impact.',
    
                'voice assistant': 'Jeet is our in-house AI voice assistant that lets you control your PC hands-free. It supports launching apps, closing tabs, and more via simple voice commands.',
    
                'social media': 'Our automation tool enables smart posting across multiple social media platforms with one click. It handles scheduling, formatting, and consistency.',
    
                'computer vision': 'We create advanced computer vision projects including gesture-based input devices, real-time eye tracking, and virtual keyboards for hands-free interaction.'
};

                
                this.init();
            }

            init() {
                this.chatButton.addEventListener('click', () => this.toggleChat());
                this.closeBtn.addEventListener('click', () => this.closeChat());
                this.sendBtn.addEventListener('click', () => this.sendMessage());
                this.messageInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') this.sendMessage();
                });

                // Quick replies
                this.quickReplies.addEventListener('click', (e) => {
                    if (e.target.classList.contains('quick-reply')) {
                        const message = e.target.dataset.message;
                        this.sendUserMessage(message);
                    }
                });

                // Auto-focus input when chat opens
                this.chatWidget.addEventListener('transitionend', () => {
                    if (this.isOpen) {
                        this.messageInput.focus();
                    }
                });
            }

            toggleChat() {
                if (this.isOpen) {
                    this.closeChat();
                } else {
                    this.openChat();
                }
            }

            openChat() {
                this.isOpen = true;
                this.chatWidget.classList.add('active');
                this.chatButton.classList.add('active');
                this.chatButton.innerHTML = '×';
            }

            closeChat() {
                this.isOpen = false;
                this.chatWidget.classList.remove('active');
                this.chatButton.classList.remove('active');
                this.chatButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.234A9.06 9.06 0 0 0 8 15z"/>
                    </svg>
                `;
            }

            sendMessage() {
                const message = this.messageInput.value.trim();
                if (!message) return;

                this.sendUserMessage(message);
                this.messageInput.value = '';
            }

            sendUserMessage(message) {
                this.addMessage(message, 'user');
                this.showTypingIndicator();
                
                setTimeout(() => {
                    this.removeTypingIndicator();
                    this.generateBotResponse(message);
                }, Math.random() * 1000 + 500);
            }

            addMessage(content, sender) {
                const messageDiv = document.createElement('div');
                messageDiv.className = `message ${sender}`;
                
                const avatar = document.createElement('div');
                avatar.className = `message-avatar ${sender}-avatar`;
                avatar.textContent = sender === 'bot' ? '🤖' : '👤';
                
                const messageContent = document.createElement('div');
                messageContent.className = `message-content ${sender}-message`;
                messageContent.innerHTML = content.replace(/\n/g, '<br>');
                
                messageDiv.appendChild(avatar);
                messageDiv.appendChild(messageContent);
                
                this.chatMessages.appendChild(messageDiv);
                this.scrollToBottom();
            }

            showTypingIndicator() {
                const typingDiv = document.createElement('div');
                typingDiv.className = 'message typing';
                typingDiv.innerHTML = `
                    <div class="message-avatar bot-avatar">🤖</div>
                    <div class="typing-indicator">
                        <div class="typing-dots">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                `;
                
                this.chatMessages.appendChild(typingDiv);
                this.scrollToBottom();
            }

            removeTypingIndicator() {
                const typingIndicator = this.chatMessages.querySelector('.typing');
                if (typingIndicator) {
                    typingIndicator.remove();
                }
            }

            generateBotResponse(userMessage) {
                const lowercaseMessage = userMessage.toLowerCase();
                let response = this.responses[lowercaseMessage];
                
                if (!response) {
                    // Try to find a partial match
                    for (const key in this.responses) {
                        if (lowercaseMessage.includes(key) || key.includes(lowercaseMessage)) {
                            response = this.responses[key];
                            break;
                        }
                    }
                }
                
                if (!response) {
                    response = "I understand you're asking about something specific. For detailed information, please contact our team at jeeth.enterprises108@gmail.com or try asking about our services, support, pricing, or contact details.";
                }
                
                this.addMessage(response, 'bot');
            }

            scrollToBottom() {
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            }
        }

        // Initialize the bot when the page loads
        document.addEventListener('DOMContentLoaded', () => {
            new CustomerCareBot();
        });