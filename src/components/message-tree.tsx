import { useState } from 'react';
import { X, Gift } from 'lucide-react';
import { Button } from './ui/button';

interface MessageTreeProps {
    messages: string[];
    userName: string;
}

// Predefined positions for ornaments (approximate % from top/left) to keep them inside the tree
const ORNAMENT_POSITIONS = [
    { top: '30%', left: '50%' },
    { top: '38%', left: '42%' },
    { top: '38%', left: '58%' },
    { top: '48%', left: '35%' },
    { top: '48%', left: '65%' },
    { top: '50%', left: '50%' },
    { top: '60%', left: '28%' },
    { top: '60%', left: '72%' },
    { top: '62%', left: '45%' },
    { top: '62%', left: '55%' },
    { top: '72%', left: '20%' },
    { top: '72%', left: '80%' },
    { top: '74%', left: '38%' },
    { top: '74%', left: '62%' },
    { top: '82%', left: '30%' },
    { top: '82%', left: '70%' },
];

export function MessageTree({ messages, userName }: MessageTreeProps) {
    const [selectedMessage, setSelectedMessage] = useState<string | null>(null);

    return (
        <div className="relative w-full max-w-sm mx-auto aspect-[3/4] flex items-center justify-center">
             {/* Tree SVG */}
             <svg viewBox="0 0 400 500" className="w-full h-full drop-shadow-2xl">
                {/* Trunk */}
                <path d="M175 420 L225 420 L225 480 L175 480 Z" fill="#5D4037" />
                
                {/* Leaves - Bottom Tier */}
                <path d="M20 420 L380 420 L200 150 Z" fill="#2D5A27" />
                
                {/* Leaves - Middle Tier */}
                <path d="M50 300 L350 300 L200 80 Z" fill="#3A7D34" />
                
                {/* Leaves - Top Tier */}
                <path d="M80 180 L320 180 L200 20 Z" fill="#4CAF50" />
                
                {/* Star */}
                <path d="M200 0 L212 35 L249 35 L219 57 L230 92 L200 70 L170 92 L181 57 L151 35 L188 35 Z" fill="#FFD700" className="animate-pulse" />
            </svg>

            {/* Ornaments */}
            {messages.map((msg, idx) => {
                const pos = ORNAMENT_POSITIONS[idx % ORNAMENT_POSITIONS.length];
                const color = ['#FF5252', '#FFD700', '#E0E0E0', '#40C4FF'][idx % 4];
                const delay = `${(idx * 0.5) % 3}s`;

                return (
                    <button
                        key={idx}
                        className="absolute w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer flex items-center justify-center group"
                        style={{ 
                            top: pos.top, 
                            left: pos.left, 
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: color,
                            animation: `sway 3s infinite ease-in-out ${delay}`
                        }}
                        onClick={() => setSelectedMessage(msg)}
                    >
                         {/* Shine effect */}
                        <div className="absolute top-2 left-2 w-3 h-3 bg-white opacity-40 rounded-full" />
                        
                        {/* String */}
                        <div className="absolute -top-10 left-1/2 w-0.5 h-10 bg-white/30 -z-10" />
                        
                        <Gift className="w-5 h-5 text-black/20 group-hover:text-black/40" />
                    </button>
                );
            })}

            {/* Message Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-[#FFF8E7] w-full max-w-sm rounded-[2rem] p-8 relative shadow-2xl animate-in zoom-in-95 border-4 border-[#2D5A27]">
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="absolute top-4 right-4 text-[#5D4037] hover:bg-[#5D4037]/10 rounded-full"
                            onClick={() => setSelectedMessage(null)}
                        >
                            <X className="w-6 h-6" />
                        </Button>

                        <div className="text-center space-y-6 pt-4">
                            <div className="w-16 h-16 bg-[#2D5A27] rounded-full mx-auto flex items-center justify-center shadow-inner">
                                <Gift className="w-8 h-8 text-[#FFD700]" />
                            </div>
                            
                            <div className="space-y-2">
                                <h3 className="font-bold text-[#5D4037] text-lg">익명의 산타가 보낸 메시지</h3>
                                <p className="text-[#5D4037]/60 text-sm">To. {userName}</p>
                            </div>

                            <div className="bg-white/50 p-6 rounded-2xl border border-[#5D4037]/10 min-h-[120px] flex items-center justify-center">
                                <p className="text-[#3E2723] text-lg font-medium leading-relaxed font-handwriting">
                                    "{selectedMessage}"
                                </p>
                            </div>

                            <Button 
                                className="w-full h-12 bg-[#FF5252] hover:bg-[#E04040] text-white rounded-xl font-bold text-lg"
                                onClick={() => setSelectedMessage(null)}
                            >
                                덮어두기
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes sway {
                    0%, 100% { transform: translate(-50%, -50%) rotate(-5deg); }
                    50% { transform: translate(-50%, -50%) rotate(5deg); }
                }
            `}</style>
        </div>
    );
}
