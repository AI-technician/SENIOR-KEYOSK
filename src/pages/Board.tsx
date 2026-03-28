import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { useAdminStore } from '../store/adminStore';
import { Pin } from 'lucide-react';
import { motion } from 'motion/react';

export function Board() {
  const navigate = useNavigate();
  const { posts } = useAdminStore();

  return (
    <div className="min-h-screen bg-black pt-28 pb-40 flex flex-col">
      <TopBar title="공지사항 및 교육자료" />
      
      <div className="flex-1 overflow-y-auto p-8 max-w-5xl mx-auto w-full">
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1A1A1A] rounded-[40px] p-10 border border-white/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className={`px-4 py-2 text-xl font-bold rounded-full ${
                  post.type === 'notice' ? 'bg-[#6F3FF5] text-white' : 'bg-[#B59BFF] text-black'
                }`}>
                  {post.type === 'notice' ? '공지사항' : '교육자료'}
                </span>
                {post.isPinned && (
                  <span className="flex items-center gap-2 text-red-500 font-bold text-xl">
                    <Pin size={24} />
                    중요
                  </span>
                )}
                <span className="text-gray-400 text-xl ml-auto">{post.date}</span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6 break-keep">{post.title}</h2>
              <p className="text-2xl text-gray-300 leading-relaxed break-keep">{post.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
