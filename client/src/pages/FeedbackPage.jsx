import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Assuming framer-motion as per standard naming
import { Star, Send, TrendingUp, MessageSquare, Users, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';

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
    rating: 5,
    comment: "LaunchScore has become essential for our business. The monitoring alerts are timely and accurate. Customer support is also very responsive.",
    date: "1 week ago",
    author: "Emily Rodriguez",
    sentiment: "positive"
  },
  {
    id: 4,
    rating: 3,
    comment: "Good overall experience. The interface is intuitive but I'd like more customization options for the reports. Pricing is fair for what you get.",
    date: "1 week ago",
    author: "Michael Thompson",
    sentiment: "neutral"
  },
  {
    id: 5,
    rating: 4,
    comment: "Solid monitoring tool with great uptime tracking. The competitor comparison feature is a nice touch. Easy to set up and use.",
    date: "2 weeks ago",
    author: "Lisa Chen",
    sentiment: "positive"
  },
  {
    id: 6,
    rating: 5,
    comment: "Exactly what we needed! The business-friendly language makes it easy to share reports with stakeholders who aren't technical.",
    date: "2 weeks ago",
    author: "David Park",
    sentiment: "positive"
  }
];

const FeedbackPage = () => {
  const [feedbackList, setFeedbackList] = useState(initialFeedback);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Calculate metrics
  const averageRating = feedbackList.reduce((sum, f) => sum + f.rating, 0) / feedbackList.length;
  const totalReviews = feedbackList.length;

  // Calculate sentiment distribution
  const sentimentCounts = feedbackList.reduce((acc, f) => {
    acc[f.sentiment] = (acc[f.sentiment] || 0) + 1;
    return acc;
  }, {});

  const positivePercent = ((sentimentCounts.positive || 0) / totalReviews) * 100;
  const neutralPercent = ((sentimentCounts.neutral || 0) / totalReviews) * 100;
  const negativePercent = ((sentimentCounts.negative || 0) / totalReviews) * 100;

  // Handle feedback submission
  const handleSubmitFeedback = () => {
    if (newRating === 0 || !newComment.trim()) return;

    setSubmitting(true);

    setTimeout(() => {
      const sentiment = newRating >= 4 ? 'positive' : newRating === 3 ? 'neutral' : 'negative';

      const newFeedback = {
        id: feedbackList.length + 1,
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2 text-white text-white">Website Feedback & Experience Insights</h1>
        <p className="text-gray-400">Collect and analyze user ratings and experience feedback</p>
      </div>

      {/* Rating Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-8 bg-[#1a1a1a] border-emerald-500/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent pointer-events-none" />

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 mb-3">Average Rating</p>
              <div className="flex items-end justify-center md:justify-start gap-4 mb-3">
                <p className="text-7xl font-bold bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                  {averageRating.toFixed(1)}
                </p>
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-7 h-7 ${star <= Math.round(averageRating)
                        ? 'fill-emerald-400 text-emerald-400'
                        : 'text-gray-600'
                        }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500">Based on {totalReviews} reviews</p>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 mb-3">Total Reviews</p>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                <MessageSquare className="w-8 h-8 text-emerald-400" />
                <p className="text-7xl font-bold text-white">{totalReviews}</p>
              </div>
              <p className="text-sm text-gray-500">Across all websites</p>
            </div>

            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400 mb-3">User Sentiment</p>
              <div className="space-y-3">
                {[
                  { label: 'Positive', icon: ThumbsUp, color: 'emerald', percent: positivePercent },
                  { label: 'Neutral', icon: Minus, color: 'yellow', percent: neutralPercent },
                  { label: 'Negative', icon: ThumbsDown, color: 'red', percent: negativePercent }
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                        <span className="text-sm text-white">{item.label}</span>
                      </div>
                      <span className={`text-sm font-semibold text-${item.color}-400`}>
                        {item.percent.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 bg-[#141414] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percent}%` }}
                        transition={{ duration: 0.8 }}
                        className={`h-full bg-gradient-to-r from-${item.color}-400 to-${item.color}-600`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Submit Feedback Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="p-6 bg-[#1a1a1a] border-emerald-500/10">
          <h2 className="text-2xl font-semibold mb-2 text-white">Share Your Experience</h2>
          <p className="text-sm text-gray-500 mb-6">Help us improve by sharing your website experience insights</p>

          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-3 block font-medium text-white">Your Rating</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewRating(star)}
                  className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded"
                >
                  <Star
                    className={`w-10 h-10 transition-all duration-200 ${star <= (hoverRating || newRating)
                      ? 'fill-emerald-400 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      : 'text-gray-600 hover:text-gray-500'
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-3 block font-medium text-white">Your Comment</label>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="bg-[#0f0f0f] border-white/10 min-h-[120px] text-white focus-visible:ring-emerald-500/20"
            />
          </div>

          <Button
            onClick={handleSubmitFeedback}
            disabled={newRating === 0 || newComment.length < 10 || submitting}
            className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-8 py-6"
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </Button>
        </Card>
      </motion.div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbackList.map((feedback) => (
          <motion.div
            key={feedback.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-6 bg-[#1a1a1a] rounded-xl border border-white/5"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-black">
                  {feedback.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-white text-white">{feedback.author}</p>
                  <p className="text-xs text-gray-500">{feedback.date}</p>
                </div>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= feedback.rating ? 'fill-emerald-400 text-emerald-400' : 'text-gray-700'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-300">{feedback.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;