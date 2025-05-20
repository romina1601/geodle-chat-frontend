import { JSX } from 'react';

export interface FaqQuestion {
  q: string;
  a: string | JSX.Element;
}

export interface FaqSection {
  title: string;
  questions: FaqQuestion[];
}

export const faqSections: FaqSection[] = [
  {
    title: 'General',
    questions: [
      {
        q: 'What is GeodleChat?',
        a: `GeodleChat is a geography guessing game where you try to identify a mystery country 
            by asking Geodle questions about that country.`,
      },
      {
        q: 'Is GeodleChat a "dle" game?',
        a: (
          <>
            Yes, GeodleChat is built as a "dle" game: a <em>daily</em> quick game, which resets every 24 hours 
            and is the same for every player that plays it.
          </>
        ),
      },
      {
        q: 'Is it free?',
        a: 'Yes, GeodleChat is completely free to play!',
      },
      {
        q: 'Am I talking to a real person?',
        a: 'No, you are playing with an AI agent that is an expert in geography.',
      },
    ],
  },
  {
    title: 'Gameplay',
    questions: [
      {
        q: 'How do I play?',
        a: 'Click "Start Game" (on the Start page) and begin asking questions. Your goal is to guess the mystery country using as few questions as possible.',
      },
      {
        q: 'What kind of questions can I ask?',
        a: 'You can ask any kind of question — open-ended or yes/no.',
      },
      {
        q: 'What happens if I guess wrong?',
        a: 'Wrong guesses count as questions — so use your attempts wisely! The goal is to guess the country in as few questions as possible.',
      },
      {
        q: 'Is there a way to restart the game?',
        a: 'No, you cannot. Once you click "Start Game" and ask your first question, you cannot delete it from the chat\'s memory.',
      },
      {
        q: 'I guessed the mystery country — what now?',
        a: `Congrats! If you guessed today's mystery country, your job for today is done. 
            Come back again tomorrow to guess a new country. In the meantime, 
            share your results with your friends and see who's the biggest geography geek among you. 🤓`,
      },
    ],
  },
  {
    title: 'Technical',
    questions: [
      {
        q: 'Can I play on mobile?',
        a: `Yes! Although GeodleChat is primarily intended to be played in the web browser,
            it is responsive and works well on most mobile browsers.`,
      },
      {
        q: 'Which browsers are supported?',
        a: 'It works on all modern browsers: Chrome, Firefox, Safari, and Edge.',
      },
      {
        q: 'Why is there a 40-character limit for each question?',
        a: `Questions are limited to 40 characters so you can ask one clear question at a time and 
            avoid packing multiple queries into one. It also helps to keep API calls fast and cost-effective behind the scenes.`,
      },
      {
        q: 'Does GeodleChat store any of my personal or chat data?',
        a: (
          <>
            No – we only keep an anonymous session ID so the game can remember your progress.  
            We <em>do not</em> save your chat messages or any personal information.
          </>
        ),
      },
    ],
  },
  {
    title: 'Contact',
    questions: [
      {
        q: 'Who created GeodleChat?',
        a: (
          <>
            GeodleChat was created by{' '}
            <a
              href="https://www.linkedin.com/in/rominabaila"
              target="_blank"
              rel="noopener noreferrer"
            >
              Romina 
            </a>
            , a Software Engineer based in Romania 🇷🇴. She's an AI enthusiast and has always been a geography aficionado.  
            She built this project to bring her two passions together into one fun game.
          </>
        ),
      },
      
      {
        q: 'How can I get in contact?',
        a: (
          <>
            You can email Romina at{' '}
            <a href="mailto:contact@geodle.chat">contact@geodle.chat</a>
            {' '}or use any of the buttons in the footer to reach out (email, GitHub, LinkedIn).
          </>
        ),
      },        
      {
        q: 'Can I suggest a feature?',
        a: (
          <>
            Yes, you are more than welcome to open a feature request on{' '}
            <a
              href="https://github.com/romina1601/geodle-chat-frontend/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            {' '}or send an email to{' '}
            <a href="mailto:contact@geodle.chat">contact@geodle.chat</a>.
          </>
        ),
      },
      {
        q: 'Can I support this project?',
        a: (
          <>
            You can support GeodleChat by sharing it with friends or on social media, ⭐ starring the repo on{' '}
            <a
              href="https://github.com/romina1601/geodle-chat-frontend"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>, and sending feedback via{' '}
            <a href="mailto:contact@geodle.chat">contact@geodle.chat</a> or by opening an issue.  
            Every star, share, and suggestion helps the project grow!
          </>
        ),
      },
      
    ],
  },
];
