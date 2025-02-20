import React, { useEffect, useState } from 'react';
import MemberCard from './components/MemberCard';
import { members } from './data/members';
import { NotificationState } from './types';

function App() {
  const [following, setFollowing] = useState<string[]>(() => {
    const saved = localStorage.getItem('familyClubFollowing');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('familyClubFollowing', JSON.stringify(following));
  }, [following]);

  const handleToggleFollow = (memberId: string) => {
    setFollowing(prev => 
      prev.includes(memberId)
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };

  const followingMembers = members.filter(member => following.includes(member.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            FAMILY CLUB web 通知設定
          </h1>
          <div className="bg-blue-50 rounded-lg p-4">
            <h2 className="text-sm font-medium text-blue-800 mb-2">
              フォロー中のメンバー ({followingMembers.length}人)
            </h2>
            {followingMembers.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {followingMembers.map(member => (
                  <span
                    key={member.id}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                    style={{
                      backgroundColor: `${member.color}15`,
                      color: member.color,
                      border: `1px solid ${member.color}30`
                    }}
                  >
                    {member.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                フォロー中のメンバーはいません。下のリストからメンバーをフォローしてください。
              </p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {members.map(member => (
            <MemberCard
              key={member.id}
              member={member}
              isFollowing={following.includes(member.id)}
              onToggleFollow={handleToggleFollow}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;