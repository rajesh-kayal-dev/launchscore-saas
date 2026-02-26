import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Send, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  ThumbsUp, 
  ThumbsDown, 
  Minus,
  Sparkles,
  Quote
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Textarea } from '../../components/ui/textarea';

const initialFeedback = [
  {
    id: 1,
    rating: 5,
    comment: "The website health monitoring is exceptional! It caught critical issues before they impacted our users. The AI summaries are incredibly helpful for non-technical team members.",
    date: "2 days ago",
    author: "Sarah Mitchell",
    sentiment: "positive"
  },
  {
    id: 2,
    rating: 4,
    comment: "Very useful platform for tracking multiple websites. The dashboard is clean and easy to understand. Would love to see more detailed performance breakdowns.",
    date: "5 days ago",
    author: "John Davidson",
    sentiment: "positive"
  },
  {
    id: 3,
    rating: 3,
    comment: "Good overall experience. The interface is intuitive but I'd like more customization options for the reports. Pricing is fair for what you get.",
    date: "1 week ago",
    author: "Michael Thompson",
    sentiment: "neutral"
  }
];

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const averageRating = feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length;
  const totalReviews = feedbackList.length;

  const sentimentCounts = feedbackList.reduce((acc, f) => {
    acc[f.sentiment] = (acc[f.sentiment] || 0) + 1;
    return acc;
  }, {});

  const positivePercent = ((sentimentCounts.positive || 0) / totalReviews) * 100;
  const neutralPercent = ((sentimentCounts.neutral || 0) / totalReviews) * 100;
  const negativePercent = ((sentimentCounts.negative || 0) / totalReviews) * 100;

  const handleSubmitFeedback = () => {
    if (newRating === 0 || !newComment.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      const sentiment = newRating >= 4 ? 'positive' : newRating === 3 ? 'neutral' : 'negative';
      const newFeedback = {
        id: Date.now(),
        rating: newRating,
        comment: newComment.trim(),
        date: 'Just now',
        author: 'You',
        sentiment
      };
      setFeedbackList([newFeedback, ...feedbackList]);
      setNewRating(0);
      setNewComment('');
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white italic tracking-tighter">
            SENTIMENT <span className="text-emerald-500">ENGINE</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1">
            Analyze user experience metrics and psychological satisfaction telemetry.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
          <Sparkles className="w-3 h-3 animate-pulse" />
          AI Analysis Active
        </div>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 bg-[#161616] border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Average Satisfaction</p>
          <p className="text-7xl font-black text-white italic mb-2">{averageRating.toFixed(1)}</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={16} className={s <= Math.round(averageRating) ? 'fill-emerald-400 text-emerald-400' : 'text-gray-800'} />
            ))}
          </div>
        </Card>

        <Card className="p-8 bg-[#161616] border-white/5 flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">Total Interactions</p>
          <p className="text-7xl font-black text-white italic mb-2">{totalReviews}</p>
          <p className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-2">
            <TrendingUp className="w-3 h-3" /> +14% this month
          </p>
        </Card>

        <Card className="p-8 bg-[#161616] border-white/5 space-y-4">
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Sentiment Heatmap</p>
          {[
            { label: 'Positive', color: 'bg-emerald-500', pct: positivePercent },
            { label: 'Neutral', color: 'bg-yellow-500', pct: neutralPercent },
            { label: 'Negative', color: 'bg-red-500', pct: negativePercent }
          ].map((item) => (
            <div key={item.label} className="space-y-1">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white">{item.pct.toFixed(0)}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${item.pct}%` }}
                  className={`h-full ${item.color} shadow-[0_0_10px_rgba(16,185,129,0.3)]`} 
                />
              </div>
            </div>
          ))}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Review Submission */}
        <div className="lg:col-span-5">
          <Card className="p-8 bg-[#161616] border-white/5 sticky top-24">
            <h2 className="text-xl font-bold text-white italic mb-2 uppercase">Submit Intel</h2>
            <p className="text-gray-500 text-sm mb-8 font-medium">Contribute to our global experience database.</p>
            
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Select Rating</label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setNewRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={`transition-all duration-300 ${
                          star <= (hoverRating || newRating)
                            ? 'fill-emerald-400 text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]'
                            : 'text-gray-800'
                        }`}
                      />
                    </motion.button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-4">Review Content</label>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe the platform efficiency..."
                  className="bg-[#0f0f0f] border-white/5 text-white min-h-[150px] rounded-2xl focus:border-emerald-500/50 p-4 transition-all"
                />
              </div>

              <Button
                onClick={handleSubmitFeedback}
                disabled={newRating === 0 || newComment.length < 10 || submitting}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase tracking-widest italic py-7 rounded-2xl transition-all shadow-xl shadow-emerald-500/10"
              >
                {submitting ? "Encrypting..." : "Dispatch Feedback"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Feedback Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between px-2 mb-4">
            <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest">Global Feed</h2>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-gray-600 uppercase tracking-tighter">Real-time Updates</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {feedbackList.map((feedback) => (
                <motion.div
                  key={feedback.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-[#161616] rounded-3xl border border-white/5 hover:border-white/10 transition-all group relative overflow-hidden"
                >
                  <Quote className="absolute -right-4 -top-4 w-24 h-24 text-white/5 rotate-12 group-hover:text-emerald-500/5 transition-colors" />
                  
                  <div className="flex items-start justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-black text-black text-lg shadow-lg shadow-emerald-500/20">
                        {feedback.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-white leading-none mb-1">{feedback.author}</p>
                        <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{feedback.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 bg-black/40 px-2 py-1 rounded-lg">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={10}
                          className={star <= feedback.rating ? 'fill-emerald-400 text-emerald-400' : 'text-gray-800'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-6 text-gray-400 text-sm leading-relaxed relative z-10 italic">"{feedback.comment}"</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;