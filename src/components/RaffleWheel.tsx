import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import confetti from "canvas-confetti";
import { Trophy, RotateCw } from "lucide-react";

interface RaffleWheelProps {
  isOpen: boolean;
  onClose: () => void;
  attendees: { name: string; email: string }[];
  eventTitle: string;
}

export const RaffleWheel = ({ isOpen, onClose, attendees, eventTitle }: RaffleWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<{ name: string; email: string } | null>(null);
  const [rotation, setRotation] = useState(0);
  const [displayNames, setDisplayNames] = useState<string[]>([]);
  const [spinDuration, setSpinDuration] = useState(10000);
  const [hasSpunOnce, setHasSpunOnce] = useState(false);
  const [participantsPage, setParticipantsPage] = useState(1);
  const participantsPerPage = 15;

  useEffect(() => {
    if (attendees.length > 0) {
      // Create a cycling list of names for visual effect - repeat many times for long spins
      const names = attendees.map(a => a.name);
      const repeatedNames = [];
      // Repeat the names 50 times to ensure we never run out during spinning (increased for longer spins)
      for (let i = 0; i < 50; i++) {
        repeatedNames.push(...names);
      }
      setDisplayNames(repeatedNames);
    }
    // Reset to first page when attendees change
    setParticipantsPage(1);
  }, [attendees]);

  const fireConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const spinWheel = () => {
    if (attendees.length === 0) {
      return;
    }

    setHasSpunOnce(true); // Mark that wheel has been spun at least once
    setIsSpinning(true);
    setWinner(null);

    // Calculate how many pixels to move based on attendees
    const itemHeight = 48; // Height of each name item (matches minHeight in style)
    const totalItems = displayNames.length;
    
    // Random number of full cycles through the list + random final position
    const cycles = 15 + Math.random() * 10; // 15-25 full cycles for more excitement!
    const randomFinalIndex = Math.floor(Math.random() * attendees.length);
    
    // Calculate total pixels to move
    const pixelsToMove = (cycles * attendees.length * itemHeight) + (randomFinalIndex * itemHeight);
    
    // Dynamic spin duration: 6-12 seconds based on number of attendees
    // More attendees = longer spin time for dramatic effect
    const baseDuration = 6000; // 6 seconds minimum (faster!)
    const extraDuration = Math.min(attendees.length * 60, 6000); // Add up to 6 more seconds
    const calculatedDuration = baseDuration + extraDuration;
    
    setSpinDuration(calculatedDuration);
    setRotation(pixelsToMove);

    // After spinning animation completes, select winner
    setTimeout(() => {
      const selectedWinner = attendees[randomFinalIndex];
      setWinner(selectedWinner);
      setIsSpinning(false);
      
      // Fire confetti
      fireConfetti();
      
      // Additional celebratory confetti burst
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          zIndex: 9999,
        });
      }, 200);
    }, calculatedDuration);
  };

  const resetRaffle = () => {
    setWinner(null);
    setRotation(0);
    setHasSpunOnce(false); // Reset to blur names again
  };

  if (attendees.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Event Raffle - {eventTitle}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <p className="text-gray-600">No registered attendees for this event yet.</p>
            <p className="text-sm text-gray-500 mt-2">Attendees need to register before running a raffle.</p>
          </div>
          <div className="flex justify-end">
            <Button onClick={onClose} variant="outline">Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Event Raffle - {eventTitle}
          </DialogTitle>
          <p className="text-sm text-gray-600">
            {attendees.length} participant{attendees.length !== 1 ? 's' : ''} registered
          </p>
        </DialogHeader>

        <div className="py-4 space-y-4">
          {/* Spinning Wheel/Bowl */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 shadow-inner">
              {/* Winner Display (when selected) */}
              {winner && (
                <div className="text-center mb-4 animate-bounce">
                  <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                    <Trophy className="inline-block h-4 w-4 mr-2" />
                    <span className="font-bold text-base">WINNER!</span>
                  </div>
                </div>
              )}

              {/* Name Bowl/Wheel */}
              <div className="relative h-60 flex items-center justify-center overflow-hidden rounded-xl">
                {!winner ? (
                  <div className="relative w-full h-full flex flex-col items-center justify-center">
                    {/* Spinning Names */}
                    <div 
                      className="space-y-3"
                      style={{ 
                        transform: `translateY(-${rotation}px)`,
                        transition: isSpinning ? `transform ${spinDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)` : 'none',
                        filter: !hasSpunOnce ? 'blur(8px)' : 'none',
                      }}
                    >
                      {displayNames.map((name, index) => (
                        <div
                          key={index}
                          className={`text-base font-bold text-center px-4 py-3 rounded-lg shadow-md transform transition-all ${
                            index % 3 === 0 
                              ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' 
                              : index % 3 === 1
                              ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white'
                              : 'bg-gradient-to-r from-pink-500 to-pink-600 text-white'
                          }`}
                          style={{ 
                            minHeight: '48px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                          }}
                        >
                          {name}
                        </div>
                      ))}
                    </div>

                    {/* Center Selection Indicator - Clear focus area */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 px-4">
                      <div className="w-full max-w-lg">
                        {/* Winner selection box - clear and prominent */}
                        <div className="border-3 border-yellow-400 rounded-lg bg-transparent shadow-lg ring-2 ring-yellow-400/30" style={{ height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div className="flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full shadow-md">
                            <Trophy className="h-3 w-3 text-yellow-900 animate-bounce" />
                            <span className="text-yellow-900 font-bold text-xs">WINNER</span>
                            <Trophy className="h-3 w-3 text-yellow-900 animate-bounce" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Gradient Overlays for color fade effect */}
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-blue-50 via-blue-50/50 to-transparent pointer-events-none z-20" />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-purple-50 via-purple-50/50 to-transparent pointer-events-none z-20" />
                  </div>
                ) : (
                  // Winner Display - Clean and elegant
                  <div className="text-center animate-scale-in">
                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-400 rounded-xl p-6 shadow-xl">
                      {/* Trophy icon */}
                      <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-3 animate-bounce" />
                      
                      {/* Winner badge */}
                      <div className="inline-block bg-yellow-400 text-white px-3 py-1 rounded-full font-semibold text-xs mb-3">
                        WINNER
                      </div>
                      
                      {/* Winner name */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {winner.name}
                      </h2>
                      
                      {/* Celebration message */}
                      <p className="text-base text-gray-600">
                        🎉 Congratulations! 🎉
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-center">
            {!winner ? (
              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 text-base font-semibold shadow-lg"
              >
                {isSpinning ? (
                  <>
                    <RotateCw className="h-4 w-4 mr-2 animate-spin" />
                    Spinning...
                  </>
                ) : (
                  <>
                    <Trophy className="h-4 w-4 mr-2" />
                    Spin the Wheel!
                  </>
                )}
              </Button>
            ) : (
              <>
                <Button
                  onClick={resetRaffle}
                  variant="outline"
                  className="px-4 py-3 text-sm"
                >
                  <RotateCw className="h-4 w-4 mr-2" />
                  Spin Again
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-3 text-sm"
                >
                  Done
                </Button>
              </>
            )}
          </div>

          {/* Participants List */}
          <div className="mt-4">
            <details className="bg-gray-50 rounded-lg p-3">
              <summary className="cursor-pointer font-medium text-sm text-gray-700 hover:text-gray-900 flex items-center justify-between">
                <span>View All Participants ({attendees.length})</span>
                <svg className="w-5 h-5 transform transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="mt-4">
                {/* Paginated participant list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {attendees
                    .slice((participantsPage - 1) * participantsPerPage, participantsPage * participantsPerPage)
                    .map((attendee, index) => (
                      <div 
                        key={index} 
                        className="text-sm text-gray-600 bg-white px-3 py-2 rounded shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="font-semibold text-gray-800">
                          {attendee.name}
                        </div>
                      </div>
                    ))}
                </div>
                
                {/* Pagination Controls */}
                {attendees.length > participantsPerPage && (
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setParticipantsPage(prev => Math.max(1, prev - 1))}
                      disabled={participantsPage === 1}
                      className="text-sm"
                    >
                      &lt;
                    </Button>
                    <span className="text-sm font-medium text-gray-700">
                      {participantsPage} of {Math.ceil(attendees.length / participantsPerPage)}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setParticipantsPage(prev => Math.min(Math.ceil(attendees.length / participantsPerPage), prev + 1))}
                      disabled={participantsPage === Math.ceil(attendees.length / participantsPerPage)}
                      className="text-sm"
                    >
                      &gt;
                    </Button>
                  </div>
                )}
                
                {/* Participant count summary */}
                <div className="mt-3 text-center text-xs text-gray-500 border-t pt-2">
                  Total: {attendees.length} participant{attendees.length !== 1 ? 's' : ''}
                </div>
              </div>
            </details>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

