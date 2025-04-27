import Confetti from "react-confetti";
import { useWindowSize } from 'react-use';
import "../../styles/ResultsModal.css";
import PerformanceStats from "./PerformanceStats";
import { ReactComponent as ShareIcon } from '../../icons/share.svg';
import { useState } from "react";

interface ResultsModalProps {
  questionsCount: number;
  onClose: () => void;
}

function getPerformanceTitle(questions: number): string {
  if (questions <= 2) return "🏆 Legendary!";
  if (questions <= 4) return "🎯 Brilliant!";
  if (questions <= 7) return "🌟 Very Good!";
  if (questions <= 10) return "👍 Nice!";
  return "✅ Completed!";
}

function formatDate(): string {
    const today = new Date();
    return today.toLocaleDateString('en-GB', {
      timeZone: 'Europe/Paris',
    }).replace(/\//g, '-');
}
  

function generateShareText(questionsCount: number): string {
    const title = getPerformanceTitle(questionsCount);
    const date = formatDate();
    return `🌍 GeodleChat | ${date}\n${title}\nI solved today’s GeodleChat in ${questionsCount} question${questionsCount === 1 ? '' : 's'}!\nhttps://geodle.chat\n#geodlechat`;
}

const ResultsModal: React.FC<ResultsModalProps> = ({ questionsCount, onClose }) => {
    const [showToast, setShowToast] = useState(false);
    const { width, height } = useWindowSize();

    const handleCopyResults = () => {
        const shareText = generateShareText(questionsCount);
      
        if (navigator.share) {
          navigator.share({
            title: 'GeodleChat',
            text: shareText,
            url: 'https://geodle.chat',
          }).catch((err) => {
            console.error('Error sharing:', err);
          });
        } else {
          navigator.clipboard.writeText(shareText)
            .then(() => {
              setShowToast(true);
              setTimeout(() => setShowToast(false), 2000); // Toast visible for 2 seconds
            })
            .catch((err) => {
              console.error("Failed to copy result:", err);
            });
        }
    };

    return (
        <div className="results-modal-overlay">
            <Confetti
                width={width}
                height={height}
                numberOfPieces={75}
                gravity={0.1}
                wind={0.05}
                initialVelocityY={{ min: 5, max: 20 }}
                tweenDuration={2000}
                recycle={false}
            />
            <div className="results-modal-content">
                <button className="close-button" onClick={onClose}>×</button>
                <h2>GeodleChat Stats</h2>
                <p>Solved in <strong>{questionsCount}</strong> question{questionsCount === 1 ? '' : 's'}!</p>

                <PerformanceStats questionsCount={questionsCount} />
                <div className="results-modal-buttons">
                <button onClick={handleCopyResults} className="share-button">
                    <div className="share-button-content">
                        <span>Share</span>
                        <ShareIcon className="share-icon" />
                    </div>
                </button>
                </div>
            </div>

            {showToast && (
                <div className="toast">Copied to clipboard! 📋</div>
            )}
        </div>
    );
};

export default ResultsModal;
