import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Member } from '../types';

interface MemberCardProps {
  member: Member;
  isFollowing: boolean;
  onToggleFollow: (id: string) => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, isFollowing, onToggleFollow }) => {
  const handleToggle = () => {
    if (isFollowing) {
      if (window.confirm(`${member.name}のフォローを解除しますか？`)) {
        onToggleFollow(member.id);
      }
    } else {
      onToggleFollow(member.id);
    }
  };

  return (
    <div 
      className="relative w-full max-w-md mx-auto mb-4 rounded-lg shadow-lg transition-transform hover:scale-102"
      style={{
        background: `linear-gradient(135deg, ${member.color}15, ${member.color}05)`,
        borderLeft: `4px solid ${member.color}`
      }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold" style={{ color: member.color }}>
            {member.name}
          </h3>
          <button
            onClick={handleToggle}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
              isFollowing 
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-700' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isFollowing ? (
              <>
                <Bell className="w-5 h-5" />
                <span className="text-sm font-medium">フォロー解除</span>
              </>
            ) : (
              <>
                <BellOff className="w-5 h-5" />
                <span className="text-sm font-medium">フォロー</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;